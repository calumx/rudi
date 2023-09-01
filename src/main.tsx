import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { TempoProvider } from './context/tempoContext.tsx';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <TempoProvider>
      <App />
    </TempoProvider>
  </React.StrictMode>
);
