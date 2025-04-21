import React, { useState } from 'react';
import QRCode from 'react-qr-code'; // Biblioteca para gerar o QR code

const RifaForm = () => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedNumber, setSelectedNumber] = useState(null);
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

  // Função para validar a seleção do número da rifa
  const handleNumberSelection = (number) => {
    if (reservedNumbers.has(number)) {
      alert('Este número já foi reservado.');
    } else {
      setSelectedNumber(number);
    }
  };

  // Função que lida com a submissão do formulário
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!error && phone && name && selectedNumber) {
      setParticipants([
        ...participants,
        { name, phone, selectedNumber, value: 5 } // O valor da rifa agora é fixo em 5 reais
      ]);
      setReservedNumbers(new Set(reservedNumbers.add(selectedNumber))); // Marca o número como reservado
      setName('');
      setPhone('');
      setSelectedNumber(null);
    } else {
      alert('Por favor, preencha todos os campos corretamente.');
    }
  };

  // Exibição dos participantes
  const displayParticipants = () => {
    return participants.map((participant, index) => (
      <tr key={index}>
        <td>{participant.name}</td>
        <td>{participant.phone}</td>
        <td>{participant.selectedNumber}</td>
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
            backgroundColor: reservedNumbers.has(i) ? 'gray' : 'lightblue',
            margin: '5px',
            padding: '10px',
            cursor: reservedNumbers.has(i) ? 'not-allowed' : 'pointer',
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
    <div>
      <h1>Cadastro de Participantes para Rifa</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nome completo"
            required
          />
        </div>

        <div>
          <label>Telefone:</label>
          <input
            type="text"
            value={formatPhone(phone)} // Aplica a formatação enquanto o usuário digita
            onChange={handlePhoneChange}
            placeholder="(XX) XXXXX-XXXX"
            maxLength={15} // Limita o tamanho do campo
            required
          />
        </div>

        <div>
          <label>Selecione um Número:</label>
          <div>{generateAvailableNumbers()}</div>
        </div>

        <div>
          <h2>Pagamento via PIX</h2>
          <p>Faça o pagamento para a chave PIX: <strong>centralterreno@gmail.com</strong></p>
          <QRCode value="centralterreno@gmail.com" />
          <p>Após o pagamento, envie o comprovante para o responsável pelo sorteio via WhatsApp.</p>
        </div>

        <button type="submit" disabled={!selectedNumber}>Cadastrar</button>
      </form>

      <h2>Lista de Participantes</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Telefone</th>
            <th>Número Selecionado</th>
            <th>Valor do Número</th>
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
