import React from 'react'
import { useAuth0 } from '@auth0/auth0-react';

// COMPONENTS
import { Button } from '../ui/button'
import { Link } from 'react-router-dom';

// ICONS 
import { FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { LiaSearchLocationSolid } from "react-icons/lia";


import './sideBar.css'

export default function SideBar() {

    const { logout } = useAuth0();
    
    return (
        <>
            <nav className='sidebar'>
                <div><h2>Hydro<span>Maze</span></h2></div>         
                <Link to={'/Orders'}><Button variant="link" ><FaShoppingCart className="sidebar-icons"/>Orders</Button></Link>
                <Link to={'/Navigate'}><Button variant="link"><LiaSearchLocationSolid className="sidebar-icons"/>Navigation</Button></Link>
                <Button className="sidebar-logout" variant="link" onClick={()=>{ logout() }}><IoLogOut className="sidebar-icons"/>Log Out</Button>
            </nav>
        </>
    )
}
