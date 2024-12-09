import { useRef } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import getEnv from "../../../../utils/getEnv";
import { theme } from "../../../../utils/theme";

// Token de acceso para Mapbox
const MAPBOX_TOKEN = getEnv("mapboxToken");

const MapaConRuta = ({ pointA, pointB, progress, width, height, zoom }) => {
  const mapRef = useRef(null);

  // Función para calcular la posición actual según el progreso
  const interpolatePosition = (pointA, pointB, progress) => {
    const lat = pointA[1] + (pointB[1] - pointA[1]) * progress;
    const lng = pointA[0] + (pointB[0] - pointA[0]) * progress;
    return [lng, lat];
  };

  // Generar la geometría de la línea entre los puntos A y B
  const routeGeoJSON = {
    type: "Feature",
    geometry: {
      type: "LineString",
      coordinates: [pointA, pointB],
    },
  };

  // Calcular la posición actual del marcador
  const currentPosition = interpolatePosition(pointA, pointB, progress);

  return (
    <Map
      ref={mapRef}
      initialViewState={{
        longitude: (pointA[0] + pointB[0]) / 2,
        latitude: (pointA[1] + pointB[1]) / 2,
        zoom,
      }}
      style={{ width, height }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {/* Capa para la línea que conecta los puntos */}
      <Source id="route" type="geojson" data={routeGeoJSON}>
        <Layer
          id="route-line"
          type="line"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "#8e8a79",
            "line-width": 4,
          }}
        />
      </Source>

      {/* Marcador inicial (Punto A) */}
      <Marker longitude={pointA[0]} latitude={pointA[1]}>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "50%",
            width: 15,
            height: 15,
          }}
        />
      </Marker>

      {/* Marcador final (Punto B) */}
      <Marker longitude={pointB[0]} latitude={pointB[1]}>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "50%",
            width: 15,
            height: 15,
          }}
        />
      </Marker>

      {/* Marcador que muestra el progreso */}
      <Marker longitude={currentPosition[0]} latitude={currentPosition[1]}>
        <div
          style={{
            backgroundColor: "black",
            borderRadius: "50%",
            width: 8,
            height: 8,
          }}
        />
      </Marker>
    </Map>
  );
};

MapaConRuta.propTypes = {
  pointA: PropTypes.array.isRequired,
  pointB: PropTypes.array.isRequired,
  progress: PropTypes.number.isRequired,
  width: PropTypes.any.isRequired,
  height: PropTypes.any.isRequired,
  zoom: PropTypes.number.isRequired,
};

export default MapaConRuta;
