import 'antd/dist/reset.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './app';
import {AppProvider} from './contexts';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <App />
  </AppProvider>
)
