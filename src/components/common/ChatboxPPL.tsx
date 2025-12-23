import { useState, useRef, useEffect } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import { parse } from "@/features/parser";

// --- CONFIG: Danh sách các lệnh mẫu cho Popup Help ---
const COMMAND_CATEGORIES = [
  {
    title: "Find Recipes",
    icon: "🍳",
    commands: [
      "Find recipes with chicken and rice",
      "Show me pancake recipe",
      "Find healthy breakfast ideas",
      "What can I cook with eggs?",
    ],
  },
  {
    title: "Nutrition Info",
    icon: "📊",
    commands: [
      "Show my calories today",
      "How much protein did I eat?",
      "Check my diet balance",
    ],
  },
  {
    title: "Meal Planning",
    icon: "📅",
    commands: [
      "Suggest a low-calorie dinner",
      "Plan my meals for today",
      "Save to breakfast",
    ],
  },
  {
    title: "Quick Logging",
    icon: "📝",
    commands: [
      "Log breakfast: oatmeal 300 cal",
      "Add lunch chicken rice 500 cal",
    ],
  },
];

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
  
  const [showHelpPopup, setShowHelpPopup] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const { messages, isProcessing, sendAST } = useChatbot();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setShowHelpPopup(false);
      setShowQuickHelp(false);
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
    { text: "Find recipes with chicken", color: "from-blue-500 to-cyan-500" },
    { text: "Show my calories today", color: "from-purple-500 to-pink-500" },
    { text: "Suggest healthy dinner", color: "from-green-500 to-emerald-500" },
    { text: "Log breakfast 300 cal", color: "from-orange-500 to-amber-500" },
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

      {/* --- POPUP HELP MENU (BÊN TRÁI CHATBOX) --- */}
      {!isMinimized && showHelpPopup && (
        <div className="fixed bottom-24 right-[460px] w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-slideRight z-50 flex flex-col max-h-[600px]">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-4 text-white flex justify-between items-center shadow-md">
            <h3 className="font-bold flex items-center gap-2 text-lg">
              <span>🤖</span> Command Center
            </h3>
            <button
              onClick={() => setShowHelpPopup(false)}
              className="hover:bg-white/20 rounded-lg p-1 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto custom-scrollbar space-y-5 bg-gray-50/50 flex-1">
            {COMMAND_CATEGORIES.map((cat, idx) => (
              <div key={idx} className="space-y-2 animate-fadeIn" style={{ animationDelay: `${idx * 100}ms` }}>
                <h4 className="font-bold text-gray-800 text-sm flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                  <span className="text-lg">{cat.icon}</span> {cat.title}
                </h4>
                <div className="space-y-1 pl-2">
                  {cat.commands.map((cmd, cIdx) => (
                    <button
                      key={cIdx}
                      onClick={() => {
                        setInputValue(cmd);
                        inputRef.current?.focus();
                      }}
                      className="block w-full text-left text-xs text-gray-600 py-2 px-3 hover:bg-green-50 hover:text-green-700 hover:pl-4 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500 truncate"
                    >
                      {cmd}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* --- MAIN CHATBOX --- */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-in-out ${
          isMinimized
            ? "bottom-6 right-6 w-16 h-16 rounded-full animate-slideDown"
            : "bottom-24 right-6 w-[420px] max-w-[calc(100vw-2rem)] h-[650px] max-h-[calc(100vh-8rem)] rounded-3xl animate-slideUp"
        } flex flex-col bg-white shadow-2xl overflow-hidden border border-gray-100`}
      >
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all flex items-center justify-center group relative"
          >
            <span className="text-3xl">🤖</span>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full animate-pulse" />
          </button>
        ) : (
          <>
            {/* Header */}
            <div className="relative bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100 px-6 py-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl blur-md animate-pulse-slow"></div>
                    <div className="relative w-11 h-11 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">PlateWise AI</h3>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="relative">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      </div>
                      <p className="text-xs text-gray-600 font-medium">Always here to help</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <button
                        onClick={() => setShowQuickHelp(!showQuickHelp)}
                        className="w-9 h-9 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all group text-green-600 bg-green-50 border border-green-100"
                        title="Quick Help"
                    >
                        <span className="font-bold text-lg">?</span>
                    </button>
                    
                    {showQuickHelp && (
                        <div className="absolute top-full right-0 mt-3 w-56 bg-white p-4 rounded-xl shadow-xl border border-gray-100 z-50 text-xs text-gray-600 animate-fadeIn before:content-[''] before:absolute before:-top-1.5 before:right-3 before:w-3 before:h-3 before:bg-white before:rotate-45 before:border-t before:border-l before:border-gray-100">
                            <h5 className="font-bold text-gray-800 mb-1 flex items-center gap-1">
                                💡 Hint:
                            </h5>
                            <p className="leading-relaxed">
                                Type <span className="font-mono bg-green-50 text-green-700 px-1.5 py-0.5 rounded font-bold border border-green-100">help</span> to see all available commands and features!
                            </p>
                        </div>
                    )}
                  </div>

                  <button
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="w-9 h-9 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all group"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </button>
                  <button
                    onClick={onClose}
                    className="w-9 h-9 hover:bg-white/80 rounded-xl flex items-center justify-center transition-all group hover:rotate-90 duration-300"
                  >
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              
              {selectedRecipe && (
                <div className="mt-3 px-3 py-2 rounded-xl bg-white/80 backdrop-blur-sm border border-green-200 flex items-center gap-2 animate-slideDown shadow-sm">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                  <p className="text-xs text-green-700 font-medium truncate flex-1">{selectedRecipe.title}</p>
                  <span className="text-xs text-green-600 font-semibold px-2 py-0.5 bg-green-100 rounded-md">Active</span>
                </div>
              )}
            </div>

            {/* Messages Area */}
            <div
              className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar"
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgb(229 231 235 / 0.4) 1px, transparent 0), linear-gradient(to bottom, transparent, rgb(249 250 251 / 0.3))`,
                backgroundSize: "24px 24px, 100% 100%",
              }}
            >
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center px-6">
                  {/* --- ĐÃ XÓA ICON TO ĐÙNG Ở ĐÂY --- */}
                  <h4 className="font-bold text-gray-900 text-base mb-1.5 mt-8">How can I help you today?</h4>
                  <p className="text-xs text-gray-500 mb-5 max-w-xs leading-relaxed">Ask about recipes, nutrition, or meal planning</p>
                  <div className="w-full flex flex-col items-center space-y-1.5">
                    <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide mb-1.5 text-center">Try asking</p>
                    {exampleCommands.map((cmd, idx) => (
                      <button
                        key={idx}
                        onClick={() => setInputValue(cmd.text)}
                        style={{ animationDelay: `${idx * 100}ms` }}
                        className="inline-flex items-center justify-center gap-2 px-3 py-1.5 rounded-full bg-gray-50/80 hover:bg-green-50 border border-gray-100 hover:border-green-200 transition-all group animate-slideRight"
                      >
                        <span className="text-xs text-gray-600 group-hover:text-green-700 font-medium">{cmd.text}</span>
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
                      className={`flex animate-fadeIn ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex gap-2.5 max-w-[85%] ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                        {message.role === "bot" && (
                          <div className="relative">
                            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shrink-0 shadow-lg">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                              </svg>
                            </div>
                            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
                          </div>
                        )}
                        <div className="flex flex-col gap-1.5">
                          <div
                            className={`rounded-2xl px-4 py-3 ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-xl shadow-green-500/40 rounded-tr-md"
                                : "bg-white text-gray-900 shadow-lg border border-gray-100 rounded-tl-md"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">{message.content}</p>
                            
                            {message.role === 'bot' && (message as any).action?.type === 'SHOW_HELP_BUTTON' && (
                                <button
                                    onClick={() => setShowHelpPopup(!showHelpPopup)}
                                    className="mt-3 flex items-center gap-2 px-4 py-2 bg-green-50/50 border border-green-200 text-green-800 rounded-xl shadow-sm hover:bg-green-100 hover:shadow-md transition-all text-sm font-semibold w-full justify-center group"
                                >
                                    <span className="text-lg">📜</span>
                                    {showHelpPopup ? "Hide Commands" : "View All Commands"}
                                    <svg className={`w-4 h-4 transition-transform duration-300 ${showHelpPopup ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            )}
                          </div>
                          
                          <p className={`text-xs text-gray-400 px-1 font-medium ${message.role === "user" ? "text-right" : "text-left"}`}>
                            {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>

                          {message.role === "bot" && message.data && Array.isArray(message.data) && message.data.length > 0 && (
                              <div className="mt-2 space-y-2.5 max-h-80 overflow-y-auto pr-1 custom-scrollbar">
                                {message.data.slice(0, 6).map((recipe: any, recipeIdx: number) => (
                                    <div
                                      key={recipe.id}
                                      style={{ animationDelay: `${recipeIdx * 100}ms` }}
                                      className="bg-white border border-gray-200 rounded-xl p-3.5 hover:shadow-xl hover:border-green-300 hover:scale-[1.02] transition-all duration-300 cursor-pointer group animate-slideUp"
                                      onClick={() => onRecipeClick?.(recipe.id)}
                                    >
                                        <div className="flex gap-3">
                                            {recipe.image && (
                                                <div className="relative shrink-0">
                                                    <img src={recipe.image} alt={recipe.title} className="w-18 h-18 object-cover rounded-xl shadow-md" />
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h5 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors leading-snug">{recipe.title}</h5>
                                                {recipe.usedIngredientCount !== undefined && (
                                                    <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
                                                        <span className="inline-flex items-center gap-1 text-xs text-green-600 font-semibold bg-green-50 px-2 py-1 rounded-lg shadow-sm">
                                                            {recipe.usedIngredientCount} ingredients
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                              </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isProcessing && (
                    <div className="flex justify-start animate-fadeIn">
                       <div className="flex gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0 shadow-lg">
                            <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                        </div>
                        <div className="bg-white rounded-2xl rounded-tl-md px-5 py-3.5 shadow-lg border border-gray-100 flex items-center gap-1.5">
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                             <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                       </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
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
                    <button onClick={() => setInputValue("")} className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-100 transition-all group">
                       <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 group-hover:rotate-90 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isProcessing}
                  className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-2xl hover:from-green-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-green-500/40 hover:shadow-xl hover:shadow-green-500/50 hover:scale-105 active:scale-95 flex items-center justify-center flex-shrink-0 group"
                >
                  <svg className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
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