export type CommandType =
  // Recipe Search Commands
  | "RECIPE_SEARCH_BY_INGREDIENTS" // find recipes with chicken and rice
  | "RECIPE_SEARCH_BY_NAME" // show me pancake recipe
  | "RECIPE_SEARCH_BY_CATEGORY" // find healthy breakfast ideas

  // Nutrition Query Commands
  | "NUTRITION_QUERY" // show my calories today
  | "NUTRITION_DETAIL" // how much protein did I eat

  // Meal Suggestion Commands
  | "MEAL_SUGGESTION" // suggest a low-calorie dinner
  | "MEAL_PLAN" // plan my meals for today

  // Diet Analysis Commands
  | "DIET_BALANCE_CHECK" // is my diet balanced?
  | "NUTRIENT_CHECK" // am I eating enough protein?

  // Meal Logging Commands
  | "MEAL_LOG" // add this to lunch
  | "MEAL_LOG_CUSTOM" // log breakfast: oatmeal 300 calories

  // Error
  | "PARSE_ERROR" // Invalid command

  // Help
  | "HELP_REQUEST"; // User requests help

// ============================================
// AST (Abstract Syntax Tree)
// ============================================
export interface AST {
  type: CommandType;
  payload: ASTPayload;
  metadata?: {
    originalInput: string; // Original user input for debugging
    confidence?: number; // Parser confidence level (0-1)
    timestamp: string; // ISO timestamp
  };
}

// ============================================
// PAYLOAD DEFINITIONS
// ============================================
export interface ASTPayload {
  // For RECIPE_SEARCH_BY_INGREDIENTS
  ingredients?: string[]; // ["chicken", "rice", "tomato"]
  maxMissedIngredients?: number; // How many missing ingredients allowed (default: 2)

  // For RECIPE_SEARCH_BY_NAME
  recipeName?: string; // "pancake", "pasta carbonara"

  // For RECIPE_SEARCH_BY_CATEGORY
  category?: RecipeCategory; // "healthy", "low-calorie", "vegetarian"
  mealTime?: MealType; // "breakfast", "lunch", "dinner", "snack"

  // For NUTRITION_QUERY & NUTRITION_DETAIL
  date?: string; // ISO date: "2025-12-19" or "today"
  metric?: NutritionMetric; // "calories", "protein", "carbs", "fat"
  timeRange?: "today" | "week" | "month"; // Query time range

  // For MEAL_SUGGESTION
  targetCalories?: number; // Max calories for suggested meal
  dietaryRestrictions?: string[]; // ["vegetarian", "gluten-free"]
  preferredIngredients?: string[]; // User preferences
  avoidIngredients?: string[]; // Allergies/dislikes

  // For MEAL_PLAN
  planDate?: string; // Date to plan for
  targetDailyCalories?: number; // Daily calorie goal
  mealsCount?: number; // Number of meals (default: 3)

  // For DIET_BALANCE_CHECK & NUTRIENT_CHECK
  nutrient?: string; // "protein", "fiber", "vitamin C"
  targetAmount?: number; // Recommended daily amount

  // For MEAL_LOG (from recipe)
  recipeId?: number; // Spoonacular recipe ID
  loggedRecipeName?: string; // Recipe title when logging
  mealType?: MealType; // Which meal to log to
  servings?: number; // Serving size (default: 1)

  // For MEAL_LOG_CUSTOM (manual entry)
  customMeal?: {
    name: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fats?: number;
  };

  // For PARSE_ERROR
  message?: string; // Error description
  suggestion?: string; // Suggestion for correct command
  suggestions?: string[]; // Multiple suggestions
}

// ============================================
// ENUMS & TYPES
// ============================================
export type MealType = "breakfast" | "lunch" | "dinner" | "snack";

export type RecipeCategory =
  | "healthy"
  | "low-calorie"
  | "high-protein"
  | "vegetarian"
  | "vegan"
  | "gluten-free"
  | "quick" // < 30 mins
  | "easy"; // Simple recipes

export type NutritionMetric =
  | "calories"
  | "protein"
  | "carbs"
  | "fat"
  | "fiber"
  | "sugar"
  | "sodium";

// ============================================
// RESPONSE TYPES (for Interpreter)
// ============================================
export interface InterpreterResponse {
  success: boolean;
  message: string;
  data?: any; // Additional data (recipes, nutrition stats, etc.)
  action?: UIAction; // Action for UI to perform
}

export interface UIAction {
  type: "NAVIGATE" | "DISPLAY_MODAL" | "UPDATE_TAB" | "SHOW_TOAST" | "SHOW_HELP_BUTTON";
  target?: string; // Tab name or route
  payload?: any; // Data to pass to UI component
}

// ============================================
// EXAMPLES (for reference)
// ============================================

/**
 * Example 1: User types "find recipes with chicken and rice"
 *
 * Parser (A) must return:
 * {
 *   type: "RECIPE_SEARCH_BY_INGREDIENTS",
 *   payload: {
 *     ingredients: ["chicken", "rice"]
 *   },
 *   metadata: {
 *     originalInput: "find recipes with chicken and rice",
 *     timestamp: "2025-12-19T10:30:00Z"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Call Spoonacular API: GET /recipes/findByIngredients?ingredients=chicken,rice
 * - Return: "🍳 Found 5 recipes: Chicken Fried Rice, ..."
 */

/**
 * Example 2: User types "show me pancake recipe"
 *
 * Parser (A) must return:
 * {
 *   type: "RECIPE_SEARCH_BY_NAME",
 *   payload: {
 *     recipeName: "pancake"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Call Spoonacular API: GET /recipes/complexSearch?query=pancake
 * - Return: "🥞 Found 10 pancake recipes: Classic Pancakes, ..."
 */

/**
 * Example 3: User types "show my calories today"
 *
 * Parser (A) must return:
 * {
 *   type: "NUTRITION_QUERY",
 *   payload: {
 *     date: "2025-12-19",
 *     metric: "calories",
 *     timeRange: "today"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Query localStorage: platewise_meal_logs (filter by date)
 * - Calculate total calories from meals
 * - Return: "📊 Today: 1,450 / 2,000 calories (73%)"
 */

/**
 * Example 4: User types "suggest a low-calorie dinner"
 *
 * Parser (A) must return:
 * {
 *   type: "MEAL_SUGGESTION",
 *   payload: {
 *     targetCalories: 500,
 *     mealTime: "dinner",
 *     category: "low-calorie"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Calculate remaining daily calories
 * - Call Spoonacular API with maxCalories filter
 * - Return: "🍽️ Suggested dinner (450 cal): Grilled Salmon Salad"
 */

/**
 * Example 5: User types "is my diet balanced?"
 *
 * Parser (A) must return:
 * {
 *   type: "DIET_BALANCE_CHECK",
 *   payload: {
 *     timeRange: "today"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Analyze today's meals from localStorage
 * - Calculate macro ratios (protein/carbs/fat)
 * - Compare with recommended ratios (30/40/30)
 * - Return: "✅ Your diet is balanced! Protein: 32%, Carbs: 38%, Fat: 30%"
 */

/**
 * Example 6: User types "add this to lunch" (when viewing recipe)
 *
 * Parser (A) must return:
 * {
 *   type: "MEAL_LOG",
 *   payload: {
 *     mealType: "lunch"
 *   }
 * }
 *
 * Interpreter (B) will execute:
 * - Get currentRecipe from context
 * - Extract nutrition data from recipe
 * - Call useMealLogs.addMealLog()
 * - Return: "✅ Added 'Chicken Tikka' to lunch!"
 */

// ============================================
// TYPE GUARDS (optional helpers)
// ============================================
export function isRecipeSearchCommand(ast: AST): boolean {
  return (
    ast.type === "RECIPE_SEARCH_BY_INGREDIENTS" ||
    ast.type === "RECIPE_SEARCH_BY_NAME" ||
    ast.type === "RECIPE_SEARCH_BY_CATEGORY"
  );
}

export function isNutritionCommand(ast: AST): boolean {
  return (
    ast.type === "NUTRITION_QUERY" ||
    ast.type === "NUTRITION_DETAIL" ||
    ast.type === "DIET_BALANCE_CHECK" ||
    ast.type === "NUTRIENT_CHECK"
  );
}

export function isMealCommand(ast: AST): boolean {
  return (
    ast.type === "MEAL_LOG" ||
    ast.type === "MEAL_LOG_CUSTOM" ||
    ast.type === "MEAL_SUGGESTION" ||
    ast.type === "MEAL_PLAN"
  );
}

export function isHelpCommand(ast: AST): boolean {
  return ast.type === "HELP_REQUEST";
}

export function isParseError(ast: AST): ast is AST & { type: "PARSE_ERROR" } {
  return ast.type === "PARSE_ERROR";
}

// ============================================
// VALIDATION HELPERS
// ============================================
export function validateAST(ast: AST): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Check required fields
  if (!ast.type) {
    errors.push("Missing required field: type");
  }

  if (!ast.payload) {
    errors.push("Missing required field: payload");
  }

  // Type-specific validations
  if (ast.type === "RECIPE_SEARCH_BY_INGREDIENTS" && !ast.payload.ingredients) {
    errors.push("RECIPE_SEARCH_BY_INGREDIENTS requires payload.ingredients");
  }

  if (ast.type === "RECIPE_SEARCH_BY_NAME" && !ast.payload.recipeName) {
    errors.push("RECIPE_SEARCH_BY_NAME requires payload.recipeName");
  }

  if (ast.type === "MEAL_LOG" && !ast.payload.mealType) {
    errors.push("MEAL_LOG requires payload.mealType");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

// ============================================
// CONSTANTS
// ============================================
export const COMMAND_EXAMPLES = {
  RECIPE_SEARCH_BY_INGREDIENTS: [
    "find recipes with chicken and rice",
    "what can I cook with eggs",
    "recipes using tomato and pasta",
  ],
  RECIPE_SEARCH_BY_NAME: [
    "show me pancake recipe",
    "find carbonara pasta",
    "search for chicken tikka masala",
  ],
  RECIPE_SEARCH_BY_CATEGORY: [
    "find healthy breakfast ideas",
    "show me vegetarian dinner options",
    "quick lunch recipes",
  ],
  NUTRITION_QUERY: [
    "show my calories today",
    "how much did I eat this week",
    "display nutrition summary",
  ],
  NUTRITION_DETAIL: [
    "how much protein did I eat",
    "show my carbs intake",
    "check my fat consumption",
  ],
  MEAL_SUGGESTION: [
    "suggest a low-calorie dinner",
    "recommend healthy lunch",
    "what should I eat for breakfast",
  ],
  MEAL_PLAN: [
    "plan my meals for today",
    "create a meal plan",
    "suggest meals for tomorrow",
  ],
  DIET_BALANCE_CHECK: [
    "is my diet balanced?",
    "check my nutrition balance",
    "am I eating healthy?",
  ],
  NUTRIENT_CHECK: [
    "am I eating enough protein?",
    "do I have enough fiber?",
    "check my vitamin intake",
  ],
  MEAL_LOG: ["add this to lunch", "log this for dinner", "save to breakfast"],
  MEAL_LOG_CUSTOM: [
    "log breakfast: oatmeal 300 calories",
    "add lunch chicken rice 450 cal",
    "record snack apple 95 cal",
  ],
  HELP_REQUEST: [
    "help",
    "show commands",
    "what can i do",
    "list available commands"
  ]
};

export const HELP_TEXT = `
🤖 PlateWise AI Commands:

📖 Recipe Search:
  • find recipes with [ingredients]
  • show me [recipe name]
  • find [category] [meal time] ideas

📊 Nutrition Tracking:
  • show my calories today
  • how much [nutrient] did I eat
  
🍽️ Meal Planning:
  • suggest a [criteria] [meal time]
  • plan my meals for [date]
  
✅ Diet Analysis:
  • is my diet balanced?
  • am I eating enough [nutrient]?
  
➕ Add Meals:
  • add this to [meal time]
  • log [meal time]: [name] [calories] cal

Type any command to get started!
`;
