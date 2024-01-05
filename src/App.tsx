import React, { useEffect, useState} from 'react';
import { Route, Routes } from 'react-router-dom'

// PAGES
import Home from './pages/Home/Home'
import Orders from './pages/Orders/Orders';
import Locations from './pages/Locations/Locations';
import Directions from './pages/Directions/Directions';

// COMPONENTS
import Navbar from './components/sideBar/sideBar';
import Hamburger from './components/hamburgerMenu/Hamburger'


import './App.css'


function App() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Update isMobile state on window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1065); // Adjust the threshold as needed
    };

    // Initial check on mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  
  
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
      pathname: "/Directions/:id/:username",
      element: Directions
    },
  ];


  return (
    <>
    {isMobile ? <Hamburger /> : <Navbar />}
      <Routes>
        
        {routes.map((route, index)=> (
          <Route key={index} path={route.pathname} element={<route.element />} />
        ))}
      </Routes>
    </>
  )
}

export default App
