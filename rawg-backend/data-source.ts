import { DataSource } from "typeorm";
import { Game } from "./entities/Game";
import { Genre } from "./entities/Genre";
import { ParentPlatform } from "./entities/ParentPlatform";
import { Publisher } from "./entities/Publisher";
import { Screenshot } from "./entities/Screenshot";
import { Store } from "./entities/Store";
import { Trailer } from "./entities/Trailer";

export const AppDataSource = new DataSource({
  type: process.env.DB_TYPE as "mysql" | "postgres",
  url: process.env.DATABASE_URL,
  entities: [
    Game,
    Genre,
    ParentPlatform,
    Store,
    Publisher,
    Trailer,
    Screenshot,
  ],
  synchronize: true,
  logging: true,
});
