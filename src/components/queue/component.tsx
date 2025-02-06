import { useMemo, useState } from "react";
import { useCurrentSong } from "../../api/queries/useCurrentSong";
import { useQueueChanges } from "../../api/sse/hooks";
import NowPlaying from "../now-playing/component";
import { SearchDialog } from "../search-dialog/component";
import SongItem from "../song/component";

export const Queue = () => {
  const queue = useQueueChanges();
  const { data: currentSong } = useCurrentSong();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const nextSongs = useMemo(() => {
    return [...queue].slice(0, 100);
  }, [queue]);

  return (
    <div className="flex flex-1 max-h-full flex-col h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="flex max-h-full flex-col flex-1 items-center justify-between w-full mx-auto px-4 sm:px-8 py-6 sm:py-12 max-w-xl">
        {!!currentSong && currentSong.name && (
          <NowPlaying currentSong={currentSong} />
        )}

        <div className="w-full flex-1 flex flex-col min-h-0">
          <div className="space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {nextSongs.length > 0 ? (
              nextSongs.map((song, i) => (
                <SongItem key={song.uuid} i={i} song={song} />
              ))
            ) : (
              <button
                className="p-4 bg-white/5 backdrop-blur-sm w-full rounded-xl text-white"
                onClick={() => setIsSearchOpen(true)}
              >
                No Songs in Queue
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="px-4 mt-4 bg-white w-full py-4 hover:bg-white/20 rounded-lg transition-colors text-black"
        >
          Search for Songs
        </button>
      </div>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
