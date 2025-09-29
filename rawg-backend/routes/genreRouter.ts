import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Genre } from "../entities/Genre";

interface Response {
  count: number;
  results: Genre[];
}

const genreRouter = Router();

const genreRepository = AppDataSource.getRepository(Genre);

//GET all genres
genreRouter.get("/", async (req, res) => {
  try {
    const genres = await genreRepository.find();
    const response: Response = {
      count: genres.length,
      results: genres,
    };
    res.send(response);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default genreRouter;
