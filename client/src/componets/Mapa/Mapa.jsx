import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { useEffect, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import { Box } from "@mui/material";
import "./styles/styles.css";
import Macroregiones from "./MapLayers/Macroregiones";
import MapToolsDrawer from "./components/MapToolsDrawer";
import TituloMacroregion from "./components/TituloMacroregion";
import FooterLogoCNMH from "./components/FooterLogoCNMH";
import MarkersAndClusters from "./MarkerRegiones/MarkersAndClusters";
import macroregionesData from "../../geojson/macroregiones.json";
import Model3D from "../ThreeD/Model3D";
import modelURL from "../../assets/PajarosBlancosOCT21V3.glb";
import Breadcrumbs from "./components/Breadcrumbs";
import Lugar from "../Lugares/Lugar";
import OverlayDataLayers from "./MapLayers/OverlayDataLayers";
import useAppStore from "../../store/useAppStore";
import viewports from "../common/viewports";
import useTextAndCameraAnimation from "../common/customHooks/useTextAndCameraAnimation";
import Welcome from "./Welcome";
import { getAllRegions } from "../../services/regions";
import MarkersMacroregion from "./MarkerRegiones/MarkersMacroregion";

const TOKEN = getEnv("mapboxToken");

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

export default function Mapa() {
  const mapRef = useRef();

  const [fetchedLugares] = useFetch(() => getAllLugares());
  const [regiones] = useFetch(() => getAllRegions());

  // USE GLOBAL STATE
  const actualView = useAppStore((state) => state.actualView); // 0:Pais, 1:Region, 2:Lugar
  const setActualView = useAppStore((state) => state.setActualView);
  const actualRegion = useAppStore((state) => state.actualRegion);
  const setActualRegion = useAppStore((state) => state.setActualRegion);
  const selectedMarker = useAppStore((state) => state.selectedMarker);
  const destination = useAppStore((state) => state.destination);
  const setDestination = useAppStore((state) => state.setDestination);
  const setIsMoving = useAppStore((state) => state.setIsMoving);

  // LOCAL STATE
  const [actualViewport, setActualViewport] = useState({ ...viewports[0] });
  const [isFlying, setIsFlying] = useState(false);

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

  // ANIMATION INTRO
  const animationSequence = [
    {
      // INICIAL
      latitude: 1.6245616206546316,
      longitude: -75.60920114714031,
      bearing: 12.223664343968721,
      pitch: 77.65485079421936,
      zoom: 15.25,
    },
    {
      // PP LUGAR
      textStart: "Explora los lugares de memoria,",
      textDuration: 5500,
      delay: 3000,
      bearing: -85.54392589268775,
      latitude: 1.6183063802543245,
      longitude: -75.6079977030613,
      pitch: 36.018177439255886,
      zoom: 18.433982882761157,
      speed: 0.2,
      curve: 1,
    },
    {
      // PULL OUT TERRITORIO
      textStart: "conoce las historias de los territorios",
      textDuration: 7500,
      delay: 2000,
      bearing: 0,
      latitude: 1.5447215811481243,
      longitude: -75.83822350099797,
      pitch: 78.49860518025343,
      zoom: 10.647996810048566,
      curve: 1.42,
      speed: 0.3,
    },
    {
      // PLANO GENERAL
      ...viewports[0],
      textStart: "y contribuye a preservar la memoria de nuestro pais.",
      textDuration: 5500,
      speed: 0.15,
      curve: 2,
    },
  ];
  const [renderAnimatedText, setIsPlaying, isLastKeyframe, setIsLastKeyframe] =
    useTextAndCameraAnimation({
      animationSequence: animationSequence,
    });

  // HANDLE CLICKS ON INTERACTIVE REGIONS
  const handleMapClick = (event) => {
    if (event.features.length > 0) {
      const clickedId = parseInt(event.features[0].properties.id);
      const speed = actualView === 0 ? 0.5 : 0.2;
      setActualView(1);
      setActualRegion(regiones.find((region) => region.id === clickedId));
      setDestination({
        ...viewports.find((viewport) => viewport.id === clickedId),
        speed,
      });
    }
  };
  // INTERACTIVE DEPARTAMENTOS
  const interactiveLayerIds = macroregionesData?.features.map(
    (macroregion) => `macroregion-${macroregion.properties.id}`
  );

  // FLY TO DESTINATION ??
  useEffect(() => {
    try {
      {
        if (destination) {
          setIsFlying(true);
          const mapboxMap = mapRef.current.getMap();
          // const elevation = mapboxMap.queryTerrainElevation(
          //   [destination.longitude, destination.latitude]
          // );
          mapboxMap.flyTo({
            center: [destination.longitude, destination.latitude],
            speed: destination.speed || 1,
            curve: destination.curve || 1.42,
            zoom: destination.zoom || actualViewport.zoom,
            bearing: destination.bearing || 0,
            pitch: destination.pitch || actualViewport.pitch || 0,
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
  const renderMacroregiones = isLastKeyframe && (
    <Macroregiones hoverFeature={hoverFeature} />
  );

  // MODEL3D ??
  // const renderModel3D_0 = destination && (
  //   <Model3D
  //     mapRef={mapRef}
  //     origin={[destination.longitude, destination.latitude]}
  //     modelURL={modelURL0}
  //     scale={100} //10
  //     altitude={150} //500
  //   />
  // );
  const renderModel3D_1 = destination && (
    <Model3D
      mapRef={mapRef}
      origin={[destination.longitude, destination.latitude]}
      modelURL={modelURL}
      scale={3} //10
      altitude={30} //500
    />
  );

  // INIT
  const [showWelcome, setShowWelcome] = useState(true);
  // MAP STATE
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  // Turn off elevation momentarily when aproaching Lugar to avoid camera flight errors
  useEffect(() => {
    if (mapRef.current) {
      const mapboxMap = mapRef.current.getMap();
      if (!mapboxMap.getSource("mapbox-dem")) {
        mapboxMap.addSource("mapbox-dem", {
          type: "raster-dem",
          url: "mapbox://mapbox.mapbox-terrain-dem-v1",
          tileSize: 512,
          maxzoom: 14,
        });
      }
      if (actualView < 2 || (actualView === 2 && !isFlying)) {
        mapboxMap.setTerrain({ source: "mapbox-dem", exaggeration: 1.5 });
      } else mapboxMap.setTerrain(null);
    }
  }, [mapRef, actualView, isFlying]);

  const handleOnLoad = () => {
    setIsMapLoaded(true);
    if (mapRef.current && mapRef.current.getMap) {
      const mapboxMap = mapRef.current.getMap();
      mapboxMap.eagerTileLoading = true; // Enable eager loading
      // ELEVATION TERRAIN
      mapboxMap.addSource("mapbox-dem", {
        type: "raster-dem",
        url: "mapbox://mapbox.mapbox-terrain-dem-v1",
        tileSize: 512,
        maxzoom: 14,
      });

      // GOOGLE MAPS
      // mapboxMap.addSource("google-earth", {
      //   type: "raster",
      //   tiles: [
      //     `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyA_Hpw8rcmaKtIqU9wmEIpnHrZB2Tz-hv4&center={y},{x}&zoom={z}&size=256x256&maptype=satellite`,
      //   ],
      //   tileSize: 256,
      // });

      // mapboxMap.addLayer({
      //   id: "google-earth",
      //   type: "raster",
      //   source: "google-earth",
      //   paint: {},
      // });
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Breadcrumbs />
      <TituloMacroregion title={actualRegion?.fullName} />
      <FooterLogoCNMH />
      <Lugar selectedMarker={selectedMarker} />
      <MapToolsDrawer />

      <Map
        ref={mapRef}
        initialViewState={animationSequence[0]}
        maxBounds={colombiaBounds}
        // mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        // mapStyle="mapbox://styles/rodriguezbadel/cm2jlf1ay002p01quergwb947"
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        // onIdle={() =>
        //   setDestination({
        //     latitude: destination.latitude + (Math.random() - 0.5) * 0.2,
        //     longitude: destination.longitude + (Math.random() - 0.5) * 0.2,
        //     zoom: actualViewport.zoom,
        //     // zoom: 5.131581510066996,
        //     bearing: destination.bearing + (Math.random() - 0.5) * 0.2,
        //     pitch: actualViewport.pitch,
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
          setIsFlying(false);
        }}
        interactiveLayerIds={interactiveLayerIds}
      >
        {renderMacroregiones}
        <MarkersAndClusters
          actualViewport={actualViewport}
          lugares={lugares}
          mapRef={mapRef}
        />
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
            setDestination({ ...viewports[0], speed: 1.3, curve: 0.5 });
          }}
        />
        {/* {renderModel3D_0} */}
        {renderModel3D_1}
        {renderAnimatedText}

        <OverlayDataLayers />
        <MarkersMacroregion />
      </Map>
    </Box>
  );
}
