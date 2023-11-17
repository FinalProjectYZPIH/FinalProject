import { useColorStore } from "../../context/data/dataStore";


export const Button = ({ children, ...props }) => {

  return (
    <div className="flex items-center justify-center">
      <button
        {...props}
        className={`flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 border border-cyan-400 hover:border-transparent rounded-lg w-2/5 h-10 p-2 m-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-30`}
      >
        {children}
      </button>
    </div>
  );
};

export const ColorButton =  ({ children, ...props }) => {
  const { colorPosition, setColorPosition, setSpecificColor, color } =
  useColorStore();
  return (
    <div className="flex items-center justify-center">
      <button
        {...props}
        className={`flex items-center justify-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 hover:text-white hover:bg-opacity-1 border border-cyan-400 hover:border-transparent rounded-lg w-2/5 h-10 p-2 m-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-30 ${color}`}
      >
        {children}
      </button>
    </div>
  );
};

export const MediaButtons = ({ children, window }) => {
  return (
    <div className="flex items-center justify-center">
      <button
        onClick={window}
        className="flex items-center border border-cyan-400  hover:bg-cyan-400 rounded-lg shadow-md w-4/6 h-10 p-2 m-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
      >
        {children}
      </button>
    </div>
  );
};
