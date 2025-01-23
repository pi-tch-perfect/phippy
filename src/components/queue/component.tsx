import { useMemo, useState } from "react";
import { useCurrentSong } from "../../api/queries/useCurrentSong";
import { useQueueChanges } from "../../api/sse/hooks";
import { SearchDialog } from "../search-dialog/component";
import { usePendingSongs } from "../../api/queries/usePendingSong";

export const Queue = () => {
  const queue = useQueueChanges();
  const pending = usePendingSongs();
  const { data: currentSong } = useCurrentSong();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const nextSongs = useMemo(() => {
    return [...pending, ...queue].slice(0, 10);
  }, [pending, queue]);

  return (
    <div className="flex flex-1 flex-col h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="flex flex-col flex-1 items-center justify-between w-full mx-auto px-4 sm:px-8 py-6 sm:py-12 max-w-xl">
        {!!currentSong && (
          <div className="w-full mb-6 p-4 sm:p-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10">
            <h2 className="text-base sm:text-lg font-medium mb-3">
              Now Playing
            </h2>
            <div className="flex items-center gap-4">
              <p className="text-lg sm:text-xl font-medium">
                {currentSong?.name}
              </p>
            </div>
          </div>
        )}

        <div className="w-full flex-1 flex flex-col min-h-0">
          <h3 className="text-xl sm:text-2xl font-medium mb-4 sm:mb-6">
            Up Next
          </h3>
          <div className="space-y-3 overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            {nextSongs.length > 0 ? (
              nextSongs.map((song, i) => (
                <div
                  key={song.uuid}
                  className="p-3 sm:p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-purple-200/90">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base sm:text-lg truncate">
                        {song.name}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <button
                className="p-4 bg-white/5 backdrop-blur-sm w-full rounded-xl"
                onClick={() => setIsSearchOpen(true)}
              >
                No Songs in Queue
              </button>
            )}
          </div>
        </div>

        <button
          onClick={() => setIsSearchOpen(true)}
          className="px-4 bg-white w-full py-4 hover:bg-white/20 rounded-lg transition-colors text-black"
        >
          Add to Queue
        </button>
      </div>

      <SearchDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
};
