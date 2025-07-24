import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { PoemsProvider } from './context/PoemsContext';
import './styles/global.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <PoemsProvider>
        <App />
      </PoemsProvider>
    </BrowserRouter>
  </React.StrictMode>
);
