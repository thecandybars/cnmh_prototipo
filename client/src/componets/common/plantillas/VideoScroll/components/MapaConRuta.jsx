import { useRef, useMemo, useState, useEffect } from "react";
import Map, { Marker, Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import PropTypes from "prop-types";
import getEnv from "../../../../../utils/getEnv";
import { theme } from "../../../../../utils/theme";
import { WebMercatorViewport } from "viewport-mercator-project";

const MAPBOX_TOKEN = getEnv("mapboxToken");

function haversineDistance([lng1, lat1], [lng2, lat2]) {
  const R = 6371000; // meters
  const toRad = (val) => (val * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function computeRouteDistances(points) {
  const distances = [];
  const cumulativeDistances = [0];
  for (let i = 1; i < points.length; i++) {
    const dist = haversineDistance(points[i - 1], points[i]);
    distances.push(dist);
    cumulativeDistances.push(cumulativeDistances[i - 1] + dist);
  }
  return { distances, cumulativeDistances };
}

function getPositionAtDistance(points, cumulativeDistances, distance) {
  const totalDistance = cumulativeDistances[cumulativeDistances.length - 1];
  const targetDist = Math.max(0, Math.min(distance, totalDistance));

  if (targetDist === 0) return points[0];

  for (let i = 1; i < cumulativeDistances.length; i++) {
    if (cumulativeDistances[i] >= targetDist) {
      const segmentStart = points[i - 1];
      const segmentEnd = points[i];
      const segmentDist = cumulativeDistances[i] - cumulativeDistances[i - 1];
      const segmentProgress =
        (targetDist - cumulativeDistances[i - 1]) / segmentDist;

      const lng =
        segmentStart[0] + (segmentEnd[0] - segmentStart[0]) * segmentProgress;
      const lat =
        segmentStart[1] + (segmentEnd[1] - segmentStart[1]) * segmentProgress;
      return [lng, lat];
    }
  }

  return points[points.length - 1];
}

const MapaConRuta = ({ points, progress, width, height }) => {
  const mapRef = useRef(null);

  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 2,
  });

  const { routeGeoJSON, cumulativeDistances } = useMemo(() => {
    if (!points || points.length < 2) {
      return { routeGeoJSON: null, cumulativeDistances: [] };
    }

    const routeGeoJSON = {
      type: "Feature",
      geometry: {
        type: "LineString",
        coordinates: points,
      },
    };

    const { cumulativeDistances } = computeRouteDistances(points);
    return { routeGeoJSON, cumulativeDistances };
  }, [points]);

  // Recalculate the bounding box and update the viewState whenever points change
  useEffect(() => {
    if (points && points.length >= 2) {
      const lngs = points.map((p) => p[0]);
      const lats = points.map((p) => p[1]);
      const minLng = Math.min(...lngs);
      const maxLng = Math.max(...lngs);
      const minLat = Math.min(...lats);
      const maxLat = Math.max(...lats);

      const viewport = new WebMercatorViewport({
        width: typeof width === "number" ? width : 800,
        height: typeof height === "number" ? height : 600,
      }).fitBounds(
        [
          [minLng, minLat],
          [maxLng, maxLat],
        ],
        { padding: 50 }
      );

      // Update the controlled viewState
      setViewState({
        longitude: viewport.longitude,
        latitude: viewport.latitude,
        zoom: viewport.zoom,
      });
    }
  }, [points, width, height]);

  if (!routeGeoJSON) {
    return <div>No route defined</div>;
  }

  const totalDistance =
    cumulativeDistances[cumulativeDistances.length - 1] || 0;
  const currentPosition = getPositionAtDistance(
    points,
    cumulativeDistances,
    progress * totalDistance
  );

  return (
    <Map
      ref={mapRef}
      {...viewState}
      style={{ width, height }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      mapboxAccessToken={MAPBOX_TOKEN}
      onMove={(evt) => setViewState(evt.viewState)}
    >
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
      {/* Inicial */}
      <Marker longitude={points[0][0]} latitude={points[0][1]}>
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "50%",
            width: 15,
            height: 15,
          }}
        />
      </Marker>
      {/* Final */}
      <Marker
        longitude={points[points.length - 1][0]}
        latitude={points[points.length - 1][1]}
      >
        <div
          style={{
            backgroundColor: theme.palette.secondary.main,
            borderRadius: "50%",
            width: 15,
            height: 15,
          }}
        />
      </Marker>
      {/* Posicion */}
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
  points: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)).isRequired,
  progress: PropTypes.number.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};

export default MapaConRuta;
