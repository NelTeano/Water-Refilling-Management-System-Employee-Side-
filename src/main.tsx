import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OrdersProvider } from "./OrdersContext";
// REACT ROUTER PROVIDER
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <OrdersProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </OrdersProvider>
  </React.StrictMode>,
)
