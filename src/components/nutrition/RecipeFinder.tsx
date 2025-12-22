import React from "react";
import axios from "axios";
import { fetchWithCache, CACHE_DURATIONS } from "../../utils/cache";

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
  const [savedRecipes, setSavedRecipes] = React.useState<number[]>(() => {
    const saved = localStorage.getItem("platewise_saved_recipes");
    return saved ? JSON.parse(saved) : [];
  });

  // Custom ingredient input states
  const [customIngredientInput, setCustomIngredientInput] = React.useState("");
  const [ingredientSuggestions, setIngredientSuggestions] = React.useState<
    Array<{ name: string; image?: string }>
  >([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  // Save to localStorage whenever savedRecipes changes
  React.useEffect(() => {
    localStorage.setItem(
      "platewise_saved_recipes",
      JSON.stringify(savedRecipes)
    );
  }, [savedRecipes]);

  const toggleSaveRecipe = (recipeId: number, event: React.MouseEvent) => {
    event.stopPropagation(); // Prevent card click
    setSavedRecipes((prev) =>
      prev.includes(recipeId)
        ? prev.filter((id) => id !== recipeId)
        : [...prev, recipeId]
    );
  };

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

  // Fetch ingredient autocomplete suggestions
  const fetchIngredientSuggestions = async (query: string) => {
    if (query.length < 2) {
      setIngredientSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);
    try {
      const cacheKey = `platewise_cache_ingredient_autocomplete_${query.toLowerCase()}`;

      const suggestions = await fetchWithCache<
        Array<{ name: string; image?: string }>
      >(
        cacheKey,
        async () => {
          const response = await axios.get(
            `${BASE_URL}/food/ingredients/autocomplete`,
            {
              params: {
                apiKey: API_KEY,
                query: query,
                number: 8,
                metaInformation: true,
              },
            }
          );
          return response.data;
        },
        CACHE_DURATIONS.LONG // Cache autocomplete for 24 hours
      );

      setIngredientSuggestions(suggestions);
    } catch (err) {
      console.error("Error fetching ingredient suggestions:", err);
      setIngredientSuggestions([]);
    } finally {
      setIsLoadingSuggestions(false);
    }
  };

  // Handle custom ingredient input change
  const handleCustomIngredientChange = (value: string) => {
    setCustomIngredientInput(value);
    setShowSuggestions(true);

    // Debounce API call
    if (value.length >= 2) {
      const timeoutId = setTimeout(() => {
        fetchIngredientSuggestions(value);
      }, 300);
      return () => clearTimeout(timeoutId);
    } else {
      setIngredientSuggestions([]);
    }
  };

  // Add custom ingredient
  const addCustomIngredient = (ingredientName: string) => {
    const trimmedName = ingredientName.trim();
    if (trimmedName && !selectedIngredients.includes(trimmedName)) {
      setSelectedIngredients((prev) => [...prev, trimmedName]);
      setCustomIngredientInput("");
      setIngredientSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle keyboard events for custom input
  const handleCustomInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && customIngredientInput.trim()) {
      e.preventDefault();
      if (ingredientSuggestions.length > 0) {
        addCustomIngredient(ingredientSuggestions[0].name);
      } else {
        addCustomIngredient(customIngredientInput);
      }
    }
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
        const cacheKey = `platewise_cache_search_ingredients_${selectedIngredients
          .sort()
          .join(",")}`;

        const recipes = await fetchWithCache<Recipe[]>(
          cacheKey,
          async () => {
            const res = await axios.get(
              `${BASE_URL}/recipes/findByIngredients`,
              {
                params: {
                  apiKey: API_KEY,
                  ingredients: selectedIngredients.join(","),
                  number: 12,
                  ranking: 2,
                  ignorePantry: true,
                },
              }
            );

            console.log("=== SEARCH BY INGREDIENTS API RESPONSE ===");
            console.log("Selected Ingredients:", selectedIngredients);
            console.log("Full Response:", res.data);
            console.log("Number of recipes found:", res.data.length);
            console.log("=========================================");

            return res.data;
          },
          CACHE_DURATIONS.MEDIUM // Cache searches for 1 hour
        );

        setRecipes(recipes);
      } else {
        const cacheKey = `platewise_cache_search_recipe_${searchQuery.toLowerCase()}`;

        const recipes = await fetchWithCache<Recipe[]>(
          cacheKey,
          async () => {
            const res = await axios.get(`${BASE_URL}/recipes/complexSearch`, {
              params: {
                apiKey: API_KEY,
                query: searchQuery,
                number: 12,
                addRecipeInformation: true,
              },
            });

            console.log("=== SEARCH BY RECIPE NAME API RESPONSE ===");
            console.log("Search Query:", searchQuery);
            console.log("Full Response:", res.data);
            console.log("Results Array:", res.data.results);
            console.log(
              "Number of recipes found:",
              res.data.results?.length || 0
            );
            console.log("===========================================");

            return res.data.results.map((r: any) => ({
              id: r.id,
              title: r.title,
              image: r.image,
              usedIngredientCount: 0,
              missedIngredientCount: 0,
              likes: r.aggregateLikes,
            }));
          },
          CACHE_DURATIONS.MEDIUM // Cache searches for 1 hour
        );

        setRecipes(recipes);
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
    setCustomIngredientInput("");
    setIngredientSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <div>
      {/* Search Type Toggle */}
      <div className="mb-6 flex gap-3">
        <button
          onClick={() => {
            setSearchType("ingredients");
            setError(null);
            setRecipes([]); // Clear recipes when switching tabs
            setSearchQuery(""); // Clear recipe name search
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
            setRecipes([]); // Clear recipes when switching tabs
            setSelectedIngredients([]); // Clear selected ingredients
            setCustomIngredientInput(""); // Clear custom input
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
        <div className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  {selectedIngredients.length}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-gray-700">
                Selected Ingredients
              </h3>
            </div>
            <button
              onClick={clearAll}
              className="text-xs text-red-600 hover:text-red-700 font-medium transition-colors flex items-center gap-1"
            >
              <svg
                className="w-3.5 h-3.5"
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
              Clear All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {selectedIngredients.map((ingredient) => (
              <span
                key={ingredient}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-green-300 text-green-700 rounded-full text-sm font-medium shadow-sm"
              >
                {ingredient}
                <button
                  onClick={() => toggleIngredient(ingredient)}
                  className="hover:bg-green-100 rounded-full p-0.5 transition-colors"
                >
                  <svg
                    className="w-3.5 h-3.5"
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

          {/* Compact Action Bar */}
          <div className="flex items-center gap-3 pt-3 border-t border-green-200">
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="flex-1 py-2.5 bg-white border-2 border-green-500 text-green-700 font-semibold rounded-lg hover:bg-green-50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
                  <span>Searching...</span>
                </>
              ) : (
                <>
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
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <span>Find Recipes</span>
                </>
              )}
            </button>
            <div className="text-xs text-gray-600 font-medium">
              {selectedIngredients.length} selected
            </div>
          </div>
        </div>
      )}

      {/* Custom Ingredient Input */}
      {searchType === "ingredients" && (
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">
            Add Custom Ingredient
          </h2>
          <div className="relative">
            <input
              type="text"
              placeholder="Type ingredient name (e.g., lobster, truffle, quinoa...)"
              value={customIngredientInput}
              onChange={(e) => handleCustomIngredientChange(e.target.value)}
              onKeyPress={handleCustomInputKeyPress}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              className="w-full px-5 py-3.5 pr-24 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
            />
            <button
              onClick={() => addCustomIngredient(customIngredientInput)}
              disabled={!customIngredientInput.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add
            </button>

            {/* Autocomplete Suggestions Dropdown */}
            {showSuggestions && customIngredientInput.length >= 2 && (
              <div className="absolute z-10 w-full mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-xl max-h-80 overflow-y-auto">
                {isLoadingSuggestions ? (
                  <div className="p-4 text-center text-gray-500">
                    <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                    <p className="mt-2 text-sm">Loading suggestions...</p>
                  </div>
                ) : ingredientSuggestions.length > 0 ? (
                  <div className="py-2">
                    {ingredientSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => addCustomIngredient(suggestion.name)}
                        className="w-full px-6 py-3 text-left hover:bg-green-50 transition-colors flex items-center gap-3"
                      >
                        {suggestion.image && (
                          <img
                            src={`https://spoonacular.com/cdn/ingredients_100x100/${suggestion.image}`}
                            alt={suggestion.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                        )}
                        <span className="text-gray-900 font-medium capitalize">
                          {suggestion.name}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 text-center text-gray-500 text-sm">
                    No suggestions found. Press Enter to add "
                    {customIngredientInput}"
                  </div>
                )}
              </div>
            )}
          </div>
          <p className="mt-2 text-sm text-gray-600">
            💡 Type at least 2 characters to see suggestions, or press Enter to
            add your own
          </p>
        </div>
      )}

      {/* Popular Ingredients */}
      {searchType === "ingredients" && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Or Choose Popular Ingredients
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
                  {/* Save Button */}
                  <button
                    onClick={(e) => toggleSaveRecipe(recipe.id, e)}
                    className={`absolute top-3 right-3 px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg transition-all duration-200 flex items-center gap-1.5 ${
                      savedRecipes.includes(recipe.id)
                        ? "bg-green-600 text-white hover:bg-green-700"
                        : "bg-white text-gray-900 hover:bg-gray-50"
                    }`}
                  >
                    <svg
                      className={`w-4 h-4 ${
                        savedRecipes.includes(recipe.id)
                          ? "text-white"
                          : "text-gray-600"
                      }`}
                      fill={
                        savedRecipes.includes(recipe.id)
                          ? "currentColor"
                          : "none"
                      }
                      stroke="currentColor"
                      strokeWidth={savedRecipes.includes(recipe.id) ? "0" : "2"}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                    {savedRecipes.includes(recipe.id) ? "Saved" : "Save"}
                  </button>
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
