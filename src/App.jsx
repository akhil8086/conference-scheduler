


import HomePage from './components/HomePage'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Schedule from './components/Schedule';

function App() {
  return (
  <Router>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/schedule/:id' element={<Schedule />} />
    </Routes>
  </Router>
  )
}

export default App




