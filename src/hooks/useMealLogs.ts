import { useState, useEffect } from "react";

export interface MealLog {
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

interface DailyGoal {
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
}

const MEAL_LOGS_KEY = "platewise_meal_logs";
const DAILY_GOAL_KEY = "platewise_daily_goal";

export const useMealLogs = () => {
  const [mealLogs, setMealLogs] = useState<MealLog[]>(() => {
    const saved = localStorage.getItem(MEAL_LOGS_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  const [dailyGoal, setDailyGoal] = useState<DailyGoal>(() => {
    const saved = localStorage.getItem(DAILY_GOAL_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          calories: 2000,
          protein: 150,
          carbs: 250,
          fats: 65,
        };
  });

  // Save meal logs to localStorage
  useEffect(() => {
    localStorage.setItem(MEAL_LOGS_KEY, JSON.stringify(mealLogs));
  }, [mealLogs]);

  // Save daily goal to localStorage
  useEffect(() => {
    localStorage.setItem(DAILY_GOAL_KEY, JSON.stringify(dailyGoal));
  }, [dailyGoal]);

  const addMealLog = (
    meal: Omit<MealLog, "id" | "time" | "date">,
    date?: string
  ) => {
    const now = new Date();
    const targetDate = date || now.toISOString().split("T")[0];
    const newMeal: MealLog = {
      ...meal,
      id: Date.now().toString(),
      time: now.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      date: targetDate,
    };
    setMealLogs((prev) => [...prev, newMeal]);
  };

  const deleteMealLog = (id: string) => {
    setMealLogs((prev) => prev.filter((meal) => meal.id !== id));
  };

  return {
    mealLogs,
    dailyGoal,
    setDailyGoal,
    addMealLog,
    deleteMealLog,
  };
};
