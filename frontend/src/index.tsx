import React from 'react';
import { render } from 'react-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import App from './app';
import { WebSocketsProvider } from './contexts/web-sockets';
import reportWebVitals from './reportWebVitals';

const queryClient = new QueryClient();

render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WebSocketsProvider>
        <App />
      </WebSocketsProvider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
