import { FaTimes } from "react-icons/fa";
import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, Brain } from "lucide-react";
const PaperPlaneIcon = ({ className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path
      d="M21 3L3 10.5V11L11.5 13.5L14 22H14.5L21 3Z"
      strokeWidth="2"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  </svg>
);

const ChatbotUI = ({ onClose }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef(null);

  // Sample questions relevant to a blog assistant.
  const sampleQuestions = [
    "Summarize this article for me.",
    "What are the key takeaways?",
    "Suggest a related topic for my next post.",
    "Can you tell me more about the author?",
  ];

  // Auto-scroll to the bottom of the chat container when new messages arrive.
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to simulate a bot response.
  const triggerBotResponse = (currentMessages) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages([
        ...currentMessages,
        { text: "Bot is learning, it will be ready soon.", from: "bot" },
      ]);
    }, 1500); // Simulate typing delay
  };

  // Handles sending a new message from the user.
  const sendMessage = () => {
    if (message.trim() === "") return;
    const newMessages = [...messages, { text: message, from: "user" }];
    setMessages(newMessages);
    setMessage("");
    triggerBotResponse(newMessages);
  };

  // Handles clicking on a sample question.
  const handleSampleClick = (q) => {
    const newMessages = [...messages, { text: q, from: "user" }];
    setMessages(newMessages);
    triggerBotResponse(newMessages);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 z-[1000]">
      <div className="relative w-full max-w-2xl p-4 bg-white shadow-2xl dark:bg-gray-800 dark:text-white rounded-3xl">
        {/* Header */}
        <header className="flex items-center justify-between mb-4">
          <h1 className="flex items-center gap-2 text-xl font-bold text-gray-900 dark:text-white">
            <Brain size={24} className="text-blue-500" />
            Blog Assistant
          </h1>
          <button
            onClick={onClose}
            className="p-2 text-white transition-colors duration-200 bg-red-500 rounded-full hover:bg-red-600"
          >
            <FaTimes className="w-4 h-4" />
          </button>
        </header>

        {/* Chat Display */}
        <div
          ref={chatContainerRef}
          className="p-4 mb-4 space-y-4 overflow-y-auto bg-gray-100 rounded-xl dark:bg-gray-700 h-96 scroll-smooth"
        >
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500 dark:text-gray-400">
              <MessageCircle size={48} className="mb-4" />
              <p>Hello! I'm your AI Blog Assistant.</p>
              <p>I can help you with summaries, topics, and more.</p>
            </div>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`p-3 rounded-2xl max-w-xs md:max-w-md ${
                  msg.from === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-white"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center justify-start">
              <div className="p-3 bg-gray-200 rounded-2xl dark:bg-gray-600 w-fit animate-pulse">
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Assistant is typing...
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Sample Questions */}
        <section className="mb-4">
          <div className="flex flex-wrap gap-2">
            {sampleQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSampleClick(q)}
                className="px-3 py-1 text-sm text-gray-800 transition-colors duration-200 bg-gray-200 border rounded-full shadow-sm dark:bg-gray-600 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                {q}
              </button>
            ))}
          </div>
        </section>

        {/* Input + Send */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Ask the blog assistant anything..."
            className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={sendMessage}
            className="p-3 text-white transition-colors duration-200 bg-blue-600 rounded-full hover:bg-blue-500"
          >
            <PaperPlaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default ChatbotUI;
