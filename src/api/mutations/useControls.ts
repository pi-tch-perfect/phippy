import { useMutation } from "@tanstack/react-query";
import axios from "../axios";

const skip = async () => {
  const response = await axios.post("/play_next");
  return response;
};

const togglePlayback = async () => {
  const response = await axios.post("/toggle_playback");
  return response;
};

export const useSkip = () => {
  return useMutation({
    mutationFn: skip,
  });
};

export const useTogglePlayback = () => {
  return useMutation({
    mutationFn: togglePlayback,
  });
};
