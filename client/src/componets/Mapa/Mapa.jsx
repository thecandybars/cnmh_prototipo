import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import { Box, Dialog } from "@mui/material";
import "./styles/styles.css";
import Macroregiones from "./MapLayers/Macroregiones";
// import Macroregiones from "./MapLayers/Macroregiones_in_progress";
import MapToolsDrawer from "./components/MapToolsDrawer";
import TituloMacroregion from "./components/TituloMacroregion";
import FooterLogoCNMH from "./components/FooterLogoCNMH";
import MarkersAndClusters from "./MarkerRegiones/MarkersAndClusters";
import macroregionesData from "../../geojson/macroregiones.json";
import Model3D from "../ThreeD/Model3D";
import modelURL1 from "../../assets/pajarosAnimados.glb";
import modelURL2 from "../../assets/BarramundiFish.glb";
import Breadcrumbs from "./components/Breadcrumbs";
import Lugar from "../Lugares/Lugar";
import OverlayDataLayers from "./MapLayers/OverlayDataLayers";
import useAppStore from "../../store/useAppStore";

const TOKEN = getEnv("mapboxToken");

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

const viewports = [
  {
    id: 0,
    name: "init",
    latitude: 3.040459790793207,
    longitude: -72.36877483252725,
    zoom: 5,
    bearing: -8.12,
    pitch: 30.477,
    curve: 1.2,
    speed: 0.4,

    // latitude: 1.362425462023893,
    // longitude: -72.75696872711507,
    // zoom: 15.344,
    // bearing: -75,
    // pitch: 79.33,
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
    name: "pacifico",
    latitude: 4.558676216895876,
    longitude: -77.6577498889891,
    bearing: -90.4,
    pitch: 57,
    zoom: 6.8,
  },
  {
    id: 5,
    name: "amazonia",
    latitude: -0.7819996812872176,
    longitude: -71.81094028047556,
    bearing: -9.560178795705497,
    pitch: 41.500000000000355,
    zoom: 6.173886199823472,
  },
];

const views = [
  {
    id: 0,
    name: "Pais",
    defaultOpenDrawer: false,
  },
  {
    id: 1,
    name: "Region",
    defaultOpenDrawer: false,
  },
  {
    id: 2,
    name: "Lugar",
    defaultOpenDrawer: true,
  },
];

export default function Mapa() {
  const mapRef = useRef();

  const [fetchedLugares] = useFetch(() => getAllLugares());
  const [departamentos] = useFetch(() => getAllDepartamentos());

  // USE GLOBAL STATE
  // actualView -> 0:Pais, 1:Region, 2:Lugar
  const actualView = useAppStore((state) => state.actualView);
  const setActualView = useAppStore((state) => state.setActualView);
  // actualRegion -> {fullName: "Andina",id: 2,name: "andina",}
  const actualRegion = useAppStore((state) => state.actualRegion);
  const setActualRegion = useAppStore((state) => state.setActualRegion);

  const [activeFilters, setActiveFilters] = useState([]);

  // // ANIMATION INTRO
  // useEffect(() => {
  //   mapRef?.current?.on("load", () => {
  //     setDestination({
  //       latitude: 3.040459790793207,
  //       longitude: -72.36877483252725,
  //       zoom: 5,
  //       bearing: -8.12,
  //       pitch: 30.477,
  //       curve: 1.2,
  //       speed: 0.4,
  //     });
  //   });
  // }, [mapRef.current]);

  // FILTER LUGARES
  const lugares = useMemo(
    () =>
      actualRegion !== null && fetchedLugares?.length
        ? fetchedLugares.filter(
            (lugar) =>
              lugar.Municipio.Departamento.Region.id === actualRegion.id
          )
        : fetchedLugares,
    [fetchedLugares, actualRegion]
  );

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState({ ...viewports[0] });

  // HANDLE CLICKS ON INTERACTIVE REGIONS
  const handleMapClick = (event) => {
    if (event.features.length > 0) {
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
  const interactiveLayerIds = departamentos
    ?.map((dpto) => `zone-${dpto.geoId}-fill`)
    .concat(
      macroregionesData?.features.map(
        (macroregion) => `macroregion-${macroregion.properties.id}`
      )
    );
  // HANDLE MAP INTERACTIONS
  const [mapHover, setMapHover] = useState(5);
  const handleMouseMove = (e) => {
    if (e.features.length > 0) {
      setMapHover(e.features[0].source || "");
    }
  };

  // FLY TO DESTINATION ??
  const [destination, setDestination] = useState(null);
  const [isFlying, setIsFlying] = useState(false);
  const flyToDestination = useMemo(() => {
    {
      if (destination) {
        setIsFlying(true);
        mapRef.current?.flyTo({
          ...actualViewport,
          center: [destination.longitude, destination.latitude],
          speed: destination.speed || 0.4,
          curve: destination.curve || 1.42,
          zoom: destination.zoom || 15,
          bearing:
            typeof destination.bearing === "number"
              ? destination.bearing
              : actualViewport.bearing + Math.random() * 50 - 25,
          pitch: destination.pitch,
          essential: true,
        });
        // mapRef.current.once("moveend", () => {
        //   // End of flyTo animation
        //   setIsFlying(false);
        //   console.log("FlyTo animation complete");
        // });
      } else {
        // setIsFlying(false);
        // setDestination(null);
      }
    }
  }, [destination]);

  ///////////////////// RENDER UI ELEMENTS

  // MACROREGIONES !
  const renderMacroregiones = <Macroregiones mapHover={mapHover} />;

  // OVERLAY DATA LAYERS aka ConflictAreas !
  const renderOverlayDataLayers = <OverlayDataLayers />;

  // MARKERS AND CLUSTERS !
  const [selectedMarker, setSelectedMarker] = useState(null);
  const renderMarkersAndClusters = (
    <MarkersAndClusters
      actualViewport={actualViewport}
      actualView={actualView}
      lugares={lugares}
      activeFilters={activeFilters}
      mapRef={mapRef}
      setDestination={setDestination}
      setSelectedMarker={setSelectedMarker}
      setActualView={setActualView}
    />
  );

  // DRAWER !
  const [openDrawer, setOpenDrawer] = useState(false);
  const renderDrawer = (
    <MapToolsDrawer
      openDrawer={openDrawer}
      setOpenDrawer={setOpenDrawer}
      actualView={actualView}
      selectedMarker={selectedMarker}
      handleOpenDialogLugar={() => setOpenDialogLugar(true)}
      activeFilters={activeFilters}
      setActiveFilters={setActiveFilters}
      views={views}
      display={true}
    />
  );

  // DIALOG LUGAR !
  const [openDialogLugar, setOpenDialogLugar] = useState(false);
  const renderDialogLugar = (
    <Dialog
      open={openDialogLugar}
      onClose={() => setOpenDialogLugar(false)}
      fullScreen
    >
      <Lugar
        onClose={() => setOpenDialogLugar(false)}
        selectedMarker={selectedMarker}
      />
    </Dialog>
  );

  // BREADCUMBS !
  const renderBreadcrumbs = (
    <Breadcrumbs
      actualView={actualView}
      actualRegion={actualRegion}
      selectedMarker={selectedMarker}
      handleClickLevel0={() => {
        setActualView(0);
        setActualRegion(null);
        setSelectedMarker(null);
        setDestination({ ...viewports[0], pitch: 0 });
      }}
      handleClickLevel1={() => {
        setActualView(1);
        setSelectedMarker(null);
        setDestination(
          viewports.find((viewport) => viewport.id === actualRegion.id)
        );
      }}
    />
  );

  // TITULO MACROREGIONES !
  const renderTituloMacroregion = (
    <TituloMacroregion title={actualRegion?.fullName} />
  );

  // MODEL3D ??
  const renderModel3D = actualView > 0 && (
    <Model3D
      mapRef={mapRef}
      origin={[destination.longitude, destination.latitude]}
      modelURL={modelURL1}
      scale={10} //10
      altitude={50} //500
      display={actualView === 2}
    />
  );

  // FOOTER !
  const renderFooter = <FooterLogoCNMH />;

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      {renderBreadcrumbs}
      {renderTituloMacroregion}
      {renderFooter}
      {renderDialogLugar}
      {renderDrawer}
      <Map
        ref={mapRef}
        initialViewState={actualViewport}
        maxBounds={colombiaBounds}
        // mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        mapStyle="mapbox://styles/juancortes79/cm15gwoxb000i01qkdie1g1og"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        // onMouseMove={(e) => handleMouseMove(e)}
        onMove={(evt) => {
          // setIsFlying(false);
          setActualViewport(evt.viewState);
        }}
        onMoveStart={() => {
          if (isFlying) {
            setIsFlying(false);
            // setDestination(null);
          }
        }}
        onDragStart={() => {
          // setIsFlying(false);
        }}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {renderMacroregiones}
        {flyToDestination}
        {renderMarkersAndClusters}

        {renderModel3D}
        {renderOverlayDataLayers}
      </Map>
    </Box>
  );
}
