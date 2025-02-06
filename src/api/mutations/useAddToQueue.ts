import { useMutation } from "@tanstack/react-query";
import axios from "../axios";
import queryClient from "../queryClient";
import { QUERY_KEYS } from "../queryKeys";
import { Song } from "../api-types";

export type AddToQueueParams = {
  yt_link: string;
  name: string;
};

const addToQueue = async (song: AddToQueueParams) => {
  const response = await axios.post("/queue_song", song);
  return response;
};

export const useAddToQueue = () => {
  return useMutation({
    mutationFn: addToQueue,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.queue });
    },
  });
};
