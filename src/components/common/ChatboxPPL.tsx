import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { parse } from "@/features/parser";

interface ChatboxPPLProps {
  isOpen: boolean;
  onClose: () => void;
  onRecipeClick?: (recipeId: number) => void;
  selectedRecipe?: any;
}

const ChatboxPPL = ({
  isOpen,
  onClose,
  onRecipeClick,
  selectedRecipe,
}: ChatboxPPLProps) => {
  const [inputValue, setInputValue] = useState("");
  const [isMinimized, setIsMinimized] = useState(false);
  const { messages, isProcessing, sendAST } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Auto-focus input when chatbox opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessing) return;

    const userInput = inputValue.trim();
    setInputValue("");

    try {
      const ast = parse(userInput);
      await sendAST(ast, { currentRecipe: selectedRecipe });
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
    {
      text: "Find recipes with chicken",
      color: "from-blue-500 to-cyan-500",
    },
    {
      text: "Show my calories today",
      color: "from-purple-500 to-pink-500",
    },
    {
      text: "Suggest healthy dinner",
      color: "from-green-500 to-emerald-500",
    },
    {
      text: "Log breakfast 300 cal",
      color: "from-orange-500 to-amber-500",
    },
  ];

  if (!isOpen) return null;

  return (
    <>
      {!isMinimized && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 animate-fadeIn"
          onClick={onClose}
        />
      )}

      {/* Chatbox - with minimize animation */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isMinimized
            ? "bottom-6 right-6 w-16 h-16 rounded-full animate-slideDown"
            : "bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-8rem)] rounded-3xl animate-slideUp"
        } flex flex-col bg-white shadow-2xl overflow-hidden border border-gray-100`}
      >
        {/* Minimized State - Icon Only */}
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center group relative"
            aria-label="Open AI Assistant"
          >
            <span className="text-3xl">🤖</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full animate-pulse" />

            <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                🤖 Ask me about recipes & nutrition!
              </div>
            </div>
          </button>
        ) : (
          <>
            {/* Modern Header with glass effect */}
            <div className="relative bg-linear-to-r from-green-50 to-emerald-50 border-b border-gray-100 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Avatar with animated gradient ring */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-linear-to-r from-green-400 to-emerald-500 rounded-2xl blur-md animate-pulse-slow"></div>
                    <div className="relative w-11 h-11 bg-linear-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">
                      PlateWise AI
                    </h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">
                        Always here to help
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-9 h-9 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all group"
                    aria-label="Minimize chatbox"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M20 12H4"
                      />
                    </svg>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all group hover:rotate-90 duration-300"
                    aria-label="Close chatbox"
                  >
                    <svg
                      className="w-5 h-5 text-gray-400 group-hover:text-gray-600"
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
              </div>

              {/* Selected Recipe Pill with animation */}
              {selectedRecipe && (
                <div className="mt-3 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-200 flex items-center gap-2 animate-slideDown shadow-sm">
                  <div className="relative">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <div className="absolute inset-0 w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <p className="text-xs text-green-700 font-medium truncate flex-1">
                    {selectedRecipe.title}
                  </p>
                  <span className="text-xs text-green-600 font-semibold px-2 py-0.5 bg-green-100 rounded-md">
                    Active
                  </span>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
              style={{
                backgroundImage: `
              radial-gradient(circle at 1px 1px, rgb(229 231 235 / 0.4) 1px, transparent 0),
              linear-gradient(to bottom, transparent, rgb(249 250 251 / 0.3))
            `,
                backgroundSize: "24px 24px, 100% 100%",
              }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  {/* Enhanced empty state */}
                  <div className="relative mb-4 animate-float">
                    <div className="absolute inset-0 bg-linear-to-r from-green-200 via-emerald-200 to-cyan-200 rounded-2xl blur-xl opacity-40 animate-pulse-slow"></div>
                    <div className="relative w-24 h-24 bg-linear-to-r from-green-100 via-emerald-100 to-cyan-50 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg
                        className="w-20 h-20 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-900 text-base mb-1.5">
                    How can I help you today?
                  </h4>
                  <p className="text-xs text-gray-500 mb-5 max-w-xs leading-relaxed">
                    Ask about recipes, nutrition, or meal planning
                  </p>

                  {/* Enhanced command pills with gradients */}
                  <div className="w-full flex flex-col items-center space-y-1.5">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 text-center">
                      Try asking
                    </p>
                    {exampleCommands.map((cmd, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInputValue(cmd.text)}
                        style={{ animationDelay: `${idx * 100}ms` }}
                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-gray-50/80 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all group animate-slideRight"
                      >
                        <span className="text-sm">{cmd.icon}</span>
                        <span className="text-xs text-gray-600 group-hover:text-green-700 font-medium">
                          {cmd.text}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  {messages.map((message, idx) => (
                    <div
                      key={message.id}
                      style={{ animationDelay: `${idx * 50}ms` }}
                      className={`flex animate-fadeIn ${
                        message.role === "user"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      <div
                        className={`flex gap-2.5 max-w-[85%] ${
                          message.role === "user"
                            ? "flex-row-reverse"
                            : "flex-row"
                        }`}
                      >
                        {/* Avatar with status */}
                        {message.role === "bot" && (
                          <div className="relative">
                            <div className="w-8 h-8 rounded-xl bg-linear-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                              <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                                />
                              </svg>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                        )}

                        <div className="flex flex-col gap-1.5">
                          {/* Message bubble with enhanced shadow */}
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-linear-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/40"
                                : "bg-white text-gray-900 shadow-lg border border-gray-100"
                            } ${
                              message.role === "user"
                                ? "rounded-tr-md"
                                : "rounded-tl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                              {message.content}
                            </p>
                          </div>

                          {/* Timestamp with better styling */}
                          <p
                            className={`text-xs text-gray-400 px-1 font-medium ${
                              message.role === "user"
                                ? "text-right"
                                : "text-left"
                            }`}
                          >
                            {new Date(message.timestamp).toLocaleTimeString(
                              [],
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>

                          {/* Enhanced Recipe Cards */}
                          {message.role === "bot" &&
                            message.data &&
                            Array.isArray(message.data) &&
                            message.data.length > 0 && (
                              <div className="mt-2 space-y-2.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                                {message.data
                                  .slice(0, 6)
                                  .map((recipe: any, recipeIdx: number) => (
                                    <div
                                      key={recipe.id}
                                      style={{
                                        animationDelay: `${recipeIdx * 100}ms`,
                                      }}
                                      className="bg-white border border-gray-200 rounded-xl p-3.5 hover:shadow-xl hover:border-green-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer group animate-slideUp"
                                      onClick={() => onRecipeClick?.(recipe.id)}
                                    >
                                      <div className="flex gap-3">
                                        {recipe.image && (
                                          <div className="relative shrink-0">
                                            <img
                                              src={recipe.image}
                                              alt={recipe.title}
                                              className="w-18 h-18 object-cover rounded-xl shadow-md"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-green-500/20 to-transparent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity"></div>
                                          </div>
                                        )}

                                        <div className="flex-1 min-w-0">
                                          <h5 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors leading-snug">
                                            {recipe.title}
                                          </h5>

                                          {recipe.usedIngredientCount !==
                                            undefined && (
                                            <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                              <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg shadow-sm">
                                                <svg
                                                  className="w-3 h-3"
                                                  fill="currentColor"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                  />
                                                </svg>
                                                {recipe.usedIngredientCount}
                                              </span>
                                              {recipe.likes !== undefined && (
                                                <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                                                  <svg
                                                    className="w-3.5 h-3.5 text-red-400"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                  >
                                                    <path
                                                      fillRule="evenodd"
                                                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                      clipRule="evenodd"
                                                    />
                                                  </svg>
                                                  <span className="font-medium">
                                                    {recipe.likes.toLocaleString()}
                                                  </span>
                                                </span>
                                              )}
                                            </div>
                                          )}
                                        </div>

                                        <svg
                                          className="w-5 h-5 text-gray-300 group-hover:text-green-500 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-1"
                                          fill="none"
                                          stroke="currentColor"
                                          viewBox="0 0 24 24"
                                        >
                                          <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                          />
                                        </svg>
                                      </div>
                                    </div>
                                  ))}

                                {message.data.length > 6 && (
                                  <div className="text-center py-2.5 px-3 bg-gradient-to-r from-gray-50 to-green-50 rounded-xl border border-gray-100">
                                    <p className="text-xs text-gray-600 font-medium">
                                      +{message.data.length - 6} more delicious
                                      recipes
                                    </p>
                                  </div>
                                )}
                              </div>
                            )}
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Enhanced typing indicator */}
                  {isProcessing && (
                    <div className="flex justify-start animate-fadeIn">
                      <div className="flex gap-2.5">
                        <div className="relative">
                          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <svg
                              className="w-4 h-4 text-white animate-pulse"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                              />
                            </svg>
                          </div>
                          <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-yellow-400 border-2 border-white rounded-full animate-pulse"></div>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-5 py-3.5 shadow-lg border border-gray-100">
                          <div className="flex items-center gap-1.5">
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                            <div
                              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                              style={{ animationDelay: "0.4s" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Enhanced Input Area */}
            <div className="border-t border-gray-100 bg-gradient-to-b from-white to-gray-50/50 p-4">
              <div className="flex gap-2.5 items-end">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isProcessing}
                    className="w-full px-4 py-3.5 pr-11 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500 disabled:bg-gray-50 disabled:text-gray-400 text-sm transition-all shadow-sm hover:shadow-md placeholder:text-gray-400"
                  />
                  {inputValue && (
                    <button
                      onClick={() => setInputValue("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all group"
                    >
                      <svg
                        className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:rotate-90 transition-all"
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
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 active:scale-95 flex items-center justify-center flex-shrink-0 group"
                  aria-label="Send message"
                >
                  <svg
                    className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
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
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ChatboxPPL;
