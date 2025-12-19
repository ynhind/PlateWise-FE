import React, { useState } from "react";
import { ChallengeLog } from "../../features/challenges/types";

interface TimelineDayProps {
    dayNum: number;
    isCompleted: boolean;
    challengeId: string;
    isLast: boolean;
    existingLog?: ChallengeLog;
    onLogProof: (text: string, file: File | null) => void;
}

export const TimelineDay: React.FC<TimelineDayProps> = ({
    dayNum,
    isCompleted,
    existingLog,
    isLast,
    onLogProof,
}) => {
    const [isLogging, setIsLogging] = useState(false);
    const [text, setText] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onLogProof(text, file);
        setIsLogging(false);
    };

    return (
        <div className="flex gap-6 mb-8 relative group">
            {/* Line nối giữa các ngày (ẩn ở ngày cuối cùng) */}
            {!isLast && (
                <div className="absolute left-[20px] top-10 bottom-[-32px] w-0.5 bg-slate-200 z-0"></div>
            )}

            {/* Vòng tròn chỉ số ngày */}
            <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 shrink-0 transition-colors duration-300 ${isCompleted
                        ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200"
                        : "bg-slate-200 text-slate-500"
                    }`}
            >
                {isCompleted ? "✓" : dayNum}
            </div>

            {/* Nội dung bên phải */}
            <div className="flex-grow bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-center mb-2">
                    <h4 className="font-bold text-slate-800 m-0">Day {dayNum}</h4>
                    {isCompleted && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-green-100 text-green-700">
                            Completed
                        </span>
                    )}
                </div>

                {isCompleted ? (
                    <div>
                        <p className="text-slate-600">{existingLog?.proofText}</p>
                        {existingLog?.proofImageUrl && (
                            <img
                                src={existingLog.proofImageUrl}
                                alt="Proof"
                                className="w-full rounded-xl mt-3 object-cover max-h-60"
                            />
                        )}
                    </div>
                ) : !isLogging ? (
                    <button
                        className="text-indigo-600 font-semibold border-2 border-indigo-600 px-4 py-2 rounded-full text-sm hover:bg-indigo-50 transition-colors"
                        onClick={() => setIsLogging(true)}
                    >
                        Log Proof
                    </button>
                ) : (
                    <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                        <input
                            className="w-full p-3 border-2 border-slate-200 rounded-xl text-sm focus:border-indigo-500 focus:outline-none"
                            placeholder="How did it go?"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                        <input
                            type="file"
                            className="w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                        <div className="flex gap-2 pt-2">
                            <button
                                type="submit"
                                className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-full font-semibold hover:bg-indigo-700"
                            >
                                Submit
                            </button>
                            <button
                                type="button"
                                className="px-4 py-2 bg-transparent text-slate-500 border border-slate-300 text-sm rounded-full font-semibold hover:bg-slate-50"
                                onClick={() => setIsLogging(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};
