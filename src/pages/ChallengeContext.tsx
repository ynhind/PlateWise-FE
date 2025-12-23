import React, { createContext, useState, useEffect, ReactNode } from "react";
import {
  Challenge,
  ChallengeLog,
  ChallengeRank,
  FriendProgress,
} from "../types/challenges.type";

// --- 1. ĐỊNH NGHĨA CÁC DANH HIỆU ---

const RANKS_NO_SUGAR: ChallengeRank[] = [
  { name: "Sugar Craver", icon: "🍭", threshold: 0, color: "text-gray-500" },
  { name: "Sugar Ninja", icon: "🥷", threshold: 30, color: "text-blue-500" },
  { name: "Sweet Slayer", icon: "⚔️", threshold: 70, color: "text-purple-500" },
  {
    name: "Zero Sugar King",
    icon: "👑",
    threshold: 100,
    color: "text-yellow-500",
  },
];

const RANKS_FASTING: ChallengeRank[] = [
  { name: "Hungry Belly", icon: "🤤", threshold: 0, color: "text-gray-500" },
  {
    name: "Discipline Disciple",
    icon: "🤐",
    threshold: 40,
    color: "text-orange-500",
  },
  { name: "Zen Master", icon: "🧘", threshold: 80, color: "text-red-500" },
  {
    name: "Ethereal Being",
    icon: "✨",
    threshold: 100,
    color: "text-emerald-500",
  },
];

const RANKS_GENERIC: ChallengeRank[] = [
  { name: "Rookie", icon: "🌱", threshold: 0, color: "text-gray-500" },
  { name: "Challenger", icon: "🔨", threshold: 50, color: "text-blue-500" },
  { name: "Champion", icon: "🛡️", threshold: 100, color: "text-yellow-500" },
];

export interface ChallengeContextType {
  activeChallenges: Challenge[];
  communityChallenges: Challenge[];
  logs: ChallengeLog[];
  joinChallenge: (id: string) => void;
  leaveChallenge: (id: string) => void;
  createChallenge: (
    challenge: Omit<Challenge, "id" | "status" | "startDate">
  ) => void;
  addLog: (log: Omit<ChallengeLog, "id">) => void;
  getLogsForChallenge: (challengeId: string) => ChallengeLog[];
  calculateProgress: (challengeId: string, duration: number) => number;
}

export const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

// --- 3. MOCK DATA ---
const MOCK_COMMUNITY_CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "30 Days of Whole Foods",
    description: "No processed foods for a month. Eat clean!",
    coverImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    duration: 30,
    status: "active",
    isSystem: true,
    tags: ["Nutrition", "Detox"],
    ranks: RANKS_NO_SUGAR,
  },
  {
    id: "c2",
    title: "Intermittent Fasting 16:8",
    description: "Stick to the 8-hour eating window.",
    coverImage:
      "https://images.unsplash.com/photo-1627483297929-37f416fec7cd?auto=format&fit=crop&w=800&q=80",
    duration: 14,
    status: "active",
    isSystem: true,
    tags: ["Health", "Weight Loss"],
    ranks: RANKS_FASTING,
  },
  {
    id: "c3",
    title: "Homemade Lunch Streak",
    description: "Save money and calories by cooking lunch at home.",
    coverImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    duration: 7,
    status: "active",
    isSystem: true,
    tags: ["Budget", "Cooking", "Health"],
    ranks: RANKS_GENERIC,
  },
];

export const MOCK_FRIENDS: FriendProgress[] = [
  {
    id: "f1",
    name: "Sarah 'The Beast'",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    progress: 28,
    lastActive: "Just now",
  },
  {
    id: "f2",
    name: "Mike 'Protein'",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    progress: 15,
    lastActive: "2h ago",
  },
  {
    id: "f3",
    name: "Jenny Healthy",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026302d",
    progress: 5,
    lastActive: "1d ago",
  },
  {
    id: "f4",
    name: "Tom Holland",
    avatar: "https://i.pravatar.cc/150?u=tom",
    progress: 12,
    lastActive: "5h ago",
  },
];

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(() => {
    try {
      const saved = localStorage.getItem("platewise_active_challenges_v6");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [communityChallenges, setCommunityChallenges] = useState<Challenge[]>(
    () => {
      try {
        const saved = localStorage.getItem("platewise_community_challenges_v6");
        return saved ? JSON.parse(saved) : MOCK_COMMUNITY_CHALLENGES;
      } catch (e) {
        return MOCK_COMMUNITY_CHALLENGES;
      }
    }
  );

  const [logs, setLogs] = useState<ChallengeLog[]>(() => {
    try {
      const saved = localStorage.getItem("platewise_challenge_logs_v6");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Sync LocalStorage
  useEffect(() => {
    localStorage.setItem(
      "platewise_active_challenges_v6",
      JSON.stringify(activeChallenges)
    );
  }, [activeChallenges]);

  useEffect(() => {
    localStorage.setItem(
      "platewise_community_challenges_v6",
      JSON.stringify(communityChallenges)
    );
  }, [communityChallenges]);

  useEffect(() => {
    localStorage.setItem("platewise_challenge_logs_v6", JSON.stringify(logs));
  }, [logs]);

  // Logic Functions
  const joinChallenge = (id: string) => {
    const challengeToJoin = communityChallenges.find((c) => c.id === id);
    if (challengeToJoin) {
      const newActive: Challenge = {
        ...challengeToJoin,
        startDate: new Date().toISOString(),
        status: "active",
      };
      setActiveChallenges((prev) => [newActive, ...prev]);
      setCommunityChallenges((prev) => prev.filter((c) => c.id !== id));
    }
  };

  const leaveChallenge = (id: string) => {
    const challengeToLeave = activeChallenges.find((c) => c.id === id);
    if (challengeToLeave) {
      setActiveChallenges((prev) => prev.filter((c) => c.id !== id));
      setLogs((prev) => prev.filter((l) => l.challengeId !== id));

      if (challengeToLeave.isSystem) {
        const resetChallenge = {
          ...challengeToLeave,
          startDate: undefined,
          status: "active" as const,
        };
        setCommunityChallenges((prev) => [...prev, resetChallenge]);
      }
    }
  };

  const createChallenge = (
    data: Omit<Challenge, "id" | "status" | "startDate">
  ) => {
    const newChallenge: Challenge = {
      ...data,
      id: crypto.randomUUID(),
      startDate: new Date().toISOString(),
      status: "active",
      isSystem: false,
      tags: (data as any).tags || ["Personal"],
      ranks: RANKS_GENERIC,
    };
    setActiveChallenges((prev) => [newChallenge, ...prev]);
  };

  const addLog = (logData: Omit<ChallengeLog, "id">) => {
    const newLog: ChallengeLog = {
      ...logData,
      id: crypto.randomUUID(),
      verified: true,
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const getLogsForChallenge = (challengeId: string) => {
    return logs.filter((log) => log.challengeId === challengeId);
  };

  const calculateProgress = (challengeId: string, duration: number) => {
    const count = logs.filter((l) => l.challengeId === challengeId).length;
    return Math.min(Math.round((count / duration) * 100), 100);
  };

  return (
    <ChallengeContext.Provider
      value={{
        activeChallenges,
        communityChallenges,
        logs,
        joinChallenge,
        leaveChallenge,
        createChallenge,
        addLog,
        getLogsForChallenge,
        calculateProgress,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};
