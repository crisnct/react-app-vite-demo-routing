import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/ApiClient";

const useDeleteSeller = (sellerId) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (sellerId) =>
      apiClient.delete(`/users2/${sellerId}`).then((res) => res.data),

    onMutate: (sellerId) => {
      //OPTIMISTIC approach
      const prevSellers = queryClient.getQueryData(["sellers"]);
      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers.filter((s) => s.id !== sellerId),
      );
      return { prevSellers };
    },

    onError: (err, sellerId, context) => {
      if (context?.prevSellers) {
        queryClient.setQueryData(["sellers"], context.prevSellers);
      }
    },

    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });
};

export default useDeleteSeller;
