import { useState } from "react";
import { useCurrentSong } from "../../api/queries/useCurrentSong";
import { useQueueChanges } from "../../api/sse/hooks";
import { SearchDialog } from "../search-dialog/component";

export const Queue = () => {
  const queue = useQueueChanges();
  const { data: currentSong } = useCurrentSong();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const nextSongs = queue?.slice(0, 10) || [];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white p-8">
      <div className="max-w-2xl flex-1">
        {!!currentSong && (
          <div className="mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-2xl">
            <h2 className="text-lg font-medium mb-4">Now Playing</h2>
            <div className="flex items-center gap-4">
              <p className="text-xl font-medium">{currentSong?.name}</p>
            </div>
          </div>
        )}

        <div className="mb-6 flex-1">
          <h3 className="text-2xl font-medium mb-6">Up Next</h3>
          <div className="space-y-4">
            {nextSongs.length > 0 ? (
              nextSongs.map((song, i) => (
                <div
                  key={song.uuid}
                  className="p-4 bg-white/5 backdrop-blur-sm rounded-xl hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-purple-300">#{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-lg truncate">{song.name}</p>
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
      </div>
      <div className="flex justify-between items-center">
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
