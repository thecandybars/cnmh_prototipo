import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojsonData from "./col.json";
import { useNavigate } from "react-router-dom";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { theme } from "../../utils/theme";
import { useCallback, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import StyledMarker from "./StyledMarker";

const TOKEN = getEnv("mapboxToken");

// const views = [
//   {
//     id: 0,
//     name: "pais",
//   },
//   {
//     id: 1,
//     name: "region",
//   },
//   {
//     id: 2,
//     name: "lugar",
//   },
// ];

const viewports = [
  {
    id: 0,
    name: "init",
    latitude: 5.432533819636163,
    longitude: -73.64605127345608,
    bearing: 0,
    pitch: 0,
    zoom: 4.74,
  },
  {
    id: 1,
    name: "atlantica",
    latitude: 9.623258819486551,
    longitude: -74.34607646380869,
    bearing: 0,
    pitch: 55.5,
    zoom: 6.8,
  },
  {
    id: 2,
    name: "andina",
    latitude: 4.6031532264371435,
    longitude: -75.18776978314327,
    bearing: -12,
    pitch: 68,
    zoom: 6.8,
  },
  {
    id: 3,
    name: "orinoquia",
    latitude: 4.070452284593742,
    longitude: -71.6532422060435,
    bearing: 0,
    pitch: 57.5,
    zoom: 6.9,
  },
  {
    id: 4,
    name: "pacifica",
    latitude: 4.558676216895876,
    longitude: -77.6577498889891,
    bearing: -90.4,
    pitch: 57,
    zoom: 6.8,
  },
  {
    id: 5,
    name: "amazonia",
    latitude: 1.6282593079443473,
    longitude: -71.20728998905867,
    bearing: 39,
    pitch: 66.5,
    zoom: 6.16,
  },
];

// const departamentos = [
//   {
//     id: 15,
//     name: "Boyacá",
//     region: "Andina",
//   },
//   {
//     id: 44,
//     name: "Guajira",
//     region: "Caribe",
//   },
//   {
//     id: 47,
//     name: "Magdalena",
//     region: "Caribe",
//   },
//   {
//     id: 85,
//     name: "Casanare",
//     region: "Orinoquía",
//   },
//   {
//     id: 94,
//     name: "Guainía",
//     region: "Amazonía",
//   },
//   {
//     id: 88,
//     name: "Archipielago de San Andrés y Providencia",
//     region: "Insular",
//   },
//   {
//     id: 23,
//     name: "Córdoba",
//     region: "Caribe",
//   },
//   {
//     id: 52,
//     name: "Nariño",
//     region: "Pacífico",
//   },
//   {
//     id: 73,
//     name: "Tolima",
//     region: "Andina",
//   },
//   {
//     id: 76,
//     name: "Valle del Cauca",
//     region: "Pacífico",
//   },
//   {
//     id: 95,
//     name: "Guaviare",
//     region: "Amazonía",
//   },
//   {
//     id: 97,
//     name: "Vaupés",
//     region: "Amazonía",
//   },
//   {
//     id: 17,
//     name: "Caldas",
//     region: "Andina",
//   },
//   {
//     id: 25,
//     name: "Cundinamarca",
//     region: "Andina",
//   },
//   {
//     id: 86,
//     name: "Putumayo",
//     region: "Amazonía",
//   },
//   {
//     id: 5,
//     name: "Antioquia",
//     region: "Andina",
//   },
//   {
//     id: 19,
//     name: "Cauca",
//     region: "Pacífico",
//   },
//   {
//     id: 81,
//     name: "Arauca",
//     region: "Orinoquía",
//   },
//   {
//     id: 91,
//     name: "Amazonas",
//     region: "Amazonía",
//   },
//   {
//     id: 20,
//     name: "Cesar",
//     region: "Caribe",
//   },
//   {
//     id: 68,
//     name: "Santander",
//     region: "Andina",
//   },
//   {
//     id: 13,
//     name: "Bolívar",
//     region: "Caribe",
//   },
//   {
//     id: 18,
//     name: "Caquetá",
//     region: "Amazonía",
//   },
//   {
//     id: 27,
//     name: "Chocó",
//     region: "Pacífico",
//   },
//   {
//     id: 50,
//     name: "Meta",
//     region: "Orinoquía",
//   },
//   {
//     id: 8,
//     name: "Atlántico",
//     region: "Caribe",
//   },
//   {
//     id: 41,
//     name: "Huila",
//     region: "Andina",
//   },
//   {
//     id: 54,
//     name: "Norte de Santander",
//     region: "Andina",
//   },
//   {
//     id: 63,
//     name: "Quindío",
//     region: "Andina",
//   },
//   {
//     id: 99,
//     name: "Vichada",
//     region: "Orinoquía",
//   },
//   {
//     id: 11,
//     name: "Bogotá",
//     region: "Andina",
//   },
//   {
//     id: 66,
//     name: "Risaralda",
//     region: "Andina",
//   },
//   {
//     id: 70,
//     name: "Sucre",
//     region: "Caribe",
//   },
// ];

const Landing = () => {
  const mapRef = useRef();
  const navigate = useNavigate();
  const [departamentos] = useFetch(() => getAllDepartamentos());
  const [actualRegion, setActualRegion] = useState(null);
  console.log("🚀 ~ Landing ~ actualRegion:", actualRegion);

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState(viewports[0]);
  const handleViewportChange = useCallback((newViewport) => {
    setActualViewport(newViewport);
  }, []);

  // VIEWS
  const [actualView, setActualView] = useState(0); //0:pais, 1:region, 2:lugar

  // HANDLE CLICKS ON MAP
  const handleMapClick = (event) => {
    if (event.features.length > 0) {
      // CLICKED ON INTERACTIVE REGION
      const clickedId = parseInt(event.features[0].properties.dpto);
      const clickedRegion = departamentos.find(
        (dpto) => dpto.geoId === clickedId
      );
      setFly(
        viewports.find((viewport) => viewport.id === clickedRegion.RegionId)
      );
      setActualView(1);
      setActualRegion(clickedRegion.Region);
    }
  };

  // ZOOM INTO SELECTED REGION
  const [fly, setFly] = useState(null);
  const flyTo = useMemo(() => {
    mapRef.current?.flyTo({
      center: [fly.longitude, fly.latitude],
      zoom: fly.zoom,
      speed: 0.4,
      curve: 2.42,
      bearing: fly.bearing,
      pitch: fly.pitch,
      essential: true,
    });
  }, [fly]);

  // INTERACTIVE DEPARTAMENTOS
  const interactiveLayerIds = departamentos?.map(
    (dpto) => `zone-${dpto.geoId}-fill`
  );

  // COLOR REGIONS
  const drawRegions =
    departamentos?.length &&
    geojsonData.features.map((feature) => {
      const id = parseInt(feature.properties.dpto);
      const region = departamentos?.find((dpto) => dpto.geoId === id)?.Region;
      const regionColor = {
        color: theme.palette[region.name]?.first || "pink",
        opacity: 0.5,
      };
      if (region) {
        if (actualView === 1) {
          if (region.id === actualRegion.id) regionColor.opacity = 0.2;
        }
      }
      return (
        <Source
          key={`zone-${id}`}
          id={`zone-${id}`}
          type="geojson"
          data={feature}
        >
          <Layer
            id={`zone-${id}-fill`}
            type="fill"
            paint={{
              "fill-color": regionColor.color,
              "fill-opacity": regionColor.opacity,
            }}
          />
          {/* <Layer
          id={`zone-${id}-line`}
          type="line"
          paint={{
            "line-color": colorRegion,
            "line-width": 1,
          }}
        /> */}
        </Source>
      );
    });

  // MARKERS
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [lugares] = useFetch(() => getAllLugares());
  const renderMarkers =
    actualView !== 0 &&
    lugares?.map((lugar) => (
      // <StyledMarker
      //   key={lugar.id}
      //   marca={lugar}
      //   zoom={viewport.zoom}
      //   onClick={(e,id) => handleSelectedMarker(e, id)}
      // />
      <button key={lugar.id} onClick={(e) => handleSelectedMarker(e, lugar.id)}>
        <StyledMarker marca={lugar} zoom={actualViewport.zoom} />
      </button>
    ));
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
      <div style={{ position: "absolute", zIndex: 100 }}>
        <button
          onClick={() => {
            setFly(viewports[0]);
            setActualView(0);
          }}
          style={{ marginTop: "100px" }}
        >
          HOME
        </button>
      </div>
      <Map
        ref={mapRef}
        initialViewState={viewports[0]}
        mapStyle="mapbox://styles/juancortes79/clxbt6q9w09jt01ql089jau20"
        // mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        onMove={(evt) => handleViewportChange(evt.viewState)}
        interactiveLayerIds={interactiveLayerIds}
      >
        {flyTo}
        {drawRegions}
        {renderMarkers}
      </Map>
    </div>
  );
};

export default Landing;
