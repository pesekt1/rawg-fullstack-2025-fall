import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Genre } from "./Genre";
import { ParentPlatform } from "./ParentPlatform";
import { Publisher } from "./Publisher";
import { Screenshot } from "./Screenshot";
import { Store } from "./Store";
import { Trailer } from "./Trailer";

@Entity("games")
export class Game {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("int", { name: "metacritic", nullable: true })
  metacritic?: number;

  @Column("varchar", { name: "background_image", nullable: true, length: 255 })
  background_image?: string;

  @Column({ nullable: true })
  released?: string;

  @Column("float", { nullable: true })
  rating?: number;

  @Column({ nullable: true })
  added?: number;

  @Column({ type: "text", nullable: true })
  description_raw?: string;

  @ManyToMany(() => Genre, (genre) => genre.games)
  @JoinTable({
    name: "games_has_genres",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "genres_id", referencedColumnName: "id" }],
  })
  genres: Genre[];

  @ManyToMany(() => ParentPlatform, (parentPlatform) => parentPlatform.games)
  @JoinTable({
    name: "games_has_parent_platforms",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [
      { name: "parent_platforms_id", referencedColumnName: "id" },
    ],
  })
  parent_platforms: ParentPlatform[];

  @ManyToMany(() => Store, (store) => store.games)
  @JoinTable({
    name: "games_has_stores",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "stores_id", referencedColumnName: "id" }],
  })
  stores: Store[];

  @ManyToMany(() => Publisher, (publisher) => publisher.games)
  @JoinTable({
    name: "games_has_publishers",
    joinColumns: [{ name: "games_id", referencedColumnName: "id" }],
    inverseJoinColumns: [{ name: "publishers_id", referencedColumnName: "id" }],
  })
  publishers: Publisher[];

  @OneToMany(() => Trailer, (trailer) => trailer.game)
  trailers: Trailer[];

  @OneToMany(() => Screenshot, (screenshot) => screenshot.game)
  screenshots: Screenshot[];
}
