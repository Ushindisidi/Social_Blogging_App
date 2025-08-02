import React, { useState } from "react";
import { FaRobot } from "react-icons/fa";
import ChatbotUI from "./ChatbotUI";
const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBot = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-5 right-5 z-[1000]">
      <button
        className="flex items-center justify-center text-white transition bg-blue-600 rounded-full shadow-lg hover:scale-105 dark:bg-blue-500 w-14 h-14 sm:w-12 sm:h-12 md:w-16 md:h-16"
        onClick={toggleBot}
      >
        <FaRobot className="text-3xl text-white md:text-4xl" />
      </button>
      {isOpen && <ChatbotUI onClose={toggleBot} />}
    </div>
  );
};

export default ChatbotSection;
