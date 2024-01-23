import { useAuth0 } from '@auth0/auth0-react';
import { slide as Menu } from 'react-burger-menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// HAMBURGER STYLE
import './Hamburger.css';

// IMAGES 
import crossIcon from '../../assets/cross-iconn.png';

function Hamburger() {
    const { logout } = useAuth0();
    const [isOpen, setOpen] = useState(false)

    const handleIsOpen = () => {
        setOpen(!isOpen)
    }

    const closeSideBar = () => {
        setOpen(false)
    }

    return (
        <Menu 
            onOpen={handleIsOpen}
            onClose={handleIsOpen} 
            isOpen={isOpen} 
            right 
            noTransition 
            customCrossIcon={<img height={'20px'} width={'20px'} src={crossIcon} />}
        >
            <Link to={'/Navigate'} onClick={closeSideBar}>
                Navigation
            </Link>
            <Link to={'/Orders'} onClick={closeSideBar}>
                Orders
            </Link>
            <Link to={'/'} onClick={()=>{ logout() }}>
                Logout
            </Link>
        </Menu>
    );
}

export default Hamburger;
