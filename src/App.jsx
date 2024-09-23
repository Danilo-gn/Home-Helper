import React, { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./index.css"

const App = () => {
  return (
    <div className="h-screen">
      <nav className=" h-1/6">
        <ul className="w-screen h-full bg-violet-950 flex flex-wrap justify-center items-center text-white">
          <li><Link className="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/">rotina</Link></li>
          <li><Link className="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/financas">financas</Link></li>
          <li><Link className="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/eventos">eventos</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* Renderiza os componentes de página aqui */}
    </div>
  );
};

export default App;