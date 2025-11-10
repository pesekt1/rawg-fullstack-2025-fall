import { useMutation, useQueryClient } from "@tanstack/react-query";

import ApiClient from "../services/api-client";

const apiClient = new ApiClient("/games");

const useDeleteGame = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (gameId: number) => apiClient.delete(gameId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["games"] });
    },
  });
};

export default useDeleteGame;
