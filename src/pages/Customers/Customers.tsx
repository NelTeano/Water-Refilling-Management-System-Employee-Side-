import React, { useState, useEffect } from 'react';

// COMPONENTS
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input"
import { Link } from 'react-router-dom';

// PAGE STYLES
import './customers.css';

// ICONS
import { RiUserSearchFill } from "react-icons/ri";

export default function Customers() {
    const [visibleRows, setVisibleRows] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;

    const [customers, setCustomers] = useState([
        {
            id: 1,
            picture: "https://github.com/shadcn.png",
            name: "Shanny Sins"
        },
        {
            id: 2,
            picture: "https://github.com/shadcn.png",
            name: "Joshua Mark Salsalani"
        },
        {
            id: 3,
            picture: "https://github.com/shadcn.png",
            name: "Garret Espanto"
        },
        {
            id: 4,
            picture: "https://github.com/shadcn.png",
            name: "Jasper Espanto"
        },
        {
            id: 5,
            picture: "https://github.com/shadcn.png",
            name: "Lance Espanto"
        },
        {
            id: 6,
            picture: "https://github.com/shadcn.png",
            name: "Jonel Lang Sakalam"
        }
    ]);

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

    

    return (
        <>
        <div className='customers-container'>
            <section className='customers-searchBar'>
                <span><RiUserSearchFill className="customers-search-icon"/></span>
                <span><Input placeholder='Search Customer' onChange={(e) => setSearchTerm(e.target.value)} /></span>
            </section>
            <section>
                <Table style={{ width: '800px' }}>
                    <TableCaption>
                        A list of your Customers.
                    </TableCaption>
                    <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">Picture</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead className="text-right">Details</TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                    {filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((customer) => (
                        <TableRow key={customer.id}>
                        <TableCell className="font-large">
                            <Avatar>
                            <AvatarImage src={customer.picture} />
                            </Avatar>
                        </TableCell>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.name}</TableCell>
                        <TableCell className="text-right">
                            <Link to={`/Customers/${customer.name}`}><Button>See More</Button></Link>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </section>
            <section className='customers-pageButtons'>
                    <Button onClick={handlePrevClick}>Previous</Button>
                    <Button onClick={handleNextClick}>Next</Button>
            </section>
        </div>
        </>
    );
}
