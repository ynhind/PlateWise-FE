import { useState } from "react";
import axios from "axios";

export interface RecipeDetail {
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

export const useRecipes = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<RecipeDetail | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showAddToMealModal, setShowAddToMealModal] = useState(false);

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

  return {
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
  };
};
