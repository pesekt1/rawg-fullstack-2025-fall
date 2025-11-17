import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import platforms from "../data/platforms";
import type Platform from "../entities/Platform";
import { type Response } from "../services/api-client";
import platformService from "../services/platformService";

const usePlatforms = () =>
  useQuery<Response<Platform>, Error>({
    queryKey: ["platforms"],
    queryFn: platformService.getAll,
    initialData: platforms,
    staleTime: ms("24 hours"), // 24 hours
    cacheTime: ms("24 hours"), // 24 hours
  });

export default usePlatforms;
