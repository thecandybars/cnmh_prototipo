import { Box } from "@mui/material";
import getEnv from "../../utils/getEnv";
import Map from "react-map-gl";
import { useRef, useState } from "react";

export default function Test() {
  const mapRef = useRef(null);
  const [actualViewport, setActualViewport] = useState({
    latitude: 3.9974761715434113,
    longitude: -74.25213515499391,
    zoom: 15.44,
    bearing: -102.8,
    pitch: 79,
  });
  function updateCameraPosition(position, altitude, target) {
    const camera = map.getFreeCameraOptions();

    camera.position = mapboxgl.MercatorCoordinate.fromLngLat(
      position,
      altitude
    );
    camera.lookAtPoint(target);

    map.setFreeCameraOptions(camera);
  }
  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Map
        mapRef={mapRef}
        initialViewState={actualViewport}
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        mapboxAccessToken={getEnv("mapboxToken")}
        // onClick={handleMapClick}
        onMove={(evt) => {
          setActualViewport(evt.viewState);
        }}
        onLoad={() => animate()}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      ></Map>
    </Box>
  );
}
