import axios from "axios";
import { AST, InterpreterResponse } from "../types";

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

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
// RECIPE COMMANDS
// ============================================

/**
 * Execute recipe search commands
 * Tái sử dụng logic từ RecipeFinder.tsx
 */
export async function executeRecipeCommand(
  ast: AST,
  recipeHook: RecipeHook
): Promise<InterpreterResponse> {
  const { setRecipes, setIsLoading, setError } = recipeHook;

  if (!API_KEY) {
    return {
      success: false,
      message:
        "❌ API key is missing. Please configure VITE_SPOONACULAR_API_KEY",
    };
  }

  // ===== RECIPE SEARCH BY INGREDIENTS =====
  if (ast.type === "RECIPE_SEARCH_BY_INGREDIENTS") {
    const { ingredients, maxMissedIngredients } = ast.payload;

    if (!ingredients || ingredients.length === 0) {
      return {
        success: false,
        message: "❌ No ingredients provided. Try: 'find recipes with chicken'",
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      // ✅ Same API call as RecipeFinder.tsx (line 94-107)
      const response = await axios.get(
        `${BASE_URL}/recipes/findByIngredients`,
        {
          params: {
            apiKey: API_KEY,
            ingredients: ingredients.join(","),
            number: 12,
            ranking: 2, // Maximize used ingredients
            ignorePantry: true,
          },
        }
      );

      const recipes = response.data;

      // Filter by maxMissedIngredients if specified
      const filteredRecipes =
        maxMissedIngredients !== undefined
          ? recipes.filter(
              (r: any) => (r.missedIngredientCount || 0) <= maxMissedIngredients
            )
          : recipes;

      setRecipes(filteredRecipes);
      setIsLoading(false);

      if (filteredRecipes.length === 0) {
        return {
          success: true,
          message: `😔 No recipes found with ${ingredients.join(
            ", "
          )}. Try different ingredients!`,
          data: [],
        };
      }

      return {
        success: true,
        message: `🍳 Found ${
          filteredRecipes.length
        } recipes with ${ingredients.join(", ")}`,
        data: filteredRecipes,
        action: {
          type: "UPDATE_TAB",
          target: "finder",
          payload: filteredRecipes,
        },
      };
    } catch (err: any) {
      console.error("Error fetching recipes by ingredients:", err);
      const errorMsg =
        err.response?.status === 402
          ? "API quota exceeded. Please try again tomorrow."
          : err.response?.data?.message ||
            "Failed to fetch recipes. Please try again.";

      setError(errorMsg);
      setIsLoading(false);

      return {
        success: false,
        message: `❌ ${errorMsg}`,
      };
    }
  }

  // ===== RECIPE SEARCH BY NAME =====
  if (ast.type === "RECIPE_SEARCH_BY_NAME") {
    const { recipeName } = ast.payload;

    if (!recipeName) {
      return {
        success: false,
        message: "❌ No recipe name provided. Try: 'show me pancake recipe'",
      };
    }

    setIsLoading(true);
    setError(null);

    try {
      // ✅ Same API call as RecipeFinder.tsx (line 109-119)
      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params: {
          apiKey: API_KEY,
          query: recipeName,
          number: 12,
          addRecipeInformation: true,
        },
      });

      // Transform results to match RecipeFinder format (line 128-134)
      const transformedRecipes = (response.data.results || []).map(
        (r: any) => ({
          id: r.id,
          title: r.title,
          image: r.image,
          usedIngredientCount: 0,
          missedIngredientCount: 0,
          likes: r.aggregateLikes,
        })
      );

      setRecipes(transformedRecipes);
      setIsLoading(false);

      if (transformedRecipes.length === 0) {
        return {
          success: true,
          message: `😔 No recipes found for "${recipeName}". Try a different name!`,
          data: [],
        };
      }

      return {
        success: true,
        message: `🥞 Found ${transformedRecipes.length} ${recipeName} recipes`,
        data: transformedRecipes,
        action: {
          type: "UPDATE_TAB",
          target: "finder",
          payload: transformedRecipes,
        },
      };
    } catch (err: any) {
      console.error("Error searching recipes by name:", err);
      const errorMsg =
        err.response?.status === 402
          ? "API quota exceeded. Please try again tomorrow."
          : err.response?.data?.message ||
            "Failed to search recipes. Please try again.";

      setError(errorMsg);
      setIsLoading(false);

      return {
        success: false,
        message: `❌ ${errorMsg}`,
      };
    }
  }

  // ===== RECIPE SEARCH BY CATEGORY =====
  if (ast.type === "RECIPE_SEARCH_BY_CATEGORY") {
    const { category, mealTime } = ast.payload;

    setIsLoading(true);
    setError(null);

    try {
      const params: any = {
        apiKey: API_KEY,
        number: 12,
        addRecipeInformation: true,
      };

      // Map category to Spoonacular tags
      if (category) {
        const categoryMap: Record<string, string> = {
          healthy: "healthy",
          "low-calorie": "low-calorie",
          "high-protein": "high-protein",
          vegetarian: "vegetarian",
          vegan: "vegan",
          "gluten-free": "gluten-free",
          quick: "quick",
          easy: "easy",
        };
        params.tags = categoryMap[category] || category;
      }

      // Map meal time to Spoonacular type
      if (mealTime) {
        const mealTypeMap: Record<string, string> = {
          breakfast: "breakfast",
          lunch: "main course",
          dinner: "main course",
          snack: "snack",
        };
        params.type = mealTypeMap[mealTime];
      }

      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params,
      });

      const transformedRecipes = (response.data.results || []).map(
        (r: any) => ({
          id: r.id,
          title: r.title,
          image: r.image,
          usedIngredientCount: 0,
          missedIngredientCount: 0,
          likes: r.aggregateLikes,
        })
      );

      setRecipes(transformedRecipes);
      setIsLoading(false);

      const categoryText = category || "all";
      const mealTimeText = mealTime ? ` for ${mealTime}` : "";

      if (transformedRecipes.length === 0) {
        return {
          success: true,
          message: `😔 No ${categoryText} recipes found${mealTimeText}`,
          data: [],
        };
      }

      return {
        success: true,
        message: `🍽️ Found ${transformedRecipes.length} ${categoryText} recipes${mealTimeText}`,
        data: transformedRecipes,
        action: {
          type: "UPDATE_TAB",
          target: "finder",
          payload: transformedRecipes,
        },
      };
    } catch (err: any) {
      console.error("Error searching recipes by category:", err);
      const errorMsg =
        err.response?.status === 402
          ? "API quota exceeded. Please try again tomorrow."
          : err.response?.data?.message ||
            "Failed to search recipes. Please try again.";

      setError(errorMsg);
      setIsLoading(false);

      return {
        success: false,
        message: `❌ ${errorMsg}`,
      };
    }
  }

  return {
    success: false,
    message: `❌ Unknown recipe command: ${ast.type}`,
  };
}

// ============================================
// NUTRITION COMMANDS
// ============================================

/**
 * Execute nutrition query commands
 * Tái sử dụng logic từ DailyTracker.tsx
 */
export function executeNutritionCommand(
  ast: AST,
  mealLogHook: MealLogHook
): InterpreterResponse {
  const { mealLogs, dailyGoal } = mealLogHook;

  // ===== NUTRITION QUERY =====
  if (ast.type === "NUTRITION_QUERY") {
    const { date, metric, timeRange } = ast.payload;
    const targetDate = date || new Date().toISOString().split("T")[0];

    // ✅ Same logic as DailyTracker.tsx getTodayTotals() (line 50-61)
    const todayMeals = mealLogs.filter((meal) => meal.date === targetDate);
    const totals = todayMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    const percentage = Math.round((totals.calories / dailyGoal.calories) * 100);
    const progressBar = createProgressBar(percentage);

    let message = `📊 **Nutrition Summary ${
      timeRange === "today" ? "Today" : timeRange || ""
    }**\n\n`;

    if (metric === "calories" || !metric) {
      message += `Calories: ${totals.calories} / ${dailyGoal.calories} cal (${percentage}%)\n${progressBar}\n\n`;
    }

    if (!metric || metric === "protein") {
      message += `🥩 Protein: ${totals.protein}g / ${dailyGoal.protein}g\n`;
    }

    if (!metric || metric === "carbs") {
      message += `🍞 Carbs: ${totals.carbs}g / ${dailyGoal.carbs}g\n`;
    }

    if (!metric || metric === "fat") {
      message += `🥑 Fats: ${totals.fats}g / ${dailyGoal.fats}g\n`;
    }

    return {
      success: true,
      message,
      data: { totals, percentage, meals: todayMeals },
      action: {
        type: "UPDATE_TAB",
        target: "tracker",
      },
    };
  }

  // ===== NUTRITION DETAIL =====
  if (ast.type === "NUTRITION_DETAIL") {
    const { date, metric } = ast.payload;

    if (!metric) {
      return {
        success: false,
        message:
          "❌ Please specify a nutrient. Try: 'how much protein did I eat'",
      };
    }

    const targetDate = date || new Date().toISOString().split("T")[0];
    const todayMeals = mealLogs.filter((meal) => meal.date === targetDate);
    const totals = todayMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );

    const metricMap: Record<
      string,
      { value: number; goal: number; unit: string }
    > = {
      calories: {
        value: totals.calories,
        goal: dailyGoal.calories,
        unit: "cal",
      },
      protein: { value: totals.protein, goal: dailyGoal.protein, unit: "g" },
      carbs: { value: totals.carbs, goal: dailyGoal.carbs, unit: "g" },
      fat: { value: totals.fats, goal: dailyGoal.fats, unit: "g" },
      fats: { value: totals.fats, goal: dailyGoal.fats, unit: "g" },
    };

    const data = metricMap[metric.toLowerCase()];

    if (!data) {
      return {
        success: false,
        message: `❌ Unknown nutrient: ${metric}. Try calories, protein, carbs, or fats.`,
      };
    }

    const percentage = Math.round((data.value / data.goal) * 100);

    return {
      success: true,
      message: `📊 Your ${metric} intake: **${data.value}${data.unit}** / ${data.goal}${data.unit} (${percentage}%)`,
      data: { metric, value: data.value, goal: data.goal, percentage },
    };
  }

  // ===== DIET BALANCE CHECK =====
  if (ast.type === "DIET_BALANCE_CHECK") {
    const { timeRange } = ast.payload;
    const targetDate = new Date().toISOString().split("T")[0];

    const todayMeals = mealLogs.filter((meal) => meal.date === targetDate);
    const totals = todayMeals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { protein: 0, carbs: 0, fats: 0 }
    );

    const totalMacros = totals.protein + totals.carbs + totals.fats;

    if (totalMacros === 0) {
      return {
        success: true,
        message: "📊 No meals logged yet. Start tracking to see your balance!",
      };
    }

    const proteinPercent = Math.round((totals.protein / totalMacros) * 100);
    const carbsPercent = Math.round((totals.carbs / totalMacros) * 100);
    const fatsPercent = Math.round((totals.fats / totalMacros) * 100);

    // Recommended ratios: Protein 30%, Carbs 40%, Fats 30%
    const isBalanced =
      proteinPercent >= 25 &&
      proteinPercent <= 35 &&
      carbsPercent >= 35 &&
      carbsPercent <= 50 &&
      fatsPercent >= 25 &&
      fatsPercent <= 35;

    const emoji = isBalanced ? "✅" : "⚠️";
    const status = isBalanced
      ? "Your diet is well balanced!"
      : "Your diet could be more balanced.";

    return {
      success: true,
      message: `${emoji} **${status}**\n\n🥩 Protein: ${proteinPercent}% (${totals.protein}g)\n🍞 Carbs: ${carbsPercent}% (${totals.carbs}g)\n🥑 Fats: ${fatsPercent}% (${totals.fats}g)\n\n💡 Recommended: Protein 30%, Carbs 40%, Fats 30%`,
      data: { proteinPercent, carbsPercent, fatsPercent, isBalanced },
    };
  }

  // ===== NUTRIENT CHECK =====
  if (ast.type === "NUTRIENT_CHECK") {
    const { nutrient, targetAmount } = ast.payload;

    if (!nutrient) {
      return {
        success: false,
        message:
          "❌ Please specify a nutrient. Try: 'am I eating enough protein?'",
      };
    }

    const targetDate = new Date().toISOString().split("T")[0];
    const todayMeals = mealLogs.filter((meal) => meal.date === targetDate);
    const totals = todayMeals.reduce(
      (acc, meal) => ({
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { protein: 0, carbs: 0, fats: 0 }
    );

    const nutrientMap: Record<string, { value: number; target: number }> = {
      protein: {
        value: totals.protein,
        target: targetAmount || dailyGoal.protein,
      },
      carbs: { value: totals.carbs, target: targetAmount || dailyGoal.carbs },
      fat: { value: totals.fats, target: targetAmount || dailyGoal.fats },
      fats: { value: totals.fats, target: targetAmount || dailyGoal.fats },
    };

    const data = nutrientMap[nutrient.toLowerCase()];

    if (!data) {
      return {
        success: false,
        message: `❌ Unknown nutrient: ${nutrient}. Try protein, carbs, or fats.`,
      };
    }

    const percentage = Math.round((data.value / data.target) * 100);
    const isEnough = data.value >= data.target;
    const emoji = isEnough ? "✅" : "⚠️";

    return {
      success: true,
      message: `${emoji} You've consumed **${
        data.value
      }g** of ${nutrient} (${percentage}% of ${data.target}g target)${
        isEnough ? "!" : ". Try to eat more!"
      }`,
      data: { nutrient, value: data.value, target: data.target, percentage },
    };
  }

  return {
    success: false,
    message: `❌ Unknown nutrition command: ${ast.type}`,
  };
}

// ============================================
// MEAL LOG COMMANDS
// ============================================

/**
 * Execute meal logging commands
 * Tái sử dụng useMealLogs.addMealLog()
 */
export function executeMealLogCommand(
  ast: AST,
  mealLogHook: MealLogHook,
  context?: { currentRecipe?: any }
): InterpreterResponse {
  const { addMealLog } = mealLogHook;

  // ===== MEAL LOG FROM RECIPE =====
  if (ast.type === "MEAL_LOG") {
    const { mealType, servings } = ast.payload;

    if (!mealType) {
      return {
        success: false,
        message: "❌ Please specify meal type. Try: 'add this to lunch'",
      };
    }

    if (!context?.currentRecipe) {
      return {
        success: false,
        message: "❌ No recipe selected. Please open a recipe first!",
      };
    }

    const recipe = context.currentRecipe;

    // Extract nutrition from recipe (same logic as RecipeDetailModal)
    const findNutrient = (name: string): number => {
      const nutrient = recipe.nutrition?.nutrients?.find(
        (n: any) => n.name.toLowerCase() === name.toLowerCase()
      );
      return nutrient ? Math.round(nutrient.amount) : 0;
    };

    const nutrition = {
      calories: findNutrient("Calories"),
      protein: findNutrient("Protein"),
      carbs: findNutrient("Carbohydrates"),
      fats: findNutrient("Fat"),
    };

    const servingMultiplier = servings || 1;

    // ✅ Call existing hook (same as DailyTracker's onAddMeal)
    addMealLog({
      mealType,
      name: recipe.title,
      calories: nutrition.calories * servingMultiplier,
      protein: nutrition.protein * servingMultiplier,
      carbs: nutrition.carbs * servingMultiplier,
      fats: nutrition.fats * servingMultiplier,
      image: recipe.image,
    });

    return {
      success: true,
      message: `✅ Added **${recipe.title}** to ${mealType}!\n📊 +${
        nutrition.calories * servingMultiplier
      } calories`,
      action: {
        type: "UPDATE_TAB",
        target: "tracker",
      },
    };
  }

  // ===== MEAL LOG CUSTOM =====
  if (ast.type === "MEAL_LOG_CUSTOM") {
    const { mealType, customMeal } = ast.payload;

    if (!mealType || !customMeal) {
      return {
        success: false,
        message:
          "❌ Invalid format. Try: 'log breakfast: oatmeal 300 calories'",
      };
    }

    // ✅ Call existing hook
    addMealLog({
      mealType,
      name: customMeal.name,
      calories: customMeal.calories,
      protein: customMeal.protein || 0,
      carbs: customMeal.carbs || 0,
      fats: customMeal.fats || 0,
    });

    return {
      success: true,
      message: `✅ Logged **${customMeal.name}** to ${mealType}!\n📊 +${customMeal.calories} calories`,
      action: {
        type: "UPDATE_TAB",
        target: "tracker",
      },
    };
  }

  return {
    success: false,
    message: `❌ Unknown meal log command: ${ast.type}`,
  };
}

// ============================================
// MEAL SUGGESTION & PLANNING COMMANDS
// ============================================

/**
 * Execute meal suggestion commands
 */
export async function executeMealSuggestionCommand(
  ast: AST,
  mealLogHook: MealLogHook,
  recipeHook: RecipeHook
): Promise<InterpreterResponse> {
  if (!API_KEY) {
    return {
      success: false,
      message: "❌ API key is missing",
    };
  }

  // ===== MEAL SUGGESTION =====
  if (ast.type === "MEAL_SUGGESTION") {
    const {
      targetCalories,
      mealTime,
      dietaryRestrictions,
      preferredIngredients,
      avoidIngredients,
    } = ast.payload;

    const { mealLogs, dailyGoal } = mealLogHook;
    const { setRecipes, setIsLoading } = recipeHook;

    // Calculate remaining calories
    const targetDate = new Date().toISOString().split("T")[0];
    const todayMeals = mealLogs.filter((meal) => meal.date === targetDate);
    const todayCalories = todayMeals.reduce((sum, m) => sum + m.calories, 0);
    const remaining = dailyGoal.calories - todayCalories;
    const maxCalories = targetCalories || Math.max(remaining, 500);

    setIsLoading(true);

    try {
      const params: any = {
        apiKey: API_KEY,
        number: 5,
        maxCalories,
        addRecipeInformation: true,
        addRecipeNutrition: true,
      };

      if (mealTime) {
        const typeMap: Record<string, string> = {
          breakfast: "breakfast",
          lunch: "main course",
          dinner: "main course",
          snack: "snack",
        };
        params.type = typeMap[mealTime];
      }

      if (dietaryRestrictions && dietaryRestrictions.length > 0) {
        params.diet = dietaryRestrictions[0];
      }

      if (preferredIngredients && preferredIngredients.length > 0) {
        params.includeIngredients = preferredIngredients.join(",");
      }

      if (avoidIngredients && avoidIngredients.length > 0) {
        params.excludeIngredients = avoidIngredients.join(",");
      }

      const response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
        params,
      });

      const suggestions = response.data.results || [];
      setRecipes(suggestions);
      setIsLoading(false);

      if (suggestions.length === 0) {
        return {
          success: true,
          message: `😔 No suggestions found for ${
            mealTime || "meal"
          } under ${maxCalories} cal`,
          data: [],
        };
      }

      const topSuggestion = suggestions[0];
      const calories =
        topSuggestion.nutrition?.nutrients?.find(
          (n: any) => n.name === "Calories"
        )?.amount || 0;

      return {
        success: true,
        message: `🍽️ **Suggested ${mealTime || "meal"}:**\n${
          topSuggestion.title
        } (~${Math.round(
          calories
        )} cal)\n\nYou have ${remaining} calories remaining today.`,
        data: suggestions,
        action: {
          type: "UPDATE_TAB",
          target: "finder",
          payload: suggestions,
        },
      };
    } catch (error: any) {
      setIsLoading(false);
      return {
        success: false,
        message: `❌ Failed to get suggestions: ${error.message}`,
      };
    }
  }

  // ===== MEAL PLAN =====
  if (ast.type === "MEAL_PLAN") {
    const { planDate, targetDailyCalories, mealsCount } = ast.payload;

    const { setIsLoading } = recipeHook;
    const caloriesPerMeal = (targetDailyCalories || 2000) / (mealsCount || 3);

    setIsLoading(true);

    try {
      const [breakfastRes, lunchRes, dinnerRes] = await Promise.all([
        axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            apiKey: API_KEY,
            number: 1,
            maxCalories: caloriesPerMeal,
            type: "breakfast",
            addRecipeNutrition: true,
          },
        }),
        axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            apiKey: API_KEY,
            number: 1,
            maxCalories: caloriesPerMeal,
            type: "main course",
            addRecipeNutrition: true,
          },
        }),
        axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            apiKey: API_KEY,
            number: 1,
            maxCalories: caloriesPerMeal,
            type: "main course",
            addRecipeNutrition: true,
          },
        }),
      ]);

      const plan = {
        breakfast: breakfastRes.data.results[0],
        lunch: lunchRes.data.results[0],
        dinner: dinnerRes.data.results[0],
      };

      setIsLoading(false);

      const totalCalories =
        (plan.breakfast?.nutrition?.nutrients?.find(
          (n: any) => n.name === "Calories"
        )?.amount || 0) +
        (plan.lunch?.nutrition?.nutrients?.find(
          (n: any) => n.name === "Calories"
        )?.amount || 0) +
        (plan.dinner?.nutrition?.nutrients?.find(
          (n: any) => n.name === "Calories"
        )?.amount || 0);

      return {
        success: true,
        message: `📅 **Meal Plan for ${planDate || "Today"}** (~${Math.round(
          totalCalories
        )} cal)\n\n🌅 Breakfast: ${plan.breakfast?.title || "N/A"}\n🌞 Lunch: ${
          plan.lunch?.title || "N/A"
        }\n🌙 Dinner: ${plan.dinner?.title || "N/A"}`,
        data: plan,
      };
    } catch (error: any) {
      setIsLoading(false);
      return {
        success: false,
        message: `❌ Failed to create meal plan: ${error.message}`,
      };
    }
  }

  return {
    success: false,
    message: `❌ Unknown meal suggestion command: ${ast.type}`,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

function createProgressBar(percentage: number): string {
  const filled = Math.min(Math.round(percentage / 10), 10);
  const empty = 10 - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}
