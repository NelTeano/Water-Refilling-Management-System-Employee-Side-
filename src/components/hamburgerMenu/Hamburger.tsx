import { slide as Menu } from 'react-burger-menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// HAMBURGER STYLE
import './Hamburger.css';

// IMAGES 
import crossIcon from '../../assets/cross-svg.png';

function Hamburger() {
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
            customCrossIcon={<img height={'30px'} width={'30px'} src={crossIcon} />}
        >
            <Link to={'/Locations'} onClick={closeSideBar}>
                Locations
            </Link>
            <Link to={'/Orders'} onClick={closeSideBar}>
                Orders
            </Link>
            <Link to={'/'} onClick={closeSideBar}>
                Logout
            </Link>
        </Menu>
    );
}

export default Hamburger;
