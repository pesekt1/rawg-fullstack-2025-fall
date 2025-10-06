import { Router } from "express";
import { Game } from "../entities/Game";
import { ParentPlatform } from "../entities/ParentPlatform";
import { getGames } from "../services/gameService";

export type ModifiedGame = Omit<Game, "parent_platforms"> & {
  parent_platforms: { platform: ParentPlatform }[];
};

interface Response {
  count: number;
  results: ModifiedGame[];
}

const gameRouter = Router();

gameRouter.get("/", async (req, res) => {
  const games = await getGames(req); // Fetching games using the service layer

  // Constructing the final response object
  const response: Response = {
    count: games.length,
    results: games,
  };
  res.send(response); // Sending the response back to the client
});

export default gameRouter;
