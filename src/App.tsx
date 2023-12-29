import React from 'react';
import { Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/Home/Home'
import Orders from './pages/Orders/Orders';
import Locations from './pages/Locations/Locations';
import Customers from './pages/Customers/Customers';
import Directions from './pages/Dashboard/Directions';

// COMPONENTS
import Navbar from './components/sideBar/sideBar';



import './App.css'


function App() {

  
  
  const routes = [
    {
      pathname: "/Directions",
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
      pathname: "/Directions/:id/:username",
      element: Directions
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
