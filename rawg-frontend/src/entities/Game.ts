import type Genre from "./Genre";
import type Platform from "./Platform";
import type Publisher from "./Publisher";
import type Store from "./Store";

export default interface Game {
  id: number;
  name: string;
  background_image: string;
  metacritic: number;
  description_raw: string;
  parent_platforms: { platform: Platform }[];
  genres: Genre[];
  publishers: Publisher[];
  stores: Store[];
}
