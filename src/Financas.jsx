import React, { useState, useEffect } from 'react';

const Financas = () => {
  const [items, setItems] = useState(() => {
    const savedItems = localStorage.getItem('financasItems');
    return savedItems ? JSON.parse(savedItems) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [inputPrice, setInputPrice] = useState('');
  const [inputPriority, setInputPriority] = useState('Baixa');
  const [editIndex, setEditIndex] = useState(null);

  const priorityOrder = { Baixa: 1, Média: 2, Alta: 3 };

  const sortItems = (a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  };

  useEffect(() => {
    localStorage.setItem('financasItems', JSON.stringify(items));
  }, [items]);

  const handleAddItem = () => {
    if (!inputValue || !inputPrice) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const newItem = { text: inputValue, price: inputPrice, priority: inputPriority, done: false };

    if (editIndex !== null) {
      const updatedItems = items.map((item, index) => 
        index === editIndex ? { ...newItem } : item
      );
      setItems(updatedItems);
      setEditIndex(null);
    } else {
      setItems((prevItems) => [...prevItems, newItem].sort(sortItems));
    }

    setInputValue('');
    setInputPrice('');
    setInputPriority('Baixa');
  };

  const handleEditItem = (index) => {
    setInputValue(items[index].text);
    setInputPrice(items[index].price);
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
        <h1 className="bg-indigo-950 w-full h-12 flex flex-col items-center justify-center rounded-t-3xl text-white mb-3">Finanças</h1>
        <div className="my-3">
          <input 
            id="despesa" 
            type="text" 
            placeholder="Despesa nova"
            value={inputValue} 
            onChange={(e) => setInputValue(e.target.value)} 
            className="h-6"
          />
          <input 
            id="preco" 
            type="number" 
            placeholder="Preço"
            value={inputPrice} 
            onChange={(e) => setInputPrice(e.target.value)} 
            className="h-6"
          />
          <select 
            id="prioridade" 
            value={inputPriority} 
            onChange={(e) => setInputPriority(e.target.value)} 
            className="h-6"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
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
                {item.text} - R$ {item.price} - {item.priority}
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

export default Financas;
