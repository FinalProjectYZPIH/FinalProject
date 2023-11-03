import React from "react";
import { useDarkLightMode } from "../context/data/dataStore.jsx";

export const LogoutComponent = () => {
  const { lightMode, setDarkMode } = useDarkLightMode();
  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark" : "light"
      }`}
    >
      <div className="flex justify-center items-center text-xl flex-col bg-cover h-screen ">
        Sie sind erfolgreich abgemeldet.
      </div>
    </div>
  );
};
