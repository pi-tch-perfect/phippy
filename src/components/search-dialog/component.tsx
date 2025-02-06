import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useAddToQueue } from "../../api/mutations/useAddToQueue";
import { useSearchYoutube } from "../../api/mutations/useSearchYoutube";

export const SearchDialog = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [displayQuery, setDisplayQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const {
    data: results = [],
    isLoading,
    isError,
    error,
  } = useSearchYoutube(debouncedQuery);

  const { mutate: addToQueue } = useAddToQueue();

  const debouncedSetQuery = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value);
  }, 300);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900/80 via-indigo-900/80 to-blue-900/80 backdrop-blur-sm flex items-center justify-center p-8">
      <div className="bg-gray-900/90 backdrop-blur-sm rounded-2xl w-full max-w-2xl border border-white/20">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-medium text-white">Search Songs</h2>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white/90 transition-colors"
          >
            x
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="relative">
            <input
              type="text"
              value={displayQuery}
              onChange={(e) => {
                setDisplayQuery(e.target.value);
                debouncedSetQuery(e.target.value);
              }}
              className="w-full px-4 py-3 bg-gray-800/90 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent text-white placeholder-white/40"
            />
            <button
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded ${
                displayQuery.trim()
                  ? "text-purple-300 hover:text-purple-200"
                  : "text-white/30"
              }`}
              disabled={!displayQuery.trim()}
            />
          </div>

          <div className="max-h-[60vh] overflow-y-auto">
            {isLoading && debouncedQuery && (
              <div className="flex justify-center items-center py-8 text-white/60">
                loading...
              </div>
            )}

            {isError && (
              <div className="flex justify-center items-center py-8 text-red-400">
                {error?.message || "something went wrong fr"}
              </div>
            )}

            {!isLoading &&
              !isError &&
              results?.length === 0 &&
              debouncedQuery && (
                <div className="flex justify-center items-center py-8 text-white/60">
                  no results found
                </div>
              )}

            {!isError &&
              results?.map((result) => (
                <div
                  key={result.url}
                  className="p-4 bg-gray-800/80 backdrop-blur-sm rounded-xl hover:bg-gray-700/80 transition-colors cursor-pointer flex gap-4 items-center mb-3"
                  onClick={() => {
                    addToQueue({
                      yt_link: result.url,
                      name: result.title
                        .replace(/[^a-zA-Z0-9\s]/g, "")
                        .replace(/\s/g, "_"),
                    });
                    onClose();
                  }}
                >
                  <img
                    src={result.thumbnail}
                    alt={result.title}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div>
                    <p className="font-medium text-white">{result.title}</p>
                    <p className="text-sm text-white/60">{result.title}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};
