import React from 'react'

// COMPONENTS
import { useAuth0 } from '@auth0/auth0-react'

// PAGE STYLES
import './Home.css'
import { Button } from '@/components/ui/button';

export default function Home() {

    const { loginWithRedirect } = useAuth0();
    return (
        <>
            <div className='home-container'>
                <h1>Hydromaze Delivery Side</h1>
                <Button onClick={()=>{ loginWithRedirect()}}>Login</Button>
            </div>
        </>
    )
}
