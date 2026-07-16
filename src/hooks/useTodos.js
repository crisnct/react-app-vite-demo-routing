import { useQuery } from "@tanstack/react-query";
import apiClient from "./../utils/ApiClient";
import { keepPreviousData } from "./../../node_modules/@tanstack/query-core/src/utils";

const useTodos = (page, pageSize) => {
  const fetchData = () =>
    apiClient
      .get("/todos", {
        params: {
          _limit: pageSize,
          _start: (page - 1) * pageSize,
        },
      })
      .then((resp) => resp.data);

  return useQuery({
    queryKey: ["users", page, pageSize, "todos"],
    queryFn: fetchData,
    retry: 7,
    retryDelay: 3000,
    staleTime: 7_000, //how much time data live in cache
    refetchOnReconnect: true, //refetch stale data when the internet connection is up again
    refetchOnWindowFocus: false, //refetch stale data when the user switch back to browser tab of the app
    refetchInterval: 60_000, // fetch automatically data every 60 sec
    placeholderData: keepPreviousData, // keep previous data as placeholder before retrieving new data from server
  });
};

export default useTodos;
