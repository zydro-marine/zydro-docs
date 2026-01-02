import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import ChakraContextProvider from './contexts/ChakraContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraContextProvider>
      <App />
    </ChakraContextProvider>
  </StrictMode>,
)
