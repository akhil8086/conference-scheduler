

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationInfoPage from "./components/LocationInfoPage";
import FoodInfoPage from "./components/FoodInfoPage";
import CodeOfConductPage from "./components/CodeOfConductPage";
import Schedule from "./components/Schedule";
import Homepage from "./components/HomePage";
import Conference from "./components/Conferecnce";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/conference" element={<Conference />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/location" element={<LocationInfoPage />} />
        <Route path="/food" element={<FoodInfoPage />} />
        <Route path="/conduct" element={<CodeOfConductPage />} />
        <Route path="/schedule" element={<Schedule />} />
       
      </Routes>
    </Router>
  );
}

export default App;
