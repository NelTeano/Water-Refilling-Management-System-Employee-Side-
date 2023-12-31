import React, { useState, useEffect } from 'react'
import { format } from 'date-fns';

// COMPONENTS
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useNavigate} from 'react-router-dom';

// ICONS
import { RiUserSearchFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";

import './Orders.css'
import { Link } from 'react-router-dom';


interface Order {
    _id: string;
    round: number;
    slim: number;
    total: number;
    isOwned: boolean;
    status: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    location: number[];
    __v: number;
}


export default function Orders() {

    
    const [customers, setCustomers] = useState<Order[]>([])
    const navigate = useNavigate();

 
    useEffect(() => {
        // GET ALL THE ORDERS
        // const getOrders = async () => {
    
        //     try {
        //         const response = await fetch(`http://localhost:5174/api/orders`);
                
        //         if (!response.ok) {
        //         throw new Error(`HTTP error! Status: ${response.status}`);
        //         }
    
        //         const result = await response.json();
    
        //         setOrders(result);
        //     } catch (error) {
        //         console.error('Error fetching data:', error);
        //     }
        //     };

        // TEST GET ORDERS STATE
        const getOrderss = async () => {

            try {
                const response: Order[] = [
                {
                    _id: "657c2b256fa938b9fb2aebc1",
                    round: 1,
                    slim: 0,
                    total: 30,
                    isOwned : false,
                    status : "confirmed",
                    username: "joshuamagwili@gmail.com",
                    createdAt: "2023-12-15T10:32:05.965Z",
                    updatedAt: "2023-12-15T10:32:05.965Z",
                    location: [120.98195064088475, 14.334375074985957],
                    __v: 0
                },
                {
                    _id: "657c2b2e6fa938b9fb2aebd1",
                    round: 1,
                    slim: 1,
                    total: 60,
                    isOwned : false,
                    status : "confirmed",
                    username: "joshuamagwili@gmail.com",
                    createdAt: "2023-12-15T10:32:14.908Z",
                    updatedAt: "2023-12-15T10:32:14.908Z",
                    location : [120.9581200219007, 14.31781346759307],
                    __v: 0
                },
                {
                    _id: "657c2bb66fa938b9fb2aebe1",
                    round: 1,
                    slim: 2,
                    total: 90,
                    isOwned : false,
                    status : "delivered",
                    username: "joshuamagwili@gmail.com",
                    createdAt: "2023-12-15T10:34:30.490Z",
                    updatedAt: "2023-12-15T10:34:30.490Z",
                    location : [120.95176195520145, 14.325773806431215],
                    __v: 0
                }];

                setCustomers(response);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }    
        }
    
    
          
            getOrderss();
        }, []);

        console.log(customers)

    // --------------PAGING AND SEARCH FUNCTIONS----------------

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [visibleRows, setVisibleRows] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 2;

    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [searchTerm, setSearchTerm] = useState('');

    const totalPages = Math.ceil(filteredCustomers.length / pageSize);

    useEffect(() => {
        // Filter customers based on the search term
        const filtered = customers.filter((customer) =>
            customer.username.toLowerCase().includes(searchTerm.toLowerCase())
        );

        setFilteredCustomers(filtered);
        setCurrentPage(1); // Reset page to 1 when search term changes
    }, [searchTerm, customers]);

    const handleNextClick = () => {
        if (currentPage < totalPages) {
            setVisibleRows((prevVisibleRows) => prevVisibleRows + pageSize);
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const handlePrevClick = () => {
        if (currentPage > 1) {
            setVisibleRows((prevVisibleRows) => prevVisibleRows - pageSize);
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };
    // ------------------------------------------------------------

    return (
        <>
            <div className='orders-container'>
                <section className='orders-searchBar'>
                    <span><RiUserSearchFill className="customers-search-icon"/></span>
                    <span><Input placeholder='Search Customer' onChange={(e) => setSearchTerm(e.target.value)} /></span>
                </section>
                <div>
                    <Table className='order-table'>
                        <TableCaption>A list of Orders</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead >Name</TableHead>
                                <TableHead>Slim</TableHead>
                                <TableHead>Round</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead >Date</TableHead>
                                <TableHead>Directions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell className={window.innerWidth <= 1150 ? 'flex' : ''}>{customer.username}</TableCell>
                                <TableCell>{customer.slim}</TableCell>
                                <TableCell>{customer.round}</TableCell>
                                <TableCell>₱{customer.total}</TableCell>
                                <TableCell>{customer.status}</TableCell>
                                <TableCell className="text-right">{format(new Date(customer.createdAt), 'MMMM d, yyyy  h:mm a')}</TableCell>
                                <TableCell>
                                    <Link to={`/Directions/${customer._id}/${customer.username}`}>
                                        <Button>
                                            <MdDeliveryDining  className="direction-icon"/>
                                        </Button>
                                    </Link>
                                </TableCell>
                            </TableRow>   
                        ))}
                        </TableBody>
                    </Table>
                </div>
                <section className='orders-pageButtons'>
                    <Button onClick={handlePrevClick}>Previous</Button>
                    <Button onClick={handleNextClick}>Next</Button>
            </section>
            <div>
                <Link to="/Navigate/">
                <Button >Start Navigation</Button>
                </Link>
            </div>
            </div>
        </>
    )
    
}


