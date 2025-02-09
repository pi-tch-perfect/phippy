import { useMemo, useState } from "react";
import { useCurrentSong } from "../../api/queries/useCurrentSong";
import { useQueueChanges } from "../../api/sse/hooks";
import NowPlaying from "../now-playing/component";
import { SearchDialog } from "../search-dialog/component";
import SongItem from "../song/component";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  TouchSensor,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useAuth } from "../../api/queries/useAuth";
import { useReposition } from "../../api/mutations/useReposition";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";

export const Queue = () => {
  const { mutate: reposition } = useReposition();
  const queue = useQueueChanges();
  const currentSong = useCurrentSong();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { isAuthenticated } = useAuth();
  const nextSongs = useMemo(() => {
    return [...queue].slice(1, 100);
  }, [queue]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    console.log("drag end", event);
    const { active, over } = event;
    const newIndex = over?.data.current?.sortable.index;
    const uuid = active.id.toString();

    if (active.id !== over?.id && isAuthenticated) {
      reposition({ position: newIndex + 1, song_uuid: uuid });
    }
  };

  return (
    <div className="flex flex-1 max-h-full flex-col h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-white">
      <div className="flex max-h-full flex-col flex-1 items-center justify-between w-full mx-auto px-4 sm:px-8 py-6 sm:py-12 max-w-xl">
        {!!currentSong && currentSong.name && (
          <NowPlaying currentSong={currentSong} />
        )}

        <div className="w-full flex-1 flex flex-col min-h-0">
          <div className="space-y-3 overflow-y-auto overflow-x-hidden flex-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent pointer-events-auto">
            {nextSongs.length > 0 ? (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={nextSongs.map((song) => song.uuid)}
                  strategy={verticalListSortingStrategy}
                >
                  {nextSongs.map((song, i) => (
                    <SongItem key={song.uuid} i={i} song={song} />
                  ))}
                </SortableContext>
              </DndContext>
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
