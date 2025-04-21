import React, { useState } from 'react';
import './App.css';

function App() {
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [price, setPrice] = useState(2.00); // valor por número
  const [status, setStatus] = useState({});

  const toggleSelect = (number) => {
    if (status[number]) return;
    if (selectedNumbers.includes(number)) {
      setSelectedNumbers(selectedNumbers.filter((n) => n !== number));
    } else {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleReserve = () => {
    if (selectedNumbers.length > 0 && name && phone) {
      const updatedStatus = { ...status };
      selectedNumbers.forEach((num) => {
        updatedStatus[num] = { name, phone, status: 'reservado' };
      });
      setStatus(updatedStatus);
      setSelectedNumbers([]);
    }
  };

  const whatsappLink = `https://wa.me/SEUNUMEROWHATSAPP?text=Olá, sou ${name}, reservei os números ${selectedNumbers.join(', ')} (Total: R$ ${(selectedNumbers.length * price).toFixed(2)}), e estou enviando o comprovante de pagamento.`;

  const reservedEntries = Object.entries(status).filter(([_, v]) => v.status === 'reservado');

  return (
    <div className="App">
      <h1>🎉 Rifa Solidária</h1>
      <p className="price-info">Valor por número: <strong>R$ {price.toFixed(2)}</strong></p>

      <div className="grid">
        {[...Array(200)].map((_, i) => {
          const num = i + 1;
          return (
            <button
              key={num}
              className={
                status[num]?.status === 'reservado'
                  ? 'reserved'
                  : selectedNumbers.includes(num)
                  ? 'selected'
                  : 'available'
              }
              onClick={() => toggleSelect(num)}
              disabled={!!status[num]}
            >
              {num}
            </button>
          );
        })}
      </div>

      {selectedNumbers.length > 0 && (
        <div className="form">
          <h2>Números escolhidos: {selectedNumbers.join(', ')}</h2>
          <p>Total: R$ {(selectedNumbers.length * price).toFixed(2)}</p>
          <input placeholder="Seu nome" value={name} onChange={(e) => setName(e.target.value)} />
          <input placeholder="Seu telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          <button onClick={handleReserve}>Reservar número(s)</button>
        </div>
      )}

      {selectedNumbers.length === 0 && name && phone && (
        <div className="pagamento">
          <h2>Pagamento</h2>
          <p>Chave PIX: <strong>sua-chave@pix.com</strong></p>
          <img src="/qrcode-pix.png" alt="QR Code PIX" width="200" />
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <button className="whatsapp-btn">Enviar comprovante via WhatsApp</button>
          </a>
        </div>
      )}

      <div className="lista">
        <h2>📋 Lista de Participantes</h2>
        <ul>
          {reservedEntries.map(([num, info]) => (
            <li key={num}>
              Nº {num} - {info.name} ({info.phone})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
