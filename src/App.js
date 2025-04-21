import React, { useState } from 'react';
import RifaUserPage from './RifaUserPage';

const App = () => {
  const [participants, setParticipants] = useState([]);
  const [reservedNumbers, setReservedNumbers] = useState(new Set());

  return (
    <div>
      <RifaUserPage 
        participants={participants} 
        setParticipants={setParticipants} 
        reservedNumbers={reservedNumbers} 
        setReservedNumbers={setReservedNumbers} 
      />
    </div>
  );
};

export default App;
