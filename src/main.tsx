import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app';
import {AppProvider} from './contexts';
import './index.css';

Object.defineProperty(window, 'noop', {
  value: () => {},
  writable: false,
  configurable: false,
  enumerable: false
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
)
