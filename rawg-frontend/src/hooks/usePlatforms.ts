import { useQuery } from "@tanstack/react-query";

import platforms from "../data/platforms";
import apiClient from "../services/api-client";
import { type Response } from "./useData";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: () =>
      apiClient
        .get<Response<Platform>>("/platforms/lists/parents")
        .then((res) => res.data),
    initialData: platforms,
  });

export default usePlatforms;
