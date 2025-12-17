import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import PantryTracker from "./pages/PantryTracker";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pantry-tracker" element={<PantryTracker />} />
      </Routes>
    </Router>
  );
}

export default App;
