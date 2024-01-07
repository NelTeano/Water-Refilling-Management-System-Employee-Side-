import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMapGL, { Marker } from "react-map-gl";
// PAGE STYLES
import "./Directions.css";

export default function Dashboard() {
  const CustId = useParams();
  const token =
    "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA";
  const [userData, setUserData] = useState("");
  const [orderData, setOrderData] = useState("");
  const [routeData, setRouteData] = useState([]);

  useEffect(() => {
    const getOwnerDetails = async () => {
      try {
        const orderOwner = await fetch(
          `http://localhost:5174/api/users/${CustId.username}`
        );

        if (!orderOwner.ok) {
          throw new Error(`HTTP error! Status: ${orderOwner.status}`);
        }

        const result = await orderOwner.json();

        setUserData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    // Function to fetch data
    const getOrderDetails = async () => {
      try {
        const orderDetails = await fetch(
          `http://localhost:5174/api/orders/${CustId.id}`
        );

        if (!orderDetails.ok) {
          throw new Error(`HTTP error! Status: ${orderDetails.status}`);
        }

        const result = await orderDetails.json();

        setOrderData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getOrderDetails(); // ORDER DATA DETAILS
    getOwnerDetails(); // OWNER DATA DETAILS
    getRoute(); 
  }, []);
  const [loc1, setloc1] = useState([120.99311440171681, 14.32013590771544]);
  const [loc2, setloc2] = useState([120.9921407898388, 14.321070651256804]);
  const getRoute = async () => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${loc1[0]},${loc1[1]};${loc2[0]},${loc2[1]}?geometries=geojson&access_token=${token}`
      );
      const data = await response.json();
      setRouteData(data);
     console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(CustId);
  console.log("USER :", userData);
  console.log("ORDER :", orderData);
  console.log("ROUTES :", routeData);

  return (
    <>
      <div className="directions-container">This is Directions Page
          
      </div>
    </>
  );
}
