import { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllLugares } from "../../services/lugares";
// import StyledMarker from "../RegionalMap/StyledMarker";
// import CustomMarker from "./CustomMarker";
// import { Marker } from "react-map-gl";

mapboxgl.accessToken = getEnv("mapboxToken");
const mapInit = {
  latitude: 4.8509,
  longitude: -73.4127,
  zoom: 4.83,
  bearing: 0,
  pitch: 0,
};

const Landing2 = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  // const [style, setStyle] = useState(
  //   "mapbox://styles/juancortes79/clxbt6q9w09jt01ql089jau20"
  // );
  const [style, setStyle] = useState("mapbox://styles/mapbox/light-v10");
  const [viewport, setViewport] = useState(mapInit);
  const [lastMapClicked, setLastMapClicked] = useState({});

  const [lugares] = useFetch(() => getAllLugares());
  console.log("🚀 ~ Landing2 ~ lugares:", lugares);

  // console.log("🚀 ~ Landing2 ~ viewport:", viewport);
  // console.log("🚀 ~ Landing2 ~ viewport:", viewport);
  useEffect(() => {
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style,
      center: [viewport.longitude, viewport.latitude],
      zoom: viewport.zoom,
      bearing: viewport.bearing,
    });

    // Add click event listener
    map.current.on("click", (event) => setLastMapClicked(event.lngLat));

    // Add 3D terrain
    map.current.on("load", () => {
      map.current.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 2.5 });

      map.current.addLayer({
        id: "sky",
        type: "sky",
        paint: {
          "sky-type": "atmosphere",
          "sky-atmosphere-sun": [0.0, 0.0],
          "sky-atmosphere-sun-intensity": 15,
        },
      });
    });

    // Update viewport state on map move
    map.current.on("move", () => {
      setViewport({
        longitude: map.current.getCenter().lng,
        latitude: map.current.getCenter().lat,
        zoom: map.current.getZoom(),
        pitch: map.current.getPitch(),
        bearing: map.current.getBearing(),
      });
    });

    return () => map.current.remove();
  }, []);

  // MARKERS
  // useEffect(() => {
  //   // Add markers
  //   lugares?.length &&
  //     lugares.forEach((lugar) => {
  //       console.log("🚀 ~ lugares.forEach ~ lugar:", lugar);
  //       if (lugar.latitud && lugar.longitud) {
  //         new mapboxgl.Marker()
  //           .setLngLat([lugar.longitud, lugar.latitud])
  //           .addTo(map.current);
  //       }
  //     });
  // }, [lugares]);

  // FLY ON CLICK
  useEffect(() => {
    if (Object.keys(lastMapClicked).length) {
      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      map.current.flyTo({
        center: [lastMapClicked.lng, lastMapClicked.lat],
        zoom: 11,
        bearing: 0,
        pitch: 68,
        duration: 2000,
      });
      setTimeout(() => {
        map.current.setStyle(
          "mapbox://styles/juancortes79/clxbt6q9w09jt01ql089jau20"
        );
      }, 2000);
    }
  }, [lastMapClicked]);

  // RESET BUTTON
  const handleReset = () => {
    map.current.flyTo({
      center: [mapInit.longitude, mapInit.latitude],
      zoom: mapInit.zoom,
      bearing: mapInit.bearing,
      pitch: mapInit.pitch,
      duration: 1000,
    });
    setTimeout(() => {
      map.current.setStyle("mapbox://styles/mapbox/light-v10");

      map.current.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
    }, 2000);
    setLastMapClicked({});
  };

  return (
    <div>
      <div ref={mapContainer} style={{ width: "100vw", height: "100vh" }} />
      <button
        onClick={handleReset}
        style={{ position: "absolute", top: 100, left: 10 }}
      >
        Reset
      </button>
      {/* <Marker latitude={-74} longitude={4} anchor="bottom" /> */}

      {/* {lugares?.length && (
        <CustomMarker
          place={{
            id: 3,
            name: "Comuna 13, Medellín",
            latitude: 6.2557,
            longitude: -75.6186,
            image: "comuna13.png",
            shortText:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          }}
        />
      )} */}
      <div
        style={{
          position: "absolute",
          top: 200,
          left: 10,
          background: "black",
          padding: "10px",
        }}
      >
        <div>Longitude: {viewport.longitude.toFixed(4)}</div>
        <div>Latitude: {viewport.latitude.toFixed(4)}</div>
        <div>Zoom: {viewport.zoom.toFixed(2)}</div>
        <div>Pitch: {viewport.pitch.toFixed(2)}</div>
        <div>Bearing: {viewport.bearing.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default Landing2;
