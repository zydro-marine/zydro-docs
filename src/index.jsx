import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/css/index.scss';
import App from './App.jsx'
import ChakraContextProvider from './contexts/ChakraContext.jsx'

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <ChakraContextProvider>
      <App />
    </ChakraContextProvider>
  </StrictMode>
);
