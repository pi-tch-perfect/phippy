import { Song } from "../../api/api-types";
function SongItem({ i, song }: { i: number; song: Song }) {
  return (
    <div
      key={song.uuid}
      className="p-3 sm:p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/30 transition-colors"
    >
      <div className="flex items-center gap-3">
        <span className="text-sm text-purple-200/90">#{i + 1}</span>
        <div className="flex-1 min-w-0">
          <p className="text-base sm:text-lg truncate text-white">
            {song.name}
          </p>
        </div>
        {song.status === "InProgress" && (
          <div className="animate-spin h-4 w-4 border-2 border-purple-200/90 rounded-full border-t-transparent" />
        )}
        {song.status === "Failed" && (
          <div className="text-red-400 flex items-center gap-2">
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <span className="text-sm">Download Failed</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default SongItem;
