import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import stores from "../data/stores";
import ApiClient, { type Response } from "../services/api-client";

export interface Store {
  id: number;
  name: string;
  image_background: string;
}

const apiClient = new ApiClient<Store>("stores");

const useStores = () =>
  useQuery<Response<Store>, Error>({
    queryKey: ["stores"],
    queryFn: apiClient.getAll,
    initialData: stores,
    staleTime: ms("24 hours"), // 24 hours
    cacheTime: ms("24 hours"), // 24 hours
  });

export default useStores;
