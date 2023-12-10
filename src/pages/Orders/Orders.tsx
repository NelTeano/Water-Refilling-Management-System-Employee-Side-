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

import { RiUserSearchFill } from "react-icons/ri";

import './Orders.css'


export default function Orders() {

    const [customers, setCustomers] = useState([
        {
            _id: {
                $oid: "656d6zxc1235973a7dd5"
            },
            name: "Jonel Teano",
            round: 1,
            slim: 5,
            total: 225,
            isOwned: true,
            status: "pending",
            createdAt: {
                $date: "2023-12-02T07:27:50.578Z"
            },
            updatedAt: {
                $date: "2023-12-02T07:27:50.578Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "656d6qweqwe2db5973a7dd5"
            },
            name: "Joshua Magwili",
            round: 2,
            slim: 20,
            total: 225,
            isOwned: true,
            status: "pending",
            createdAt: {
                $date: "2023-12-04T01:27:50.578Z"
            },
            updatedAt: {
                $date: "2023-12-04T04:27:50.578Z"
            },
            __v: 0
        },
        {
            _id: {
                "$oid": "656d63asdasddb5973a7dd5"
            },
            name: "Shanny Sins",
            round: 4,
            slim: 10,
            total: 225,
            isOwned: true,
            status: "pending",
            createdAt: {
                $date: "2023-12-08T05:27:50.578Z"
            },
            updatedAt: {
                $date: "2023-12-09T05:27:50.578Z"
            },
            __v: 0
        },
        {
            _id: {
                $oid: "656dwqehg2db5973a7dd5"
            },
            name: "Garret The Mahinang nilalang",
            round: 10,
            slim: 1,
            total: 225,
            isOwned: true,
            status: "pending",
            createdAt: {
                $date: "2023-12-07T05:27:50.578Z"
            },
            updatedAt: {
                $date: "2023-12-03T05:27:50.578Z"
            },
            __v: 0
        },
    ]);

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
            customer.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                    <Table className='w-[800px] h-[400px]'>
                        <TableCaption>A list of Orders</TableCaption>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">Cust ID</TableHead>
                                <TableHead className="text-left w-[200px]">Name</TableHead>
                                <TableHead>Slim</TableHead>
                                <TableHead>Round</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead  className="text-center w-[200px]">Date</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((customer, index) => (
                            <TableRow key={index}>
                                <TableCell className="font-medium">{customer._id.$oid}</TableCell>
                                <TableCell>{customer.name}</TableCell>
                                <TableCell>{customer.slim}</TableCell>
                                <TableCell >{customer.round}</TableCell>
                                <TableCell >₱{customer.total}</TableCell>
                                <TableCell >{customer.status}</TableCell>
                                <TableCell className="text-right">{format(new Date(customer.createdAt.$date), 'MMMM d, yyyy  h:mm a')}</TableCell>
                            </TableRow>   
                        ))}
                        </TableBody>
                    </Table>
                </div>
                <section className='orders-pageButtons'>
                    <Button onClick={handlePrevClick}>Previous</Button>
                    <Button onClick={handleNextClick}>Next</Button>
            </section>
            </div>
        </>
    )
    
}


