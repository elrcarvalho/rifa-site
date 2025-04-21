import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RifaUserPage from './RifaUserPage';
import RifaAdminPage from './RifaAdminPage'; // Supondo que você tenha esse componente

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [reservedNumbers, setReservedNumbers] = useState(new Set());

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={<RifaUserPage 
            setParticipants={setParticipants} 
            participants={participants} 
            reservedNumbers={reservedNumbers} 
            setReservedNumbers={setReservedNumbers}
          />} 
        />
        <Route 
          path="/admin" 
          element={<RifaAdminPage 
            participants={participants} 
            reservedNumbers={reservedNumbers}
          />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
