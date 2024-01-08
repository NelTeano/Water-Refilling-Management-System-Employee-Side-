import { FeatureCollection, GeoJsonProperties, Geometry } from "geojson";
import React, { useEffect, useState } from "react";
import ReactMapGL, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup, Source,Layer
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
  const [routeData, setRouteData] = useState([]);
  const [latitude, setLatitude] = useState<Number>();
  const [longitude, setLongitude] = useState<Number>();
  const [viewport, setViewport] = useState<Viewport>({
    width: "100%",
    height: 400,
    latitude: 14.32013590771544,
    longitude: 120.99311440171681,
    zoom: 16,
  });
  
  const geojson: FeatureCollection<Geometry, GeoJsonProperties> = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: [...routeData]
        },
      }, 
    ]
  };
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

  useEffect(() => {
    const getRoute = async () => {
      try {
        const loc1 = [120.99311440171681, 14.32013590771544];
        const loc2 = [120.9921407898388, 14.321070651256804];

        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${viewport.longitude},${viewport.latitude};${loc2[0]},${loc2[1]}?geometries=geojson&access_token=${token}`
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
      {routeData.length > 0 && (
        <>
          <Marker latitude={viewport.latitude} longitude={viewport.longitude}>
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

          <Source id="route" type="geojson" data={geojson}>
            <Layer
              id="route"
              type="line"
              source="route"
              layout={{
                "line-join": "round",
                "line-cap": "round"
              }}
              paint={{
                "line-color": "#0096FF",
                "line-width": 8
              }}
            />
          </Source>

          <Popup
            latitude={viewport.latitude}
            longitude={viewport.longitude}
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
        </>
      )}
    </ReactMapGL>
  </div>
  );
}
