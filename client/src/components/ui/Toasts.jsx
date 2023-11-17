import toast from "react-hot-toast";
import { useColorStore } from "../../context/data/dataStore";

export const Toast = ({ children }) => {

    return (

        <div className={`font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl  p-8 text-center`}>{children}</div>)

}

export const ColorToast = ({ children }) => {
    const { colorPosition, setColorPosition, setSpecificColor, color } =
        useColorStore();
    return (

        <div className={`${color}font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl  p-8 text-center`}>{children}</div>)

}