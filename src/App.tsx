import { useState } from "react";
import { useEventSource } from "./api/sse/useEventSource";
import { ErrorScreen } from "./components/error/component";
import { Queue } from "./components/queue/component";
import { Splash } from "./components/splash/component";

export const App = () => {
  const { error } = useEventSource();
  const [showSplash, setShowSplash] = useState(true);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div className="flex flex-col w-full h-[100dvh] bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900">
      {showSplash && <Splash onFadeComplete={() => setShowSplash(false)} />}
      <div className={`flex-1 ${showSplash ? "hidden" : ""}`}>
        <Queue />
      </div>
    </div>
  );
};

export default App;
