import { useState } from "react";
import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import StyledMarker from "./StyledMarker";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const skyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 4,
  },
};

const places = [
  {
    id: 1,
    name: "Quibdó",
    latitude: 5.6956,
    longitude: -76.6498,
    image: "choco.png",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 2,
    name: "Sierra Nevada de Santa Marta",
    latitude: 10.8292,
    longitude: -73.6923,
    image: "sierra-nevada.png",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 3,
    name: "Comuna 13, Medellín",
    latitude: 6.2557,
    longitude: -75.6186,
    image: "comuna13.png",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 4,
    name: "Pasto",
    latitude: 1.2059,
    longitude: -77.2858,
    image: "pasto.png",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    id: 5,
    name: "Florencia",
    latitude: 1.6154,
    longitude: -75.6042,
    image: "florencia.png",
    shortText:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
];

const mapInit = {
  latitude: 3.034492,
  longitude: -72.86716,
  zoom: 5,
  bearing: -11,
  pitch: 48,
};

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

export default function RegionalMap() {
  const [viewport, setViewport] = useState(mapInit);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleViewportChange = (newViewport) => {
    setViewport(newViewport);
  };

  const handleSelectedMarker = (e, id) => {
    e.stopPropagation();
    setSelectedPlace(places.find((place) => place.id === id));
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        {...viewport}
        onMove={(evt) => handleViewportChange(evt.viewState)}
        maxPitch={85}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
        maxBounds={colombiaBounds}
      >
        {places.map((place) => (
          <button
            key={place.id}
            onClick={(e) => handleSelectedMarker(e, place.id)}
          >
            <StyledMarker place={place} zoom={viewport.zoom} />
          </button>
        ))}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />
        {selectedPlace && (
          <Popup
            latitude={selectedPlace.latitude}
            longitude={selectedPlace.longitude}
            anchor="top"
            onClose={() => setSelectedPlace(null)}
          >
            <h3 style={{ color: "black" }}>{selectedPlace.name}</h3>
            <p style={{ color: "black" }}>{selectedPlace.shortText}</p>
            <a href="#">Visitar</a>
          </Popup>
        )}
      </Map>

      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          padding: "10px",
          background: "white",
          color: "black",
        }}
      >
        <p>Lat: {viewport.latitude}</p>
        <p>Long: {viewport.longitude}</p>
        <p>Zoom: {viewport.zoom}</p>
        <p>Pitch: {viewport.pitch}</p>
        <p>Bearing: {viewport.bearing}</p>
      </div> */}
    </div>
  );
}
