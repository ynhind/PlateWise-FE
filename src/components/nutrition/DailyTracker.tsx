import React, { useState } from "react";

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

interface DailyTrackerProps {
  mealLogs: MealLog[];
  onAddMeal: (meal: Omit<MealLog, "id" | "time">, date?: string) => void;
  onDeleteMeal: (id: string) => void;
  dailyGoal: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
}

const DailyTracker: React.FC<DailyTrackerProps> = ({
  mealLogs,
  onAddMeal,
  onDeleteMeal,
  dailyGoal,
}) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0]; // YYYY-MM-DD
  });
  const [showAddMeal, setShowAddMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    mealType: "breakfast" as "breakfast" | "lunch" | "dinner" | "snack",
    name: "",
    calories: 0,
    protein: 0,
    carbs: 0,
    fats: 0,
  });

  // Filter meals by selected date
  const getFilteredMeals = () => {
    return mealLogs.filter((meal) => meal.date === selectedDate);
  };

  const filteredMeals = getFilteredMeals();

  const getTodayTotals = () => {
    return filteredMeals.reduce(
      (acc, meal) => ({
        calories: acc.calories + meal.calories,
        protein: acc.protein + meal.protein,
        carbs: acc.carbs + meal.carbs,
        fats: acc.fats + meal.fats,
      }),
      { calories: 0, protein: 0, carbs: 0, fats: 0 }
    );
  };

  const totals = getTodayTotals();
  const caloriesPercent = Math.min(
    (totals.calories / dailyGoal.calories) * 100,
    100
  );
  const proteinPercent = Math.min(
    (totals.protein / dailyGoal.protein) * 100,
    100
  );
  const carbsPercent = Math.min((totals.carbs / dailyGoal.carbs) * 100, 100);
  const fatsPercent = Math.min((totals.fats / dailyGoal.fats) * 100, 100);

  const getMealsByType = (type: "breakfast" | "lunch" | "dinner" | "snack") => {
    return filteredMeals.filter((meal) => meal.mealType === type);
  };

  const goToPreviousDay = () => {
    const date = new Date(selectedDate);
    date.setDate(date.getDate() - 1);
    setSelectedDate(date.toISOString().split("T")[0]);
  };

  const goToNextDay = () => {
    const date = new Date(selectedDate);
    const today = new Date();
    date.setDate(date.getDate() + 1);
    // Don't allow future dates
    if (date <= today) {
      setSelectedDate(date.toISOString().split("T")[0]);
    }
  };

  const goToToday = () => {
    const today = new Date();
    setSelectedDate(today.toISOString().split("T")[0]);
  };

  const isToday = selectedDate === new Date().toISOString().split("T")[0];

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const dateOnly = dateStr;
    const todayStr = today.toISOString().split("T")[0];
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (dateOnly === todayStr) return "Today";
    if (dateOnly === yesterdayStr) return "Yesterday";

    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  const handleAddMeal = () => {
    if (!newMeal.name || newMeal.calories <= 0) {
      alert("Please fill in meal name and calories");
      return;
    }
    onAddMeal({ ...newMeal, date: selectedDate }, selectedDate);
    setNewMeal({
      mealType: "breakfast",
      name: "",
      calories: 0,
      protein: 0,
      carbs: 0,
      fats: 0,
    });
    setShowAddMeal(false);
  };

  const mealTypeIcons = {
    breakfast: "🌅",
    lunch: "☀️",
    dinner: "🌙",
    snack: "🍪",
  };

  const mealTypeLabels = {
    breakfast: "Breakfast",
    lunch: "Lunch",
    dinner: "Dinner",
    snack: "Snack",
  };

  return (
    <div>
      {/* Date Navigation */}
      <div className="bg-white rounded-2xl p-6 border-2 border-gray-200 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={goToPreviousDay}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          <div className="flex items-center gap-4">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-gray-900">
                {formatDisplayDate(selectedDate)}
              </h3>
              <p className="text-sm text-gray-600">
                {new Date(selectedDate + "T00:00:00").toLocaleDateString(
                  "en-US",
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  }
                )}
              </p>
            </div>
            {!isToday && (
              <button
                onClick={goToToday}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded-lg hover:bg-green-700 transition-colors"
              >
                Today
              </button>
            )}
          </div>

          <button
            onClick={goToNextDay}
            disabled={isToday}
            className={`p-2 rounded-lg transition-colors ${
              isToday ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-100"
            }`}
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Daily Summary Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border-2 border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-orange-900">Calories</h3>
            <svg
              className="w-6 h-6 text-orange-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
              />
            </svg>
          </div>
          <div className="mb-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-orange-900">
                {totals.calories}
              </span>
              <span className="text-lg text-orange-700 mb-1">
                / {dailyGoal.calories}
              </span>
            </div>
          </div>
          <div className="w-full bg-orange-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${caloriesPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-purple-900">Protein</h3>
            <svg
              className="w-6 h-6 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
              />
            </svg>
          </div>
          <div className="mb-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-purple-900">
                {totals.protein}g
              </span>
              <span className="text-lg text-purple-700 mb-1">
                / {dailyGoal.protein}g
              </span>
            </div>
          </div>
          <div className="w-full bg-purple-200 rounded-full h-2">
            <div
              className="bg-purple-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${proteinPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-blue-900">Carbs</h3>
            <svg
              className="w-6 h-6 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z"
              />
            </svg>
          </div>
          <div className="mb-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-blue-900">
                {totals.carbs}g
              </span>
              <span className="text-lg text-blue-700 mb-1">
                / {dailyGoal.carbs}g
              </span>
            </div>
          </div>
          <div className="w-full bg-blue-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${carbsPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-yellow-900">Fats</h3>
            <svg
              className="w-6 h-6 text-yellow-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          </div>
          <div className="mb-2">
            <div className="flex items-end gap-2">
              <span className="text-3xl font-bold text-yellow-900">
                {totals.fats}g
              </span>
              <span className="text-lg text-yellow-700 mb-1">
                / {dailyGoal.fats}g
              </span>
            </div>
          </div>
          <div className="w-full bg-yellow-200 rounded-full h-2">
            <div
              className="bg-yellow-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${fatsPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Add Meal Button */}
      <div className="mb-6">
        <button
          onClick={() => setShowAddMeal(!showAddMeal)}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          Add Meal or Food
        </button>
      </div>

      {/* Add Meal Form */}
      {showAddMeal && (
        <div className="mb-8 bg-white rounded-2xl shadow-lg border-2 border-green-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xl font-bold text-gray-900">Log New Meal</h3>
            <div className="text-sm font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
              📅 {formatDisplayDate(selectedDate)}
            </div>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            💡 <strong>Tip:</strong> If you don't know nutrition values, you can
            leave Protein, Carbs, and Fats as 0, or use nutrition labels/apps
            like MyFitnessPal to find them.
          </p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meal Type
              </label>
              <select
                value={newMeal.mealType}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, mealType: e.target.value as any })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              >
                <option value="breakfast">🌅 Breakfast</option>
                <option value="lunch">☀️ Lunch</option>
                <option value="dinner">🌙 Dinner</option>
                <option value="snack">🍪 Snack</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Meal Name
              </label>
              <input
                type="text"
                placeholder="e.g., Chicken Salad"
                value={newMeal.name}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Calories
              </label>
              <input
                type="number"
                placeholder="0"
                value={newMeal.calories || ""}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, calories: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Protein (g)
              </label>
              <input
                type="number"
                placeholder="0"
                value={newMeal.protein || ""}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, protein: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Carbs (g)
              </label>
              <input
                type="number"
                placeholder="0"
                value={newMeal.carbs || ""}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, carbs: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fats (g)
              </label>
              <input
                type="number"
                placeholder="0"
                value={newMeal.fats || ""}
                onChange={(e) =>
                  setNewMeal({ ...newMeal, fats: Number(e.target.value) })
                }
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleAddMeal}
              className="flex-1 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors"
            >
              Add to Log
            </button>
            <button
              onClick={() => setShowAddMeal(false)}
              className="flex-1 py-3 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Meal Log by Type */}
      <div className="space-y-6">
        {(["breakfast", "lunch", "dinner", "snack"] as const).map(
          (mealType) => {
            const meals = getMealsByType(mealType);
            return (
              <div
                key={mealType}
                className="bg-white rounded-2xl shadow-md border border-gray-200 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <span className="text-2xl">{mealTypeIcons[mealType]}</span>
                    {mealTypeLabels[mealType]}
                  </h3>
                  <span className="text-sm text-gray-600">
                    {meals.reduce((sum, meal) => sum + meal.calories, 0)} cal
                  </span>
                </div>

                {meals.length > 0 ? (
                  <div className="space-y-3">
                    {meals.map((meal) => (
                      <div
                        key={meal.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-3 flex-1">
                          {meal.image && (
                            <img
                              src={meal.image}
                              alt={meal.name}
                              className="w-16 h-16 rounded-lg object-cover"
                            />
                          )}
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">
                              {meal.name}
                            </h4>
                            <div className="flex gap-4 text-sm text-gray-600 mt-1">
                              <span>{meal.calories} cal</span>
                              <span>{meal.protein}g protein</span>
                              <span>{meal.carbs}g carbs</span>
                              <span>{meal.fats}g fat</span>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                              {meal.time}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => onDeleteMeal(meal.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
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
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-6">
                    No meals logged yet
                  </p>
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default DailyTracker;
