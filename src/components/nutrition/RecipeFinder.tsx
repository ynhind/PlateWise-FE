import React from "react";
import axios from "axios";

interface Recipe {
  id: number;
  title: string;
  image: string;
  usedIngredientCount: number;
  missedIngredientCount: number;
  likes?: number;
}

interface RecipeFinderProps {
  recipes: Recipe[];
  setRecipes: React.Dispatch<React.SetStateAction<Recipe[]>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  onRecipeClick: (recipeId: number) => void;
}

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const RecipeFinder: React.FC<RecipeFinderProps> = ({
  recipes,
  setRecipes,
  isLoading,
  setIsLoading,
  error,
  setError,
  onRecipeClick,
}) => {
  const [selectedIngredients, setSelectedIngredients] = React.useState<
    string[]
  >([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [searchType, setSearchType] = React.useState<"ingredients" | "recipe">(
    "ingredients"
  );

  const popularIngredients = [
    { id: 1, name: "Chicken", icon: "🍗", category: "Protein" },
    { id: 2, name: "Rice", icon: "🍚", category: "Grain" },
    { id: 3, name: "Tomato", icon: "🍅", category: "Vegetable" },
    { id: 4, name: "Egg", icon: "🥚", category: "Protein" },
    { id: 5, name: "Onion", icon: "🧅", category: "Vegetable" },
    { id: 6, name: "Garlic", icon: "🧄", category: "Vegetable" },
    { id: 7, name: "Beef", icon: "🥩", category: "Protein" },
    { id: 8, name: "Fish", icon: "🐟", category: "Protein" },
    { id: 9, name: "Milk", icon: "🥛", category: "Dairy" },
    { id: 10, name: "Cheese", icon: "🧀", category: "Dairy" },
    { id: 11, name: "Potato", icon: "🥔", category: "Vegetable" },
    { id: 12, name: "Carrot", icon: "🥕", category: "Vegetable" },
  ];

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const handleSearch = async () => {
    if (!API_KEY) {
      setError(
        "API key is missing. Please add VITE_SPOONACULAR_API_KEY to your .env file."
      );
      return;
    }

    if (searchType === "ingredients" && selectedIngredients.length === 0) {
      setError("Please select at least one ingredient");
      return;
    }

    if (searchType === "recipe" && !searchQuery.trim()) {
      setError("Please enter a recipe name to search");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      let response;

      if (searchType === "ingredients") {
        response = await axios.get(`${BASE_URL}/recipes/findByIngredients`, {
          params: {
            apiKey: API_KEY,
            ingredients: selectedIngredients.join(","),
            number: 12,
            ranking: 2,
            ignorePantry: true,
          },
        });

        console.log("=== SEARCH BY INGREDIENTS API RESPONSE ===");
        console.log("Selected Ingredients:", selectedIngredients);
        console.log("Full Response:", response.data);
        console.log("Number of recipes found:", response.data.length);
        console.log("=========================================");

        setRecipes(response.data);
      } else {
        response = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
          params: {
            apiKey: API_KEY,
            query: searchQuery,
            number: 12,
            addRecipeInformation: true,
          },
        });

        console.log("=== SEARCH BY RECIPE NAME API RESPONSE ===");
        console.log("Search Query:", searchQuery);
        console.log("Full Response:", response.data);
        console.log("Results Array:", response.data.results);
        console.log(
          "Number of recipes found:",
          response.data.results?.length || 0
        );
        console.log("===========================================");

        const transformedRecipes = response.data.results.map((r: any) => ({
          id: r.id,
          title: r.title,
          image: r.image,
          usedIngredientCount: 0,
          missedIngredientCount: 0,
          likes: r.aggregateLikes,
        }));
        setRecipes(transformedRecipes);
      }
    } catch (err: any) {
      console.error("Error fetching recipes:", err);
      setError(
        err.response?.data?.message ||
          "Failed to fetch recipes. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const clearAll = () => {
    setSelectedIngredients([]);
    setSearchQuery("");
    setRecipes([]);
    setError(null);
  };

  return (
    <div>
      {/* Search Type Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => {
            setSearchType("ingredients");
            setError(null);
          }}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            searchType === "ingredients"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Search by Ingredients
        </button>
        <button
          onClick={() => {
            setSearchType("recipe");
            setError(null);
          }}
          className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
            searchType === "recipe"
              ? "bg-green-600 text-white shadow-lg"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          Search by Recipe Name
        </button>
      </div>

      {/* Search Bar for Recipe Name */}
      {searchType === "recipe" && (
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Enter recipe name (e.g., Pasta Carbonara, Chicken Curry...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              className="w-full px-6 py-4 pr-28 rounded-2xl border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg transition-colors"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-green-600 text-white font-semibold rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>
      )}

      {/* Selected Ingredients */}
      {searchType === "ingredients" && selectedIngredients.length > 0 && (
        <div className="mb-6 bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Selected Ingredients ({selectedIngredients.length})
            </h2>
            <button
              onClick={clearAll}
              className="text-sm text-red-500 hover:text-red-700 font-medium transition-colors"
            >
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium"
              >
                {ingredient}
                <button
                  onClick={() => toggleIngredient(ingredient)}
                  className="hover:bg-green-200 rounded-full p-1 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
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
              </span>
            ))}
          </div>
          <button
            onClick={handleSearch}
            disabled={isLoading}
            className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Searching..." : "Find Recipes"}
          </button>
        </div>
      )}

      {/* Popular Ingredients */}
      {searchType === "ingredients" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Popular Ingredients
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {popularIngredients.map((ingredient) => (
              <button
                key={ingredient.id}
                onClick={() => toggleIngredient(ingredient.name)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedIngredients.includes(ingredient.name)
                    ? "border-green-500 bg-green-50 shadow-md scale-105"
                    : "border-gray-200 bg-white hover:border-green-300 hover:shadow-sm"
                }`}
              >
                <div className="text-4xl mb-2">{ingredient.icon}</div>
                <div className="text-sm font-semibold text-gray-900">
                  {ingredient.name}
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {ingredient.category}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Recipe Results */}
      {recipes.length > 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Found {recipes.length} Recipe{recipes.length !== 1 ? "s" : ""}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover"
                  />
                  {recipe.likes && (
                    <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-sm font-semibold text-gray-900 shadow-md flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-red-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {recipe.likes}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
                    {recipe.title}
                  </h3>

                  {searchType === "ingredients" && (
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <svg
                          className="w-4 h-4 text-green-600"
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
                        <span className="text-gray-600">
                          {recipe.usedIngredientCount} ingredients you have
                        </span>
                      </div>
                      {recipe.missedIngredientCount > 0 && (
                        <div className="flex items-center gap-2 text-sm">
                          <svg
                            className="w-4 h-4 text-orange-500"
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
                          <span className="text-gray-600">
                            {recipe.missedIngredientCount} missing ingredient
                            {recipe.missedIngredientCount !== 1 ? "s" : ""}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  <button
                    onClick={() => onRecipeClick(recipe.id)}
                    disabled={isLoading}
                    className="w-full py-2 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    View Recipe
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && recipes.length === 0 && !error && (
        <div className="text-center py-16">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-12 h-12 text-green-600"
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
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {searchType === "ingredients"
              ? "Start by selecting ingredients"
              : "Search for your favorite recipes"}
          </h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchType === "ingredients"
              ? "Choose ingredients from your pantry and we'll find delicious recipes you can make"
              : "Type a recipe name in the search bar above and press Enter or click Search"}
          </p>
        </div>
      )}
    </div>
  );
};

export default RecipeFinder;
