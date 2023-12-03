import React from 'react';
import { Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/Home'
import Orders from './pages/Orders';
import Locations from './pages/Locations';


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
  ];


  return (
    <>
      <Routes>
        {routes.map((route, index)=> (
          <Route key={index} path={route.pathname} element={<route.element />} />
        ))}
      </Routes>
    </>
  )
}

export default App
