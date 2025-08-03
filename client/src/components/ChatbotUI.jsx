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

  // API Configuration
  const API_BASE_URL = "https://social-blogging-api.onrender.com";

  // Sample questions relevant to a blog assistant
  const sampleQuestions = [
    "Write a blog about artificial intelligence",
    "Create content about sustainable living",
    "Generate a post about digital marketing trends",
    "Write about healthy lifestyle tips",
  ];

  // Auto-scroll to the bottom of the chat container when new messages arrive
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Function to call your API and get a bot response
  const triggerBotResponse = async (currentMessages, userMessage) => {
    setIsTyping(true);
    
    try {
      // Make API call to your deployed backend
      const response = await fetch(`${API_BASE_URL}/api/generate-blog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topic: userMessage
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Format the response nicely
      const formattedResponse = formatBlogResponse(data);
      
      setIsTyping(false);
      setMessages([
        ...currentMessages,
        { text: formattedResponse, from: "bot", isHtml: true },
      ]);
    } catch (error) {
      console.error('API Error:', error);
      setIsTyping(false);
      
      let errorMessage = "Sorry, I'm having trouble connecting to the blog generator. ";
      
      if (error.message.includes('429')) {
        errorMessage += "Rate limit exceeded. Please try again in a minute.";
      } else if (error.message.includes('500')) {
        errorMessage += "There's an issue with the blog generation service.";
      } else if (error.message.includes('Failed to fetch')) {
        errorMessage += "Please check your internet connection.";
      } else {
        errorMessage += "Please try again later.";
      }
      
      setMessages([
        ...currentMessages,
        { text: errorMessage, from: "bot" },
      ]);
    }
  };

  // Function to format the API response nicely
  const formatBlogResponse = (data) => {
    const { title, content, meta_description, hashtags, social_media_posts } = data;
    
    return `
      <div class="blog-response">
        <h3 style="color: #1e40af; margin-bottom: 12px; font-weight: bold; font-size: 18px;">${title}</h3>
        
        <div style="margin-bottom: 16px;">
          <strong style="color: #374151;">📝 Blog Content:</strong><br/>
          <div style="margin-top: 6px; line-height: 1.6;">${content}</div>
        </div>
        
        <div style="margin-bottom: 16px;">
          <strong style="color: #374151;">🎯 Meta Description:</strong><br/>
          <em style="color: #6b7280; margin-top: 4px; display: block;">${meta_description}</em>
        </div>
        
        ${social_media_posts && Object.keys(social_media_posts).length > 0 ? `
          <div style="margin-bottom: 16px;">
            <strong style="color: #374151;">📱 Social Media Posts:</strong><br/>
            ${Object.entries(social_media_posts).map(([platform, post]) => `
              <div style="margin-top: 8px; padding: 8px; background: #f3f4f6; border-radius: 6px; border-left: 3px solid #3b82f6;">
                <strong style="color: #1e40af; text-transform: capitalize;">${platform}:</strong><br/>
                <span style="font-size: 14px; line-height: 1.4;">${post}</span>
              </div>
            `).join('')}
          </div>
        ` : ''}
        
        ${hashtags && hashtags.length > 0 ? `
          <div style="margin-top: 12px;">
            <strong style="color: #374151;">🏷️ Hashtags:</strong><br/>
            <div style="margin-top: 6px;">
              ${hashtags.map(tag => `<span style="background: #dbeafe; color: #1e40af; padding: 4px 8px; border-radius: 12px; margin-right: 6px; margin-bottom: 4px; font-size: 12px; display: inline-block;">#${tag}</span>`).join('')}
            </div>
          </div>
        ` : ''}
      </div>
    `;
  };

  // Handles sending a new message from the user
  const sendMessage = () => {
    if (message.trim() === "") return;
    const userMessage = message.trim();
    const newMessages = [...messages, { text: userMessage, from: "user" }];
    setMessages(newMessages);
    setMessage("");
    triggerBotResponse(newMessages, userMessage);
  };

  // Handles clicking on a sample question
  const handleSampleClick = (q) => {
    const newMessages = [...messages, { text: q, from: "user" }];
    setMessages(newMessages);
    triggerBotResponse(newMessages, q);
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
              <p>Tell me a topic and I'll generate a complete blog post for you!</p>
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
                {msg.isHtml ? (
                  <div dangerouslySetInnerHTML={{ __html: msg.text }} />
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-center justify-start">
              <div className="p-3 bg-gray-200 rounded-2xl dark:bg-gray-600 w-fit animate-pulse">
                <span className="text-sm text-gray-600 dark:text-gray-200">
                  Generating your blog post...
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
                disabled={isTyping}
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
              if (e.key === "Enter" && !isTyping) {
                sendMessage();
              }
            }}
            placeholder="Enter a blog topic (e.g., 'AI in healthcare')..."
            className="flex-1 px-4 py-3 text-sm text-gray-900 placeholder-gray-500 transition-colors duration-200 border border-gray-300 rounded-full dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isTyping}
          />
          <button
            onClick={sendMessage}
            disabled={isTyping}
            className="p-3 text-white transition-colors duration-200 bg-blue-600 rounded-full hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <PaperPlaneIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotUI;