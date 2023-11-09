

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LocationInfoPage from "./components/LocationInfoPage";
import Schedule from "./components/Schedule";
import Homepage from "./components/HomePage";
import Conference from "./components/Conferecnce";
import Speakers from "./components/Speakers";
import ConferenceDetails from "./components/ConferenceDetails";



function App() {
  return (
    <Router>
    <Routes>
    <Route path="/conference" element={<Conference />} />
      <Route path="/" element={<Homepage />} />
      <Route path="/location" element={<LocationInfoPage />} />
      <Route path="/speakers/:id/:ID" element={<Speakers/>}/>
      <Route path="/schedule/:id" element={<Schedule />} />
      <Route path="/details/:id" element={<ConferenceDetails />} />
     
    </Routes>
  </Router>
  );
}

export default App;
