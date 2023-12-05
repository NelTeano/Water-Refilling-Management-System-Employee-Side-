import React from 'react';
import { Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/Home/Home'
import Orders from './pages/Orders/Orders';
import Locations from './pages/Locations/Locations';
import Customers from './pages/Customers/Customers';
import Dashboard from './pages/Dashboard/Dashboard';

// COMPONENTS
import Navbar from './components/sideBar/sideBar';



import './App.css'


function App() {
  
  const routes = [
    {
      pathname: "/",
      element: Home
    },
    {
      pathname: "/Orders",
      element: Orders
    },
    {
      pathname: "/Locations",
      element: Locations
    },
    {
      pathname: "/Customers",
      element: Customers
    },
    {
      pathname: "/Dashboard",
      element: Dashboard
    },
  ];


  return (
    <>
    <Navbar />
      <Routes>
        
        {routes.map((route, index)=> (
          <Route key={index} path={route.pathname} element={<route.element />} />
        ))}
      </Routes>
    </>
  )
}

export default App
