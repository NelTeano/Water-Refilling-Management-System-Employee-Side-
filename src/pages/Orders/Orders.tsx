import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth0 } from "@auth0/auth0-react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";

// ICONS
import { RiUserSearchFill } from "react-icons/ri";
import { MdDeliveryDining } from "react-icons/md";

import "./Orders.css";
import { Link } from "react-router-dom";
import { sampleOrders, sampleOrder } from "../mockData";

import {useOrders} from "../../OrdersContext"
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
  location: {
    longitude: number;
    latitude: number;
  };
 
}

export default function Orders() {

  const { isAuthenticated } = useAuth0();
  //const [orders, setOrders] = useOrders();

  const [orders, setOrders] = useState<Order[]>([]);

  // --------------PAGING AND SEARCH FUNCTIONS----------------

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleRows, setVisibleRows] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  const [filteredCustomers, setFilteredCustomers] = useState<Order[]>(orders);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  useEffect(()=>{
    const getOrders = async () => {
      try {
        const response = await fetch('http://localhost:5001/api/orders');
        const data = await response.json();
        console.log(data);
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
  
    getOrders();
    
  },[])
 useEffect(() => {
    setFilteredCustomers(orders);
  }, [orders]);
 useEffect(() => {
  if (orders.length > 0) {
    // Filter customers based on the search term
    const filtered = orders.filter((order) =>
      order.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCustomers(filtered);
    setCurrentPage(1); // Reset page to 1 when search term changes
  }
}, [searchTerm, orders]);

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
    isAuthenticated &&
    <>
      <div className="orders-container">
        <section className="orders-searchBar">
          <span>
            <RiUserSearchFill className="customers-search-icon" />
          </span>
          <span>
            <Input
              placeholder="Search Customer"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </span>
        </section>
        <div>
          
          <Table className="order-table capitalize" id="order-table-desktop">
            <TableCaption>A list of Orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slim</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                {/* <TableHead>Directions</TableHead> */}
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers
                .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                .map((order, index) => (
                  <TableRow key={index}>
                    <TableCell
                      className={window.innerWidth <= 1150 ? "flex" : ""}
                    >
                      {order.username}
                    </TableCell>
                    <TableCell>{order.slim}</TableCell>
                    <TableCell>{order.round}</TableCell>
                    <TableCell>₱{order.total}</TableCell>
                    <TableCell>{order.status}</TableCell>
                    <TableCell className="text-right">
                      {format(
                        new Date(order.createdAt),
                        "MMMM d, yyyy  h:mm a"
                      )}
                    </TableCell>
                    <TableCell>
                      <Link to={`/Directions/${order._id}/${order.username}`}>
                        
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>

{/*  --------------------------Renders only when in mobile --------------- */}

          <Table className='order-table' id='order-table-mobile'>
              <TableCaption>A list of Orders</TableCaption>
              <TableBody>
                  {filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize).map((customer, index) => (
                  <div key={index} className="mb-4 capitalize">
                      <div className="mb-2"><strong>Name :</strong> {customer.username}</div>
                      <div><strong>Slim :</strong> {customer.slim}</div>
                      <div><strong>Round :</strong> {customer.round}</div>
                      <div><strong>Total :</strong> ₱{customer.total}</div>
                      <div><strong>Status :</strong> {customer.status}</div>
                      <div><strong>Date :</strong> {format(new Date(customer.createdAt), 'MMMM d, yyyy  h:mm a')}</div>
                  </div>
                  ))}
              </TableBody>
          </Table>
{/*  ----------------------------------------------------------------------*/}


        </div>
        <section className="orders-pageButtons">
          <Button className="bg-[#34ACAC] text-white" variant="ghost" onClick={handlePrevClick}>Previous</Button>
          <Button className="bg-[#34ACAC] text-white" variant="ghost" onClick={handleNextClick}>Next</Button>
        </section>
        <div>
          <Link to="/Navigate/">
            <Button className="bg-[#34ACAC]">Start Navigation</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
