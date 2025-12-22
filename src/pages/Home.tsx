import React from "react";
import axios from "axios";
import HeroSection from "../components/home/HeroSection";
import FeaturesSection from "../components/home/FeaturesSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import RecentlyViewedSection from "../components/home/RecentlyViewedSection";
import RecommendedSection from "../components/home/RecommendedSection";
import RecipeDetailModal from "../components/nutrition/RecipeDetailModal";
import Footer from "../components/common/Footer";
import { fetchWithCache, CacheKeys, CACHE_DURATIONS } from "../utils/cache";

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

    // Show success message (you can add a toast notification here)
    alert(`Recipe added to ${mealType}!`);
  };

  return (
    <main className="min-h-screen bg-background">
      <HeroSection />
      <FeaturesSection />
      <RecentlyViewedSection onRecipeClick={fetchRecipeDetails} />
      <RecommendedSection onRecipeClick={fetchRecipeDetails} />
      <HowItWorksSection />
      <Footer />

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
    </main>
  );
};

export default Home;
