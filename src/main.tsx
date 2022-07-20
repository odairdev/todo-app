import React from 'react'
import ReactDOM from 'react-dom/client'
import { AuthContextProvider } from "./context/AuthContext";
import App from './App'

import './global.css'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
    <App />

    </AuthContextProvider>
  </React.StrictMode>
)
