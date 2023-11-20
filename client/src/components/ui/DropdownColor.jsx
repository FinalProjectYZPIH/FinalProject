import React, { useState } from "react";
import { useColorStore, useDarkLightMode } from "../../context/data/dataStore";
import { Button, ColorButton } from "../ui/Buttons";

const ThemeColors = [
  "border border-rose-600 text-rose-700",
  "border border-green-500 text-green-900",
  "border border-cyan-400 text-cyan-800",
  "border border-yellow-400 text-yellow-800",
  "border border-fuchsia-400 text-fuchsia-800",
  "border border-pink-400 text-pink-600",
];

function DropdownColor() {
  const [isOpen, setIsOpen] = useState(false);

  const handleColorClick = (index) => {
    console.log(index);
    setSpecificColor(index);
    setIsOpen(false);
  };
  const { colorPosition, setColorPosition, setSpecificColor, color } =
    useColorStore();
  const { lightMode, setDarkMode } = useDarkLightMode();

  return (
    <div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 hover:border-transparent w-20 rounded-lg h-8 mr-2`}
      >
        Color
      </button>

      {isOpen && (
        <div className="flex fixed top-8 right-1 ">
          {ThemeColors.map((color, index) => (
            <button
              key={index}
              onClick={() => handleColorClick(index)}
              className={`mx-3 h-4 w-4 rounded-full m-1 cursor-pointer ${color}`}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default DropdownColor;
