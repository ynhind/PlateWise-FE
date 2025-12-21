import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { parse } from "@/features/parser";

interface ChatboxPPLProps {
  isOpen: boolean;
  onClose: () => void;
}

const ChatboxPPL = ({ isOpen, onClose }: ChatboxPPLProps) => {
  const [inputValue, setInputValue] = useState("");
  const { messages, isProcessing, sendAST } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userInput = inputValue.trim();
    setInputValue("");

    try {
      // Parse the input using Member A's Parser
      const ast = parse(userInput);

      // Execute via Member B's Interpreter
      await sendAST(ast);
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const exampleCommands = [
    "🔍 find recipes with chicken and rice",
    "📊 show my calories today",
    "🍽️ suggest a low-calorie dinner",
    "📝 log breakfast: oatmeal 300 calories",
    "⚖️ is my diet balanced?",
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-24 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden animate-slideUp">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="font-bold text-lg">PlateWise AI</h3>
            <p className="text-xs text-white/90">Your Nutrition Assistant</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 hover:bg-white/20 rounded-lg flex items-center justify-center transition-colors"
          aria-label="Close chatbox"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center px-4">
            <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-4xl">💬</span>
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Start a Conversation
            </h4>
            <p className="text-sm text-gray-600 mb-6">
              Ask me about recipes, nutrition, or meal planning!
            </p>
            <div className="w-full space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Try these examples:
              </p>
              {exampleCommands.map((cmd, idx) => (
                <button
                  key={idx}
                  onClick={() => setInputValue(cmd.replace(/^[^\s]+\s/, ""))}
                  className="w-full text-left text-xs bg-white hover:bg-green-50 text-gray-700 hover:text-green-700 px-3 py-2 rounded-lg border border-gray-200 hover:border-green-300 transition-all"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex flex-col ${
                  message.role === "user" ? "items-end" : "items-start"
                }`}
              >
                {/* Text Message */}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-br-sm"
                      : "bg-gray-100 text-gray-900 rounded-bl-sm shadow-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap break-words">
                    {message.content}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      message.role === "user"
                        ? "text-white/70"
                        : "text-gray-500"
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>

                {/* Recipe Cards (if bot message has data) */}
                {message.role === "bot" &&
                  message.data &&
                  Array.isArray(message.data) &&
                  message.data.length > 0 && (
                    <div className="w-full mt-2 space-y-2 max-h-96 overflow-y-auto">
                      {message.data.slice(0, 6).map((recipe: any) => (
                        <div
                          key={recipe.id}
                          className="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => {
                            // TODO: Open recipe detail modal
                            console.log("Recipe clicked:", recipe);
                          }}
                        >
                          <div className="flex gap-3">
                            {/* Recipe Image */}
                            {recipe.image && (
                              <img
                                src={recipe.image}
                                alt={recipe.title}
                                className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                              />
                            )}

                            {/* Recipe Info */}
                            <div className="flex-1 min-w-0">
                              <h5 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-1">
                                {recipe.title}
                              </h5>

                              {/* Ingredient Match Info */}
                              {recipe.usedIngredientCount !== undefined && (
                                <div className="flex items-center gap-2 text-xs">
                                  <span className="text-green-600 font-medium">
                                    ✓ {recipe.usedIngredientCount} matched
                                  </span>
                                  {recipe.missedIngredientCount > 0 && (
                                    <span className="text-orange-600">
                                      +{recipe.missedIngredientCount} missing
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Likes */}
                              {recipe.likes !== undefined && (
                                <div className="text-xs text-gray-500 mt-1">
                                  ❤️ {recipe.likes} likes
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}

                      {message.data.length > 6 && (
                        <p className="text-xs text-center text-gray-500 py-2">
                          + {message.data.length - 6} more recipes (view in
                          Recipe Finder)
                        </p>
                      )}
                    </div>
                  )}
              </div>
            ))}
            {isProcessing && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce delay-200"></div>
                    </div>
                    <span className="text-xs text-gray-500">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 bg-white p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about food..."
            disabled={isProcessing}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent disabled:bg-gray-50 disabled:text-gray-500 text-sm"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isProcessing}
            className="px-5 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg"
            aria-label="Send message"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              />
            </svg>
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          Powered by PlateWise AI
        </p>
      </div>
    </div>
  );
};

export default ChatboxPPL;
