import React, { useState } from "react";
import { useChallenges } from "./ChallengeContext";

type ViewState = "list" | "create" | "details";

export const ChallengesPage: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>("list");
  const [selectedChallengeId, setSelectedChallengeId] = useState<string | null>(
    null
  );

  const handleCreateSuccess = () => setCurrentView("list");

  const handleViewDetails = (id: string) => {
    setSelectedChallengeId(id);
    setCurrentView("details");
  };

  const handleBack = () => {
    setCurrentView("list");
    setSelectedChallengeId(null);
  };

  // Container chính: min-h-screen, padding, background màu nhạt
  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 font-sans text-slate-800 pb-24">
      <div className="max-w-7xl mx-auto">
        {currentView === "list" && (
          <ChallengeListView
            onCreateClick={() => setCurrentView("create")}
            onChallengeClick={handleViewDetails}
          />
        )}

        {currentView === "create" && (
          <CreateChallengeView
            onBack={handleBack}
            onSuccess={handleCreateSuccess}
          />
        )}

        {currentView === "details" && selectedChallengeId && (
          <ChallengeDetailsView
            challengeId={selectedChallengeId}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

// --- SUB-COMPONENTS ---

// 1. LIST VIEW
const ChallengeListView: React.FC<{
  onCreateClick: () => void;
  onChallengeClick: (id: string) => void;
}> = ({ onCreateClick, onChallengeClick }) => {
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
          className={`pb-3 text-lg font-semibold transition-all relative ${
            activeTab === "active"
              ? "text-indigo-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-1 after:bg-indigo-600 after:rounded-t-md"
              : "text-slate-400 hover:text-slate-600"
          }`}
          onClick={() => setActiveTab("active")}
        >
          My Active ({activeChallenges.length})
        </button>
        <button
          className={`pb-3 text-lg font-semibold transition-all relative ${
            activeTab === "community"
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

// 2. CREATE VIEW
const CreateChallengeView: React.FC<{
  onBack: () => void;
  onSuccess: () => void;
}> = ({ onBack, onSuccess }) => {
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

// 3. DETAILS VIEW
const ChallengeDetailsView: React.FC<{
  challengeId: string;
  onBack: () => void;
}> = ({ challengeId, onBack }) => {
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

const TimelineDay: React.FC<{
  dayNum: number;
  isCompleted: boolean;
  challengeId: string;
  isLast: boolean;
  existingLog?: any;
  onLogProof: (text: string, file: File | null) => void;
}> = ({ dayNum, isCompleted, existingLog, isLast, onLogProof }) => {
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
        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold z-10 shrink-0 transition-colors duration-300 ${
          isCompleted
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
            <p className="text-slate-600">{existingLog.proofText}</p>
            {existingLog.proofImageUrl && (
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