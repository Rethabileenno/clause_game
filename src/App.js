// import react from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import MemoryGame from './memorygame';

function App() {
  return (
    
    <div>
      <Router>
        <Routes>
        <Route path="/" element={<MemoryGame />} />
        </Routes>
      </Router>

    </div>
    
  );
}

export default App;
