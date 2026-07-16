import { useQuery } from "@tanstack/react-query";
import apiClient from "../../utils/ApiClient";

const fetchSellers = () => apiClient.get("/users").then((resp) => resp.data);

const useSellers = () => {
  return useQuery({
    queryKey: ["sellers"],
    queryFn: fetchSellers,
    retry: 7,
    retryDelay: 3000,
    staleTime: 7_000, //how much time data live in cache
    refetchOnReconnect: true, //refetch stale data when the internet connection is up again
    refetchOnWindowFocus: false, //refetch stale data when the user switch back to browser tab of the app
    refetchInterval: 60_000, // fetch automatically data every 60 sec
  });
};

export default useSellers;
