import React from "react";

export const Button = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center bg-transparent hover:border-y-teal-400 hover:bg-cyan-400 text-sky-400 font-semibold hover:text-white hover:bg-opacity-1 py-2 px-4 border border-cyan-400 hover:border-transparent rounded m-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300">
        {children}
      </button>
    </div>
  );
};

export const MediaButtons = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <button className="m-2  flex items-center bg-transparent  bg-opacity-60 border border-cyan-400 rounded-lg shadow-md text-sm font-medium text-gray-800 hover:bg-cyan-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-300">
        {children}
      </button>
    </div>
  );
};
