import React from "react";
import axios from "axios";
import {
  fetchWithCache,
  CacheKeys,
  CACHE_DURATIONS,
  clearCache,
} from "../../utils/cache";

interface Recipe {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
}

interface RecentlyViewedSectionProps {
  onRecipeClick: (recipeId: number) => void;
}

const API_KEY = import.meta.env.VITE_SPOONACULAR_API_KEY;
const BASE_URL = "https://api.spoonacular.com";

const RecentlyViewedSection: React.FC<RecentlyViewedSectionProps> = ({
  onRecipeClick,
}) => {
  const [recentRecipes, setRecentRecipes] = React.useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    fetchRecentlyViewed();
  }, []);

  const fetchRecentlyViewed = async () => {
    // Get recently viewed recipe IDs from localStorage
    const viewedIds = localStorage.getItem("platewise_recently_viewed");

    if (!viewedIds) {
      return;
    }

    const ids: number[] = JSON.parse(viewedIds);

    if (ids.length === 0) {
      return;
    }

    setIsLoading(true);
    try {
      const recipesToFetch = ids.slice(0, 6); // Get max 6 recent recipes
      const cacheKey = `${
        CacheKeys.RECENTLY_VIEWED_RECIPES
      }_${recipesToFetch.join(",")}`;

      // Use cache with 24-hour duration for recipe details
      const recipes = await fetchWithCache<Recipe[]>(
        cacheKey,
        async () => {
          const response = await axios.get(
            `${BASE_URL}/recipes/informationBulk`,
            {
              params: {
                apiKey: API_KEY,
                ids: recipesToFetch.join(","),
              },
            }
          );
          return response.data;
        },
        CACHE_DURATIONS.LONG // 24 hours
      );

      setRecentRecipes(recipes);
    } catch (error) {
      console.error("Error fetching recently viewed recipes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoading && recentRecipes.length === 0) {
    return null; // Don't show section if no recent recipes
  }

  return (
    <section className="py-16 lg:py-20 relative overflow-hidden bg-white">
      {/* Background decoration - match with other sections */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow"
        style={{ animationDelay: "1s" }}
      ></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-sm font-medium">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fillRule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Your History</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
              Recently Viewed
            </h2>
            <p className="text-base text-gray-600">
              Pick up where you left off
            </p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem("platewise_recently_viewed");
              // Clear all recently viewed caches
              clearCache(CacheKeys.RECENTLY_VIEWED_RECIPES);
              setRecentRecipes([]);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white border-2 border-green-200 text-green-600 font-semibold hover:bg-red-50 hover:border-red-300 transition-all duration-200 shadow-md hover:shadow-lg"
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
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            <span>Clear History</span>
          </button>
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
            {recentRecipes.map((recipe, index) => (
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

export default RecentlyViewedSection;
