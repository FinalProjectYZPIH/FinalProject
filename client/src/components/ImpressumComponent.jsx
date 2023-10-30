import React from 'react';
import { Button } from './Buttons';
// import { Inputs } from './Inputs';
import { useDarkLightMode } from '../context/data/dataStore';
import { Link } from "react-router-dom";

// import '../index.css';

export const ImpressumComponent = () => {
    const { lightMode, setDarkMode } = useDarkLightMode();
    return (
        <div
            className={`font-orbitron grid grid-cols-1 lg:grid-cols-2 w-screen h-screen sm:bg-cover sm:bg-center bg-no-repeat lg:bg-contain lg:bg-right ${lightMode ? "dark" : "light"
                }`}
        >

            <div className='flex items-center justify-center bg-cover  h-screen'  >
                <div className="flex flex-col justify-evenly items-center w-2/3 lg:w-auto h-screen">
                    <div className=" m-10 h-screen-sm w-screen-sm bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-25">
                        <h1 className="text-4xl text-blue-600 text-center mb-6">Impressum</h1>

                        {/* <div className="flex justify-center">
                            <Link to="/">
                            <Button>Exit!</Button>
                            </Link>
                        </div> */}

                    </div>
                </div>
            </div>

        </div>
    )
}
