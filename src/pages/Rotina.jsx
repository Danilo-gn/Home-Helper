import React, { useState } from 'react';

const Rotina = () => {
  
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [inputTime, setInputTime] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const sortItems = (a, b) => {
    const timeA = a.time.split(':').map(Number);
    const timeB = b.time.split(':').map(Number);
    return timeA[0] * 60 + timeA[1] - (timeB[0] * 60 + timeB[1]);
  };

  const handleAddItem = () => {
    if (!inputValue || !inputTime) {
      alert('Por favor, preencha ambos os campos.');
      return;
    }

    const newItem = { text: inputValue, time: inputTime, done: false };

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) => 
        index === editIndex ? { ...newItem } : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems([...items, newItem]);
    }

    setInputValue('');
    setInputTime('');
    setItems((prevItems) => [...prevItems].sort(sortItems));
  };

  const handleEditItem = (index) => {
    setInputValue(items[index].text);
    setInputTime(items[index].time);
    setEditIndex(index);
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
  };

  const handleToggleDone = (index) => {
    const updatedItems = items.map((item, i) => 
      i === index ? { ...item, done: !item.done } : item
    );
    setItems(updatedItems);
  };

  return <body id="" class="w-screen h-5/6 bg-gradient-to-t from-black to-violet-950 flex flex-wrap justify-center items-center">
  <div id="" class="flex flex-col items-center -translate-y-12 rounded-3xl h-5/6 w-4/6 bg-indigo-800 mx-3">
  <h1 class="bg-indigo-950 w-full h-12 flex flex-col items-center justify-center rounded-t-3xl text-white mb-3">Rotina</h1>
    <div class="my-3">
      <input 
          type="text" 
          placeholder="Sua próxima atividade..."
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          class="h-6 "
        />
      <input 
          type="time" 
          value={inputTime} 
          onChange={(e) => setInputTime(e.target.value)} 
          class="h-6"
        />
    </div>
    <button onClick={handleAddItem} class="my-3">
      {editIndex !== null ? 'Editar' : 'Adicionar'}
    </button>
    <ul>
      {items.map((item, index) => (
        <li key={index}>
          <input 
            type="checkbox" 
            checked={item.done} 
            onChange={() => handleToggleDone(index)} 
          />
          <span style={{ textDecoration: item.done ? 'line-through' : 'none' }} class="mx-1">
            {item.time} - {item.text}
          </span>
          <button onClick={() => handleEditItem(index)} class="mx-3">Editar</button>
          <button onClick={() => handleDeleteItem(index)} class="mx-3">Excluir</button>
        </li>
      ))}
    </ul>
  </div>
</body>;
};

export default Rotina;
