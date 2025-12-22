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

  return (
    <div 
        className="min-h-screen relative overflow-hidden pt-24 pb-24 font-sans"
        style={{
            background: "linear-gradient(to bottom right, #f0fdf4 0%, #ffffff 50%, #f0fdf4 100%)",
        }}
    >
      {/* Background decoration blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse-slow pointer-events-none" style={{ animationDelay: "1s" }} />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
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