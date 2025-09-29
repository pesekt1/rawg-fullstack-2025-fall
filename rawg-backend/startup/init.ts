import cors from "cors";
import express from "express";
import dbConnection from "./dbConnection";
import setupRouters from "./setupRouters";

const init = (app: express.Application) => {
  app.use(express.json()); // Middleware to parse JSON request bodies
  app.use(cors());

  dbConnection(); // Initialize database connection

  setupRouters(app);
};

export default init;
