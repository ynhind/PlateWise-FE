// src/features/challenges/types.ts

export type ChallengeStatus = 'active' | 'completed' | 'joined';

export interface ChallengeRank {
    name: string;      // Tên danh hiệu (VD: "Dũng Sĩ Diệt Đường")
    icon: string;      // Emoji hoặc Icon (VD: "⚔️")
    threshold: number; // Mốc phần trăm cần đạt (0, 25, 50, 100)
    color: string;     // Class màu sắc (VD: "text-purple-500")
}

export interface FriendProgress {
    id: string;
    name: string;
    avatar: string;
    progress: number;   
    lastActive: string; 
}

export interface Challenge {
    id: string;
    title: string;
    description: string;
    coverImage: string;
    duration: number;
    startDate?: string;
    status: ChallengeStatus;
    isSystem?: boolean;
    tags: string[];
    ranks?: ChallengeRank[]; 
    participants?: FriendProgress[];
}

export interface ChallengeLog {
    id: string;
    challengeId: string;
    dayNumber: number;
    date: string;
    proofText: string;
    proofImageUrl?: string;
    verified: boolean;
}