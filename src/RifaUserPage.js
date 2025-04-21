import React, { useState } from 'react';
import QRCode from 'react-qr-code'; // Biblioteca para gerar o QR code

const RifaUserPage = ({ setParticipants, participants, reservedNumbers, setReservedNumbers }) => {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [error, setError] = useState('');

  const handlePhoneChange = (event) => {
    const { value } = event.target;
    setPhone(value);
  };

  const handleNumberSelection = (number) => {
    if (reservedNumbers.has(number)) {
      alert('Este número já foi reservado.');
    } else {
      setSelectedNumbers((prev) => [...prev, number]); // Adiciona o número à lista de selecionados
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (phone && name && selectedNumbers.length > 0) {
      setParticipants([
        ...participants,
        { name, phone, selectedNumbers, value: 5, confirmed: false }
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
      <h1 style={{ textAlign: 'center', color: '#333' }}>Cadastro de Participante para Rifa</h1>

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
            value={phone}
            onChange={handlePhoneChange}
            placeholder="(XX) XXXXX-XXXX"
            maxLength={15}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ fontSize: '16px', color: '#333' }}>Selecione os Números:</label>
          <div>{generateAvailableNumbers()}</div>
        </div>

        <div>
          <h2 style={{ color: '#333' }}>Pagamento via PIX</h2>
          <p>Faça o pagamento para a chave PIX: <strong>centralterreno@gmail.com</strong></p>
          <QRCode value="centralterreno@gmail.com" />
          <p>Após o pagamento, aguarde a confirmação do administrador.</p>
        </div>

        <button type="submit" disabled={selectedNumbers.length === 0} style={{ width: '100%', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '18px', transition: '0.3s' }}>
          Reservar Números
        </button>
      </form>
    </div>
  );
};

export default RifaUserPage;
};

export default RifaForm;
