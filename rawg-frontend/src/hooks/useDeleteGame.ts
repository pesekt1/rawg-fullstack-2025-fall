import { useMutation, useQueryClient } from "@tanstack/react-query";

import gameService from "../services/gameService";

const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId: number) => gameService.delete(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};

export default useDeleteGame;
