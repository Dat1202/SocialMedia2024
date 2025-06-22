import React from "react";

const TypingIndicator = ({ }) => {
  return (
    <div className="flex items-start space-x-3 px-4 py-2 animate-fade-in">
      <div
        className={`w-8 h-8 bg-gradient-to-r rounded-full flex items-center justify-center text-white text-sm`}
      >
      
      </div>
      <div className="bg-gray-200 rounded-2xl rounded-tl-md px-4 py-3">
        <div className="flex space-x-1">
          <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;