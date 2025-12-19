import React from "react";
import { useChallenges } from "../../hooks/useChallenges";
import { TimelineDay } from "./TimelineDay";

interface ChallengeDetailsViewProps {
    challengeId: string;
    onBack: () => void;
}

export const ChallengeDetailsView: React.FC<ChallengeDetailsViewProps> = ({
    challengeId,
    onBack,
}) => {
    const { activeChallenges, getLogsForChallenge, addLog } = useChallenges();
    const challenge = activeChallenges.find((c) => c.id === challengeId);
    const logs = getLogsForChallenge(challengeId);

    if (!challenge) return <div>Challenge not found</div>;

    const days = Array.from({ length: challenge.duration }, (_, i) => i + 1);

    return (
        <div className="animate-[fade-in_0.3s_ease-out]">
            <button
                onClick={onBack}
                className="mb-6 px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
            >
                ← Back
            </button>

            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden mb-8 flex flex-col md:flex-row">
                <img
                    src={challenge.coverImage}
                    className="w-full md:w-1/3 h-64 object-cover"
                    alt=""
                />
                <div className="p-8 flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                        {challenge.title}
                    </h1>
                    <p className="text-slate-600 text-lg mb-4">{challenge.description}</p>
                    <div className="text-sm font-bold text-indigo-600 uppercase tracking-wider">
                        Start Date: {new Date(challenge.startDate!).toLocaleDateString()}
                    </div>
                </div>
            </div>

            {/* Timeline */}
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-slate-800">Timeline</h2>
                {days.map((dayNum) => {
                    const log = logs.find((l) => l.dayNumber === dayNum);
                    const isCompleted = !!log;

                    return (
                        <TimelineDay
                            key={dayNum}
                            dayNum={dayNum}
                            isCompleted={isCompleted}
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
    );
};
