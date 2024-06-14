import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import store from './states/index';

const rootElement = document.getElementById('root');
const app = (
  <Provider store={store}>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Provider>
);

ReactDOM.createRoot(rootElement).render(app);
