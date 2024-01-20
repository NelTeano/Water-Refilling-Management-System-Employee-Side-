import React from 'react';
import { Route, Routes } from 'react-router-dom';

// PAGES
import Home from './pages/Home/Home';
import Orders from './pages/Orders/Orders';
import Locations from './pages/Locations/Locations';
import Directions from './pages/Directions/Directions';
import Navigate from './pages/Navigate/Navigate.tsx';

// COMPONENTS
import Navbar from './components/sideBar/sideBar';
import Hamburger from './components/hamburgerMenu/Hamburger';

import './App.css';

function App() {
  const routes = [
    {
      pathname: '/',
      element: Home,
      // Add 'navbar' prop to indicate whether to render the navbar
      navbar: false,
    },
    {
      pathname: '/Navigate',
      element: Navigate,
      navbar: true,
    },
    {
      pathname: '/Orders',
      element: Orders,
      navbar: true,
    },
    {
      pathname: '/Locations',
      element: Locations,
      navbar: true,
    },
    {
      pathname: '/Directions/:id/:username',
      element: Directions,
      navbar: true,
    },
  ];

  return (
    <>
      <Routes>
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.pathname}
            element={
              route.navbar ? (
                <>
                  <Navbar />
                  <Hamburger />
                  <route.element />
                </>
              ) : (
                <route.element />
              )
            }
          />
        ))}
      </Routes>
    </>
  );
}

export default App;
