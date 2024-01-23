import React, { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './Home.css';
import { Button } from '@/components/ui/button';

const Home = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();

    useEffect(() => {
        if (!isAuthenticated) {
            loginWithRedirect();
        }
    }, [isAuthenticated, loginWithRedirect]);

    return (
        <div className='home-container'>
            {/* Your component content goes here */}
        </div>
    );
};

export default Home;
