import { useQuery } from "@tanstack/react-query";
import ms from "ms";

import genres from "../data/genres";
import type { Genre } from "../entities/Genre";
import { type Response } from "../services/api-client";
import genreService from "../services/genreService";

const useGenres = () =>
  useQuery<Response<Genre>, Error>({
    queryKey: ["genres"],
    queryFn: genreService.getAll,
    staleTime: ms("24 hours"), // 24 hours
    cacheTime: ms("24 hours"), // 24 hours
    initialData: genres,
  });
export default useGenres;
