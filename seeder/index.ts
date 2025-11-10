import axios from "axios";
import dotenv from "dotenv";
import * as fs from "fs";
import { AppDataSource } from "./data-source";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";

dotenv.config();

// Define the structure of the original game data as it appears in games.json
interface GameOriginal {
  id: number;
  name: string;
  background_image?: string;
  metacritic?: number;
  parent_platforms: { platform: ParentPlatform }[];
  genres: Genre[];
  stores: { store: Store }[];
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

  //before inserting data, delete all existing data to avoid duplicates:
  await gameRepo.delete({});
  console.log("games deleted");
  await genreRepo.delete({});
  console.log("genres deleted");
  await parentPlatformRepo.delete({});
  console.log("parent platforms deleted");
  await storeRepo.delete({});
  console.log("stores deleted");

  async function generateDescription(id: number): Promise<string> {
    const apiKey = process.env.RAWG_API_KEY;
    try {
      const response = await axios.get(
        `https://api.rawg.io/api/games/${id}?key=${apiKey}`
      );
      return response.data.description_raw || "No description available.";
    } catch (error) {
      console.error(`Failed to fetch description for game ID ${id}:`, error);
      return "";
    }
  }

  //loop through each game and ensure related entities exist before saving the game
  for (const game of gamesData) {
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

    // Generate and set the description_raw field
    game.description_raw = await generateDescription(game.id);

    // Now save the game itself - it will also save the relationships in the join tables
    await gameRepo.save(game);
    console.log(`Game: ${game.name} created`);
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
