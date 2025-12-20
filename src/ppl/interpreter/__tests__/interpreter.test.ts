/**
 * Test file cho Member B - Interpreter
 *
 * Test Interpreter với mock AST (không cần Parser)
 */

import { Interpreter } from "..";
import type { AST } from "../../types";

// Mock hooks (giả lập useRecipes, useMealLogs, useUserProfile)
const mockRecipeHook = {
  recipes: [],
  setRecipes: (recipes: any[]) => {
    console.log("✅ setRecipes called with:", recipes.length, "recipes");
  },
  isLoading: false,
  setIsLoading: (loading: boolean) => {
    console.log("✅ setIsLoading:", loading);
  },
  error: null,
  setError: (error: string | null) => {
    console.log("✅ setError:", error);
  },
  selectedRecipe: null,
  fetchRecipeDetails: async (id: number) => {
    console.log("✅ fetchRecipeDetails:", id);
  },
};

const mockMealLogHook = {
  mealLogs: [],
  dailyGoal: {
    calories: 2000,
    protein: 150,
    carbs: 250,
    fats: 65,
  },
  addMealLog: (meal: any, date?: string) => {
    console.log("✅ addMealLog called:", meal.name, meal.calories, "cal");
  },
  deleteMealLog: (id: string) => {
    console.log("✅ deleteMealLog:", id);
  },
};

const mockUserProfileHook = {
  userProfile: {
    age: 25,
    gender: "male" as "male" | "female",
    weight: 70,
    height: 170,
    activityLevel: "moderate",
  },
  setUserProfile: (profile: any) => {
    console.log("✅ setUserProfile:", profile);
  },
};

// Create interpreter instance
const interpreter = new Interpreter({
  recipeHook: mockRecipeHook,
  mealLogHook: mockMealLogHook,
  userProfileHook: mockUserProfileHook,
});

// ============================================
// TEST CASES
// ============================================

async function runTests() {
  console.log("\n🧪 Starting Interpreter Tests...\n");

  // Test 1: Recipe Search by Ingredients
  console.log("--- Test 1: RECIPE_SEARCH_BY_INGREDIENTS ---");
  const ast1: AST = {
    type: "RECIPE_SEARCH_BY_INGREDIENTS",
    payload: {
      ingredients: ["chicken", "rice"],
    },
    metadata: {
      originalInput: "find recipes with chicken and rice",
      timestamp: new Date().toISOString(),
    },
  };

  const result1 = await interpreter.execute(ast1);
  console.log("Result:", result1.success ? "✅ SUCCESS" : "❌ FAIL");
  console.log("Message:", result1.message);
  console.log("\n");

  // Test 2: Nutrition Query
  console.log("--- Test 2: NUTRITION_QUERY ---");
  const ast2: AST = {
    type: "NUTRITION_QUERY",
    payload: {
      date: "2025-12-20",
      metric: "calories",
      timeRange: "today",
    },
  };

  const result2 = await interpreter.execute(ast2);
  console.log("Result:", result2.success ? "✅ SUCCESS" : "❌ FAIL");
  console.log("Message:", result2.message);
  console.log("\n");

  // Test 3: Meal Log Custom
  console.log("--- Test 3: MEAL_LOG_CUSTOM ---");
  const ast3: AST = {
    type: "MEAL_LOG_CUSTOM",
    payload: {
      mealType: "breakfast",
      customMeal: {
        name: "Oatmeal",
        calories: 300,
        protein: 10,
        carbs: 50,
        fats: 5,
      },
    },
  };

  const result3 = await interpreter.execute(ast3);
  console.log("Result:", result3.success ? "✅ SUCCESS" : "❌ FAIL");
  console.log("Message:", result3.message);
  console.log("\n");

  // Test 4: Parse Error
  console.log("--- Test 4: PARSE_ERROR ---");
  const ast4: AST = {
    type: "PARSE_ERROR",
    payload: {
      message: "Unknown command",
      suggestions: ["find recipes", "show calories", "log meal"],
    },
  };

  const result4 = await interpreter.execute(ast4);
  console.log("Result:", result4.success ? "✅ SUCCESS" : "❌ FAIL");
  console.log("Message:", result4.message);
  console.log("\n");

  console.log("🎉 All tests completed!\n");
}

// Run tests if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  runTests().catch(console.error);
}

export { runTests };
