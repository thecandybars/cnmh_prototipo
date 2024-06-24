import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojsonData from "./col.json";
// import { useNavigate } from "react-router-dom";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { theme } from "../../utils/theme";
import { useCallback, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
// import StyledMarker from "../RegionalMap/StyledMarker";
import StyledMarker from "./StyledMarker";
// import { MarkerMuseoMemoria } from "../common/icons";

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
const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

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
    latitude: 4.074207351982309,
    longitude: -74.4694048844076,
    zoom: 6,
    bearing: 0,
    pitch: 0,
  },
  // {
  //   id: 0,
  //   name: "init",
  //   latitude: 5.432533819636163,
  //   longitude: -73.64605127345608,
  //   bearing: 0,
  //   pitch: 0,
  //   zoom: 4.74,
  // },
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

const Landing = () => {
  const mapRef = useRef();
  // const navigate = useNavigate();
  const [departamentos] = useFetch(() => getAllDepartamentos());
  const [actualRegion, setActualRegion] = useState(null);

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState(viewports[0]);
  const handleViewportChange = (newViewport) => {
    setActualViewport(newViewport);
  };
  // const handleViewportChange = useCallback((newViewport) => {
  //   setActualViewport(newViewport);
  // }, []);

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
      setActualView(1);
      setActualRegion(clickedRegion.Region);
      setDestination(
        viewports.find((viewport) => viewport.id === clickedRegion.RegionId)
      );
    }
  };
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
  const [lugares] = useFetch(() => getAllLugares());
  const renderMarkers =
    actualView !== 0 &&
    actualRegion &&
    lugares
      ?.filter(
        (lugar) => lugar.Municipio.Departamento.Region.id === actualRegion.id
      )
      .map((lugar) => (
        <button
          key={lugar.id}
          onClick={(e) => handleSelectedMarker(e, lugar.id)}
        >
          <StyledMarker marca={lugar} zoom={actualViewport.zoom} />
        </button>
      ));

  // HANDLERS MARKERS
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleSelectedMarker = useCallback(
    (e, id) => {
      e.stopPropagation();
      const lugar = lugares.find((lugar) => lugar.id === id);
      setSelectedMarker(lugar);
      id &&
        lugares &&
        setDestination({
          longitude: lugar.longitud,
          latitude: lugar.latitud,
          speed: 0.4,
          curve: 1.42,
          zoom: 15,
          bearing: 0,
          pitch: 70,
        });
    },
    [lugares]
  );

  // FLY TO DESTINATION
  const [destination, setDestination] = useState(null);
  const flyToDestination = useMemo(() => {
    destination &&
      mapRef.current?.flyTo({
        center: [destination.longitude, destination.latitude],
        speed: destination.speed || 0.4,
        curve: destination.curve || 1.42,
        zoom: destination.zoom || 15,
        bearing: destination.bearing || 0,
        pitch: destination.pitch || 70,
        essential: true,
      });
  }, [destination]);

  // POPUPS
  const renderPopup = selectedMarker && (
    <Popup
      latitude={selectedMarker.latitud}
      longitude={selectedMarker.longitud}
      anchor="top"
      onClose={() => handleClosePopup()}
    >
      <h3 style={{ color: "black" }}>{selectedMarker.nombre}</h3>
      <a href="/espacio">Visitar</a>
    </Popup>
  );

  const handleClosePopup = () => {
    setSelectedMarker(null);
    const regionCoordinates = viewports.find(
      (region) => region.id === actualRegion.id
    );
    setDestination(regionCoordinates);
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <div style={{ position: "absolute", marginTop: "100px", zIndex: 100 }}>
        <button
          onClick={() => {
            setActualView(0);
            setActualRegion(null);
            setDestination(viewports[0]);
          }}
          style={{ marginTop: "100px" }}
        >
          HOME
        </button>
      </div>
      <Map
        ref={mapRef}
        initialViewState={viewports[0]}
        // {...actualViewport}
        maxBounds={colombiaBounds}
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        // mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        // onMove={(evt) => handleViewportChange(evt.viewState)}
        onViewportChange={(nextViewport) => handleViewportChange(nextViewport)}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {/* <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        /> */}

        {drawRegions}
        {renderPopup}
        {flyToDestination}
        <Layer {...skyLayer} />
        {renderMarkers}
      </Map>
    </div>
  );
};

export default Landing;
