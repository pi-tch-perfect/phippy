import { formatSong } from "../../utils/format";
import axiosClient from "../axios";
import { useQueue } from "./useQueue";

export function useCurrentSong() {
  const { data: queue } = useQueue();
  console.log(queue);

  return queue?.at(0);
}
