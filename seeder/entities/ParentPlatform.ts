import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity("parent_platforms", { schema: "rawgDatabase" })
export class ParentPlatform {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "slug", length: 255 })
  slug: string;

  @ManyToMany(() => Game, (game) => game.parent_platforms)
  games: Game[];
}
