import toast from "react-hot-toast";

export const Toast = ({ children }) => {
    return (
        <div className="font-orbitron ring-2 flex justify-center items-center  border border-cyan-400 rounded-lg m-6 h-10 w-30 text-2xl text-cyan-300 p-8 text-center">{children}</div>)

}

