import React, { useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'

// PAGE STYLES
import './Directions.css'

export default function Dashboard() {

    const  CustId  = useParams();
    
    const [userData, setUserData] = useState('');
    const [orderData, setOrderData] = useState('');

    useEffect(() => {
    const getOwnerDetails = async () => {
            try {
                const orderOwner = await fetch(`http://localhost:5174/api/users/${CustId.username}`);

                if (!orderOwner.ok) {
                throw new Error(`HTTP error! Status: ${orderOwner.status}`);
                }

                const result = await orderOwner.json();

                setUserData(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    // Function to fetch data
    const getOrderDetails = async () => {

        try {
            const orderDetails = await fetch(`http://localhost:5174/api/orders/${CustId.id}`);

            if (!orderDetails.ok) {
            throw new Error(`HTTP error! Status: ${orderDetails.status}`);
            }

            const result = await orderDetails.json();

            setOrderData(result);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

        getOrderDetails(); // ORDER DATA DETAILS
        getOwnerDetails(); // OWNER DATA DETAILS
    }, []);
    

    console.log(CustId);
    console.log("USER :" , userData)
    console.log("ORDER :" , orderData)
    

    return (
        <>
            <div className='directions-container'>
                This is Directions Page
            </div>
        </>
    )
}
