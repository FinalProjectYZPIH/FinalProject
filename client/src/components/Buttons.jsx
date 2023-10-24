
export const Button = ({ children , ...props}) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 font-semibold hover:text-white hover:bg-opacity-1 p-4 border border-cyan-400 hover:border-transparent rounded m-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300">
        {children}
      </button>
    </div>
  );
};


export const MediaButtons = ({ children , window}) => {
  return (
    <div className="flex items-center justify-center">
      <button onClick={window} className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        {children}
      </button>
    </div>
  );
};
