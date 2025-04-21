import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Leaflet’s CSS (required for map tiles to appear)
import 'leaflet/dist/leaflet.css';
// Our global reset
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
