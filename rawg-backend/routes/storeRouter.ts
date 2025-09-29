import { Router } from "express";
import { AppDataSource } from "../data-source";
import { Store } from "../entities/Store";

interface Response {
  count: number;
  results: Store[];
}

const storeRouter = Router();

const storeRepository = AppDataSource.getRepository(Store);

//GET all stores
storeRouter.get("/", async (req, res) => {
  try {
    const stores = await storeRepository.find();
    const response: Response = {
      count: stores.length,
      results: stores,
    };
    res.send(response);
  } catch (error) {
    console.error("Error fetching stores:", error);
    res.status(500).send({ error: "Internal server error" });
  }
});

export default storeRouter;
