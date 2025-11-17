import { Router } from "express";
import { Game } from "../entities/Game";
import { ParentPlatform } from "../entities/ParentPlatform";
import {
  deleteGameById,
  getGame,
  getGames,
  getTrailers,
} from "../services/gameService";

export type ModifiedGame = Omit<Game, "parent_platforms"> & {
  parent_platforms: { platform: ParentPlatform }[];
};

export const DEFAULT_PAGE_SIZE = 20;
export const START_PAGE = 1;
export const MAX_PAGE_SIZE = 40;

interface Response {
  count: number;
  next: string | null;
  results: ModifiedGame[];
}

const gameRouter = Router();

const buildGamesResponse = (
  games: ModifiedGame[],
  total: number,
  req: any
): Response => {
  const page = req.query.page ? Number(req.query.page) : START_PAGE;

  let pageSize = req.query.page_size
    ? Number(req.query.page_size)
    : DEFAULT_PAGE_SIZE;

  if (pageSize > MAX_PAGE_SIZE) {
    pageSize = MAX_PAGE_SIZE;
  }

  const totalPages = Math.ceil(total / pageSize);

  return {
    count: total,
    next:
      page < totalPages
        ? `${process.env.SERVER_URL}/games?page=${
            page + 1
          }&page_size=${pageSize}`
        : null,
    results: games,
  };
};

gameRouter.get("/", async (req, res) => {
  const { modifiedGames, total } = await getGames(req); // Fetching games using the service layer

  // Constructing the final response object
  const response: Response = buildGamesResponse(modifiedGames, total, req);
  res.send(response); // Sending the response back to the client
});

gameRouter.get("/:id", async (req, res) => {
  const gameId = req.params.id;
  try {
    const game = await getGame(gameId);
    if (game) {
      res.send(game);
    } else {
      res.status(404).send({ error: "Game not found." });
    }
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch the game." });
  }
});

gameRouter.get("/:id/movies", async (req, res) => {
  try {
    const gameId = Number(req.params.id);
    const trailers = await getTrailers(gameId);
    res.send({ count: trailers.length, results: trailers });
  } catch (error) {
    res.status(500).send({ error: "Failed to fetch trailers." });
  }
});

gameRouter.delete("/:id", async (req, res) => {
  const gameId = Number(req.params.id);
  try {
    await deleteGameById(gameId);
    res.status(204).send();
  } catch (error) {
    res.status(500).send({ error: "Failed to delete the game." });
  }
});

export default gameRouter;
