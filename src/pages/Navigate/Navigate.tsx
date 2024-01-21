import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
  Source,
  Layer,
} from "react-map-gl";
import { useParams } from "react-router-dom";
import { FaLocationDot } from "react-icons/fa6";
import { useLocation } from "react-router-dom";
import { sampleOrders, sampleOrder } from "../mockData.ts";
import { Button } from "@/components/ui/button.tsx";
const token =
  "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
interface Order {
  _id?: number;
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
    address?: string;
  };
}
export default function Navigate() {
  const startLoc = [120.97848290128735, 14.24044706931592];
  const [routeData, setRouteData] = useState([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: startLoc[1],
    longitude: startLoc[0],
    zoom: 16,
  });
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [showModal, setShowModal] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<any>();
  const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [...routeData],
        },
      },
    ],
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
        console.log(latitude, longitude);
        // setViewport({
        //   ...viewport,
        //   longitude: position.coords.longitude,
        //   latitude: position.coords.latitude,
        // });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true }
    );
  }, []);

  useEffect(() => {
    const getOrders = async () => {
      try {
        console.log("fetching orders");
        const orderResponse = await fetch("http://localhost:5001/api/orders/");
        const orderData = await orderResponse.json();
        setOrders(orderData);
        console.log("fetched orders:", orders);
      } catch (err) {
        console.log(err);
      }
    };

    getOrders();
  }, []);
  useEffect(() => {
    const orderLocations = orders.map((order: Order) => [
      order.location.longitude,
      order.location.latitude,
    ]);
    console.log("orderloc", orderLocations);
    console.log("fetching route");
    const getRoute = async () => {
      try {
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving-traffic/${
            startLoc[0]
          },${startLoc[1]};${orderLocations.join(
            ";"
          )}?geometries=geojson&access_token=${token}`
        );
        console.log("fetched route");
        const data = await response.json();

        setRouteData(data.routes[0].geometry.coordinates);

        console.log(data.routes[0].geometry.coordinates);
      } catch (err) {
        console.log(err);
      }
    };

    if (orders.length > 0) {
    getRoute();
  }
  }, [orders]);
  const [showPopup, setShowPopup] = useState(false);
  const onClickMarker = (order: Order, id: number) => {
    setSelectedOrder(order);
    setSelectedMarker(id);
  };
  const closePopup = () => {
    setShowPopup(false);
    setSelectedMarker(null);
  };
  const extractUsername = (email: string) => {
    const atIndex = email.indexOf("@");
    return atIndex !== -1 ? email.substring(0, atIndex) : email;
  };
  return (
    <div className="directions-container">
      <div style={{ width: "100%", height: "100%" }}>
        <ReactMapGL
          mapboxAccessToken={token}
          {...viewport}
          mapStyle="mapbox://styles/mapbox/streets-v12"
          interactive={true}
          // center={[sampleOrders[0].location.longitude, sampleOrders[0].location.latitude]}
          onDrag={(e) => {
            setViewport((prevViewport) => ({
              ...prevViewport,
              longitude: e.viewState.longitude,
              latitude: e.viewState.latitude,
            }));
          }}
          zoom={15}
        >
          <Marker latitude={startLoc[1]} longitude={startLoc[0]}>
            <FaLocationDot color="red" size={40} />
          </Marker>
          {orders.map((order, index) => (
            <Marker
              key={index}
              latitude={order.location.latitude}
              longitude={order.location.longitude}
              onClick={() => onClickMarker(order, index)}
            >
              <div>
                <FaLocationDot
                  style={{
                    height: "40px",
                    width: "auto",
                    color: "blue",
                  }}
                />
              </div>
            </Marker>
          ))}
          {selectedMarker !== null && orders[selectedMarker] && (
            <Popup
              latitude={orders[selectedMarker]?.location?.latitude || 0}
              longitude={orders[selectedMarker]?.location?.longitude || 0}
              closeButton={true}
              closeOnClick={false}
              anchor="bottom"
              onClose={closePopup}
            >
              <div className="grid bg-bdfff7 p-4 rounded-md shadow-md w-100%">
                <div className="flex-1">
                  <h2 className="text-lg  mb-2">
                    <span className="font-bold">Customer: </span>
                    {extractUsername(orders[selectedMarker]?.username)}
                  </h2>
                  <p className="text-sm mb-2">
                    Round: {orders[selectedMarker]?.round}
                  </p>
                  <p className="text-sm mb-2">
                    Slim: {orders[selectedMarker]?.slim}
                  </p>
                  <p className="text-sm">
                    Total: {orders[selectedMarker]?.total}
                  </p>
                </div>
                <div className="flex items-end ml-16">
                  <button
                    className=" text-sm bg-blue-500 text-white px-4 py-2 rounded-md"
                    onClick={() => {
                      console.log("click", orders[selectedMarker]);
                    }}
                  >
                    Mark as Done
                  </button>
                </div>
              </div>
            </Popup>
          )}
          <NavigationControl showZoom position="top-right" />
          <Source id="route" type="geojson" data={geojson}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round",
              }}
              paint={{
                "line-color": "#0096FF",
                "line-width": 8,
              }}
            />
          </Source>
        </ReactMapGL>
      </div>
    </div>
  );
}
