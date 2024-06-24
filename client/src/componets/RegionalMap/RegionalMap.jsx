import { useCallback, useRef, useState } from "react";
import Map, {
  Source,
  Popup,
  NavigationControl,
  Layer,
  ScaleControl,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import StyledMarker from "./StyledMarker";
import getEnv from "../../utils/getEnv";
import MapAnimate from "./MapAnimate";
import useFetch from "../common/customHooks/useFetch";
import { getAllLugares } from "../../services/lugares";

const TOKEN = getEnv("mapboxToken");

const skyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [10.0, 20.0],
    "sky-atmosphere-sun-intensity": 8,
  },
};

const mapInit = {
  latitude: 9.33968,
  longitude: -75.107065,
  zoom: 7.4,
  bearing: 0,
  pitch: 48,
};

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

export default function RegionalMap() {
  const [viewport, setViewport] = useState(mapInit);
  const [selectedPlace, setSelectedPlace] = useState(null);
  console.log("🚀 ~ RegionalMap ~ selectedPlace:", selectedPlace);

  // const { current: map } = useMap();
  const map = useRef();

  const handleViewportChange = useCallback((newViewport) => {
    setViewport(newViewport);
  }, []);

  // MARKERS
  const [lugares] = useFetch(() => getAllLugares());
  const renderMarkers = lugares?.map((lugar) => (
    // <StyledMarker
    //   key={lugar.id}
    //   marca={lugar}
    //   zoom={viewport.zoom}
    //   onClick={(e,id) => handleSelectedMarker(e, id)}
    // />
    <button key={lugar.id} onClick={(e) => handleSelectedMarker(e, lugar.id)}>
      <StyledMarker marca={lugar} zoom={viewport.zoom} />
    </button>
  ));

  // POPUPS
  const renderPopup = selectedPlace && (
    <Popup
      latitude={selectedPlace.latitud}
      longitude={selectedPlace.longitud}
      anchor="top"
      onClose={() => setSelectedPlace(null)}
    >
      <h3 style={{ color: "black" }}>{selectedPlace.nombre}</h3>
      <a href="/espacio">Visitar</a>
    </Popup>
  );

  // ZOOM INTO SELECTED PLACE
  const flyToSelectedPlace = selectedPlace && (
    <MapAnimate
      centerPoint={{
        latitude: selectedPlace.latitud,
        longitude: selectedPlace.longitud,
        zoom: 15,
        bearing: 0,
        pitch: 70,
      }}
    />
  );
  // ZOOM INTO REGION
  const flyToRegion = !selectedPlace && <MapAnimate centerPoint={mapInit} />;

  // HANDLERS
  const handleSelectedMarker = useCallback(
    (e, id) => {
      e.stopPropagation();
      id &&
        lugares &&
        setSelectedPlace(lugares.find((lugar) => lugar.id === id));
    },
    [lugares]
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        ref={map}
        {...viewport}
        onMove={(evt) => handleViewportChange(evt.viewState)}
        maxPitch={85}
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        // mapStyle="mapbox://styles/juancortes79/clxbt6q9w09jt01ql089jau20"
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={TOKEN}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
        maxBounds={colombiaBounds}
      >
        <ScaleControl />
        {renderMarkers}
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skyLayer} />
        {renderPopup}
        {flyToRegion}
        {flyToSelectedPlace}
        <NavigationControl />
      </Map>

      <div
        style={{
          position: "absolute",
          top: 50,
          left: 0,
          padding: "10px",
          background: "#ffffff",
          color: "black",
        }}
      >
        <p>Lat: {viewport.latitude}</p>
        <p>Long: {viewport.longitude}</p>
        <p>Zoom: {viewport.zoom}</p>
        <p>Pitch: {viewport.pitch}</p>
        <p>Bearing: {viewport.bearing}</p>
      </div>
    </div>
  );
}
