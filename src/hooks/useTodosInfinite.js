import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import apiClient from "./../utils/ApiClient";
import { keepPreviousData } from "./../../node_modules/@tanstack/query-core/src/utils";

const useTodosInfinite = (pageSize) => {
  const fetchData = ({ pageParam = 1 }) =>
    apiClient
      .get("/todos", {
        params: {
          _limit: pageSize,
          _start: (pageParam - 1) * pageSize,
        },
      })
      .then((resp) => resp.data);

  return useInfiniteQuery({
    queryKey: ["todos", pageSize],
    queryFn: fetchData,
    getNextPageParam: (lastPage, allPages) => {
      console.log("info", lastPage.length, allPages.length);
      return lastPage.length > 0 ? allPages.length + 1 : null;
    },
    retry: 7,
    retryDelay: 3000,
    staleTime: 7_000, //how much time data live in cache
    refetchOnReconnect: true, //refetch stale data when the internet connection is up again
    refetchOnWindowFocus: false, //refetch stale data when the user switch back to browser tab of the app
    refetchInterval: 60_000, // fetch automatically data every 60 sec
    placeholderData: keepPreviousData, // keep previous data as placeholder before retrieving new data from server
  });
};

export default useTodosInfinite;
