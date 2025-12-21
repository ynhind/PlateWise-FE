import { useState } from "react";
import { Interpreter } from "@/features/interpreter";
import { useRecipes } from "./useRecipes";
import { useMealLogs } from "./useMealLogs";
import { useUserProfile } from "./useUserProfile";
import type { AST, InterpreterResponse } from "@/features/types";

interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
  data?: any;
}

/**
 * useChatbot - Chatbot State Management Hook
 *
 * Orchestrates Parser + Interpreter + existing hooks
 *
 * Usage:
 * ```typescript
 * const { messages, isProcessing, sendMessage } = useChatbot();
 *
 * // Send user message
 * await sendMessage("find recipes with chicken");
 *
 * // Messages array updates with bot response
 * ```
 */
export const useChatbot = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // ✅ Get existing hooks
  const recipeHook = useRecipes();
  const mealLogHook = useMealLogs();
  const userProfileHook = useUserProfile();

  // ✅ Create interpreter with hooks injected
  const interpreter = new Interpreter({
    recipeHook,
    mealLogHook,
    userProfileHook,
  });

  /**
   * Send message to chatbot
   *
   * @param userInput - User's natural language input
   * @param ast - Pre-parsed AST (if using Parser separately)
   * @param context - Optional context (e.g., currentRecipe)
   * @returns Interpreter response
   */
  const sendMessage = async (
    userInput: string,
    ast?: AST,
    context?: { currentRecipe?: any }
  ): Promise<InterpreterResponse | void> => {
    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: userInput,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsProcessing(true);

    try {
      // If AST not provided, need Parser (Member A's work)
      if (!ast) {
        // TODO: When Parser is ready:
        // const parser = new Parser();
        // ast = parser.parse(userInput);

        // For now, return placeholder
        const errorMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          role: "bot",
          content:
            "⚠️ Parser not implemented yet. Please provide AST directly.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
        setIsProcessing(false);
        return;
      }

      // Execute AST → Response
      const result = await interpreter.execute(ast, context);

      // Add bot response
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: result.message,
        timestamp: new Date(),
        data: result.data,
      };
      setMessages((prev) => [...prev, botMessage]);

      setIsProcessing(false);
      return result;
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `❌ Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  /**
   * Send AST directly (for testing without Parser)
   *
   * @param ast - Abstract Syntax Tree
   * @param context - Optional context
   */
  const sendAST = async (
    ast: AST,
    context?: { currentRecipe?: any }
  ): Promise<InterpreterResponse | void> => {
    // Add user message showing original input
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: "user",
      content: ast.metadata?.originalInput || `[${ast.type}]`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    setIsProcessing(true);

    try {
      const result = await interpreter.execute(ast, context);

      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: result.message,
        timestamp: new Date(),
        data: result.data,
      };
      setMessages((prev) => [...prev, botMessage]);

      setIsProcessing(false);
      return result;
    } catch (error) {
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: "bot",
        content: `❌ Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
      setIsProcessing(false);
    }
  };

  /**
   * Clear chat history
   */
  const clearHistory = () => {
    setMessages([]);
  };

  /**
   * Get last bot message
   */
  const getLastBotMessage = (): ChatMessage | undefined => {
    return messages
      .slice()
      .reverse()
      .find((msg) => msg.role === "bot");
  };

  /**
   * Get conversation context (last N messages)
   */
  const getContext = (count: number = 5): ChatMessage[] => {
    return messages.slice(-count);
  };

  return {
    messages,
    isProcessing,
    sendMessage,
    sendAST,
    clearHistory,
    getLastBotMessage,
    getContext,
    // Expose hooks for direct access if needed
    recipeHook,
    mealLogHook,
    userProfileHook,
  };
};
