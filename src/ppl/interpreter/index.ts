/**
 * PPL Interpreter - Barrel Export
 *
 * Central export point cho tất cả Interpreter modules.
 * Member B chỉ cần import từ file này.
 *
 * Usage:
 * ```typescript
 * import { Interpreter } from "@/ppl/interpreter";
 * import { useRecipes } from "@/hooks/useRecipes";
 * import { useMealLogs } from "@/hooks/useMealLogs";
 * import { useUserProfile } from "@/hooks/useUserProfile";
 *
 * const recipeHook = useRecipes();
 * const mealLogHook = useMealLogs();
 * const userProfileHook = useUserProfile();
 *
 * const interpreter = new Interpreter({
 *   recipeHook,
 *   mealLogHook,
 *   userProfileHook,
 * });
 *
 * const result = await interpreter.execute(ast);
 * ```
 */

// Core Interpreter
export { Interpreter } from "./interpreter";

// Command Handlers (internal use only)
export {
  executeRecipeCommand,
  executeNutritionCommand,
  executeMealLogCommand,
  executeMealSuggestionCommand,
} from "./commandHandlers";

// Re-export types from parent
export type {
  AST,
  CommandType,
  ASTPayload,
  InterpreterResponse,
  UIAction,
  MealType,
  RecipeCategory,
  NutritionMetric,
} from "../types";
