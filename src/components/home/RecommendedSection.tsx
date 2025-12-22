import React from "react";
import axios from "axios";
import { fetchWithCache, CacheKeys, CACHE_DURATIONS } from "../../utils/cache";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  healthScore?: number;
}

interface RecommendedSectionProps {
  onRecipeClick: (recipeId: number) => void;
}

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const RecommendedSection: React.FC<RecommendedSectionProps> = ({
  onRecipeClick,
}) => {
  const [recommendedRecipes, setRecommendedRecipes] = React.useState<Recipe[]>(
    []
  );
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchRecommendations();
  }, []);

  const fetchRecommendations = async () => {
    setIsLoading(true);
    try {
      const viewedIds = localStorage.getItem("platewise_recently_viewed");
      const savedIds = localStorage.getItem("platewise_saved_recipes");

      const hasHistory =
        (viewedIds && JSON.parse(viewedIds).length > 0) ||
        (savedIds && JSON.parse(savedIds).length > 0);

      const cacheKey = hasHistory
        ? `${CacheKeys.RECOMMENDED_RECIPES}_personalized`
        : `${CacheKeys.RECOMMENDED_RECIPES}_popular`;

      const recipes = await fetchWithCache<Recipe[]>(
        cacheKey,
        async () => {
          let response;

          if (hasHistory) {
            const allIds = [
              ...(viewedIds ? JSON.parse(viewedIds) : []),
              ...(savedIds ? JSON.parse(savedIds) : []),
            ];

            if (allIds.length > 0) {
              const randomId =
                allIds[Math.floor(Math.random() * allIds.length)];
              response = await axios.get(
                `${BASE_URL}/recipes/${randomId}/similar`,
                {
                  params: {
                    apiKey: API_KEY,
                    number: 6,
                  },
                }
              );

              if (response.data.length > 0) {
                const ids = response.data.map((r: any) => r.id).join(",");
                const detailResponse = await axios.get(
                  `${BASE_URL}/recipes/informationBulk`,
                  {
                    params: {
                      apiKey: API_KEY,
                      ids: ids,
                    },
                  }
                );
                return detailResponse.data;
              }
            }
          }

          response = await axios.get(`${BASE_URL}/recipes/random`, {
            params: {
              apiKey: API_KEY,
              number: 6,
              tags: "healthy,easy,quick",
            },
          });

          return response.data.recipes;
        },
        CACHE_DURATIONS.MEDIUM
      );

      setRecommendedRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recommended recipes:", error);

      try {
        const fallbackResponse = await axios.get(
          `${BASE_URL}/recipes/complexSearch`,
          {
            params: {
              apiKey: API_KEY,
              number: 6,
              sort: "popularity",
              addRecipeInformation: true,
            },
          }
        );
        setRecommendedRecipes(fallbackResponse.data.results);
      } catch (fallbackError) {
        console.error("Fallback error:", fallbackError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const hasUserHistory = () => {
    const viewedIds = localStorage.getItem("platewise_recently_viewed");
    const savedIds = localStorage.getItem("platewise_saved_recipes");
    return (
      (viewedIds && JSON.parse(viewedIds).length > 0) ||
      (savedIds && JSON.parse(savedIds).length > 0)
    );
  };

  return (
    <section
      className="py-16 lg:py-20 relative overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom right, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span>
                {hasUserHistory() ? "Curated for You" : "Trending Now"}
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              {hasUserHistory() ? "Recommended for You" : "Popular Recipes"}
            </h2>
            <p className="text-base text-gray-600">
              {hasUserHistory()
                ? "Based on your taste and preferences"
                : "Trending recipes you might love"}
            </p>
          </div>
          {!isLoading && recommendedRecipes.length > 0 && (
            <button
              onClick={fetchRecommendations}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-green-600 text-white font-semibold shadow-lg hover:shadow-xl hover:bg-green-700 transition-all duration-200"
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
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
              Refresh
            </button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 animate-pulse"
              >
                <div className="h-48 bg-gray-200"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded-lg mb-3"></div>
                  <div className="flex gap-2">
                    <div className="h-7 bg-gray-200 rounded-lg w-20"></div>
                    <div className="h-7 bg-gray-200 rounded-lg w-16"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedRecipes.map((recipe, index) => (
              <div
                key={recipe.id}
                onClick={() => onRecipeClick(recipe.id)}
                style={{ animationDelay: `${index * 100}ms` }}
                className="group bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 border border-gray-100 animate-fade-in"
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Healthy badge only */}
                  {recipe.healthScore && recipe.healthScore > 70 && (
                    <div className="absolute top-3 right-3 px-2.5 py-1.5 rounded-lg bg-white/95 backdrop-blur-sm shadow-md">
                      <div className="flex items-center gap-1.5">
                        <svg
                          className="w-3.5 h-3.5 text-emerald-600"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-gray-900">
                          Healthy
                        </span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-green-600 transition-colors leading-snug">
                    {recipe.title}
                  </h3>
                  <div className="flex items-center gap-2">
                    {recipe.readyInMinutes && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-50">
                        <svg
                          className="w-3.5 h-3.5 text-green-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700">
                          {recipe.readyInMinutes}m
                        </span>
                      </div>
                    )}
                    {recipe.servings && (
                      <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-gray-50">
                        <svg
                          className="w-3.5 h-3.5 text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-gray-700">
                          {recipe.servings}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecommendedSection;
