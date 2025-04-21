import React, { useState } from 'react';
import QRCode from 'react-qr-code'; // Biblioteca para gerar o QR code

const RifaForm = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]); // Agora podemos selecionar múltiplos números
  const [error, setError] = useState('');
  const [participants, setParticipants] = useState([]);
  const [reservedNumbers, setReservedNumbers] = useState(new Set()); // Para controlar números reservados

  // Função para formatar o telefone
  const formatPhone = (phone) => {
    const cleanPhone = phone.replace(/\D/g, ''); // Remove qualquer coisa que não seja número
    if (cleanPhone.length <= 2) {
      return `(${cleanPhone}`;
    } else if (cleanPhone.length <= 7) {
      return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2)}`;
    } else {
      return `(${cleanPhone.slice(0, 2)}) ${cleanPhone.slice(2, 7)}-${cleanPhone.slice(7, 11)}`;
    }
  };

  // Função para validar o telefone (formatação)
  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value);
  };

  // Função para anonimizar o telefone na lista
  const anonymizePhone = (phone) => {
    return `${phone.slice(0, 3)}*****${phone.slice(8)}`;
  };

  // Função para validar a seleção do número da rifa
  const handleNumberSelection = (number) => {
    if (reservedNumbers.has(number)) {
      alert('Este número já foi reservado.');
    } else {
      setSelectedNumbers((prev) => [...prev, number]); // Adiciona o número à lista de selecionados
    }
  };

  // Função que lida com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone && name && selectedNumbers.length > 0) {
      setParticipants([
        ...participants,
        { name, phone, selectedNumbers, value: 5 }
      ]);
      // Marca os números como reservados
      selectedNumbers.forEach((num) => reservedNumbers.add(num));
      setReservedNumbers(new Set(reservedNumbers));
      setName('');
      setPhone('');
      setSelectedNumbers([]);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  // Exibição dos participantes
  const displayParticipants = () => {
    return participants.map((participant, index) => (
      <tr key={index}>
        <td>{participant.name}</td>
        <td>{anonymizePhone(participant.phone)}</td>
        <td>{participant.selectedNumbers.join(', ')}</td>
        <td>R$ {participant.value}</td>
      </tr>
    ));
  };

  // Gerar números disponíveis
  const generateAvailableNumbers = () => {
    let numbers = [];
    for (let i = 1; i <= 200; i++) {
      numbers.push(
        <button
          key={i}
          onClick={() => handleNumberSelection(i)}
          style={{
            backgroundColor: reservedNumbers.has(i) ? '#bbb' : '#4CAF50',
            color: reservedNumbers.has(i) ? '#ccc' : 'white',
            margin: '5px',
            padding: '10px',
            cursor: reservedNumbers.has(i) ? 'not-allowed' : 'pointer',
            borderRadius: '5px',
            fontSize: '16px',
            border: 'none',
            transition: '0.3s',
          }}
          disabled={reservedNumbers.has(i)}
        >
          {i}
        </button>
      );
    }
    return numbers;
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
      <h1 style={{ textAlign: 'center', color: '#333' }}>Cadastro de Participantes para Rifa</h1>

      <form onSubmit={handleSubmit} style={{ maxWidth: '600px', margin: '0 auto', background: '#f9f9f9', padding: '20px', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '16px', color: '#333' }}>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label style={{ fontSize: '16px', color: '#333' }}>Telefone:</label>
          <input
            type="text"
            value={formatPhone(phone)} // Aplica a formatação enquanto o usuário digita
            onChange={handlePhoneChange}
            placeholder="(XX) XXXXX-XXXX"
            maxLength={15}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', color: '#333' }}>Selecione um Número:</label>
          <div>{generateAvailableNumbers()}</div>
        </div>

        <div>
          <h2 style={{ color: '#333' }}>Pagamento via PIX</h2>
          <p>Faça o pagamento para a chave PIX: <strong>centralterreno@gmail.com</strong></p>
          <QRCode value="centralterreno@gmail.com" />
          <p>Após o pagamento, envie o comprovante para o responsável pelo sorteio via WhatsApp.</p>
        </div>

        <button type="submit" disabled={selectedNumbers.length === 0} style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', transition: '0.3s' }}>
          Cadastrar
        </button>
      </form>

      <h2 style={{ textAlign: 'center', marginTop: '40px', color: '#333' }}>Lista de Participantes</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }} border="1">
        <thead>
          <tr>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Nome</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Telefone</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Números Selecionados</th>
            <th style={{ padding: '10px', backgroundColor: '#f1f1f1' }}>Valor</th>
          </tr>
        </thead>
        <tbody>
          {displayParticipants()}
        </tbody>
      </table>
    </div>
  );
};

export default RifaForm;
