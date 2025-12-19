import React, { useState } from "react";
import { ChallengeListView } from "../components/challenges/ChallengeListView";
import { CreateChallengeView } from "../components/challenges/CreateChallengeView";
import { ChallengeDetailsView } from "../components/challenges/ChallengeDetailsView";

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