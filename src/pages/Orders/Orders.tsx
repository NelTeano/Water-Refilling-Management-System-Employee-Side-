import React, { useState, useEffect } from "react";
import { format } from "date-fns";

// COMPONENTS
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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
  location?: {
    longitude: number;
    latitude: number;
  };
  __v: number;
}

export default function Orders() {

  //const [orders, setOrders] = useOrders();

  const [orders, setOrders] = useState<Order[]>([]);

  // --------------PAGING AND SEARCH FUNCTIONS----------------

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [visibleRows, setVisibleRows] = useState(2);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  const [filteredCustomers, setFilteredCustomers] = useState<Order[]>(orders);
  const [searchTerm, setSearchTerm] = useState("");

  const totalPages = Math.ceil(filteredCustomers.length / pageSize);
  useEffect(()=>{
    const getOrders = async () => {
      try {
        const response = await fetch('http://localhost:5174/api/orders');
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
    const filtered = orders.filter((order: Order) =>
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
          <Table className="order-table">
            <TableCaption>A list of Orders</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slim</TableHead>
                <TableHead>Round</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Directions</TableHead>
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
                        <Button>
                          <MdDeliveryDining className="direction-icon" />
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
        <section className="orders-pageButtons">
          <Button onClick={handlePrevClick}>Previous</Button>
          <Button onClick={handleNextClick}>Next</Button>
        </section>
        <div>
          <Link to="/Navigate/">
            <Button>Start Navigation</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
