import { FormattedSong } from "../../api/api-types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useAuth } from "../../api/queries/useAuth";

function SongItem({ i, song }: { i: number; song: FormattedSong }) {
  const { isAuthenticated } = useAuth();
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: song.uuid, disabled: !isAuthenticated });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const handleStyle = {
    touchAction: "none",
    userSelect: "none" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-3 sm:p-4 bg-black/20 backdrop-blur-sm rounded-lg border border-white/10 hover:bg-black/30 transition-colors pointer-events-none ${
        song.status === "InProgress" ? "bg-gray-700/50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        {song.status === "InProgress" && (
          <div className="animate-spin h-4 w-4 border-2 border-purple-200/90 rounded-full border-t-transparent" />
        )}
        <span className="text-sm text-purple-200/90">#{i + 1}</span>
        <div className="flex-1 min-w-0">
          <p
            className={`text-base sm:text-lg truncate text-white user-select-none ${
              song.status === "InProgress" ? "text-white/50" : ""
            }`}
          >
            {song.formattedName} adsfasdfasdfsadfadsfasdfadsfasd
          </p>
        </div>
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
        {isAuthenticated && (
          <svg
            style={handleStyle}
            className="w-4 h-4 text-purple-200/50 flex-shrink-0 cursor-grab active:cursor-grabbing pointer-events-auto"
            fill="currentColor"
            viewBox="0 0 24 24"
            {...attributes}
            {...listeners}
          >
            <path
              d="M4 6h16M4 12h16M4 18h16"
              strokeWidth="2"
              stroke="currentColor"
              strokeLinecap="round"
            />
          </svg>
        )}
      </div>
    </div>
  );
}

export default SongItem;
