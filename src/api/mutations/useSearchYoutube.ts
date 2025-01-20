import { useQuery } from "@tanstack/react-query";
import { youtubeClient } from "../../youtube/YoutubeClient";

export type SearchResult = {
  title: string;
  url: string;
  thumbnail: string;
};

export const useSearchYoutube = (query: string) => {
  return useQuery({
    queryKey: ["youtube-search", query],
    queryFn: async () => {
      if (!query.trim()) return [];
      const response = await youtubeClient.search(query);
      return response?.items.map((data) => ({
        title: data.snippet.title,
        url: data.id.videoId,
        thumbnail: data.snippet.thumbnails.default.url,
      }));
    },
    enabled: !!query.trim(),
    placeholderData: (previousData) => previousData,
  });
};
