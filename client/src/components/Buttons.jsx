import React from "react";

export const Button = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
        {children}
      </button>
    </div>
  );
};

export const MediaButtons = ({ children }) => {
  return (
    <div className="flex items-center justify-center">
      <button className="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
        {children}
      </button>
    </div>
  );
};
