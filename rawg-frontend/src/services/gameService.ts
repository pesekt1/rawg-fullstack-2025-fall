import type { Game } from "../entities/Game";
import ApiClient from "./api-client";

export default new ApiClient<Game>("/games");
