import ApiClient from "./api-client";

export interface Store {
  id: number;
  name: string;
  image_background: string;
}

export default new ApiClient<Store>("stores");
