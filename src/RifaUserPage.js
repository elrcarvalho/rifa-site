import React, { useState } from 'react';

const RifaUserPage = ({ setParticipants, participants, reservedNumbers, setReservedNumbers }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedNumbers, setSelectedNumbers] = useState([]);
  const [isReserved, setIsReserved] = useState(false);

  const handleNumberSelect = (number) => {
    const newReservedNumbers = new Set(reservedNumbers);
    if (newReservedNumbers.has(number)) {
      newReservedNumbers.delete(number);
    } else {
      newReservedNumbers.add(number);
    }
    setReservedNumbers(newReservedNumbers);
    setSelectedNumbers([...newReservedNumbers]);
  };

  const handleSubmit = () => {
    if (name && phone && selectedNumbers.length > 0) {
      setParticipants([
        ...participants,
        { name, phone: phone.replace(/.(?=.{4})/g, '*'), numbers: selectedNumbers }
      ]);
      setIsReserved(true);
    } else {
      alert('Por favor, preencha todos os campos e selecione ao menos um número.');
    }
  };

  return (
    <div>
      <h2>Comprar Rifa</h2>
      <input 
        type="text" 
        placeholder="Nome" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="Telefone" 
        value={phone} 
        onChange={(e) => setPhone(e.target.value)} 
      />
      <div>
        <h3>Selecione os números da rifa:</h3>
        {[...Array(200).keys()].map((i) => {
          const number = i + 1;
          return (
            <button 
              key={number} 
              onClick={() => handleNumberSelect(number)} 
              disabled={reservedNumbers.has(number)}
            >
              {number}
            </button>
          );
        })}
      </div>
      <button onClick={handleSubmit} disabled={isReserved}>
        Reservar Números
      </button>
      {isReserved && <p>Os números foram reservados com sucesso!</p>}
    </div>
  );
};

export default RifaUserPage;
};

export default RifaForm;
