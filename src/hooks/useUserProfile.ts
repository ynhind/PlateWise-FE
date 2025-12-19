import { useState, useEffect } from "react";

export interface UserProfile {
  age: number;
  gender: "male" | "female";
  weight: number;
  height: number;
  activityLevel: string;
}

const USER_PROFILE_KEY = "platewise_user_profile";

export const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem(USER_PROFILE_KEY);
    return saved
      ? JSON.parse(saved)
      : {
          age: 25,
          gender: "male" as "male" | "female",
          weight: 70,
          height: 170,
          activityLevel: "moderate",
        };
  });

  // Save user profile to localStorage
  useEffect(() => {
    localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(userProfile));
  }, [userProfile]);

  return {
    userProfile,
    setUserProfile,
  };
};
