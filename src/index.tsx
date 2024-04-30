import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/app';
import './assets/styles/styles.css';

const rootElement = document.createElement('div');
document.body.append(rootElement);

const root = ReactDOM.createRoot(rootElement);

root.render(<App />);
