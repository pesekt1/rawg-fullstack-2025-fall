import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity("trailers")
export class Trailer {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "preview", length: 255 })
  preview: string;

  @Column("varchar", { name: "data_480", length: 255 })
  data480: string;

  @Column("varchar", { name: "data_max", length: 255 })
  dataMax: string;

  @ManyToOne(() => Game, (game) => game.trailers, { onDelete: "CASCADE" })
  game: Game;
}
