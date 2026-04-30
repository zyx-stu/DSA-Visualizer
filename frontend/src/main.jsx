import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { algorithmAPI } from './services/api';

// Pre-warm the Render backend on app load (avoids cold-start timeout for first real request)
algorithmAPI.ping();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
