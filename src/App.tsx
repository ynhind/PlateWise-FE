import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import PantryTracker from "./pages/PantryTracker";
import { InterpreterTest } from "./components/test/InterpreterTest";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pantry-tracker" element={<PantryTracker />} />
        <Route path="/test-interpreter" element={<InterpreterTest />} />
      </Routes>
    </Router>
  );
}

export default App;
