import React, { useEffect, useState } from "react";

// MAPBOX IMPORTS
import ReactMapGL, { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// ICONS
import { FaLocationDot } from "react-icons/fa6";

// PAGE STYLES
import "./Locations.css";

const token = "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA";

export default function Locations() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [viewport, setViewport] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 14,
  });

  const [mockApiData, setMockApiData] = useState([
    {
      username: "Shannon sins",
      coords: [120.9581200219007, 14.31781346759307],
    },
    {
      username: "Joshua Manalo",
      coords: [120.9650748167237, 14.336595493481354],
    },
    {
      username: "Jonel Belaro Bachar",
      coords: [120.98195064088475, 14.334375074985957],
    },
    {
      username: "Garret Cold Sucker",
      coords: [120.97472806593458, 14.328251988859591],
    },
    {
      username: "shanny sins",
      coords: [120.95176195520145, 14.325773806431215],
    },
    {
      username: "Sample Popup",
      coords: [120.95120637251404, 14.318910292569015],
    },
    {
      username: "Mantos Jonel",
      coords: [120.96523483539562, 14.319919646007861],
    },
  ]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        setViewport({
          ...viewport,
          longitude: position.coords.longitude,
          latitude: position.coords.latitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  return (
    <>
      <div className="locations-container">
        <section className="locations-body">
          <section className="map-container">
            <ReactMapGL
              {...viewport}
              mapboxAccessToken={token}
              mapStyle="mapbox://styles/mapbox/streets-v12"
              interactive={true}
              onDrag={(e) => {
                setViewport((prevViewport) => ({
                  ...prevViewport,
                  longitude: e.viewState.longitude,
                  latitude: e.viewState.latitude,
                }));
              }}
            >
              {mockApiData.map((data, index) => (
                <Marker
                  key={index}
                  latitude={latitude}
                  longitude={longitude}
                  draggable={true}
                  onDragEnd={(e) => {
                    setLatitude(e.lngLat.lat);
                    setLongitude(e.lngLat.lng);
                    console.log(e.lngLat.lat);
                    console.log(e.lngLat.lng);
                  }}
                >
                  <div>
                    <FaLocationDot
                      style={{
                        height: "40px",
                        width: "auto",
                        color: "red",
                      }}
                    />
                  </div>
                </Marker>
              ))}
            </ReactMapGL>
          </section>
          <section className="map-board-details">
            <Card className="map-board-card">
              <CardHeader>
                <CardTitle>Details</CardTitle>
                <CardDescription>Customer Description</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Name : {"Jonel Teano"}</p>
              </CardContent>
              <CardContent>
                <p>Address : {"General Trias Cavite , Home"}</p>
              </CardContent>
              <CardContent>
                <p>Phone Number : {"09156236917"}</p>
              </CardContent>
              <CardContent>
                <p>Email : {"Jonelteano32@yahoo.com"}</p>
              </CardContent>
              <CardContent>
                <p>Picture : </p>
                <img
                  src="https://github.com/shadcn.png"
                  alt="Customer Picture"
                />
              </CardContent>
            </Card>
          </section>
        </section>
      </div>
    </>
  );
}
