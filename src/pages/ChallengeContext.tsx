import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Challenge, ChallengeLog } from "../features/challenges/types";

export interface ChallengeContextType {
  activeChallenges: Challenge[];
  communityChallenges: Challenge[];
  logs: ChallengeLog[];
  joinChallenge: (id: string) => void;
  createChallenge: (
    challenge: Omit<Challenge, "id" | "status" | "startDate">
  ) => void;
  addLog: (log: Omit<ChallengeLog, "id">) => void;
  getLogsForChallenge: (challengeId: string) => ChallengeLog[];
}

export const ChallengeContext = createContext<ChallengeContextType | undefined>(
  undefined
);

// Mock Data
const MOCK_COMMUNITY_CHALLENGES: Challenge[] = [
  {
    id: "c1",
    title: "30 Days of Whole Foods",
    description: "No processed foods for a month. Eat clean!",
    coverImage:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    duration: 30,
    status: "active",
  },
  {
    id: "c2",
    title: "Intermittent Fasting 16:8",
    description: "Stick to the 8-hour eating window.",
    coverImage:
      "https://images.unsplash.com/photo-1627483297929-37f416fec7cd?auto=format&fit=crop&w=800&q=80",
    duration: 14,
    status: "active",
  },
  {
    id: "c3",
    title: "Homemade Lunch Streak",
    description: "Save money and calories by cooking lunch at home.",
    coverImage:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
    duration: 7,
    status: "active",
  },
];

export const ChallengeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Load initial state from localStorage or defaults
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(() => {
    const saved = localStorage.getItem("platewise_active_challenges_v2");
    if (saved) {
      console.log("Loaded active challenges from local storage");
      return JSON.parse(saved);
    }
    console.log("Loaded active challenges from default (empty)");
    return [];
  });

  const [communityChallenges, setCommunityChallenges] = useState<Challenge[]>(
    () => {
      const saved = localStorage.getItem("platewise_community_challenges_v2");
      if (saved) {
        console.log("Loaded community challenges from local storage");
        return JSON.parse(saved);
      }
      console.log("Loaded community challenges from default mock");
      return MOCK_COMMUNITY_CHALLENGES;
    }
  );

  const [logs, setLogs] = useState<ChallengeLog[]>(() => {
    const saved = localStorage.getItem("platewise_challenge_logs_v2");
    if (saved) {
      console.log("Loaded logs from local storage");
      return JSON.parse(saved);
    }
    console.log("Loaded logs from default (empty)");
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(
      "platewise_active_challenges_v2",
      JSON.stringify(activeChallenges)
    );
  }, [activeChallenges]);

  useEffect(() => {
    localStorage.setItem(
      "platewise_community_challenges_v2",
      JSON.stringify(communityChallenges)
    );
  }, [communityChallenges]);

  useEffect(() => {
    localStorage.setItem("platewise_challenge_logs_v2", JSON.stringify(logs));
  }, [logs]);

  const joinChallenge = (id: string) => {
    const challengeToJoin = communityChallenges.find((c) => c.id === id);
    if (challengeToJoin) {
      const newActive: Challenge = {
        ...challengeToJoin,
        startDate: new Date().toISOString(),
        status: "active",
      };
      setActiveChallenges((prev) => [...prev, newActive]);
      // Optional: remove from community? Or keep it? Requirement says "My Active" vs "Community".
      // Usually you don't see what you joined in community tab.
      setCommunityChallenges((prev) => prev.filter((c) => c.id !== id));
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
    };
    setActiveChallenges((prev) => [...prev, newChallenge]);
  };

  const addLog = (logData: Omit<ChallengeLog, "id">) => {
    const newLog: ChallengeLog = {
      ...logData,
      id: crypto.randomUUID(),
      verified: true, // Honor system
    };
    setLogs((prev) => [...prev, newLog]);
  };

  const getLogsForChallenge = (challengeId: string) => {
    return logs.filter((log) => log.challengeId === challengeId);
  };

  return (
    <ChallengeContext.Provider
      value={{
        activeChallenges,
        communityChallenges,
        logs,
        joinChallenge,
        createChallenge,
        addLog,
        getLogsForChallenge,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};

