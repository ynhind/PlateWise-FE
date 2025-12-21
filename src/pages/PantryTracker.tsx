import { useState } from "react";
import RecipeFinder from "../components/nutrition/RecipeFinder";
import DailyTracker from "../components/nutrition/DailyTracker";
import CalorieCalculator from "../components/nutrition/CalorieCalculator";
import RecipeDetailModal from "../components/nutrition/RecipeDetailModal";
import ChatboxPPL from "../components/common/ChatboxPPL";
import { useRecipes } from "../hooks/useRecipes";
import { useMealLogs } from "../hooks/useMealLogs";
import { useUserProfile } from "../hooks/useUserProfile";

const PantryTracker = () => {
  const [activeTab, setActiveTab] = useState<
    "finder" | "tracker" | "calculator"
  >("finder");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Custom hooks
  const {
    recipes,
    setRecipes,
    selectedRecipe,
    isLoading,
    setIsLoading,
    error,
    setError,
    isModalOpen,
    showAddToMealModal,
    setShowAddToMealModal,
    fetchRecipeDetails,
    closeModal,
  } = useRecipes();

  const { mealLogs, dailyGoal, addMealLog, deleteMealLog } = useMealLogs();

  const { userProfile, setUserProfile } = useUserProfile();

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
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-emerald-50 pt-20">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-3 mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-green-500 to-emerald-500 flex items-center justify-center shadow-lg">
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

            {/* Chatbox Icon - Active */}
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 rounded-full transition-all relative group shadow-md hover:shadow-lg"
              title="AI Assistant"
            >
              <svg
                className="w-6 h-6 text-indigo-600"
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
              {!isChatOpen && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse" />
              )}
              <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                🤖 Ask me about recipes & nutrition!
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
              className="w-5 h-5 text-red-500 shrink-0 mt-0.5"
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
            mealLogs={mealLogs}
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
      <RecipeDetailModal
        recipe={selectedRecipe!}
        isOpen={isModalOpen && selectedRecipe !== null}
        onClose={closeModal}
        onAddToMeal={addRecipeToMealLog}
        showAddToMealModal={showAddToMealModal}
        setShowAddToMealModal={setShowAddToMealModal}
      />

      {/* AI Chatbox */}
      <ChatboxPPL
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onRecipeClick={fetchRecipeDetails}
        selectedRecipe={selectedRecipe}
      />

      {/* Floating Chat Button (Mobile/Always Visible) */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl hover:scale-110 transition-all z-40 flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <span className="text-3xl">🤖</span>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full animate-pulse" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
              🤖 Ask me about recipes & nutrition!
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

export default PantryTracker;
