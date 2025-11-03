import { useQuery } from "@tanstack/react-query";

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
    staleTime: 1000 * 60 * 60 * 24, // 24 hours
    cacheTime: 1000 * 60 * 60, // 1 hour
  });

export default useStores;
