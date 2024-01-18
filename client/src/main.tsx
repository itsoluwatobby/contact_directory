import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ContactDataProvider } from './context/ContextContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContactDataProvider>
      <App />
    </ContactDataProvider>
  </React.StrictMode>,
)
