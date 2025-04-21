import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RifaUserPage from './RifaUserPage';
import RifaAdminPage from './RifaAdminPage';

function App() {
  const [participants, setParticipants] = React.useState([]);
  const [reservedNumbers, setReservedNumbers] = React.useState(new Set());

  return (
    <Router>
      <Switch>
        {/* Página do Administrador */}
        <Route path="/admin">
          <RifaAdminPage participants={participants} setParticipants={setParticipants} />
        </Route>

        {/* Página do Usuário */}
        <Route path="/">
          <RifaUserPage 
            setParticipants={setParticipants} 
            participants={participants} 
            reservedNumbers={reservedNumbers} 
            setReservedNumbers={setReservedNumbers} 
          />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
