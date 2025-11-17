import axios from "axios";
import dotenv from "dotenv";
import * as fs from "fs";
import { Repository } from "typeorm/repository/Repository";
import { AppDataSource } from "./data-source";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Publisher } from "./entities/Publisher";
import { Screenshot } from "./entities/Screenshot";
import { Store } from "./entities/Store";
import { Trailer } from "./entities/Trailer";

dotenv.config();

// Define the structure of the original game data as it appears in games.json
type GameOriginal = Omit<Game, "parent_platforms" | "stores"> & {
  parent_platforms: { platform: ParentPlatform }[];
  stores: { store: Store }[];
};

interface Response<T> {
  count: number;
  previous?: string;
  next?: string;
  results: T[];
}

interface TrailerOriginal {
  id: number;
  name: string;
  preview: string;
  data: {
    "480": string;
    max: string;
  };
}

async function insertData() {
  await AppDataSource.initialize(); // Initialize the data source connection

  //get data from games.json and parse it:
  const rawData = fs.readFileSync("games.json", "utf-8");
  const parsedData = JSON.parse(rawData);
  const gamesOriginalData: GameOriginal[] = parsedData.results;

  // Transform the original data to match the Game entity structure
  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((pp) => pp.platform),
    stores: game.stores.map((s) => s.store),
  }));

  // Get repositories for each entity
  const gameRepo = AppDataSource.getRepository(Game);
  const genreRepo = AppDataSource.getRepository(Genre);
  const parentPlatformRepo = AppDataSource.getRepository(ParentPlatform);
  const storeRepo = AppDataSource.getRepository(Store);
  const publisherRepo = AppDataSource.getRepository(Publisher);
  const trailerRepo = AppDataSource.getRepository(Trailer);
  const screenshotRepo = AppDataSource.getRepository(Screenshot);

  //before inserting data, delete all existing data to avoid duplicates:
  await gameRepo.delete({});
  console.log("games deleted");
  await genreRepo.delete({});
  console.log("genres deleted");
  await parentPlatformRepo.delete({});
  console.log("parent platforms deleted");
  await storeRepo.delete({});
  console.log("stores deleted");
  await publisherRepo.delete({});
  console.log("publishers deleted");
  await trailerRepo.delete({});
  console.log("trailers deleted");
  await screenshotRepo.delete({});
  console.log("screenshots deleted");

  async function getAdditionalGameData(id: number) {
    const apiKey = process.env.RAWG_API_KEY;
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`
      );

      const description_raw: string = response.data.description_raw || "";
      const publishers: Publisher[] = response.data.publishers || [];

      return {
        description_raw,
        publishers,
      };
    } catch (error) {
      console.error(`Failed to fetch description for game ID ${id}:`, error);
      return { description_raw: "", publishers: [] };
    }
  }

  async function fetchTrailers(
    gameId: number,
    trailerRepo: Repository<Trailer>
  ): Promise<Trailer[]> {
    const apiKey = process.env.RAWG_API_KEY;
    try {
      const response = await axios.get<Response<TrailerOriginal>>(
        `https://api.rawg.io/api/games/${gameId}/movies?key=${apiKey}`
      );

      const trailers = response.data.results || [];
      return trailers.map((trailerData) =>
        trailerRepo.create({
          id: trailerData.id,
          name: trailerData.name,
          preview: trailerData.preview,
          data480: trailerData.data["480"],
          dataMax: trailerData.data["max"],
          game: { id: gameId } as Game,
        })
      );
    } catch (error) {
      console.error(`Failed to fetch trailers for game ID ${gameId}:`, error);
      return [];
    }
  }

  async function fetchScreenshots(
    gameId: number,
    screenshotRepo: Repository<Screenshot>
  ): Promise<Screenshot[]> {
    const apiKey = process.env.RAWG_API_KEY;
    try {
      const response = await axios.get<Response<Screenshot>>(
        `https://api.rawg.io/api/games/${gameId}/screenshots?key=${apiKey}`
      );
      const screenshots = response.data.results || [];
      return screenshots.map((screenshotData) =>
        screenshotRepo.create({
          id: screenshotData.id,
          image: screenshotData.image,
          width: screenshotData.width,
          height: screenshotData.height,
          is_deleted: screenshotData.is_deleted,
          game: { id: gameId } as Game,
        })
      );
    } catch (error) {
      console.error(
        `Failed to fetch screenshots for game ID ${gameId}:`,
        error
      );
      return [];
    }
  }

  //loop through each game and ensure related entities exist before saving the game
  for (const game of gamesData) {
    // Fetch additional data for the game
    const { description_raw, publishers } = await getAdditionalGameData(
      game.id
    );

    game.description_raw = description_raw;
    game.publishers = publishers || [];

    // Ensure related genres exist in the database, if not, create them
    game.genres = await Promise.all(
      game.genres.map(async (g) => {
        let genre = await genreRepo.findOne({ where: { name: g.name } });
        if (!genre) {
          genre = await genreRepo.save(g);
          console.log(`Genre: ${g.name} created`);
        }
        return genre;
      })
    );

    //Ensure related publishers exist in the database, if not, create them
    game.publishers = await Promise.all(
      game.publishers.map(async (p) => {
        let publisher = await publisherRepo.findOne({
          where: { name: p.name },
        });
        if (!publisher) {
          publisher = await publisherRepo.save(p);
          console.log(`Publisher: ${p.name} created`);
        }
        return publisher;
      })
    );

    // Ensure related parent platforms exist in the database, if not, create them
    game.parent_platforms = await Promise.all(
      game.parent_platforms.map(async (pp) => {
        let parentPlatform = await parentPlatformRepo.findOne({
          where: { name: pp.name },
        });
        if (!parentPlatform) {
          parentPlatform = await parentPlatformRepo.save(pp);
          console.log(`Parent Platform: ${pp.name} created`);
        }
        return parentPlatform;
      })
    );

    // Ensure related stores exist in the database, if not, create them
    game.stores = await Promise.all(
      game.stores.map(async (s) => {
        let store = await storeRepo.findOne({ where: { name: s.name } });
        if (!store) {
          store = await storeRepo.save(s);
          console.log(`Store: ${s.name} created`);
        }
        return store;
      })
    );

    //deduplicate relations before saving:
    game.genres = Array.from(
      new Map(game.genres.map((g) => [g.id, g])).values()
    );
    game.parent_platforms = Array.from(
      new Map(game.parent_platforms.map((pp) => [pp.id, pp])).values()
    );
    game.stores = Array.from(
      new Map(game.stores.map((s) => [s.id, s])).values()
    );

    // Now save the game itself - it will also save the relationships in the join tables
    const savedGame = await gameRepo.save(game);
    console.log(`Game: ${game.name} created`);

    // Fetch and save trailers for the game
    const trailers = await fetchTrailers(game.id, trailerRepo);

    trailers.forEach((trailer) => {
      trailer.game = savedGame;
    });
    await trailerRepo.save(trailers);
    console.log(`Trailers for game: ${game.name} created`);

    // Fetch and save screenshots for the game
    const screenshots = await fetchScreenshots(game.id, screenshotRepo);
    screenshots.forEach((screenshot) => {
      screenshot.game = savedGame;
    });
    await screenshotRepo.save(screenshots);
    console.log(`Screenshots for game: ${game.name} created`);
  }
}

insertData()
  .then(() => {
    console.log("Data insertion completed.");

    AppDataSource.destroy(); // Close the data source connection
    process.exit(); // Exit the process
  })
  .catch((error) => {
    console.error("Error during data insertion:", error);
  });
