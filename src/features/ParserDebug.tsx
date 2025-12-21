import React, { useState, useEffect } from 'react';
import { parse } from './parser'; 
import { AST } from './types'; 

export const ParserDebug = () => {
  const [input, setInput] = useState("find recipes with chicken and rice");
  const [ast, setAst] = useState<AST | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!input.trim()) {
        setAst(null);
        setError(null);
        return;
      }
      const result = parse(input);
      setAst(result);
      
      // Nếu parser trả về loại lỗi
      if (result.type === 'PARSE_ERROR') {
        setError(result.payload.message || "Unknown Error");
      } else {
        setError(null);
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message);
      setAst(null);
    }
  }, [input]);

  // Hàm render giao diện tùy theo loại lệnh (Smart Rendering)
  const renderVisualResult = () => {
    if (!ast || error) return null;

    switch (ast.type) {
      case 'RECIPE_SEARCH_BY_INGREDIENTS':
        return (
          <div className="space-y-2">
             <div className="text-xs font-bold text-slate-400 uppercase">Ingredients Search</div>
             <div className="flex flex-wrap gap-2">
                {ast.payload.ingredients?.map((ing, i) => (
                  <span key={i} className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-sm">
                    🥗 {ing}
                  </span>
                ))}
             </div>
          </div>
        );

      case 'RECIPE_SEARCH_BY_NAME':
        return (
          <div className="space-y-2">
             <div className="text-xs font-bold text-slate-400 uppercase">Recipe Name Search</div>
             <div className="text-xl font-bold text-slate-800">
               🔎 "{ast.payload.recipeName}"
             </div>
          </div>
        );

      case 'NUTRITION_QUERY':
      case 'NUTRITION_DETAIL':
        return (
          <div className="space-y-2">
             <div className="text-xs font-bold text-slate-400 uppercase">Nutrition Tracking</div>
             <div className="flex gap-4">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <span className="block text-xs text-blue-400 font-bold">METRIC</span>
                  <span className="text-blue-700 font-bold uppercase">{ast.payload.metric}</span>
                </div>
                <div className="bg-orange-50 p-3 rounded-lg">
                  <span className="block text-xs text-orange-400 font-bold">TIME RANGE</span>
                  <span className="text-orange-700 font-bold uppercase">{ast.payload.timeRange}</span>
                </div>
             </div>
          </div>
        );
      
      case 'MEAL_LOG':
      case 'MEAL_LOG_CUSTOM':
        return (
           <div className="space-y-2">
             <div className="text-xs font-bold text-slate-400 uppercase">Log Meal</div>
             <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                Add to: <span className="font-bold text-purple-700 uppercase">{ast.payload.mealType}</span>
                {ast.payload.customMeal && (
                  <div className="mt-2 text-sm text-slate-600">
                    Food: <b>{ast.payload.customMeal.name}</b> <br/>
                    Calories: <b>{ast.payload.customMeal.calories} kcal</b>
                  </div>
                )}
             </div>
           </div>
        );

      default:
        // Các trường hợp còn lại hiển thị generic
        return (
          <div className="text-sm text-slate-600">
            Command Type: <span className="font-mono font-bold text-indigo-600">{ast.type}</span>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8 flex justify-center items-start pt-24">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-200">
        
        {/* Header */}
        <div className="bg-slate-900 p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-3">
              🤖 AI Command Center
              <span className="text-xs bg-green-500 text-white px-2 py-1 rounded font-mono">v2.0</span>
            </h2>
            <p className="text-slate-400 text-sm mt-1">Natural Language Processing Debugger</p>
          </div>
        </div>
        
        <div className="p-8 space-y-8">
          {/* Input Area */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">
              Enter User Command
            </label>
            <input
              className="w-full p-4 text-xl border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all placeholder:text-slate-300 font-medium text-slate-700"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., find recipes with chicken..."
              autoFocus
            />
            <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
              <span className="text-xs font-bold text-slate-400 pt-1">Try:</span>
              {['show my calories today', 'add this to lunch', 'suggest a healthy dinner'].map(txt => (
                <button key={txt} onClick={() => setInput(txt)} className="text-xs bg-slate-100 hover:bg-indigo-50 text-slate-600 hover:text-indigo-600 px-2 py-1 rounded border border-slate-200 transition-colors whitespace-nowrap">
                  {txt}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Visual Result */}
            <div className={`p-6 rounded-2xl border-2 transition-all ${error ? 'border-red-100 bg-red-50' : 'border-indigo-50 bg-white shadow-sm'}`}>
              <h3 className="font-bold text-slate-800 mb-4 border-b pb-3 flex justify-between items-center">
                <span>🎯 Intent Analysis</span>
                {ast && !error && <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Confidence: 100%</span>}
              </h3>
              
              {error ? (
                <div className="flex flex-col gap-2 text-red-600">
                  <div className="font-bold flex items-center gap-2">❌ I didn't understand that.</div>
                  <div className="text-sm opacity-80">{error}</div>
                </div>
              ) : ast ? (
                <div className="animate-fade-in">
                  {renderVisualResult()}
                </div>
              ) : (
                <div className="text-slate-400 italic">Waiting for input...</div>
              )}
            </div>

            {/* JSON Output */}
            <div className="bg-slate-900 rounded-2xl overflow-hidden flex flex-col shadow-inner">
              <div className="bg-black/30 p-3 px-5 text-xs font-mono text-slate-400 border-b border-slate-700 flex justify-between">
                <span>AST PAYLOAD</span>
                <span>JSON</span>
              </div>
              <div className="p-5 overflow-auto max-h-[300px] custom-scrollbar">
                <pre className="text-xs font-mono text-green-400 leading-relaxed">
                  {ast ? JSON.stringify(ast, null, 2) : "// No data"}
                </pre>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};