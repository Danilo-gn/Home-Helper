import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Rotina from './Rotina';
import Financas from './Financas';
import Eventos from './Eventos';
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/Home-Helper" element={<App />}>
          <Route index element={<Rotina />} />
          <Route path="financas" element={<Financas />} />
          <Route path="eventos" element={<Eventos />} />
        </Route>
      </Routes>
    </HashRouter>
  </React.StrictMode>
);

