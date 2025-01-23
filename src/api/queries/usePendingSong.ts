import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "../queryKeys";
import { Song } from "../api-types";

export const usePendingSongs = () => {
  const { data: pendingData } = useQuery<Song[]>({
    queryKey: QUERY_KEYS.pending,
    enabled: true,
  });

  return pendingData || [];
};
