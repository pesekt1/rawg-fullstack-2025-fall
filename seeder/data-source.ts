import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Publisher } from "./entities/Publisher";
import { Store } from "./entities/Store";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql" | "postgres",
  url: process.env.DATABASE_URL,
  entities: [Game, Genre, ParentPlatform, Store, Publisher], // Registering entities with the data source
  synchronize: true, // Automatically create or modify database schema on every application launch
  logging: true, // Enable query logging for debugging purposes
});
