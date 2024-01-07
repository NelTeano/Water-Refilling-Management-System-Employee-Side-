import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
} from "react-map-gl";
import { useParams } from "react-router-dom";

const token =
  "pk.eyJ1Ijoiam1hZ3dpbGkiLCJhIjoiY2xwaGZwaHh0MDJtOTJqbzVkanpvYjRkNSJ9.fZFeViJyigw6k1ebFAbTYA";

interface Viewport {
  width: string | number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

export default function Navigate() {
  const [routeData, setRouteData] = useState<number[][]>([]);
  const [viewport, setViewport] = useState<Viewport>({
    width: "100%",
    height: 400,
    latitude: 14.32013590771544,
    longitude: 120.99311440171681,
    zoom: 16,
  });

  useEffect(() => {
    const getRoute = async () => {
      try {
        const loc1 = [120.99311440171681, 14.32013590771544];
        const loc2 = [120.9921407898388, 14.321070651256804];

        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${loc1[0]},${loc1[1]};${loc2[0]},${loc2[1]}?geometries=geojson&access_token=${token}`
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
        mapboxAccessToken={token}
      >
        <Marker latitude={routeData[0][1]} longitude={routeData[0][0]}>
          <div>Start</div>
        </Marker>

        <Marker
          latitude={routeData[routeData.length - 1][1]}
          longitude={routeData[routeData.length - 1][0]}
        >
          <div>End</div>
        </Marker>

        <NavigationControl showZoom position="top-right" />

        <GeolocateControl
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
        />

        <Popup
          latitude={routeData[0][1]}
          longitude={routeData[0][0]}
          closeButton={false}
          closeOnClick={false}
        >
          <div>Start</div>
        </Popup>

        <Popup
          latitude={routeData[routeData.length - 1][1]}
          longitude={routeData[routeData.length - 1][0]}
          closeButton={false}
          closeOnClick={false}
        >
          <div>End</div>
        </Popup>
      </ReactMapGL>
    </div>
  );
}
