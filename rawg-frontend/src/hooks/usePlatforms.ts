import { useQuery } from "@tanstack/react-query";

import platforms from "../data/platforms";
import ApiClient, { type Response } from "../services/api-client";

interface Platform {
  id: number;
  name: string;
  slug: string;
}

const apiClient = new ApiClient<Platform>("/platforms/lists/parents");

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: apiClient.getAll,
    initialData: platforms,
  });

export default usePlatforms;
