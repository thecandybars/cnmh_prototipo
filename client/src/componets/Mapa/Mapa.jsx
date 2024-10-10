import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import { Box, Dialog } from "@mui/material";
import "./styles/styles.css";
// import Macroregiones from "./MapLayers/Macroregiones";
import Macroregiones2 from "./MapLayers/Macroregiones_in_progress";
import MapToolsDrawer from "./components/MapToolsDrawer";
import TituloMacroregion from "./components/TituloMacroregion";
import FooterLogoCNMH from "./components/FooterLogoCNMH";
import MarkersAndClusters from "./MarkerRegiones/MarkersAndClusters";
import macroregionesData from "../../geojson/macroregiones.json";
import Model3D from "../ThreeD/Model3D";
import modelURL1 from "../../assets/pajarosAnimados.glb";
import Breadcrumbs from "./components/Breadcrumbs";
import Lugar from "../Lugares/Lugar";
import OverlayDataLayers from "./MapLayers/OverlayDataLayers";
import useAppStore from "../../store/useAppStore";
import viewports from "../common/viewports";
import useTextAndCameraAnimation from "../common/customHooks/useTextAndCameraAnimation";
import Welcome from "./Welcome";
import { getAllRegions } from "../../services/regions";

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
  const [regiones] = useFetch(() => getAllRegions());

  // USE GLOBAL STATE
  // actualView -> 0:Pais, 1:Region, 2:Lugar
  const actualView = useAppStore((state) => state.actualView);
  const setActualView = useAppStore((state) => state.setActualView);
  // actualRegion -> {fullName: "Andina",id: 2,name: "andina",}
  const actualRegion = useAppStore((state) => state.actualRegion);
  const setActualRegion = useAppStore((state) => state.setActualRegion);
  // selectedMarker -> {...lugar}
  const selectedMarker = useAppStore((state) => state.selectedMarker);
  // const setSelectedMarker = useAppStore((state) => state.setSelectedMarker);
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

  // useEffect(() => {
  //   mapRef.current.setPrefetchZoomDelta(4);
  //   console.log("🚀 ~ Mapa ~ mapRef:", mapRef);
  // }, [mapRef]);

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
      // INICIAL
      // textStart: "Explora los lugares de memoria,",
      // textDuration: 4500,
      latitude: 1.6245616206546316,
      longitude: -75.60920114714031,
      bearing: 12.223664343968721,
      pitch: 77.65485079421936,
      zoom: 15.25,
      // speed: 0.5,
      // curve: 1,
    },
    {
      // CENITAL LUGAR
      // textStart: "Explora los lugares de memoria,",
      // textDuration: 4500,
      bearing: -85.54392589268775,
      latitude: 1.6183063802543245,
      longitude: -75.6079977030613,
      pitch: 36.018177439255886,
      zoom: 18.433982882761157,
      speed: 0.2,
      curve: 1,
    },
    {
      // PANEO IZQ
      textStart: "Explora los lugares de memoria,",
      textDuration: 4500,
      bearing: 19.26091928327901,
      latitude: 1.606257157175591,
      longitude: -75.6031489937609,
      pitch: 80,
      zoom: 14.639,
      curve: 1.42,
      speed: 0.1,
    },
    {
      // PULL OUT
      textStart: "conoce las historias de los territorios",
      textDuration: 5500,
      bearing: 0,
      latitude: 1.5447215811481243,
      longitude: -75.83822350099797,
      pitch: 78.49860518025343,
      zoom: 10.647996810048566,
      curve: 1.42,
      speed: 0.2,
    },
    {
      // PLANO GENERAL
      ...viewports[0],
      textStart: "y contribuye a preservar la memoria de nuestro pais.",
      textDuration: 5500,
      // bearing: -13.591805834206525,
      // latitude: 3.1683874325679824,
      // longitude: -73.8218955201097,
      // pitch: 9.053774213024917,
      // zoom: 4.871835060074412,
      speed: 0.15,
      curve: 2,
    },
  ];
  // const animationSequence = [
  //   {
  //     // INICIAL
  //     latitude: 1.6245616206546316,
  //     longitude: -75.60920114714031,
  //     bearing: 12.223664343968721,
  //     pitch: 77.65485079421936,
  //     zoom: 15.25,
  //     // speed: 0.5,
  //     // curve: 1,
  //   },
  //   {
  //     // PANEO DER
  //     textStart: "Explora los lugares de memoria,",
  //     textDuration: 3500,
  //     bearing: -80.36966754533574,
  //     latitude: 1.6175855289341143,
  //     longitude: -75.60995393323645,
  //     pitch: 51.34807188445705,
  //     zoom: 15.766346313931173,
  //     speed: 0.05,
  //     curve: 1,
  //   },
  //   {
  //     // PANEO IZQ
  //     textStart: "conoce las historias de los territorios",
  //     textDuration: 4500,
  //     bearing: 19.26091928327901,
  //     latitude: 1.606257157175591,
  //     longitude: -75.6031489937609,
  //     pitch: 80,
  //     zoom: 14.639,
  //     curve: 1.42,
  //     speed: 0.05,
  //   },
  //   {
  //     // PLANO GENERAL
  //     ...viewports[0],
  //     textStart: "y contribuye a preservar la memoria de nuestro pais.",
  //     textDuration: 5500,
  //     // bearing: -13.591805834206525,
  //     // latitude: 3.1683874325679824,
  //     // longitude: -73.8218955201097,
  //     // pitch: 9.053774213024917,
  //     // zoom: 4.871835060074412,
  //     speed: 0.1,
  //     curve: 4,
  //   },
  // ];

  const [renderAnimatedText, setIsPlaying, isLastKeyframe, setIsLastKeyframe] =
    useTextAndCameraAnimation({
      animationSequence: animationSequence,
    });

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState({ ...viewports[0] });
  // console.log("🚀 ~ Mapa ~ actualViewport:", actualViewport);

  // HANDLE CLICKS ON INTERACTIVE REGIONS
  const handleMapClick = (event) => {
    // setIsPlaying(false);
    if (event.features.length > 0) {
      const clickedId = parseInt(event.features[0].properties.id);
      // const clickedRegion = departamentos.find(
      //   (dpto) => dpto.geoId === clickedId
      // );
      setActualView(1);
      setActualRegion(regiones.find((region) => region.id === clickedId));
      setDestination(viewports.find((viewport) => viewport.id === clickedId));
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

  // FLY TO DESTINATION ??
  useEffect(() => {
    try {
      {
        if (destination) {
          setIsMoving(true);
          const mapboxMap = mapRef.current.getMap();
          const elevation = mapboxMap.queryTerrainElevation(
            [destination.longitude, destination.latitude],
            { exaggerated: true }
          );
          mapboxMap.flyTo({
            center: [destination.longitude, destination.latitude],
            speed: destination.speed || 1,
            curve: destination.curve || 1.42,
            zoom: destination.zoom || actualViewport.zoom,
            bearing: destination.bearing || 0,
            pitch: destination.pitch || actualViewport.pitch || 0,
            offset: [0, -elevation],
            essential: true,
          });
        }
      }
    } catch (error) {
      console.error("Error flying to destination:", error);
    }
  }, [destination]);

  useEffect(() => {
    isLastKeyframe && setActualRegion(null);
    isLastKeyframe && setActualView(0);
  }, [isLastKeyframe]);

  ///////////////////// RENDER UI ELEMENTS

  // MACROREGIONES !
  const [hoverFeature, setHoverFeature] = useState(null);
  const renderMacroregiones2 = isLastKeyframe && (
    <Macroregiones2 hoverFeature={hoverFeature} />
  );

  // OVERLAY DATA LAYERS aka ConflictAreas !
  const renderOverlayDataLayers = <OverlayDataLayers />;

  // MARKERS AND CLUSTERS !
  const renderMarkersAndClusters = (
    <MarkersAndClusters
      actualViewport={actualViewport}
      lugares={lugares}
      activeFilters={activeFilters}
      mapRef={mapRef}
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
      scale={100} //10
      altitude={150} //500
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
      onSkip={() => {
        setShowWelcome(false);
        setIsPlaying(false);
        setIsLastKeyframe(true);
        setDestination({ ...viewports[0], speed: 1.8 });
      }}
    />
  );

  const handleOnLoad = () => {
    setIsMapLoaded(true);
    if (mapRef.current && mapRef.current.getMap) {
      const mapboxMap = mapRef.current.getMap();
      // PRELOAD TILES
      mapboxMap.eagerTileLoading = true; // Enable eager loading
      // mapboxMap.setPrefetchZoomDelta(4);

      //// ELEVATION TERRAIN
      // mapboxMap.addSource("mapbox-dem", {
      //   type: "raster-dem",
      //   url: "mapbox://mapbox.terrain-rgb",
      //   tileSize: 512,
      //   maxzoom: 6, // 14,
      // });

      // // mapboxMap.setTerrain({ source: "mapbox-dem", exaggeration: 0 }); // Exaggeration controla la altura visual

      // mapboxMap.addLayer({
      //   id: "hillshade",
      //   source: "mapbox-dem",
      //   type: "hillshade",
      // });

      // mapboxMap.setLight({ anchor: "map", intensity: 0.5 });

      // const mapOption = "VIIRS_SNPP_CorrectedReflectance_TrueColor";
      // const layerName = "MODIS_Terra_CorrectedReflectance_TrueColor";

      // const tilePath =
      //   // "wmts/epsg4326/best/" +
      //   "wmts/epsg3857/best/" +
      //   layerName +
      //   "/default/" +
      //   "2018-06-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg";

      // const tilePath =
      //   "wmts/epsg3857/all/" +
      //   "MODIS_Terra_CorrectedReflectance_TrueColor/default/" +
      //   "2018-06-01/GoogleMapsCompatible_Level9/{z}/{y}/{x}.jpg";

      // mapboxMap.addSource("nasa-gibs", {
      //   type: "raster",
      //   tiles: [
      //     "https://gibs-a.earthdata.nasa.gov/" + tilePath,
      //     "https://gibs-b.earthdata.nasa.gov/" + tilePath,
      //     "https://gibs-c.earthdata.nasa.gov/" + tilePath,
      //   ],
      //   tileSize: 256,
      // });

      // mapboxMap.addLayer({
      //   id: "nasa-gibs-layer",
      //   type: "raster",
      //   source: "nasa-gibs",
      // });
    }
  };

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
        // mapStyle="mapbox://styles/juancortes79/cm15gwoxb000i01qkdie1g1og"
        // mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        // mapStyle="mapbox://styles/mapbox/standard-satellite"
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        // onIdle={() =>
        //   setDestination({
        //     latitude: destination.latitude + (Math.random() - 0.5) * 0.02,
        //     longitude: destination.longitude + (Math.random() - 0.5) * 0.02,
        //     zoom: 10,
        //     // zoom: 5.131581510066996,
        //     bearing: destination.bearing + (Math.random() - 0.5) * 0.02,
        //     pitch: 30,
        //     curve: 1.42,
        //     speed: 0.001,
        //   })
        // }
        // onIdle={() =>
        //   setDestination({
        //     latitude: destination.latitude + (Math.random() - 0.5) * 0.2,
        //     longitude: destination.longitude + (Math.random() - 0.5) * 0.2,
        //     zoom: 5,
        //     // zoom: 5.131581510066996,
        //     bearing: destination.bearing + (Math.random() - 0.5) * 0.2,
        //     pitch: 30,
        //     curve: 1.42,
        //     speed: 1,
        //   })
        // }
        onMouseMove={(e) => {
          setHoverFeature(e.features[0]?.layer);
        }}
        onMove={(e) => {
          setActualViewport(e.viewState);
        }}
        onLoad={handleOnLoad}
        onMoveStart={() => {
          setIsMoving(true);
        }}
        onMoveEnd={() => {
          setIsMoving(false);
        }}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {renderMacroregiones2}
        {renderMarkersAndClusters}
        <Box
          sx={{
            position: "absolute",
            top: "50vh",
            margin: "0 auto",
            width: "100vw",
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
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
