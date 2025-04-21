import React from 'react';

const RifaAdminPage = ({ participants, setParticipants }) => {
  const confirmPayment = (index) => {
    const updatedParticipants = [...participants];
    updatedParticipants[index].confirmed = true; // Marca como pago
    setParticipants(updatedParticipants);
  };

  const anonymizePhone = (phone) => {
    return `${phone.slice(0, 3)}*****${phone.slice(8)}`;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Administrador - Confirmar Pagamento</h1>

      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} border="1">
        <thead>
          <tr>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Nome</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Telefone</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Números Selecionados</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Valor</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Confirmar Pagamento</th>
          </tr>
        </thead>
        <tbody>
          {participants.map((participant, index) => (
            <tr key={index}>
              <td>{participant.name}</td>
              <td>{anonymizePhone(participant.phone)}</td>
              <td>{participant.selectedNumbers.join(', ')}</td>
              <td>R$ {participant.value}</td>
              <td>
                {!participant.confirmed && (
                  <button onClick={() => confirmPayment(index)} style={{ padding: '6px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer', borderRadius: '4px' }}>
                    Confirmar Pagamento
                  </button>
                )}
                {participant.confirmed && <span>Pago</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RifaAdminPage;
