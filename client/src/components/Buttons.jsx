export const Button = ({ children, ...props }) => {
  return (
    <div className="flex items-center justify-center">
      <button {...props} className="flex items-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 font-semibold hover:text-white hover:bg-opacity-1 p-4 border border-cyan-400 hover:border-transparent rounded m-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300">

        {children}
      </button>
    </div>
  );
};


export const MediaButtons = ({ children, window }) => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={window} className="m-2 p-2 flex items-center bg-transparent  bg-opacity-60 border border-cyan-400 rounded-lg shadow-md text-sm font-medium text-gray-800 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300">
        {children}
      </button>
    </div>
  );
};

