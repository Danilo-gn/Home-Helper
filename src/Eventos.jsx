import React, { useState, useEffect } from 'react';

const Eventos = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('eventosItems');
    return savedItems ? JSON.parse(savedItems).map(item => ({
      ...item,
      date: new Date(item.date)
    })) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [inputDate, setInputDate] = useState('');
  const [inputPriority, setInputPriority] = useState('Noite');
  const [editIndex, setEditIndex] = useState(null);

  const priorityOrder = { Noite: 1, Tarde: 2, Manha: 3 };

  const sortItems = (a, b) => {
    const dateComparison = new Date(a.date) - new Date(b.date);
    if (dateComparison !== 0) {
      return dateComparison;
    }
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  };

  useEffect(() => {
    localStorage.setItem('eventosItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (!inputValue || !inputDate) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newItem = {
      text: inputValue,
      date: new Date(inputDate + 'T00:00:00'),
      priority: inputPriority,
      done: false,
    };

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
    setInputDate('');
    setInputPriority('Noite');
  };

  const handleEditItem = (index) => {
    setInputValue(items[index].text);
    setInputDate(items[index].date.toISOString().split('T')[0]);
    setInputPriority(items[index].priority);
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

  return (
    <div className="w-screen h-5/6 bg-gradient-to-t from-black to-violet-950 flex flex-wrap justify-center items-center">
      <div className="flex flex-col items-center -translate-y-12 rounded-3xl h-5/6 w-4/6 bg-indigo-800 mx-3">
        <h1 className="bg-indigo-950 w-full h-12 flex flex-col items-center justify-center rounded-t-3xl text-white mb-3">Eventos</h1>
        <div className="my-3">
          <input 
            id="evento" 
            type="text" 
            placeholder="Evento novo"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            className="h-6"
          />
          <input 
            id="data" 
            type="date" 
            value={inputDate} 
            onChange={(e) => setInputDate(e.target.value)} 
            className="h-6"
          />
          <select 
            id="prioridade"
            value={inputPriority} 
            onChange={(e) => setInputPriority(e.target.value)} 
            className="h-6"
          >
            <option value="Noite">Noite</option>
            <option value="Tarde">Tarde</option>
            <option value="Manha">Manha</option>
          </select>
        </div>
        <button onClick={handleAddItem} className="my-3">
          {editIndex !== null ? 'Editar' : 'Adicionar'}
        </button>
        <ul>
          {items.sort(sortItems).map((item, index) => (
            <li key={index}>
              <input 
                type="checkbox" 
                checked={item.done} 
                onChange={() => handleToggleDone(index)} 
              />
              <span style={{ textDecoration: item.done ? 'line-through' : 'none' }} className="mx-1">
                {item.date.toLocaleDateString()} - {item.text} - {item.priority}
              </span>
              <button onClick={() => handleEditItem(index)} className="mx-3">Editar</button>
              <button onClick={() => handleDeleteItem(index)} className="mx-3">Excluir</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Eventos;
