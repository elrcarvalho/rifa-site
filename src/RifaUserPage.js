import React, { useState } from 'react';

const RifaUserPage = ({ participants, setParticipants, reservedNumbers, setReservedNumbers }) => {
  const handleAddParticipant = (name) => {
    console.log('Adicionando participante:', name); // Verifique o log
    if (!reservedNumbers.has(name)) {
      setParticipants([...participants, { name }]);
      setReservedNumbers(new Set(reservedNumbers.add(name)));
    }
  };

  return (
    <div>
      <h1>Rifa - Página do Usuário</h1>
      <button onClick={() => handleAddParticipant('Novo Participante')}>Adicionar Participante</button>
      <ul>
        {participants.length === 0 ? (
          <li>Nenhum participante adicionado.</li>
        ) : (
          participants.map((participant, index) => (
            <li key={index}>{participant.name}</li>
          ))
        )}
      </ul>
    </div>
  );
};

export default RifaUserPage;
