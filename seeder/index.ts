import * as fs from "fs";
import { AppDataSource } from "./data-source";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";

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

  const gamesData: Game[] = gamesOriginalData.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms.map((pp) => pp.platform),
    stores: game.stores.map((s) => s.store),
  }));

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

  for (const game of gamesData) {
    await Promise.all(
      game.genres.map(async (g) => {
        let genre = await genreRepo.findOne({ where: { id: g.id } });
        if (!genre) {
          genre = await genreRepo.save(g);
          console.log(`Genre: ${g.name} created`);
        }
        return genre;
      })
    );

    await Promise.all(
      game.parent_platforms.map(async (pp) => {
        let parentPlatform = await parentPlatformRepo.findOne({
          where: { id: pp.id },
        });
        if (!parentPlatform) {
          parentPlatform = await parentPlatformRepo.save(pp);
          console.log(`Parent Platform: ${pp.name} created`);
        }
        return parentPlatform;
      })
    );

    await Promise.all(
      game.stores.map(async (s) => {
        let store = await storeRepo.findOne({ where: { id: s.id } });
        if (!store) {
          store = await storeRepo.save(s);
          console.log(`Store: ${s.name} created`);
        }
        return store;
      })
    );

    await gameRepo.save(game);
    console.log(`Game: ${game.name} created`);
  }
}

insertData()
  .then(() => {
    console.log("Data insertion completed.");
    return AppDataSource.destroy();
  })
  .catch((error) => {
    console.error("Error during data insertion:", error);
  });
