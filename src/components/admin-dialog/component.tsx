import { useEffect, useState } from "react";
import { BsSkipForwardFill } from "react-icons/bs";
import { PiPlayPauseBold } from "react-icons/pi";
import { TbMinus, TbPlus } from "react-icons/tb";
import { useSkip, useTogglePlayback } from "../../api/mutations/useControls";
import { useKeyDown, useKeyUp } from "../../api/mutations/usePitch";
import { useKey } from "../../api/queries/useKey";

const AUTH_KEY = "admin_authentication";
const AUTH_EXPIRY = 30 * 60 * 1000; // 30 minutes in milliseconds
const PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

export const AdminDialog = ({ className }: { className?: string }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const { mutate: skip } = useSkip();
  const { mutate: togglePlayback } = useTogglePlayback();
  const { mutate: keyUp } = useKeyUp();
  const { mutate: keyDown } = useKeyDown();
  const key = useKey();

  useEffect(() => {
    const storedAuth = localStorage.getItem(AUTH_KEY);
    if (storedAuth) {
      const { isAuthenticated, timestamp } = JSON.parse(storedAuth);
      if (isAuthenticated && Date.now() - timestamp < AUTH_EXPIRY) {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === PASSWORD) {
      setIsAuthenticated(true);
      setError(false);
      localStorage.setItem(
        AUTH_KEY,
        JSON.stringify({ isAuthenticated: true, timestamp: Date.now() })
      );
    } else {
      setError(true);
    }
  };

  return (
    <div
      className={`relative w-full sm:w-80 bg-slate-800 shadow-xl flex h-auto flex-col max-h-screen overflow-y-auto ${
        className || ""
      }`}
    >
      <div className="overflow-hidden flex flex-col">
        {!isAuthenticated ? (
          <div className="flex-1 flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-xs space-y-8 px-4">
              <div className="text-center space-y-2">
                <h3 className="text-lg font-medium text-white">
                  Authentication Required
                </h3>
                <p className="text-white/60 text-xs">
                  Enter the admin password to continue
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-4"
                autoComplete="off"
              >
                <div>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    className={`w-full px-3 py-2 bg-black/20 border ${
                      error ? "border-red-500/50" : "border-white/10"
                    } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-slate-400/50 placeholder-white/30 text-center text-base tracking-wider`}
                    placeholder="••••"
                    autoComplete="off"
                    autoCorrect="off"
                    maxLength={20}
                  />
                  {error && (
                    <p className="mt-1 text-xs text-center text-red-400">
                      Wrong Password
                    </p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full px-3 py-2 bg-white/10 active:bg-white/20 text-white rounded-lg transition-colors font-medium"
                >
                  Unlock
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="overflow-y-auto flex">
            <div className="w-full px-4">
              <div className="rounded-xl py-4">
                <div className="flex items-center justify-center">
                  {/* key controls */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => keyDown()}
                      className="group flex flex-col items-center"
                    >
                      <div className="p-3 bg-black/20 text-white/80 rounded-lg transition-all duration-200 group-active:scale-95">
                        <TbMinus className="text-2xl" />
                      </div>
                    </button>

                    <div className="mt-5 flex flex-col items-center">
                      <div className="flex flex-col items-center">
                        <div className="p-3 w-12 h-12 bg-black/20 flex flex-col items-center justify-center text-white/80 rounded-lg transition-all duration-200 group-active:scale-95">
                          <span className="text-2xl text-center font-bold tracking-wider">
                            {key}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs mt-1 text-white/30 text-center font-extralight tracking-wider">
                        key
                      </span>
                    </div>

                    <button
                      onClick={() => keyUp()}
                      className="group flex flex-col items-center"
                    >
                      <div className="p-3 bg-black/20 text-white/80 rounded-lg transition-all duration-200 group-active:scale-95">
                        <TbPlus className="text-2xl" />
                      </div>
                    </button>
                  </div>

                  {/* vertical divider */}
                  <div className="mx-6 h-20 w-px bg-white/10" />

                  {/* playback controls */}
                  <div className="flex items-center gap-6">
                    <button className="group flex flex-col items-center">
                      <div
                        onClick={() => togglePlayback()}
                        className="p-3 bg-black/20 text-white/80 rounded-lg transition-all duration-200 group-active:scale-95"
                      >
                        <PiPlayPauseBold className="text-2xl" />
                      </div>
                    </button>

                    <button
                      onClick={() => skip()}
                      className="group flex flex-col items-center"
                    >
                      <div className="p-3 bg-black/20 text-white/80 rounded-lg transition-all duration-200 group-active:scale-95">
                        <BsSkipForwardFill className="text-2xl" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
