import Home from "./pages/Home";
import PantryTracker from "./pages/PantryTracker";
import { InterpreterTest } from "./components/test/InterpreterTest";
import { ParserDebug } from "./features/ParserDebug";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChallengeProvider } from "./pages/ChallengeContext";
import { ChallengesPage } from "./pages/ChallengesPage";
import CommunityPage from "./pages/CommunityPage";

import SignInPage from "./pages/SignInPage";
import RegisterPage from "./pages/RegisterPage";
import OnboardingPage from "./pages/OnboardingPage";
import DashboardPage from "./pages/DashboardPage";
import { ProtectedRoute } from "./components/auth/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <div className="grow">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <HeroSection />
                  <FeaturesSection />
                  <HowItWorksSection />
                </>
              }
            />
            <Route path="/" element={<Home />} />
            <Route path="/pantry-tracker" element={<PantryTracker />} />
            <Route path="/test-interpreter" element={<InterpreterTest />} />
            <Route path="/parser" element={<ParserDebug />} />

            <Route
              path="/challenges"
              element={
                <ChallengeProvider>
                  <ChallengesPage />
                </ChallengeProvider>
              }
            />

            <Route
              path="/community"
              element={
                <ChallengeProvider>
                  <div className="pt-20">
                    <CommunityPage />
                  </div>
                </ChallengeProvider>
              }
            />

            {/* ✅ AUTH FLOW */}
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/onboarding"
              element={
                <ProtectedRoute>
                  <OnboardingPage />
                </ProtectedRoute>
              }
            />

            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
