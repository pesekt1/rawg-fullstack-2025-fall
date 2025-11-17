import type { Store } from "../entities/Store";
import ApiClient from "./api-client";

export default new ApiClient<Store>("stores");
