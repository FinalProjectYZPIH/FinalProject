import React, { useState } from "react";
import { Button } from "./Buttons";
import { Link } from "react-router-dom";
import { useColorStore, useDarkLightMode } from "../context/data/dataStore";

export const HomeComponent = () => {
  const { lightMode, setDarkMode } = useDarkLightMode();
  return (
    <div
      className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${
        lightMode ? "dark" : "light"
      }`}
    >
      <div className="flex flex-col justify-evenly items-center w-2/3 lg:w-auto h-screen">
        <h1 className="text-9xl pl-44">Comet</h1>

        <p className="text-lg w-3/4">
          "Die innovative Chat-App revolutioniert die Art und Weise, wie wir
          miteinander kommunizieren. Mit einer benutzerfreundlichen Oberfläche
          und einer Vielzahl von Funktionen ermöglicht sie nahtloses chatten in
          Echtzeit. Die App unterstützt zudem multimediale Inhalte für eine
          vielfältige Kommunikation. Mit dieser neuen Chat-App wird die
          Interaktion mit Freunden, Familie und Kollegen so einfach und
          effizient wie nie zuvor."
        </p>

        <div className="flex justify-center">
          <Link to="Login">
            <Button>GO!</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
