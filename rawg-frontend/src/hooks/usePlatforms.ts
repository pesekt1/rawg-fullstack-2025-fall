import { useQuery } from "@tanstack/react-query";

import platforms from "../data/platforms";
import apiClient, { type Response } from "../services/api-client";

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
