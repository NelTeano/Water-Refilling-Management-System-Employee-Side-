import React from 'react';
import { Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/Home/Home'
import Orders from './pages/Orders/Orders';
import Locations from './pages/Locations/Locations';
import Directions from './pages/Directions/Directions';
import Navigate from './pages/Navigate/Navigate.tsx';
// COMPONENTS
import Navbar from './components/sideBar/sideBar';
import Hamburger from './components/hamburgerMenu/Hamburger'


import './App.css'


function App() {

  
  
  
  const routes = [
    {
      pathname: "/Navigate",
      element: Navigate
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
      pathname: "/Directions/:id/:username",
      element: Directions
    },
  ];


  return (
    <>
      <Hamburger />  
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
