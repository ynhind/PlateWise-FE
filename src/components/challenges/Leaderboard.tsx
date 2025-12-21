// src/components/challenges/Leaderboard.tsx

import React, { useState } from "react";
import { FriendProgress, Challenge } from "../../features/challenges/types";
import { useChallenges } from "../../hooks/useChallenges";

interface LeaderboardProps {
    friends: FriendProgress[];
    currentUserProgress: number;
    challenge: Challenge;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ friends, currentUserProgress, challenge }) => {
    const { simulateAddFriend } = useChallenges();
    const [showInviteModal, setShowInviteModal] = useState(false);
    
    // NEW: State để tạo hiệu ứng "Đã copy"
    const [isCopied, setIsCopied] = useState(false);

    const combinedFriends = [...friends, ...(challenge.participants || [])];

    const mePlayer = {
        id: "me",
        name: "You",
        avatar: "https://ui-avatars.com/api/?name=You&background=10b981&color=fff",
        progress: currentUserProgress,
        lastActive: "Active now",
        isMe: true
    };

    const allPlayers = [...combinedFriends, mePlayer].sort((a, b) => b.progress - a.progress);

    const getRank = (currentDay: number) => {
        if (!challenge.ranks || challenge.ranks.length === 0) {
            return { name: "Rookie", icon: "🌱", color: "text-gray-500" };
        }
        const percent = (currentDay / challenge.duration) * 100;
        const earnedRank = challenge.ranks.slice().reverse().find(r => percent >= r.threshold);
        return earnedRank || challenge.ranks[0];
    };

    // --- SỬA LOGIC SHARE TẠI ĐÂY ---
    const handleShare = () => {
        const url = window.location.href;
        
        // Copy link vào bộ nhớ tạm
        navigator.clipboard.writeText(url).then(() => {
            // Hiệu ứng Visual: Đổi chữ nút bấm
            setIsCopied(true);
            
            // Sau 2 giây thì reset lại nút như cũ
            setTimeout(() => {
                setIsCopied(false);
                // setShowInviteModal(false); // Nếu muốn tự tắt modal luôn thì bỏ comment dòng này
            }, 2000);
        }).catch(() => {
            alert("Failed to copy link");
        });
    };

    const handleAddBot = () => {
        simulateAddFriend(challenge.id);
        setShowInviteModal(false);
    };

    return (
        <div className="bg-white rounded-3xl p-6 shadow-xl shadow-emerald-500/5 border border-emerald-100 animate-[fade-in_0.3s_ease-out] relative">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    🏆 Hall of Fame
                </h3>
                <button 
                    onClick={() => setShowInviteModal(true)}
                    className="text-emerald-600 text-sm font-bold hover:bg-emerald-50 px-3 py-1 rounded-full transition-colors"
                >
                    + Invite
                </button>
            </div>

            {combinedFriends.length === 0 && (
                <div className="mb-6 text-center p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-sm mb-3">It's lonely at the top!</p>
                    <button 
                        onClick={() => setShowInviteModal(true)}
                        className="text-emerald-600 font-bold text-sm hover:underline bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200"
                    >
                        + Invite friends to join
                    </button>
                </div>
            )}

            <div className="space-y-4">
                {allPlayers.map((player, index) => {
                    const rankInfo = getRank(player.progress);
                    // @ts-ignore
                    const isMe = player.isMe;

                    return (
                         <div 
                            key={player.id} 
                            className={`flex items-center gap-4 p-4 rounded-2xl transition-all border ${
                                isMe 
                                    ? "bg-emerald-50 border-emerald-200 shadow-sm transform scale-[1.02]" 
                                    : "bg-white border-transparent hover:bg-gray-50"
                            }`}
                        >
                            <div className={`font-bold w-6 text-center shrink-0 ${
                                index === 0 ? "text-yellow-500 text-2xl" : 
                                index === 1 ? "text-gray-400 text-xl" : 
                                index === 2 ? "text-amber-700 text-xl" : "text-gray-300"
                            }`}>
                                {index + 1}
                            </div>

                            <div className="relative shrink-0">
                                <img 
                                    src={player.avatar} 
                                    alt={player.name} 
                                    className={`w-12 h-12 rounded-full object-cover shadow-sm ${index === 0 ? 'border-2 border-yellow-400' : ''}`} 
                                />
                                {index === 0 && <div className="absolute -top-3 -right-1 text-lg animate-bounce">👑</div>}
                            </div>

                            <div className="flex-grow min-w-0">
                                <div className="flex justify-between items-center mb-1">
                                    <h4 className={`font-bold text-sm truncate ${isMe ? "text-emerald-700" : "text-gray-800"}`}>
                                        {player.name} {isMe && "(You)"}
                                    </h4>
                                    <span className="text-xs font-bold text-gray-500 shrink-0">
                                        {player.progress}/{challenge.duration} days
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-base">{rankInfo.icon}</span>
                                    <span className={`text-[11px] font-bold uppercase tracking-wider ${rankInfo.color}`}>
                                        {rankInfo.name}
                                    </span>
                                </div>
                                <div className="w-full bg-gray-100 h-1.5 rounded-full mt-2 overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full transition-all duration-1000 ${isMe ? "bg-emerald-500" : "bg-gray-300"}`}
                                        style={{ width: `${Math.min((player.progress / challenge.duration) * 100, 100)}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* --- INVITE MODAL --- */}
            {showInviteModal && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm rounded-3xl animate-[fade-in_0.2s]">
                    <div className="text-center p-6 w-full">
                        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                            💌
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-2">Invite Friends</h4>
                        <p className="text-gray-500 text-sm mb-6">Challenge your friends to see who can reach the top rank first!</p>
                        
                        <div className="flex flex-col gap-3">
                            {/* --- NÚT SHARE ĐÃ SỬA --- */}
                            <button 
                                onClick={handleShare}
                                className={`w-full py-3 rounded-xl font-bold shadow-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                    isCopied 
                                        ? "bg-green-500 text-white shadow-green-200" 
                                        : "bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-200"
                                }`}
                            >
                                {isCopied ? (
                                    <>
                                        <span>✓</span> Link Copied!
                                    </>
                                ) : (
                                    "Copy Link to Share"
                                )}
                            </button>
                            {/* ----------------------- */}

                            <button 
                                onClick={handleAddBot}
                                className="w-full py-3 bg-white border-2 border-emerald-100 text-emerald-700 rounded-xl font-bold hover:bg-emerald-50 transition-all"
                            >
                                🤖 Add Demo Bot (Test)
                            </button>
                            <button 
                                onClick={() => setShowInviteModal(false)}
                                className="mt-2 text-gray-400 font-semibold text-sm hover:text-gray-600"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};