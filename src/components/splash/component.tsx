import React, { useEffect, useState } from "react";
import rubbo from "../../assets/images/rubbo.jpg";

interface SplashProps {
  message?: string;
  onFadeComplete?: () => void;
}

export const Splash: React.FC<SplashProps> = ({ message, onFadeComplete }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onFadeComplete?.();
      }, 500);
    }, 1000);

    return () => clearTimeout(timer);
  }, [onFadeComplete]);

  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 text-center p-4 transition-opacity duration-500 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="animate-bounce-slow flex flex-col sm:flex-row items-center mb-4">
        <img
          src={rubbo}
          alt="Splash screen"
          className="max-h-[150px] h-auto rounded-2xl mb-4 sm:mb-0"
        />
        <h1 className="text-4xl sm:text-8xl text-white font-bold p-2 sm:p-4 leading-tight sm:leading-loose">
          Pi-tch Perfect
        </h1>
      </div>
      {message && (
        <h2 className="text-2xl sm:text-4xl text-white font-bold animate-pulse">
          {message}
        </h2>
      )}
    </div>
  );
};
