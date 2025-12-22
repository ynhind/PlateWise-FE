import { AST, InterpreterResponse } from "../types";
import {
  executeRecipeCommand,
  executeNutritionCommand,
  executeMealLogCommand,
  executeMealSuggestionCommand,
} from "./commandHandlers";

// ============================================
// TYPE DEFINITIONS FOR HOOKS
// ============================================

type RecipeHook = {
  recipes: any[];
  setRecipes: (recipes: any[]) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  selectedRecipe: any;
  fetchRecipeDetails: (id: number) => Promise<void>;
};

type MealLogHook = {
  mealLogs: Array<{
    id: string;
    date: string;
    mealType: "breakfast" | "lunch" | "dinner" | "snack";
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    image?: string;
    time: string;
  }>;
  dailyGoal: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  addMealLog: (
    meal: {
      mealType: "breakfast" | "lunch" | "dinner" | "snack";
      name: string;
      calories: number;
      protein: number;
      carbs: number;
      fats: number;
      image?: string;
    },
    date?: string
  ) => void;
  deleteMealLog: (id: string) => void;
};

type UserProfileHook = {
  userProfile: {
    age: number;
    gender: "male" | "female";
    weight: number;
    height: number;
    activityLevel: string;
  };
  setUserProfile: (profile: any) => void;
};

// ============================================
// INTERPRETER CLASS
// ============================================

/**
 * Interpreter - Member B (REFACTORED)
 *
 * ✅ KHÔNG TẠO Services mới - Tái sử dụng hooks có sẵn
 * ✅ Nhận hooks từ bên ngoài qua constructor
 * ✅ Delegate execution to commandHandlers.ts
 *
 * Architecture:
 * - Parser (Member A) → AST
 * - Interpreter (Member B) → Execute AST using existing hooks
 * - commandHandlers.ts → Business logic layer
 *
 * Usage:
 * ```typescript
 * import { Interpreter } from "@/features/interpreter";
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
 * // From Parser (Member A)
 * const ast = parser.parse("find recipes with chicken");
 *
 * // Execute
 * const result = await interpreter.execute(ast);
 * console.log(result.message); // "🍳 Found 5 recipes with chicken"
 * ```
 */
export class Interpreter {
  constructor(
    private deps: {
      recipeHook: RecipeHook;
      mealLogHook: MealLogHook;
      userProfileHook: UserProfileHook;
    }
  ) {}

  /**
   * Execute AST command
   *
   * Routes AST to appropriate command handler based on type.
   * All business logic is delegated to commandHandlers.ts
   *
   * @param ast - Abstract Syntax Tree from Parser
   * @param context - Optional context (e.g., currentRecipe for MEAL_LOG)
   * @returns InterpreterResponse with success status, message, and optional data
   */
  async execute(
    ast: AST,
    context?: { currentRecipe?: any }
  ): Promise<InterpreterResponse> {
    try {
      switch (ast.type) {
        // ===== RECIPE SEARCH COMMANDS =====
        case "RECIPE_SEARCH_BY_INGREDIENTS":
        case "RECIPE_SEARCH_BY_NAME":
        case "RECIPE_SEARCH_BY_CATEGORY":
          return await executeRecipeCommand(ast, this.deps.recipeHook);

        // ===== NUTRITION QUERY COMMANDS =====
        case "NUTRITION_QUERY":
        case "NUTRITION_DETAIL":
        case "DIET_BALANCE_CHECK":
        case "NUTRIENT_CHECK":
          return executeNutritionCommand(ast, this.deps.mealLogHook);

        // ===== MEAL SUGGESTION COMMANDS =====
        case "MEAL_SUGGESTION":
        case "MEAL_PLAN":
          return await executeMealSuggestionCommand(
            ast,
            this.deps.mealLogHook,
            this.deps.recipeHook
          );

        // ===== MEAL LOGGING COMMANDS =====
        case "MEAL_LOG":
        case "MEAL_LOG_CUSTOM":
          return executeMealLogCommand(ast, this.deps.mealLogHook, context);

        // ===== ERROR HANDLING =====
        case "PARSE_ERROR":
          return {
            success: false,
            message: `❌ ${ast.payload.message}\n\n💡 Did you mean: ${
              ast.payload.suggestions?.join(", ") || "Try typing 'help'"
            }`,
          };

        default:
          return {
            success: false,
            message: `❌ Unknown command type: ${ast.type}`,
          };
      }
    } catch (error) {
      console.error("Interpreter error:", error);
      return {
        success: false,
        message: `❌ Error: ${
          error instanceof Error ? error.message : "Unknown error occurred"
        }`,
      };
    }
  }
}
