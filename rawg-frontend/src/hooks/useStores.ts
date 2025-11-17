import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import stores from "../data/stores";
import type Store from "../entities/Store";
import { type Response } from "../services/api-client";
import storeService from "../services/storeService";

const useStores = () =>
  useQuery<Response<Store>, Error>({
    queryKey: ["stores"],
    queryFn: storeService.getAll,
    initialData: stores,
    staleTime: ms("24 hours"), // 24 hours
    cacheTime: ms("24 hours"), // 24 hours
  });

export default useStores;
