import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";
import HeroSection from "./components/home/HeroSection";
import FeaturesSection from "./components/home/FeaturesSection";
import HowItWorksSection from "./components/home/HowItWorksSection";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ChallengeProvider } from "./pages/ChallengeContext";
import { ChallengesPage } from "./pages/ChallengesPage";


function App() {
  return (
    <Router>
      <div className="App flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow pt-16"> 
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
            
            <Route 
              path="/challenges" 
              element={
                <ChallengeProvider>
                  <ChallengesPage />
                </ChallengeProvider>
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
