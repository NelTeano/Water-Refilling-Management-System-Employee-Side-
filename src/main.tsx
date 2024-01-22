import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { OrdersProvider } from "./OrdersContext";

// REACT ROUTER PROVIDER
import { BrowserRouter } from 'react-router-dom'

// AUTH0 PROVIDER
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_AUTH0_DOMAIN}
    clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
    authorizationParams={{
      redirect_uri: 'http://localhost:5000/orders'
    }}
  >
  <React.StrictMode>
    <OrdersProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </OrdersProvider>
  </React.StrictMode>
  </Auth0Provider>
)
