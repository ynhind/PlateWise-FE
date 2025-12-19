import { useContext } from "react";
import { ChallengeContext } from "../pages/ChallengeContext";

export const useChallenges = () => {
    const context = useContext(ChallengeContext);
    if (context === undefined) {
        throw new Error("useChallenges must be used within a ChallengeProvider");
    }
    return context;
};
