import React, { useState } from "react";
import axios from "axios";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import RecommendedSection from "../components/home/RecommendedSection";
import RecipeDetailModal from "../components/nutrition/RecipeDetailModal";
import Footer from "../components/common/Footer";
import { fetchWithCache, CacheKeys, CACHE_DURATIONS } from "../utils/cache";

// ✅ CẬP NHẬT IMPORT: Dùng đường dẫn tương đối cho đồng bộ
import ChatboxPPL from "../components/common/ChatboxPPL";

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

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const Home = () => {
  const [selectedRecipe, setSelectedRecipe] =
    React.useState<RecipeDetail | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isLoadingRecipe, setIsLoadingRecipe] = React.useState(false);
  const [showAddToMealModal, setShowAddToMealModal] = React.useState(false);

  // ✅ STATE QUẢN LÝ CHATBOT
  const [isChatOpen, setIsChatOpen] = useState(false);

  const fetchRecipeDetails = async (recipeId: number) => {
    setIsLoadingRecipe(true);
    try {
      const cacheKey = `${CacheKeys.RECIPE_DETAILS}${recipeId}`;

      const recipeData = await fetchWithCache<RecipeDetail>(
        cacheKey,
        async () => {
          const response = await axios.get(
            `${BASE_URL}/recipes/${recipeId}/information`,
            {
              params: {
                apiKey: API_KEY,
                includeNutrition: true,
              },
            }
          );
          return response.data;
        },
        CACHE_DURATIONS.LONG // 24 hours for recipe details
      );

      setSelectedRecipe(recipeData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching recipe details:", error);
    } finally {
      setIsLoadingRecipe(false);
    }
  };

  const handleAddToMeal = (
    mealType: "breakfast" | "lunch" | "dinner" | "snack"
  ) => {
    if (!selectedRecipe) return;

    const today = new Date().toISOString().split("T")[0];
    const mealLogsKey = `platewise_meal_logs_${today}`;
    const existingLogs = localStorage.getItem(mealLogsKey);
    const logs = existingLogs ? JSON.parse(existingLogs) : {};

    if (!logs[mealType]) {
      logs[mealType] = [];
    }

    logs[mealType].push({
      id: selectedRecipe.id,
      title: selectedRecipe.title,
      image: selectedRecipe.image,
      calories:
        selectedRecipe.nutrition?.nutrients.find((n) => n.name === "Calories")
          ?.amount || 0,
      timestamp: new Date().toISOString(),
    });

    localStorage.setItem(mealLogsKey, JSON.stringify(logs));
    setShowAddToMealModal(false);
    setIsModalOpen(false);

    alert(`Recipe added to ${mealType}!`);
  };

  return (
    <main className="min-h-screen bg-background relative">
      <HeroSection />
      <FeaturesSection />
      <RecentlyViewedSection onRecipeClick={fetchRecipeDetails} />
      <RecommendedSection onRecipeClick={fetchRecipeDetails} />
      <HowItWorksSection />
      <Footer />

      {/* Chatbox Icon - Active */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="p-3 bg-gradient-to-br from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 rounded-full transition-all relative group shadow-md hover:shadow-lg"
        title="AI Assistant"
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
      {!isChatOpen && (
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full animate-pulse" />
      )}
      <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
        🤖 Ask me about recipes & nutrition!
      </div>
    </button>

      {/* Recipe Detail Modal */}
      {selectedRecipe && (
        <RecipeDetailModal
          recipe={selectedRecipe}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onAddToMeal={handleAddToMeal}
          showAddToMealModal={showAddToMealModal}
          setShowAddToMealModal={setShowAddToMealModal}
        />
      )}

      {/* Loading Overlay */}
      {isLoadingRecipe && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            <p className="text-gray-700 font-medium">Loading recipe...</p>
          </div>
        </div>
      )}

      {/* ✅ AI CHATBOX COMPONENT */}
      <ChatboxPPL
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onRecipeClick={fetchRecipeDetails}
        selectedRecipe={selectedRecipe}
      />

      {/* ✅ FLOATING CHAT BUTTON */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-full shadow-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center group"
          aria-label="Open AI Assistant"
        >
          <span className="text-2xl">🤖</span>
          <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full animate-pulse shadow-sm" />

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-gray-900 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap shadow-xl">
              🤖 Ask me about recipes & nutrition!
            </div>
          </div>
        </button>
      )}
    </main>
  );
};

export default Home;