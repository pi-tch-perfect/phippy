import { Song } from "../api-types";

export enum EventType {
  QueueChange = "QueueUpdated",
  CurrentSongUpdated = "CurrentSongUpdated",
  KeyChange = "KeyChange",
  TogglePlayback = "TogglePlayback",
}

export type QueueUpdatedEvent = {
  type: EventType.QueueChange;
  queue: Song[];
};

export type CurrentSongChangeEvent = {
  type: EventType.CurrentSongUpdated;
  current_song: Song;
};

export type KeyChangeEvent = {
  type: EventType.KeyChange;
  current_key: number;
};

export type TogglePlaybackEvent = {
  type: EventType.TogglePlayback;
};

export type SSEEvent =
  | QueueUpdatedEvent
  | CurrentSongChangeEvent
  | TogglePlaybackEvent
  | KeyChangeEvent;
