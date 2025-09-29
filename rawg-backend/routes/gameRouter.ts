import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Store } from "../entities/Store";

interface ModifiedGame {
  id: number;
  name: string;
  background_image?: string;
  metacritic?: number;
  parent_platforms: { platform: ParentPlatform }[];
  genres: Genre[];
  stores: Store[];
}

interface Response {
  count: number;
  results: ModifiedGame[];
}

const gameRouter = Router();
const gameRepository = AppDataSource.getRepository(Game);

gameRouter.get("/", async (req, res) => {
  try {
    const queryBuilder = gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.stores", "stores")
      .leftJoinAndSelect("game.parent_platforms", "parent_platforms");

    const games = await queryBuilder.getMany();
    const modifiedGames: ModifiedGame[] = games.map((game) => ({
      ...game,
      parent_platforms: game.parent_platforms?.map((pp) => ({ platform: pp })),
    }));

    const response: Response = {
      count: games.length,
      results: modifiedGames,
    };
    res.send(response);
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default gameRouter;
