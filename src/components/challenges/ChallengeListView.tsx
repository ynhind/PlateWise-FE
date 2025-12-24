import React, { useState, useMemo } from "react";
import { useChallenges } from "../../hooks/useChallenges";

interface ChallengeListViewProps {
  onCreateClick: () => void;
  onChallengeClick: (id: string) => void;
}

// Gradient style constant để tái sử dụng
const gradientStyle = {
  background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
};

const gradientTextStyle = {
  background: "linear-gradient(135deg, #22c55e 0%, #10b981 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

export const ChallengeListView: React.FC<ChallengeListViewProps> = ({
  onCreateClick,
  onChallengeClick,
}) => {
  const {
    activeChallenges,
    communityChallenges,
    joinChallenge,
    leaveChallenge,
    calculateProgress,
    getLogsForChallenge,
  } = useChallenges();

  const [activeTab, setActiveTab] = useState<"active" | "community">("active");
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const currentList =
    activeTab === "active" ? activeChallenges : communityChallenges;

  const allTags = useMemo(() => {
    const tags = new Set(currentList.flatMap((c) => c.tags || []));
    const sortedTags = Array.from(tags).sort();
    return ["All", ...sortedTags];
  }, [currentList]);

  const displayedChallenges = useMemo(() => {
    if (selectedTag === "All") return currentList;
    return currentList.filter((c) => c.tags && c.tags.includes(selectedTag));
  }, [currentList, selectedTag]);

  // Handlers
  const handleJoin = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    joinChallenge(id);
    setActiveTab("active");
    setSelectedTag("All");
  };

  const handleLeave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (
      window.confirm(
        "Are you sure you want to quit this challenge? All progress will be lost."
      )
    ) {
      leaveChallenge(id);
    }
  };

  const handleTabChange = (tab: "active" | "community") => {
    setActiveTab(tab);
    setSelectedTag("All");
  };

  return (
    <div className="animate-[fade-in_0.5s_ease-out]">
      <header className="mb-10">
        <div>
          <h1 className="text-4xl pt-10 md:text-5xl font-extrabold mb-3 text-gray-900 leading-tight">
            Level up your <span style={gradientTextStyle}>health game</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Join community challenges or create your own to stay motivated.
          </p>
        </div>
      </header>

      {/* --- TABS --- */}
      <div className="flex gap-8 mb-8 border-b border-gray-200">
        <button
          className={`pb-3 text-lg font-semibold transition-all relative ${activeTab === "active"
              ? "text-emerald-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500"
              : "text-gray-400 hover:text-gray-600"
            }`}
          onClick={() => handleTabChange("active")}
        >
          My Journey{" "}
          <span className="text-sm ml-1 py-0.5 px-2 bg-gray-100 rounded-full text-gray-600">
            {activeChallenges.length}
          </span>
        </button>
        <button
          className={`pb-3 text-lg font-semibold transition-all relative ${activeTab === "community"
              ? "text-emerald-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500"
              : "text-gray-400 hover:text-gray-600"
            }`}
          onClick={() => handleTabChange("community")}
        >
          Discovery{" "}
          <span className="text-sm ml-1 py-0.5 px-2 bg-gray-100 rounded-full text-gray-600">
            {communityChallenges.length}
          </span>
        </button>
      </div>

      {/* --- FILTER TAGS BAR --- */}
      <div className="flex gap-3 mb-10 overflow-x-auto pb-2 scrollbar-hide">
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={selectedTag === tag ? gradientStyle : {}}
            className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all duration-200 shadow-sm ${selectedTag === tag
                ? "text-white shadow-md transform scale-105 border border-transparent"
                : "bg-white text-gray-500 border border-gray-200 hover:border-emerald-200 hover:text-emerald-600"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* --- GRID CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayedChallenges.map((challenge) => {
          const progressPercent = calculateProgress(
            challenge.id,
            challenge.duration
          );
          const completedDays = getLogsForChallenge(challenge.id).length;

          return (
            <div
              key={challenge.id}
              onClick={() =>
                activeTab === "active" ? onChallengeClick(challenge.id) : null
              }
              className={`group bg-white rounded-2xl border border-gray-100 hover:border-emerald-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col relative ${activeTab === "active" ? "cursor-pointer" : ""
                }`}
            >
              {/* Nút Delete (Chỉ hiện ở Active tab) */}
              {activeTab === "active" && (
                <button
                  onClick={(e) => handleLeave(e, challenge.id)}
                  className="absolute top-3 right-3 bg-white/90 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors z-20 shadow-sm"
                  title="Leave Challenge"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              )}

              <div className="h-48 bg-gray-100 overflow-hidden relative">
                <img
                  src={challenge.coverImage}
                  alt={challenge.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                <div className="absolute top-3 left-3 flex gap-1 z-10">
                  {challenge.tags &&
                    challenge.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  {challenge.tags && challenge.tags.length > 2 && (
                    <span className="bg-yellow-400 text-yellow-950 text-[10px] font-bold px-2 py-1 rounded-full shadow-sm">
                      +{challenge.tags.length - 2}
                    </span>
                  )}
                </div>

                {activeTab === "active" && (
                  <div className="absolute bottom-0 left-0 w-full h-1.5 bg-emerald-100">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000 ease-out"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 line-clamp-1 mb-2 group-hover:text-emerald-600 transition-colors">
                  {challenge.title}
                </h3>

                {activeTab === "community" && (
                  <p className="text-gray-500 text-sm mb-4 flex-grow line-clamp-2 leading-relaxed">
                    {challenge.description}
                  </p>
                )}

                <div className="flex flex-wrap gap-1 mb-4">
                  {challenge.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-gray-500 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-gray-50">
                  {activeTab === "active" ? (
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold uppercase text-gray-400 tracking-wider">
                          Progress
                        </span>
                        <span className="text-xs font-bold text-emerald-600">
                          {completedDays}/{challenge.duration} days
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-2 rounded-full transition-all duration-1000 ${progressPercent === 100
                              ? "bg-green-500"
                              : "bg-emerald-500"
                            }`}
                          style={{ width: `${progressPercent}%` }}
                        ></div>
                      </div>
                      {progressPercent === 100 && (
                        <p className="text-center text-xs font-bold text-green-600 mt-2 flex items-center justify-center gap-1">
                          <span>🎉</span> Completed!
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-gray-500 text-sm font-medium">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                        <span>{challenge.duration} Days</span>
                      </div>
                      <button
                        className="px-5 py-2 rounded-full font-bold text-sm text-white shadow-lg shadow-emerald-200 hover:shadow-xl hover:-translate-y-0.5 transition-all"
                        style={gradientStyle}
                        onClick={(e) => handleJoin(e, challenge.id)}
                      >
                        Join Now
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}

        {/* Empty State */}
        {displayedChallenges.length === 0 && (
          <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              No challenges found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              We couldn't find any{" "}
              {selectedTag !== "All" ? `"${selectedTag}"` : ""} challenges.
              {activeTab === "active"
                ? " Join one from Discovery!"
                : " Try adjusting your filters."}
            </p>
            {activeTab === "active" && selectedTag === "All" && (
              <button
                onClick={() => handleTabChange("community")}
                className="mt-6 px-6 py-2.5 rounded-full font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors"
              >
                Browse Discovery Challenges
              </button>
            )}
          </div>
        )}
      </div>

      {/* FAB - Updated Color */}
      <button
        className="fixed bottom-8 right-8 w-16 h-16 text-white rounded-full shadow-lg flex items-center justify-center text-3xl hover:scale-110 hover:rotate-90 transition-all duration-300 z-50 focus:outline-none"
        style={gradientStyle}
        onClick={onCreateClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="12" y1="5" x2="12" y2="19"></line>
          <line x1="5" y1="12" x2="19" y2="12"></line>
        </svg>
      </button>
    </div>
  );
};
