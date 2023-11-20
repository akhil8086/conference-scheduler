


import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from './components/Schedule';
import AllDetails from './components/AllDetails';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/schedule/:id' element={<Schedule />} />
      <Route path='/allDetails/:id' element={<AllDetails />} />
    </Routes>
  </Router>
  )
}

export default App




