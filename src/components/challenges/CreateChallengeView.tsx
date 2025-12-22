import React, { useState } from "react";
import { useChallenges } from "../../hooks/useChallenges";

interface CreateChallengeViewProps {
    onBack: () => void;
    onSuccess: () => void;
}

const gradientStyle = {
    background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
};

export const CreateChallengeView: React.FC<CreateChallengeViewProps> = ({
    onBack,
    onSuccess,
}) => {
    const { createChallenge } = useChallenges();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        duration: 7,
        tags: "", 
    });
    const [file, setFile] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const coverImage = file
            ? URL.createObjectURL(file)
            : "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80";

        const tagsArray = formData.tags
            ? formData.tags.split(',').map(t => t.trim()).filter(t => t.length > 0)
            : ["Personal"];

        createChallenge({
            title: formData.title,
            description: formData.description,
            duration: Number(formData.duration),
            coverImage,
            tags: tagsArray
        });
        onSuccess();
    };

    return (
        <div className="max-w-2xl mx-auto animate-[fade-in_0.3s_ease-out]">
            <button
                onClick={onBack}
                className="mb-8 px-5 py-2 bg-white border border-gray-200 text-gray-600 rounded-full font-semibold hover:bg-green-50 hover:border-green-200 hover:text-green-700 transition-colors flex items-center gap-2"
            >
                <span>←</span> Back
            </button>

            <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl shadow-green-900/5 border border-gray-100">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">
                    Create New Challenge
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Challenge Title
                        </label>
                        <input
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="e.g., No Sugar Week"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                            rows={3}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                            placeholder="What's the goal?"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Duration (Days)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="365"
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                                value={formData.duration}
                                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}
                                required
                            />
                        </div>
                         <div>
                            <label className="block text-gray-700 font-semibold mb-2">
                                Tags (comma separated)
                            </label>
                            <input
                                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition-all"
                                value={formData.tags}
                                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                placeholder="Health, Budget, ..."
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">
                            Cover Image
                        </label>
                        <input
                            type="file"
                            accept="image/*"
                            className="w-full p-3 border border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 transition-colors"
                            onChange={(e) => setFile(e.target.files?.[0] || null)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 text-white rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all mt-4"
                        style={gradientStyle}
                    >
                        Create Challenge
                    </button>
                </form>
            </div>
        </div>
    );
};