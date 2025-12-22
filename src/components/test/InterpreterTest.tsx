/**
 * InterpreterTest - Test UI cho Member B (Interpreter)
 *
 * Test Interpreter với mock AST - không cần Parser
 */

import { useState } from "react";
import { useChatbot } from "@/hooks/useChatbot";
import type { AST } from "@/features/types";

export const InterpreterTest = () => {
  const { messages, isProcessing, sendAST, clearHistory } = useChatbot();
  const [selectedTest, setSelectedTest] = useState<string>("");

  // Mock AST test cases
  const testCases: Record<string, AST> = {
    "Recipe Search - Ingredients": {
      type: "RECIPE_SEARCH_BY_INGREDIENTS",
      payload: {
        ingredients: ["chicken", "rice", "garlic"],
      },
      metadata: {
        originalInput: "tìm món với gà, cơm, tỏi",
        timestamp: new Date().toISOString(),
      },
    },

    "Recipe Search - Name": {
      type: "RECIPE_SEARCH_BY_NAME",
      payload: {
        recipeName: "pasta carbonara",
      },
      metadata: {
        originalInput: "tìm công thức pasta carbonara",
        timestamp: new Date().toISOString(),
      },
    },

    "Nutrition Query - Today": {
      type: "NUTRITION_QUERY",
      payload: {
        metric: "calories",
        timeRange: "today",
      },
      metadata: {
        originalInput: "hôm nay tôi ăn bao nhiêu calo",
        timestamp: new Date().toISOString(),
      },
    },

    "Meal Log - Custom": {
      type: "MEAL_LOG_CUSTOM",
      payload: {
        mealType: "breakfast",
        customMeal: {
          name: "Phở Bò",
          calories: 450,
          protein: 25,
          carbs: 60,
          fats: 12,
        },
      },
      metadata: {
        originalInput: "log bữa sáng: phở bò 450 calo",
        timestamp: new Date().toISOString(),
      },
    },

    "Meal Suggestion": {
      type: "MEAL_SUGGESTION",
      payload: {
        mealType: "dinner",
        targetCalories: 600,
        dietaryRestrictions: ["vegetarian"],
      },
      metadata: {
        originalInput: "gợi ý bữa tối chay dưới 600 calo",
        timestamp: new Date().toISOString(),
      },
    },

    "Diet Balance Check": {
      type: "DIET_BALANCE_CHECK",
      payload: {
        timeRange: "week",
      },
      metadata: {
        originalInput: "kiểm tra cân bằng dinh dưỡng tuần này",
        timestamp: new Date().toISOString(),
      },
    },

    "Parse Error": {
      type: "PARSE_ERROR",
      payload: {
        message: "Không hiểu câu lệnh",
        suggestions: [
          "tìm món với [nguyên liệu]",
          "hôm nay tôi ăn bao nhiêu calo",
          "log bữa [sáng/trưa/tối]: [tên món]",
        ],
      },
      metadata: {
        originalInput: "asdfghjkl",
        timestamp: new Date().toISOString(),
      },
    },
  };

  const handleRunTest = async (testName: string) => {
    setSelectedTest(testName);
    const ast = testCases[testName];
    await sendAST(ast);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          🧪 Interpreter Test UI
        </h1>
        <p className="text-gray-600 mb-4">
          Test Member B (Interpreter) với mock AST - không cần Parser
        </p>

        {/* Test Cases */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {Object.keys(testCases).map((testName) => (
            <button
              key={testName}
              onClick={() => handleRunTest(testName)}
              disabled={isProcessing}
              className={`
                px-4 py-3 rounded-lg font-medium transition-all
                ${
                  selectedTest === testName
                    ? "bg-green-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              {testName}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div className="flex gap-3">
          <button
            onClick={clearHistory}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            🗑️ Clear Chat
          </button>
          <button
            onClick={() => {
              const ast = testCases[selectedTest];
              if (ast) {
                console.log("📋 Current AST:", JSON.stringify(ast, null, 2));
              }
            }}
            disabled={!selectedTest}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
          >
            📋 Log AST to Console
          </button>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4">
          💬 Chat Messages ({messages.length})
        </h2>

        {messages.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <p className="text-lg">Chưa có tin nhắn nào</p>
            <p className="text-sm mt-2">
              Click vào test case ở trên để bắt đầu
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`
                  p-4 rounded-lg
                  ${
                    msg.role === "user"
                      ? "bg-blue-50 border-l-4 border-blue-500"
                      : "bg-green-50 border-l-4 border-green-500"
                  }
                `}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-bold text-sm">
                    {msg.role === "user" ? "👤 User" : "🤖 Bot"}
                  </span>
                  <span className="text-xs text-gray-500">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="text-gray-800 whitespace-pre-wrap">
                  {msg.content}
                </div>
                {msg.data && (
                  <details className="mt-3">
                    <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                      📊 View Data
                    </summary>
                    <pre className="mt-2 p-3 bg-gray-100 rounded text-xs overflow-x-auto">
                      {JSON.stringify(msg.data, null, 2)}
                    </pre>
                  </details>
                )}
              </div>
            ))}
          </div>
        )}

        {isProcessing && (
          <div className="mt-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-100 text-yellow-800 rounded-lg">
              <div className="animate-spin h-4 w-4 border-2 border-yellow-600 border-t-transparent rounded-full"></div>
              <span>Processing...</span>
            </div>
          </div>
        )}
      </div>

      {/* Current AST Preview */}
      {selectedTest && (
        <div className="mt-6 bg-gray-900 rounded-2xl shadow-xl p-6">
          <h2 className="text-xl font-bold text-white mb-4">
            📄 Current AST: {selectedTest}
          </h2>
          <pre className="text-green-400 text-sm overflow-x-auto">
            {JSON.stringify(testCases[selectedTest], null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
};
