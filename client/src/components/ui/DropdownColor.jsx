
import React, { useState } from 'react';
import { useColorStore, useDarkLightMode } from '../../context/data/dataStore';
import { ColorButton } from '../ui/Buttons';

const ThemeColors = [
    "border border-rose-600 text-rose-700",
    "border border-green-500 text-green-900",
    "border border-cyan-400 text-cyan-800",
    "border border-yellow-400 text-yellow-800",
    "border border-fuchsia-400 text-fuchsia-800",
    "border border-pink-400 text-pink-600"
];


function DropdownColor() {
    const [isOpen, setIsOpen] = useState(false);


    const handleColorClick = (index) => {
        console.log(index)
        setSpecificColor(index);
        setIsOpen(false);
    };
    const { colorPosition, setColorPosition, setSpecificColor, color } =
        useColorStore();
    const { lightMode, setDarkMode } = useDarkLightMode();

    return (
        <div className=''>

            <button
                onClick={() => setIsOpen((prev) => !prev)}
                className={`${lightMode ? "dark bg-none" : "light bg-none"} border  flex items-center justify-between font-orbitron rounded-lg ${color} `}
            >
                Color
            </button>




            {isOpen && (
                <div className='absolute flex  '>
                    {ThemeColors.map((color, index) => (
                        <button
                            key={index}
                            onClick={() => handleColorClick(index)}
                            className={`mx-3 h-4 w-4 rounded-full m-1 cursor-pointer ${color}`}
                        >

                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

export default DropdownColor;

