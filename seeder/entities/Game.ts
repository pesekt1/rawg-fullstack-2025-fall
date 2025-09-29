import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Genre } from "./Genre";
import { ParentPlatform } from "./ParentPlatform";
import { Store } from "./Store";

@Entity("games", { schema: "rawgDatabase" })
export class Game {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "metacritic", nullable: true })
  metacritic?: number;

  @Column("varchar", { name: "background_image", nullable: true, length: 255 })
  backgroundImage?: string;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable({
    name: "games_has_genres",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "genres_id", referencedColumnName: "id" }],
    schema: "rawgDatabase",
  })
  genres: Genre[];

  @ManyToMany(() => ParentPlatform, (parentPlatform) => parentPlatform.games)
  @JoinTable({
    name: "games_has_parent_platforms",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "parent_platforms_id", referencedColumnName: "id" },
    ],
    schema: "rawgDatabase",
  })
  parent_platforms: ParentPlatform[];

  @ManyToMany(() => Store, (store) => store.games)
  @JoinTable({
    name: "games_has_stores",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "stores_id", referencedColumnName: "id" }],
    schema: "rawgDatabase",
  })
  stores: Store[];
}
