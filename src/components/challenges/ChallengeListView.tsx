import React, { useState } from "react";
import { useChallenges } from "../../hooks/useChallenges";

interface ChallengeListViewProps {
    onCreateClick: () => void;
    onChallengeClick: (id: string) => void;
}

export const ChallengeListView: React.FC<ChallengeListViewProps> = ({
    onCreateClick,
    onChallengeClick,
}) => {
    const { activeChallenges, communityChallenges, joinChallenge } =
        useChallenges();
    const [activeTab, setActiveTab] = useState<"active" | "community">("active");

    const handleJoin = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        joinChallenge(id);
        setActiveTab("active");
    };

    return (
        <div className="animate-[fade-in_0.5s_ease-out]">
            <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2 text-slate-900">Challenges</h1>
                <p className="text-slate-500 text-lg">Level up your health game!</p>
            </header>

            {/* Tabs */}
            <div className="flex gap-6 mb-8 border-b border-slate-200">
                <button
                    className={`pb-3 text-lg font-semibold transition-all relative ${activeTab === "active"
                            ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-600 after:rounded-t-md"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                    onClick={() => setActiveTab("active")}
                >
                    My Active ({activeChallenges.length})
                </button>
                <button
                    className={`pb-3 text-lg font-semibold transition-all relative ${activeTab === "community"
                            ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-600 after:rounded-t-md"
                            : "text-slate-400 hover:text-slate-600"
                        }`}
                    onClick={() => setActiveTab("community")}
                >
                    Community ({communityChallenges.length})
                </button>
            </div>

            {/* Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {activeTab === "active" &&
                    activeChallenges.map((challenge) => (
                        <div
                            key={challenge.id}
                            onClick={() => onChallengeClick(challenge.id)}
                            className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden cursor-pointer flex flex-col border border-slate-100"
                        >
                            <div className="h-40 bg-slate-200 overflow-hidden">
                                <img
                                    src={challenge.coverImage}
                                    alt={challenge.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-slate-800">
                                    {challenge.title}
                                </h3>
                                <div className="text-sm text-slate-500 mb-4">
                                    {challenge.duration} Days • Started{" "}
                                    {new Date(challenge.startDate!).toLocaleDateString()}
                                </div>
                                <div className="mt-auto">
                                    <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase bg-blue-100 text-blue-700">
                                        In Progress
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}

                {activeTab === "community" &&
                    communityChallenges.map((challenge) => (
                        <div
                            key={challenge.id}
                            className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col border border-slate-100"
                        >
                            <div className="h-40 bg-slate-200">
                                <img
                                    src={challenge.coverImage}
                                    alt={challenge.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-5 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold mb-2 text-slate-800">
                                    {challenge.title}
                                </h3>
                                <p className="text-slate-500 text-sm mb-4 flex-grow">
                                    {challenge.description}
                                </p>
                                <button
                                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-colors shadow-sm"
                                    onClick={(e) => handleJoin(e, challenge.id)}
                                >
                                    Join Challenge
                                </button>
                            </div>
                        </div>
                    ))}

                {activeTab === "active" && activeChallenges.length === 0 && (
                    <div className="col-span-full text-center py-12 text-slate-400 bg-white rounded-2xl border border-dashed border-slate-300">
                        <p className="text-lg">
                            You have no active challenges. Join one from the Community tab!
                        </p>
                    </div>
                )}
            </div>

            {/* Floating Action Button (FAB) */}
            <button
                className="fixed bottom-8 right-8 w-16 h-16 bg-pink-500 text-white rounded-full shadow-lg flex items-center justify-center text-4xl hover:scale-110 hover:rotate-90 transition-all duration-300 z-50 focus:outline-none focus:ring-4 focus:ring-pink-300"
                onClick={onCreateClick}
            >
                +
            </button>
        </div>
    );
};
