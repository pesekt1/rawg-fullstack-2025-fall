import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity("genres", { schema: "rawgDatabase" })
export class Genre {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "image_background", nullable: true, length: 255 })
  image_background?: string;

  @ManyToMany(() => Game, (game) => game.genres)
  games: Game[];
}
