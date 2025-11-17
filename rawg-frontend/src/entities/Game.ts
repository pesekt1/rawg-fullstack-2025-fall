import type { Platform } from "./Platform";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  description_raw: string;
  parent_platforms: { platform: Platform }[];
}
