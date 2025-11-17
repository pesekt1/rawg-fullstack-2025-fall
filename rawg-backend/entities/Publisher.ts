import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Game } from "./Game";

@Entity("publishers")
export class Publisher {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "name", length: 255 })
  name: string;

  @Column("varchar", { name: "image_background", nullable: true, length: 255 })
  image_background?: string;

  @ManyToMany(() => Game, (game) => game.publishers)
  games: Game[];
}
