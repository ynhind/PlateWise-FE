import React, { useState } from "react";

interface UserProfile {
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  activityLevel: string;
}

interface CalorieCalculatorProps {
  userProfile: UserProfile;
  onProfileUpdate: (profile: UserProfile) => void;
}

const CalorieCalculator: React.FC<CalorieCalculatorProps> = ({
  userProfile,
  onProfileUpdate,
}) => {
  const [profile, setProfile] = useState(userProfile);

  const calculateBMR = () => {
    const { age, gender, weight, height } = profile;
    // Mifflin-St Jeor Equation
    if (gender === "male") {
      return 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
      return 10 * weight + 6.25 * height - 5 * age - 161;
    }
  };

  const calculateTDEE = () => {
    const bmr = calculateBMR();
    const multipliers: { [key: string]: number } = {
      sedentary: 1.2,
      light: 1.375,
      moderate: 1.55,
      active: 1.725,
      veryActive: 1.9,
    };
    return Math.round(bmr * multipliers[profile.activityLevel]);
  };

  const getMacros = (tdee: number, goal: "maintain" | "lose" | "gain") => {
    let targetCalories = tdee;
    if (goal === "lose") targetCalories -= 500; // 500 cal deficit
    if (goal === "gain") targetCalories += 500; // 500 cal surplus

    // Standard macro split: 30% protein, 40% carbs, 30% fats
    return {
      calories: Math.round(targetCalories),
      protein: Math.round((targetCalories * 0.3) / 4), // 4 cal per gram
      carbs: Math.round((targetCalories * 0.4) / 4),
      fats: Math.round((targetCalories * 0.3) / 9), // 9 cal per gram
    };
  };

  const handleCalculate = () => {
    onProfileUpdate(profile);
  };

  const bmr = calculateBMR();
  const tdee = calculateTDEE();
  const maintainMacros = getMacros(tdee, "maintain");
  const loseMacros = getMacros(tdee, "lose");
  const gainMacros = getMacros(tdee, "gain");

  const activityLevels = [
    {
      value: "sedentary",
      label: "Sedentary",
      description: "Little to no exercise",
    },
    {
      value: "light",
      label: "Lightly Active",
      description: "Exercise 1-3 days/week",
    },
    {
      value: "moderate",
      label: "Moderately Active",
      description: "Exercise 3-5 days/week",
    },
    {
      value: "active",
      label: "Very Active",
      description: "Exercise 6-7 days/week",
    },
    {
      value: "veryActive",
      label: "Extremely Active",
      description: "Physical job + exercise daily",
    },
  ];

  return (
    <div>
      {/* Calculator Form */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Calculate Your Daily Calorie Needs
        </h2>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Age (years)
            </label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) =>
                setProfile({ ...profile, age: Number(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
              min="1"
              max="120"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex gap-3">
              <button
                onClick={() => setProfile({ ...profile, gender: "male" })}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  profile.gender === "male"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Male
              </button>
              <button
                onClick={() => setProfile({ ...profile, gender: "female" })}
                className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all ${
                  profile.gender === "female"
                    ? "bg-pink-600 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Female
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Weight (kg)
            </label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) =>
                setProfile({ ...profile, weight: Number(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
              min="1"
              max="300"
              step="0.1"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Height (cm)
            </label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) =>
                setProfile({ ...profile, height: Number(e.target.value) })
              }
              className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-green-500 focus:outline-none text-lg"
              min="1"
              max="300"
            />
          </div>
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Activity Level
          </label>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {activityLevels.map((level) => (
              <button
                key={level.value}
                onClick={() =>
                  setProfile({ ...profile, activityLevel: level.value })
                }
                className={`p-4 rounded-xl text-left transition-all ${
                  profile.activityLevel === level.value
                    ? "bg-green-100 border-2 border-green-500 shadow-md"
                    : "bg-gray-50 border-2 border-gray-200 hover:border-green-300"
                }`}
              >
                <div className="font-semibold text-gray-900 mb-1">
                  {level.label}
                </div>
                <div className="text-sm text-gray-600">{level.description}</div>
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleCalculate}
          className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold text-lg rounded-xl hover:shadow-lg transition-all duration-300"
        >
          Calculate My Calorie Needs
        </button>
      </div>

      {/* Results */}
      <div className="space-y-6">
        {/* BMR & TDEE */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-blue-900">
                  Basal Metabolic Rate
                </h3>
                <p className="text-xs text-blue-700">Calories burned at rest</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-blue-900">
              {Math.round(bmr)}
            </div>
            <div className="text-sm text-blue-700 mt-1">calories/day</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border-2 border-green-200">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
                <svg
                  className="w-6 h-6 text-white"
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
              <div>
                <h3 className="text-sm font-semibold text-green-900">
                  Total Daily Energy Expenditure
                </h3>
                <p className="text-xs text-green-700">With activity included</p>
              </div>
            </div>
            <div className="text-4xl font-bold text-green-900">{tdee}</div>
            <div className="text-sm text-green-700 mt-1">calories/day</div>
          </div>
        </div>

        {/* Goal-based Recommendations */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Recommended Daily Intake by Goal
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Weight Loss */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-orange-200 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Weight Loss
                </h3>
                <p className="text-sm text-gray-600">-0.5 kg/week</p>
              </div>
              <div className="space-y-3">
                <div className="bg-orange-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="text-2xl font-bold text-orange-600">
                    {loseMacros.calories}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Protein</div>
                    <div className="text-lg font-bold text-purple-600">
                      {loseMacros.protein}g
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Carbs</div>
                    <div className="text-lg font-bold text-blue-600">
                      {loseMacros.carbs}g
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Fats</div>
                    <div className="text-lg font-bold text-yellow-600">
                      {loseMacros.fats}g
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Maintain Weight */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-green-200 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-green-600"
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
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Maintain Weight
                </h3>
                <p className="text-sm text-gray-600">Stay at current weight</p>
              </div>
              <div className="space-y-3">
                <div className="bg-green-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="text-2xl font-bold text-green-600">
                    {maintainMacros.calories}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Protein</div>
                    <div className="text-lg font-bold text-purple-600">
                      {maintainMacros.protein}g
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Carbs</div>
                    <div className="text-lg font-bold text-blue-600">
                      {maintainMacros.carbs}g
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Fats</div>
                    <div className="text-lg font-bold text-yellow-600">
                      {maintainMacros.fats}g
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Weight Gain */}
            <div className="bg-white rounded-2xl shadow-md border-2 border-blue-200 p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg
                    className="w-8 h-8 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  Weight Gain
                </h3>
                <p className="text-sm text-gray-600">+0.5 kg/week</p>
              </div>
              <div className="space-y-3">
                <div className="bg-blue-50 rounded-lg p-3">
                  <div className="text-sm text-gray-600">Calories</div>
                  <div className="text-2xl font-bold text-blue-600">
                    {gainMacros.calories}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="bg-purple-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Protein</div>
                    <div className="text-lg font-bold text-purple-600">
                      {gainMacros.protein}g
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Carbs</div>
                    <div className="text-lg font-bold text-blue-600">
                      {gainMacros.carbs}g
                    </div>
                  </div>
                  <div className="bg-yellow-50 rounded-lg p-2 text-center">
                    <div className="text-xs text-gray-600">Fats</div>
                    <div className="text-lg font-bold text-yellow-600">
                      {gainMacros.fats}g
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
          <div className="flex gap-3">
            <svg
              className="w-6 h-6 text-blue-600 flex-shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <div>
              <h4 className="font-bold text-blue-900 mb-2">How It Works</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • <strong>BMR</strong>: Energy your body needs at complete
                  rest
                </li>
                <li>
                  • <strong>TDEE</strong>: Total calories burned including daily
                  activities
                </li>
                <li>
                  • <strong>Weight Loss</strong>: 500 calorie deficit per day
                  (-0.5 kg/week)
                </li>
                <li>
                  • <strong>Weight Gain</strong>: 500 calorie surplus per day
                  (+0.5 kg/week)
                </li>
                <li>
                  • <strong>Macros</strong>: 30% protein, 40% carbs, 30% fats
                  (adjustable based on goals)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalorieCalculator;
