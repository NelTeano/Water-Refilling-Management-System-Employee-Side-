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
const token =
  "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA";

interface Viewport {
  latitude: number;
  longitude: number;
  zoom: number;
}
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
export default function Navigate() {
  const [routeData, setRouteData] = useState([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [viewport, setViewport] = useState<Viewport>({
    latitude: 14.242677096111422,
    longitude: 120.96215109424094,
    zoom: 16,
  });
  const [orders, setOrders] = useState<Order[]>([]);
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
 
  useEffect(() => {
    const getRoute = async () => {
      try {
        const orderResponse = await fetch("http://localhost:5174/api/orders");
        const orderData = await orderResponse.json();
        setOrders(orderData);
        console.log(orders)
        const orderLocations = orderData.map((order: Order) => [
          order.location.longitude,
          order.location.latitude,
        ]);
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${viewport.longitude},${viewport.latitude};${orderLocations.join(';')}?geometries=geojson&access_token=${token}`
        );

        const data = await response.json();
        setRouteData(data.routes[0].geometry.coordinates);
      } catch (err) {
        console.log(err);
      }
    };

    getRoute();
  }, []);

  return (
    <div className="directions-container">
      <ReactMapGL
        {...viewport}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onDrag={(e) => {
          setViewport((prevViewport) => ({
            ...prevViewport,
            longitude: e.viewState.longitude,
            latitude: e.viewState.latitude,
          }));
        }}
        mapboxAccessToken={token}
        interactive={true}
        scrollZoom={true}
      >
        {routeData.length > 0 && (
          <>
            <GeolocateControl
              positionOptions={{ enableHighAccuracy: true }}
              trackUserLocation={true}
            />
            <Marker latitude={latitude} longitude={longitude}>
             
              <FaLocationDot color="blue" size={40} />
            </Marker>
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
          </>
        )}
      </ReactMapGL>
    </div>
  );
}
