import { SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { Game } from "../entities/Game";
import { ModifiedGame } from "../routes/gameRouter";

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

const addOrdering = (
  queryBuilder: SelectQueryBuilder<Game>,
  ordering: string | undefined
) => {
  //TODO: implement proper relevance ordering
  if (!ordering) queryBuilder.orderBy("game.rating", "DESC"); //default relevance ordering
  if (ordering === "-added") queryBuilder.orderBy("game.added", "DESC");
  if (ordering === "name") queryBuilder.orderBy("game.name", "ASC");
  if (ordering === "-released") queryBuilder.orderBy("game.released", "DESC");
  if (ordering === "metacritic")
    queryBuilder.orderBy("game.metacritic", "DESC");
  if (ordering === "-rating") queryBuilder.orderBy("game.rating", "DESC");
};

const addSearch = (
  queryBuilder: SelectQueryBuilder<Game>,
  search: string | undefined
) => {
  if (search) {
    queryBuilder.andWhere("LOWER(game.name) LIKE :search", {
      search: `%${search}%`,
    });
  }
};

const modifyGameResponse = (games: Game[]): ModifiedGame[] => {
  return games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((pp) => ({ platform: pp })),
  }));
};

export const getGames = async (req: any) => {
  const genreId = req.query.genres ? Number(req.query.genres) : undefined;
  const storeId = req.query.stores ? Number(req.query.stores) : undefined;
  const parentPlatformId = req.query.platforms
    ? Number(req.query.platforms)
    : undefined;
  const ordering = req.query.ordering ? String(req.query.ordering) : undefined;
  const search = req.query.search ? String(req.query.search) : undefined;
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
    addOrdering(queryBuilder, ordering);
    addSearch(queryBuilder, search);

    const games = await queryBuilder.getMany();
    return modifyGameResponse(games);
  } catch (error) {
    console.error("Error fetching games:", error);
    throw new Error("Error fetching games");
  }
};
