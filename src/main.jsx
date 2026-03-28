import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'typeface-merriweather';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { syncSession } from './utils/syncSession';

// Run sync once before React starts
syncSession();


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);