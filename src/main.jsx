import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Rotina from './pages/Rotina';
import Financas from './pages/Financas';
import Eventos from './pages/Eventos';
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/Home-Helper" element={<App />}>
          <Route index element={<Rotina />} />
          <Route path="financas" element={<Financas />} />
          <Route path="eventos" element={<Eventos />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
