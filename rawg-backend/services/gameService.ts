import { SelectQueryBuilder } from "typeorm";
import { AppDataSource } from "../data-source";
import { Game } from "../entities/Game";
import {
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  ModifiedGame,
  START_PAGE,
} from "../routes/gameRouter";

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

const buildGameQuery = (req: any) => {
  const genreId = req.query.genres ? Number(req.query.genres) : undefined;
  const storeId = req.query.stores ? Number(req.query.stores) : undefined;
  const parentPlatformId = req.query.platforms
    ? Number(req.query.platforms)
    : undefined;
  const ordering = req.query.ordering ? String(req.query.ordering) : undefined;
  const search = req.query.search ? String(req.query.search) : undefined;

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

  return queryBuilder;
};

const modifyGames = (games: Game[]): ModifiedGame[] => {
  return games.map((game) => ({
    ...game,
    parent_platforms: game.parent_platforms?.map((pp) => ({ platform: pp })),
  }));
};

export const getGames = async (req: any) => {
  const page = req.query.page ? Number(req.query.page) : START_PAGE;
  let pageSize = req.query.page_size
    ? Number(req.query.page_size)
    : DEFAULT_PAGE_SIZE;

  if (pageSize > MAX_PAGE_SIZE) {
    pageSize = MAX_PAGE_SIZE;
  }

  const queryBuilder = buildGameQuery(req);

  try {
    queryBuilder.skip((page - 1) * pageSize).take(pageSize);

    const [games, total] = await queryBuilder.getManyAndCount();
    const modifiedGames = modifyGames(games);
    return { modifiedGames, total };
  } catch (error) {
    console.error("Error fetching games:", error);
    // Always return a valid object, even on error
    return { modifiedGames: [], total: 0 };
  }
};

export const getGame = async (gameId: string) => {
  try {
    const game = await gameRepository.findOne({
      where: { id: Number(gameId) },
      relations: ["genres", "stores", "parent_platforms", "publishers"],
    });
    return {
      ...game,
      parent_platforms: game?.parent_platforms?.map((parent_platform) => ({
        platform: parent_platform,
      })),
    };
  } catch (error) {
    throw new Error(`Game with ID ${gameId} not found.`);
  }
};

export const getTrailers = async (gameId: number) => {
  const game = await gameRepository
    .createQueryBuilder("game")
    .leftJoinAndSelect("game.trailers", "trailers")
    .where("game.id = :gameId", { gameId })
    .getOne();

  if (!game || !game.trailers) {
    throw new Error(`No trailers found for game with ID ${gameId}.`);
  }
  return game.trailers;
};

export const deleteGameById = async (gameId: number) => {
  try {
    await gameRepository.delete(gameId);
  } catch (error) {
    throw new Error(`Failed to delete game with ID ${gameId}.`);
  }
};
