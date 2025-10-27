import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Store } from "./entities/Store";

export const AppDataSource = new DataSource({
  type: "mysql",
  url: process.env.DATABASE_URL,
  entities: [Game, Genre, ParentPlatform, Store], // Registering entities with the data source
  synchronize: true, // Automatically create or modify database schema on every application launch
  logging: true, // Enable query logging for debugging purposes
});
