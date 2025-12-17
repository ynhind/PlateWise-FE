import React, { useState } from "react";
import axios from "axios";
import RecipeFinder from "../components/nutrition/RecipeFinder";
import DailyTracker from "../components/nutrition/DailyTracker";
import CalorieCalculator from "../components/nutrition/CalorieCalculator";

interface RecipeDetail {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  summary: string;
  instructions: string;
  extendedIngredients: Array<{
    id: number;
    name: string;
    amount: number;
    unit: string;
  }>;
  nutrition?: {
    nutrients: Array<{
      name: string;
      amount: number;
      unit: string;
    }>;
  };
}

interface MealLog {
  id: string;
  mealType: "breakfast" | "lunch" | "dinner" | "snack";
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image?: string;
  time: string;
  date: string; // YYYY-MM-DD format
}

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const PantryTracker = () => {
  const [activeTab, setActiveTab] = useState<
    "finder" | "tracker" | "calculator"
  >("finder");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddToMealModal, setShowAddToMealModal] = useState(false);

  // Daily Tracking with localStorage
  const [mealLogs, setMealLogs] = useState<MealLog[]>(() => {
    const saved = localStorage.getItem("platewise_meal_logs");
    return saved ? JSON.parse(saved) : [];
  });
  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = localStorage.getItem("platewise_daily_goal");
    return saved
      ? JSON.parse(saved)
      : {
          calories: 2000,
          protein: 150,
          carbs: 250,
          fats: 65,
        };
  });

  // Save meal logs to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem("platewise_meal_logs", JSON.stringify(mealLogs));
  }, [mealLogs]);

  // Save daily goal to localStorage
  React.useEffect(() => {
    localStorage.setItem("platewise_daily_goal", JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  // Calorie Calculator
  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem("platewise_user_profile");
    return saved
      ? JSON.parse(saved)
      : {
          age: 25,
          gender: "male" as "male" | "female",
          weight: 70,
          height: 170,
          activityLevel: "moderate",
        };
  });

  // Save user profile to localStorage
  React.useEffect(() => {
    localStorage.setItem("platewise_user_profile", JSON.stringify(userProfile));
  }, [userProfile]);

  const fetchRecipeDetails = async (recipeId: number) => {
    if (!API_KEY) {
      setError(
        "API key is missing. Please add VITE_SPOONACULAR_API_KEY to your .env file."
      );
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `${BASE_URL}/recipes/${recipeId}/information`,
        {
          params: {
            apiKey: API_KEY,
            includeNutrition: true,
          },
        }
      );

      // 🔍 CONSOLE LOG: Xem chi tiết recipe khi click vào món ăn
      console.log("=== RECIPE DETAIL API RESPONSE ===");
      console.log("Recipe ID:", recipeId);
      console.log("Full Recipe Data:", response.data);
      console.log("-----------------------------------");
      console.log("Title:", response.data.title);
      console.log("Image:", response.data.image);
      console.log("Servings:", response.data.servings);
      console.log("Ready in Minutes:", response.data.readyInMinutes);
      console.log("Prep Minutes:", response.data.preparationMinutes);
      console.log("Cook Minutes:", response.data.cookingMinutes);
      console.log("-----------------------------------");
      console.log("Cuisines:", response.data.cuisines);
      console.log("Dish Types:", response.data.dishTypes);
      console.log("Diets:", response.data.diets);
      console.log("-----------------------------------");
      console.log("Ingredients:", response.data.extendedIngredients);
      console.log("Nutrition:", response.data.nutrition);
      console.log("Instructions:", response.data.analyzedInstructions);
      console.log("===================================");

      setSelectedRecipe(response.data);
      setIsModalOpen(true);
    } catch (err: any) {
      console.error("Error fetching recipe details:", err);
      setError(
        err.response?.data?.message || "Failed to fetch recipe details."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShowAddToMealModal(false);
    setTimeout(() => setSelectedRecipe(null), 300);
  };

  const addMealLog = (meal: Omit<MealLog, "id" | "time" | "date">) => {
    const now = new Date();
    const newMeal: MealLog = {
      ...meal,
      id: Date.now().toString(),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: now.toISOString().split("T")[0], // YYYY-MM-DD
    };
    setMealLogs((prev) => [...prev, newMeal]);
  };

  // Get today's meals only
  const getTodayMeals = () => {
    const today = new Date().toISOString().split("T")[0];
    return mealLogs.filter((meal) => meal.date === today);
  };

  const deleteMealLog = (id: string) => {
    setMealLogs((prev) => prev.filter((meal) => meal.id !== id));
  };

  const addRecipeToMealLog = (
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    if (!selectedRecipe) return;

    const calories =
      selectedRecipe.nutrition?.nutrients.find((n) => n.name === "Calories")
        ?.amount || 0;
    const protein =
      selectedRecipe.nutrition?.nutrients.find((n) => n.name === "Protein")
        ?.amount || 0;
    const carbs =
      selectedRecipe.nutrition?.nutrients.find(
        (n) => n.name === "Carbohydrates"
      )?.amount || 0;
    const fats =
      selectedRecipe.nutrition?.nutrients.find((n) => n.name === "Fat")
        ?.amount || 0;

    addMealLog({
      mealType,
      name: selectedRecipe.title,
      calories: Math.round(calories),
      protein: Math.round(protein),
      carbs: Math.round(carbs),
      fats: Math.round(fats),
      image: selectedRecipe.image,
    });

    closeModal();
    setActiveTab("tracker");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
                <svg
                  className="w-7 h-7 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Pantry Tracker
                </h1>
                <p className="text-gray-600">
                  Your complete meal planning & tracking companion
                </p>
              </div>
            </div>

            {/* Chatbox Icon - Coming Soon */}
            <button
              className="p-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors relative group"
              title="AI Assistant (Coming Soon)"
            >
              <svg
                className="w-6 h-6 text-green-600"
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
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-pulse" />
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                AI Nutrition Assistant - Coming Soon!
              </div>
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("finder")}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === "finder"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Recipe Finder
              </div>
            </button>
            <button
              onClick={() => setActiveTab("tracker")}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === "tracker"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Daily Tracker
              </div>
            </button>
            <button
              onClick={() => setActiveTab("calculator")}
              className={`px-6 py-3 font-semibold transition-all whitespace-nowrap ${
                activeTab === "calculator"
                  ? "text-green-600 border-b-2 border-green-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                Calorie Calculator
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
            <svg
              className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <p className="text-red-800 font-medium">{error}</p>
              {!API_KEY && (
                <p className="text-red-600 text-sm mt-1">
                  Get your free API key at:{" "}
                  <a
                    href="https://spoonacular.com/food-api"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-red-700"
                  >
                    spoonacular.com/food-api
                  </a>
                </p>
              )}
            </div>
            <button
              onClick={() => setError(null)}
              className="ml-auto text-red-500 hover:text-red-700"
            >
              <svg
                className="w-5 h-5"
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
        )}

        {/* Tab Content */}
        {activeTab === "finder" && (
          <RecipeFinder
            recipes={recipes}
            setRecipes={setRecipes}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            error={error}
            setError={setError}
            onRecipeClick={fetchRecipeDetails}
          />
        )}

        {activeTab === "tracker" && (
          <DailyTracker
            mealLogs={getTodayMeals()}
            onAddMeal={addMealLog}
            onDeleteMeal={deleteMealLog}
            dailyGoal={dailyGoal}
          />
        )}

        {activeTab === "calculator" && (
          <CalorieCalculator
            userProfile={userProfile}
            onProfileUpdate={setUserProfile}
          />
        )}
      </div>

      {/* Recipe Detail Modal */}
      {isModalOpen && selectedRecipe && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-up"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900 pr-4">
                {selectedRecipe.title}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors flex-shrink-0"
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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

            {/* Modal Content */}
            <div className="p-6">
              {/* Recipe Image */}
              <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-6">
                <img
                  src={selectedRecipe.image}
                  alt={selectedRecipe.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Quick Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {selectedRecipe.readyInMinutes}
                  </div>
                  <div className="text-sm text-gray-600">Minutes</div>
                </div>
                <div className="bg-blue-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {selectedRecipe.servings}
                  </div>
                  <div className="text-sm text-gray-600">Servings</div>
                </div>
                {selectedRecipe.nutrition?.nutrients && (
                  <>
                    <div className="bg-orange-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        {Math.round(
                          selectedRecipe.nutrition.nutrients.find(
                            (n) => n.name === "Calories"
                          )?.amount || 0
                        )}
                      </div>
                      <div className="text-sm text-gray-600">Calories</div>
                    </div>
                    <div className="bg-purple-50 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round(
                          selectedRecipe.nutrition.nutrients.find(
                            (n) => n.name === "Protein"
                          )?.amount || 0
                        )}
                        g
                      </div>
                      <div className="text-sm text-gray-600">Protein</div>
                    </div>
                  </>
                )}
              </div>

              {/* Summary */}
              {selectedRecipe.summary && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Summary
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: selectedRecipe.summary }}
                  />
                </div>
              )}

              {/* Ingredients */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Ingredients
                </h3>
                <div className="bg-gray-50 rounded-xl p-4">
                  <ul className="space-y-2">
                    {selectedRecipe.extendedIngredients.map((ingredient) => (
                      <li
                        key={ingredient.id}
                        className="flex items-start gap-2"
                      >
                        <svg
                          className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700">
                          <span className="font-semibold">
                            {ingredient.amount} {ingredient.unit}
                          </span>{" "}
                          {ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Nutrition Details */}
              {selectedRecipe.nutrition?.nutrients && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Nutrition Facts
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedRecipe.nutrition.nutrients
                        .slice(0, 9)
                        .map((nutrient, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center p-3 bg-white rounded-lg"
                          >
                            <span className="text-gray-600 text-sm">
                              {nutrient.name}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {Math.round(nutrient.amount)}
                              {nutrient.unit}
                            </span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Instructions */}
              {selectedRecipe.instructions && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Instructions
                  </h3>
                  <div
                    className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: selectedRecipe.instructions,
                    }}
                  />
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
                {/* Warning if no nutrition info */}
                {!selectedRecipe.nutrition?.nutrients && (
                  <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-2">
                    <div className="flex items-start gap-3">
                      <svg
                        className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                        />
                      </svg>
                      <div>
                        <p className="font-semibold text-yellow-900 mb-1">
                          Nutrition info not available
                        </p>
                        <p className="text-sm text-yellow-800">
                          This recipe doesn't have nutrition data. After adding,
                          you can manually enter calories and macros in the{" "}
                          <strong>Daily Tracker</strong> tab by using the "Add
                          Meal or Food" button.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => setShowAddToMealModal(!showAddToMealModal)}
                  className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  {selectedRecipe.nutrition?.nutrients
                    ? "Add to Daily Tracker"
                    : "Add (Manual Entry Required)"}
                </button>

                {showAddToMealModal && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-green-50 rounded-xl">
                    <button
                      onClick={() => addRecipeToMealLog("breakfast")}
                      className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                      🌅 Breakfast
                    </button>
                    <button
                      onClick={() => addRecipeToMealLog("lunch")}
                      className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                      ☀️ Lunch
                    </button>
                    <button
                      onClick={() => addRecipeToMealLog("dinner")}
                      className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                      🌙 Dinner
                    </button>
                    <button
                      onClick={() => addRecipeToMealLog("snack")}
                      className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                    >
                      🍪 Snack
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PantryTracker;
