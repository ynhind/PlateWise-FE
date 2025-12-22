import React from "react";

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

interface RecipeDetailModalProps {
  recipe: RecipeDetail;
  isOpen: boolean;
  onClose: () => void;
  onAddToMeal: (mealType: "breakfast" | "lunch" | "dinner" | "snack") => void;
  showAddToMealModal: boolean;
  setShowAddToMealModal: (show: boolean) => void;
}

const RecipeDetailModal: React.FC<RecipeDetailModalProps> = ({
  recipe,
  isOpen,
  onClose,
  onAddToMeal,
  showAddToMealModal,
  setShowAddToMealModal,
}) => {
  // Track recently viewed recipes
  React.useEffect(() => {
    if (isOpen && recipe) {
      const viewedIds = localStorage.getItem("platewise_recently_viewed");
      const ids: number[] = viewedIds ? JSON.parse(viewedIds) : [];

      // Remove if already exists to move it to front
      const filteredIds = ids.filter((id) => id !== recipe.id);

      // Add to front and keep max 10 recipes
      const updatedIds = [recipe.id, ...filteredIds].slice(0, 10);

      localStorage.setItem(
        "platewise_recently_viewed",
        JSON.stringify(updatedIds)
      );
    }
  }, [isOpen, recipe]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-up"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-2xl font-bold text-gray-900 pr-4">
            {recipe.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors shrink-0"
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
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {recipe.readyInMinutes}
              </div>
              <div className="text-sm text-gray-600">Minutes</div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">
                {recipe.servings}
              </div>
              <div className="text-sm text-gray-600">Servings</div>
            </div>
            {recipe.nutrition?.nutrients && (
              <>
                <div className="bg-orange-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">
                    {Math.round(
                      recipe.nutrition.nutrients.find(
                        (n) => n.name === "Calories"
                      )?.amount || 0
                    )}
                  </div>
                  <div className="text-sm text-gray-600">Calories</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">
                    {Math.round(
                      recipe.nutrition.nutrients.find(
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
          {recipe.summary && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Summary</h3>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: recipe.summary }}
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
                {recipe.extendedIngredients.map((ingredient) => (
                  <li key={ingredient.id} className="flex items-start gap-2">
                    <svg
                      className="w-5 h-5 text-green-600 mt-0.5 shrink-0"
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
          {recipe.nutrition?.nutrients && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Nutrition Facts
              </h3>
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {recipe.nutrition.nutrients
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
          {recipe.instructions && (
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                Instructions
              </h3>
              <div
                className="text-gray-700 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{
                  __html: recipe.instructions,
                }}
              />
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-4 border-t border-gray-200">
            {/* Warning if no nutrition info */}
            {!recipe.nutrition?.nutrients && (
              <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-4 mb-2">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-yellow-600 shrink-0 mt-0.5"
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
                      This recipe doesn't have nutrition data. After adding, you
                      can manually enter calories and macros in the{" "}
                      <strong>Daily Tracker</strong> tab by using the "Add Meal
                      or Food" button.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <button
              onClick={() => setShowAddToMealModal(!showAddToMealModal)}
              className="w-full py-3 bg-linear-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300"
            >
              {recipe.nutrition?.nutrients
                ? "Add to Daily Tracker"
                : "Add (Manual Entry Required)"}
            </button>

            {showAddToMealModal && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-4 bg-green-50 rounded-xl">
                <button
                  onClick={() => onAddToMeal("breakfast")}
                  className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  🌅 Breakfast
                </button>
                <button
                  onClick={() => onAddToMeal("lunch")}
                  className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  ☀️ Lunch
                </button>
                <button
                  onClick={() => onAddToMeal("dinner")}
                  className="py-2 px-4 bg-white hover:bg-green-100 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  🌙 Dinner
                </button>
                <button
                  onClick={() => onAddToMeal("snack")}
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
  );
};

export default RecipeDetailModal;
