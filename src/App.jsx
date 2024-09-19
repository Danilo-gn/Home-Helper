import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import "./index.css"

const App = () => {
  return (
    <div class="h-screen">
      <nav class=" h-1/6">
        <ul class="w-screen h-full bg-violet-950 flex flex-wrap justify-center items-center text-white">
          <li><Link class="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/Home-Helper/rotina">rotina</Link></li>
          <li><Link class="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/Home-Helper/financas">financas</Link></li>
          <li><Link class="flex flex-wrap justify-center items-center rounded-full w-40 h-12 hover:scale-110 duration-300 mx-10 bg-indigo-800" to="/Home-Helper/eventos">eventos</Link></li>
        </ul>
      </nav>
      <Outlet /> {/* Renderiza os componentes de página aqui */}
    </div>
  );
};

export default App;