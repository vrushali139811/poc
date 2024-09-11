import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
       
      </Routes>
    </Router>
    // <AboutUs/>
  );
}

export default App;
