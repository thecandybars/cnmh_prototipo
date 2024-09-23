import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { useEffect, useMemo, useRef, useState } from "react";
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
import viewports from "../common/viewports";
import useTextAndCameraAnimation from "../common/customHooks/useTextAndCameraAnimation";
import Welcome from "./Welcome";

const TOKEN = getEnv("mapboxToken");

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
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
  // selectedMarker -> {...lugar}
  const selectedMarker = useAppStore((state) => state.selectedMarker);
  const setSelectedMarker = useAppStore((state) => state.setSelectedMarker);
  // destination -> {...lugar}
  const destination = useAppStore((state) => state.destination);
  const setDestination = useAppStore((state) => state.setDestination);

  const setIsMoving = useAppStore((state) => state.setIsMoving);

  const [activeFilters, setActiveFilters] = useState([]);

  const [isFlying, setIsFlying] = useState(null);

  useEffect(() => {
    mapRef?.current?.on("movestart", () => isFlying && setIsFlying(false));
    mapRef?.current?.on("moveend", () => isFlying && setIsFlying(false));
  }, [mapRef, isFlying]);

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

  // ANMIATION INTRO
  const animationSequence = [
    {
      // RIO
      latitude: 1.6688498162166212,
      longitude: -75.61709522047167,
      bearing: 111.63575975157869,
      pitch: 68.00000000000016,
      zoom: 16.649172318083263,
      speed: 0.05,
    },
    {
      // PANORAMICA
      textStart: "Nibh dictum inceptos senectus suspendisse augue lacinia",
      textDuration: 500,
      latitude: 1.6698718032300093,
      bearing: 140.8357597515801,
      longitude: -75.61635039781017,
      pitch: 71.50000000000014,
      zoom: 14.794007750896629,
      curve: 4,
      speed: 0.05,
    },
    {
      // PANEO
      textStart: "Ultricies orci placerat dapibus a egestas conubia suscipit",
      bearing: 165.23575975157735,
      latitude: 1.6709179971907417,
      longitude: -75.61471299189078,
      pitch: 69.50000000000011,
      zoom: 14.794007750896629,
      curve: 4,
      speed: 0.03,
    },
    {
      // PULL OUT
      textStart:
        "Dignissim nascetur metus magna pharetra venenatis hac cras ligula malesuada",
      bearing: -13.591805834206525,
      latitude: 3.1683874325679824,
      longitude: -73.8218955201097,
      pitch: 9.053774213024917,
      zoom: 4.871835060074412,
      speed: 1,
      // speed: 0.1,
      curve: 4,
    },
  ];

  const [renderAnimatedText, setIsPlaying] = useTextAndCameraAnimation({
    animationSequence: animationSequence,
  });

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState({ ...viewports[0] });

  // HANDLE CLICKS ON INTERACTIVE REGIONS
  const handleMapClick = (event) => {
    // setIsPlaying(false);
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
  // const handleMouseMove = (e) => {
  //   if (e.features.length > 0) {
  //     setMapHover(e.features[0].source || "");
  //   }
  // };

  // FLY TO DESTINATION ??
  useEffect(() => {
    {
      if (destination) {
        setIsMoving(true);
        mapRef.current?.flyTo({
          center: [destination.longitude, destination.latitude],
          speed: destination.speed || 1,
          curve: destination.curve || 1.42,
          zoom: destination.zoom || actualViewport.zoom,
          bearing: destination.bearing,
          pitch: destination.pitch,
          essential: true,
        });
      }
    }
  }, [destination]);

  ///////////////////// RENDER UI ELEMENTS

  // MACROREGIONES !
  const renderMacroregiones = <Macroregiones mapHover={mapHover} />;

  // OVERLAY DATA LAYERS aka ConflictAreas !
  const renderOverlayDataLayers = <OverlayDataLayers />;

  // MARKERS AND CLUSTERS !
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
  const renderBreadcrumbs = <Breadcrumbs />;

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

  // INIT
  const [showWelcome, setShowWelcome] = useState(true);
  // MAP STATE
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // WELCOME
  const renderWelcome = (
    <Welcome
      show={showWelcome}
      disabled={!isMapLoaded}
      onClick={() => {
        setShowWelcome(false);
        setIsPlaying(true);
      }}
    />
  );

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      {renderBreadcrumbs}
      {renderTituloMacroregion}
      {renderFooter}
      {renderDialogLugar}
      {renderDrawer}

      <Map
        ref={mapRef}
        initialViewState={animationSequence[0]}
        maxBounds={colombiaBounds}
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        onMove={(e) => {
          setActualViewport(e.viewState);
        }}
        onLoad={() => setIsMapLoaded(true)}
        onMoveStart={() => {
          setIsMoving(true);
        }}
        onMoveEnd={() => {
          setIsMoving(false);
        }}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {renderMacroregiones}
        {renderMarkersAndClusters}
        <Box
          sx={{
            position: "absolute",
            top: 300,
            margin: "0 auto",
            width: "100vw",
            pointerEvents: "none",
          }}
        >
          {renderAnimatedText}
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 300,
            margin: "0 auto",
            width: "100vw",
          }}
        >
          {renderWelcome}
        </Box>
        {renderModel3D}
        {renderOverlayDataLayers}
      </Map>
    </Box>
  );
}
