import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity("stores", { schema: "rawgDatabase" })
export class Store {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 45 })
  name: string;

  @Column("varchar", { name: "image_background", nullable: true, length: 45 })
  image_background?: string;

  @ManyToMany(() => Game, (game) => game.stores)
  games: Game[];
}
