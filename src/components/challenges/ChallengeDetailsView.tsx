// src/components/challenges/ChallengeDetailsView.tsx

import React, { useState } from "react";
import { useChallenges } from "../../hooks/useChallenges";
import { TimelineDay } from "./TimelineDay";
import { Leaderboard } from "./Leaderboard"; // Import component mới
import { MOCK_FRIENDS } from "../../pages/ChallengeContext"; // Lấy danh sách bạn bè ảo

interface ChallengeDetailsViewProps {
    challengeId: string;
    onBack: () => void;
}

export const ChallengeDetailsView: React.FC<ChallengeDetailsViewProps> = ({
    challengeId,
    onBack,
}) => {
    const { activeChallenges, getLogsForChallenge, addLog, calculateProgress } = useChallenges();
    const challenge = activeChallenges.find((c) => c.id === challengeId);
    const logs = getLogsForChallenge(challengeId);
    
    // State để chuyển Tab
    const [viewMode, setViewMode] = useState<"journey" | "leaderboard">("journey");

    if (!challenge) return <div>Challenge not found</div>;

    const days = Array.from({ length: challenge.duration }, (_, i) => i + 1);
    const progress = calculateProgress(challengeId, challenge.duration);
    const isFinished = progress === 100;

    // --- LOGIC TÍNH DANH HIỆU HIỆN TẠI ---
    const getCurrentRank = () => {
        if (!challenge.ranks || challenge.ranks.length === 0) {
            return { name: "Challenger", icon: "🌱", color: "text-gray-500" };
        }
        // Lấy rank cao nhất mà progress hiện tại thỏa mãn
        const earnedRank = challenge.ranks.slice().reverse().find(r => progress >= r.threshold);
        return earnedRank || challenge.ranks[0];
    };
    
    const currentRank = getCurrentRank();

    return (
        <div className="animate-[fade-in_0.3s_ease-out]">
             <button
                onClick={onBack}
                className="mb-6 px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded-full font-semibold hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors flex items-center gap-2"
            >
                <span>←</span> Back to List
            </button>

            {/* Completion Banner */}
            {isFinished && (
                <div className="mb-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-3xl p-6 text-white shadow-lg animate-bounce-slow flex items-center gap-4">
                    <div className="text-5xl">🏆</div>
                    <div>
                        <h2 className="text-2xl font-bold">Challenge Completed!</h2>
                        <p className="text-yellow-50 opacity-90">You have earned the title: {currentRank.name}!</p>
                    </div>
                </div>
            )}

            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100 overflow-hidden mb-8 flex flex-col md:flex-row relative">
                <div className="w-full md:w-2/5 h-64 md:h-auto bg-gray-100 relative group">
                     <img 
                        src={challenge.coverImage} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                        alt="" 
                     />
                     {/* --- BADGE DANH HIỆU BÁ ĐẠO TRÊN ẢNH --- */}
                     <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-2xl border border-white/50 shadow-lg flex items-center gap-3 animate-fade-up">
                        <div className="text-4xl bg-gray-50 p-2 rounded-xl">{currentRank.icon}</div>
                        <div>
                            <div className="text-[10px] text-gray-400 uppercase font-bold tracking-wider mb-0.5">Current Title</div>
                            <div className={`font-extrabold text-base ${currentRank.color}`}>
                                {currentRank.name}
                            </div>
                        </div>
                     </div>
                </div>

                <div className="p-8 md:p-10 flex flex-col justify-center flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900">
                            {challenge.title}
                        </h1>
                         <div className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide ${isFinished ? 'bg-green-100 text-green-700' : 'bg-emerald-50 text-emerald-700 border border-emerald-100'}`}>
                            {isFinished ? 'Completed' : 'Active'}
                        </div>
                    </div>
                    
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">{challenge.description}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-8">
                         {challenge.tags?.map(tag => (
                            <span key={tag} className="px-3 py-1 rounded-lg bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600">
                                #{tag}
                            </span>
                        ))}
                    </div>

                    <div className="mt-auto bg-gray-50 rounded-2xl p-6 border border-gray-100">
                        <div className="flex items-center justify-between text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">
                            <span>Your Progress</span>
                            <span className="text-emerald-600">{progress}%</span>
                        </div>
                        <div className="w-full bg-white rounded-full h-3 overflow-hidden border border-gray-200">
                            <div 
                                className={`h-full transition-all duration-1000 ${isFinished ? 'bg-green-500' : 'bg-emerald-500'}`}
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- THANH CHUYỂN TAB (MY JOURNEY vs LEADERBOARD) --- */}
            <div className="flex justify-center mb-8">
                <div className="bg-gray-100 p-1.5 rounded-full flex gap-1 shadow-inner">
                    <button
                        onClick={() => setViewMode("journey")}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            viewMode === "journey" 
                                ? "bg-white text-emerald-600 shadow-md transform scale-105" 
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <span>📍</span> My Journey
                    </button>
                    <button
                        onClick={() => setViewMode("leaderboard")}
                        className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                            viewMode === "leaderboard" 
                                ? "bg-white text-emerald-600 shadow-md transform scale-105" 
                                : "text-gray-500 hover:text-gray-700 hover:bg-gray-200"
                        }`}
                    >
                        <span>🏆</span> Leaderboard
                    </button>
                </div>
            </div>

            {/* --- NỘI DUNG CHÍNH --- */}
            <div className="max-w-3xl mx-auto min-h-[400px]">
                {viewMode === "journey" ? (
                    // VIEW 1: TIMELINE
                    <div className="animate-[fade-in_0.3s_ease-out]">
                        <div className="flex items-center gap-4 mb-8">
                            <h2 className="text-2xl font-bold text-gray-900">Day by Day</h2>
                            <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                Day {logs.length} / {challenge.duration}
                            </span>
                        </div>
                        
                        <div className="relative pl-4">
                            <div className="absolute left-[23px] top-4 bottom-10 w-0.5 bg-gray-200 -z-10"></div>

                            {days.map((dayNum) => {
                                const log = logs.find((l) => l.dayNumber === dayNum);
                                return (
                                    <TimelineDay
                                        key={dayNum}
                                        dayNum={dayNum}
                                        isCompleted={!!log}
                                        challengeId={challengeId}
                                        existingLog={log}
                                        isLast={dayNum === days.length}
                                        onLogProof={(text, file) => {
                                            const imgUrl = file ? URL.createObjectURL(file) : undefined;
                                            addLog({
                                                challengeId,
                                                dayNumber: dayNum,
                                                date: new Date().toISOString(),
                                                proofText: text,
                                                proofImageUrl: imgUrl,
                                                verified: true,
                                            });
                                        }}
                                    />
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    // VIEW 2: LEADERBOARD
                    <Leaderboard 
                        // Nếu là System -> Hiện bạn bè giả. Nếu là Custom -> Không hiện ai (chỉ có mình user)
                        friends={challenge.isSystem ? MOCK_FRIENDS : []} 
                        currentUserProgress={logs.length} 
                        challenge={challenge}
                    />
                )}
            </div>
        </div>
    );
};