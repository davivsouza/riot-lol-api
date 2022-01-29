import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Summoner } from "./pages/Summoner";
import "./styles.css";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/summoner/:id" element={<Summoner />} />
      </Routes>
    </Router>
  );
}
