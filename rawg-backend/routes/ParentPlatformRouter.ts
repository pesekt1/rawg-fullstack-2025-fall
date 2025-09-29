import { Router } from "express";
import { AppDataSource } from "../data-source";
import { ParentPlatform } from "../entities/ParentPlatform";

interface Response {
  count: number;
  results: ParentPlatform[];
}

const parentPlatformRouter = Router();

const parentPlatformRepository = AppDataSource.getRepository(ParentPlatform);

//GET all parent platforms
parentPlatformRouter.get("/", async (req, res) => {
  try {
    const parentPlatforms = await parentPlatformRepository.find();
    const response: Response = {
      count: parentPlatforms.length,
      results: parentPlatforms,
    };
    res.send(response);
  } catch (error) {
    console.error("Error fetching parent platforms:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default parentPlatformRouter;
