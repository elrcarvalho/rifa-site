import React, { useState } from 'react';

const RifaUserPage = ({ setParticipants, participants, reservedNumbers, setReservedNumbers }) => {
  // Código do seu componente, com estados e lógica aqui...

  // Exemplo de um evento que pode adicionar um participante:
  const handleAddParticipant = (name) => {
    if (!reservedNumbers.has(name)) {
      setParticipants([...participants, { name }]);
      setReservedNumbers(new Set(reservedNumbers.add(name)));
    }
  };

  return (
    <div>
      <h1>Rifa - Página do Usuário</h1>
      <button onClick={() => handleAddParticipant('Novo Participante')}>Adicionar Participante</button>
      {/* Renderização dos participantes */}
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant.name}</li>
        ))}
      </ul>
    </div>
  );
};

// Remover o erro de exportação, corrigindo a exportação para apenas um componente.
export default RifaUserPage;
