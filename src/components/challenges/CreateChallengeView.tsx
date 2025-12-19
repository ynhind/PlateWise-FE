import React, { useState } from "react";
import { useChallenges } from "../../hooks/useChallenges";

interface CreateChallengeViewProps {
    onBack: () => void;
    onSuccess: () => void;
}

export const CreateChallengeView: React.FC<CreateChallengeViewProps> = ({
    onBack,
    onSuccess,
}) => {
    const { createChallenge } = useChallenges();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: 7,
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const coverImage = file
            ? URL.createObjectURL(file)
            : "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";

        createChallenge({
            title: formData.title,
            description: formData.description,
            duration: Number(formData.duration),
            coverImage,
        });
        onSuccess();
    };

    return (
        <div className="max-w-2xl mx-auto animate-[fade-in_0.3s_ease-out]">
            <button
                onClick={onBack}
                className="mb-6 px-4 py-2 bg-white border border-indigo-600 text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors"
            >
                ← Back
            </button>

            <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Create New Challenge
            </h2>

            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6"
            >
                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        Challenge Title
                    </label>
                    <input
                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                        value={formData.title}
                        onChange={(e) =>
                            setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        placeholder="e.g., No Sugar Week"
                    />
                </div>

                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        Description
                    </label>
                    <textarea
                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                        rows={3}
                        value={formData.description}
                        onChange={(e) =>
                            setFormData({ ...formData, description: e.target.value })
                        }
                        required
                        placeholder="What's the goal?"
                    />
                </div>

                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        Duration (Days)
                    </label>
                    <input
                        type="number"
                        min="1"
                        max="365"
                        className="w-full p-3 border-2 border-slate-200 rounded-xl focus:border-indigo-500 focus:outline-none transition-colors"
                        value={formData.duration}
                        onChange={(e) =>
                            setFormData({ ...formData, duration: Number(e.target.value) })
                        }
                        required
                    />
                </div>

                <div>
                    <label className="block text-slate-700 font-semibold mb-2">
                        Cover Image
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        className="w-full p-2 border-2 border-slate-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                </div>

                <button
                    type="submit"
                    className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200"
                >
                    Create Challenge
                </button>
            </form>
        </div>
    );
};
