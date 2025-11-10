import { useQuery } from "@tanstack/react-query";

import gameService from "../services/gameService";

const useGame = (id: string) =>
  useQuery({
    queryKey: ["game", id],
    queryFn: () => gameService.getById(Number(id)),
  });

export default useGame;
