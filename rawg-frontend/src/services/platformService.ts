import type Platform from "../entities/Platform";
import ApiClient from "./api-client";

export default new ApiClient<Platform>("/platforms/lists/parents");
