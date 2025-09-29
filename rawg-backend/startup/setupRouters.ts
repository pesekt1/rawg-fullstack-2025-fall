import express from "express";
import gameRouter from "../routes/gameRouter";
import genreRouter from "../routes/genreRouter";
import parentPlatformRouter from "../routes/ParentPlatformRouter";
import storeRouter from "../routes/storeRouter";

const setupRouters = (app: express.Application) => {
  app.use("/games", gameRouter);
  app.use("/stores", storeRouter);
  app.use("/platforms/lists/parents", parentPlatformRouter);
  app.use("/genres", genreRouter);
};

export default setupRouters;
