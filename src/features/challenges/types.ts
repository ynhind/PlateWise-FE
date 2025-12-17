export type ChallengeStatus = 'active' | 'completed' | 'joined';

export interface Challenge {
    id: string;
    title: string;
    description: string;
    coverImage: string; // URL or base64
    duration: number; // in days
    startDate?: string; // ISO Date string, only if active/joined
    status: ChallengeStatus;
}

export interface ChallengeLog {
    id: string;
    challengeId: string;
    dayNumber: number;
    date: string; // ISO Date string
    proofText: string;
    proofImageUrl?: string;
    verified: boolean; // For "Honor System", this is true on submission
}
