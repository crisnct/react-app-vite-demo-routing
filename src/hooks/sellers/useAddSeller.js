import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiClient from "../../utils/ApiClient";

const useAddSeller = (newSeller) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newSeller) =>
      apiClient.post("/users", newSeller).then((res) => res.data),

    onMutate: (newSeller) => {
      //OPTIMISTIC approach
      const prevSellers = queryClient.getQueryData(["sellers"]);

      queryClient.setQueryData(["sellers"], (sellers) => [
        newSeller,
        ...sellers,
      ]);
      return { prevSellers };
    },

    onSuccess: (savedSeller, newSeller) => {
      //PESSIMISTIC approach
      //1. Invalidate cache data
      // queryClient.invalidateQueries({
      //   queryKey: ["sellers"],
      // });
      //2. OR modify the object from cache
      // queryClient.setQueryData(["sellers"], (sellers) => [
      //   savedSeller,
      //   ...sellers,
      // ]);

      //OPTIMISTIC approach
      queryClient.setQueryData(["sellers"], (sellers) =>
        sellers?.map((seller) => (seller === newSeller ? savedSeller : seller)),
      );
    },

    onError: (err, newSeller, context) => {
      if (context?.prevSellers) {
        queryClient.setQueryData(["sellers"], context.prevSellers);
      }
    },

    retry: 3,
    retryDelay: (attempt) => Math.min(1000 * 2 ** attempt, 30_000),
  });
};
export default useAddSeller;
