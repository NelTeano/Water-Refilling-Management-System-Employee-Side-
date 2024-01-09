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

export default function Navigate() {
  const [routeData, setRouteData] = useState([]);
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [viewport, setViewport] = useState<Viewport>({
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
  const loc2 = [120.9921407898388, 14.321070651256804];
  const loc3 = [120.9933358393086, 14.321578086729374];
  const loc4 = [120.99522663682114, 14.32047710054286];
  useEffect(() => {
    const getRoute = async () => {
      try {
        
        const response = await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${viewport.longitude},${viewport.latitude};${loc2[0]},${loc2[1]};${loc3[0]},${loc3[1]};${loc4[0]},${loc4[1]}?geometries=geojson&access_token=${token}`
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
        dragPan={true}
      >
        {routeData.length > 0 && (
          <>
            <Marker
              latitude={latitude}
              longitude={longitude}
              offset={[0, -20]}
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

            <Marker
              latitude={loc2[1]}
              longitude={loc2[0]}
              offset={[0, -20]}
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
            <Marker
              latitude={loc3[1]}
              longitude={loc3[0]}
              offset={[0, -20]}
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
            <Marker
             latitude={loc4[1]}
             longitude={loc4[0]}
              offset={[0, -20]}
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
