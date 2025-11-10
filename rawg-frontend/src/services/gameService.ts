import ApiClient from "./api-client";
import type { Platform } from "./platformService";

export interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  parent_platforms: { platform: Platform }[];
}

export default new ApiClient<Game>("/games");
