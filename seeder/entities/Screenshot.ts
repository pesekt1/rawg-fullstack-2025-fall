import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Game } from "./Game";

@Entity("screenshots")
export class Screenshot {
  @PrimaryGeneratedColumn({ type: "int", name: "id" })
  id: number;

  @Column("varchar", { name: "image", length: 255 })
  image: string;

  @Column("int", { name: "width" })
  width: number;

  @Column("int", { name: "height" })
  height: number;

  @Column("boolean", { name: "is_deleted", default: false })
  is_deleted: boolean;

  @ManyToOne(() => Game, (game) => game.screenshots, { onDelete: "CASCADE" })
  @JoinColumn({ name: "game_id" })
  game: Game;
}
