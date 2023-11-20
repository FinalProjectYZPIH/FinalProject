import { useDarkLightMode } from "../../context/data/dataStore";
import { useColorStore } from "../../context/data/dataStore";
import { ThemeColors } from "../../context/data/data";
import { Button } from "./Buttons";


export const ColorTheme = () => {

    const { colorPosition, setColorPosition, setSpecificColor, color } =
        useColorStore();

    return (
        <div className="">
        
        <button
                className={`${color} rounded-lg p-1 `}
                onClick={() => setColorPosition()}
            >
                color
            </button>


        </div >
    )
}