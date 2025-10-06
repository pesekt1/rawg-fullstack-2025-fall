import { Router } from "express";
import { SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { Game } from "../entities/Game";
import { Genre } from "../entities/Genre";
import { ParentPlatform } from "../entities/ParentPlatform";
import { Store } from "../entities/Store";

// interface for response data structure expected by the frontend
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

const addGenreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  genreId: number | undefined
) => {
  if (genreId) {
    queryBuilder
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("game.id")
          .from(Game, "game")
          .leftJoin("game.genres", "genres")
          .where("genres.id = :genreId")
          .getQuery();
        return "game.id IN " + subQuery;
      })
      .setParameter("genreId", genreId);
  }
};

const addGenrefilterNativeQuery = (
  queryBuilder: SelectQueryBuilder<Game>,
  genreId: number | undefined
) => {
  if (genreId) {
    queryBuilder.andWhere(
      "game.id IN (SELECT games_id FROM games_has_genres WHERE genres_id = :genreId)",
      { genreId }
    );
  }
};

const addStoreFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  storeId: number | undefined
) => {
  if (storeId) {
    queryBuilder
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("game.id")
          .from(Game, "game")
          .leftJoin("game.stores", "stores")
          .where("stores.id = :storeId")
          .getQuery();
        return "game.id IN " + subQuery;
      })
      .setParameter("storeId", storeId);
  }
};

const addParentPlatformFilter = (
  queryBuilder: SelectQueryBuilder<Game>,
  parentPlatformId: number | undefined
) => {
  if (parentPlatformId) {
    queryBuilder
      .andWhere((qb) => {
        const subQuery = qb
          .subQuery()
          .select("game.id")
          .from(Game, "game")
          .leftJoin("game.parent_platforms", "parent_platforms")
          .where("parent_platforms.id = :parentPlatformId")
          .getQuery();
        return "game.id IN " + subQuery;
      })
      .setParameter("parentPlatformId", parentPlatformId);
  }
};

gameRouter.get("/", async (req, res) => {
  const genreId = req.query.genres ? Number(req.query.genres) : undefined;
  const storeId = req.query.stores ? Number(req.query.stores) : undefined;
  const parentPlatformId = req.query.platforms
    ? Number(req.query.platforms)
    : undefined;
  try {
    // Using QueryBuilder to fetch games along with their relations - genres, stores, and parent platforms
    const queryBuilder = gameRepository
      .createQueryBuilder("game")
      .leftJoinAndSelect("game.genres", "genres")
      .leftJoinAndSelect("game.stores", "stores")
      .leftJoinAndSelect("game.parent_platforms", "parent_platforms");

    addGenreFilter(queryBuilder, genreId);
    addStoreFilter(queryBuilder, storeId);
    addParentPlatformFilter(queryBuilder, parentPlatformId);

    const games = await queryBuilder.getMany();

    // Transforming the data to match the expected response structure
    const modifiedGames: ModifiedGame[] = games.map((game) => ({
      ...game,
      parent_platforms: game.parent_platforms?.map((pp) => ({ platform: pp })),
    }));

    // Constructing the final response object
    const response: Response = {
      count: games.length,
      results: modifiedGames,
    };
    res.send(response); // Sending the response back to the client
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default gameRouter;
