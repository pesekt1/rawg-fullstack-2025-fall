import type Genre from "../entities/Genre";
import ApiClient from "./api-client";

export default new ApiClient<Genre>("/genres");
