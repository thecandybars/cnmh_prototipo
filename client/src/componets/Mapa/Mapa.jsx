import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import { Box, Dialog, FormControlLabel, Stack, Switch } from "@mui/material";
import CasaMemoriaTumaco from "../Lugares/CasaMemoriaTumaco";
import { Photo_360 } from "../../App";
import "./styles/styles.css";
import ViewsBreadcrumbs from "./components/ViewsBreadcrumbs";
import ZonasDeConflicto from "./MapLayers/ZonasDeConflicto";
import Macroregiones from "./MapLayers/Macroregiones";
import PopupMarkerPermanent from "./components/PopupMarkerPermanent";
import PopupMarkerPreview from "./components/PopupMarkerPreview";
import MapToolsDrawer from "./components/MapToolsDrawer";
import { getTiposLugares } from "../../services/tiposLugares";
import FilterLugares from "./Region/Filter/FilterLugares";
import MarkersLugares from "./MarkerRegiones/MarkersLugares";
import TituloMacroregion from "./components/TituloMacroregion";
import FooterLogoCNMH from "./components/FooterLogoCNMH";

const TOKEN = getEnv("mapboxToken");

const colombiaBounds = [
  [-89.0, -10.0], // Southwest coordinates
  [-47.0, 13.0], // Northeast coordinates
];

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

export default function Mapa() {
  const mapRef = useRef();
  const [fetchedLugares] = useFetch(() => getAllLugares());
  const [departamentos] = useFetch(() => getAllDepartamentos());

  const [actualView, setActualView] = useState(0); //0:pais, 1:region, 2:lugar
  const [actualRegion, setActualRegion] = useState(null);

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
  const handleViewportChange = useCallback((newViewport) => {
    setActualViewport(newViewport);
  }, []);

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
  const interactiveLayerIds = departamentos?.map(
    (dpto) => `zone-${dpto.geoId}-fill`
  );

  //////////// LAYERS
  // COLOR REGIONS
  const renderMacroregiones = (
    <Macroregiones actualView={actualView} actualRegion={actualRegion} />
  );
  // COLOR CONFLICT AREAS
  const [drawConflictAreas, setDrawConflictAreas] = useState(false);
  const renderConflictAreasSwitch = (
    <Box sx={{ bgcolor: "secondary.main" }}>
      <FormControlLabel
        control={
          <Switch
            checked={drawConflictAreas}
            onChange={() => setDrawConflictAreas((prev) => !prev)}
          />
        }
        label="Zonas de conflicto"
      />
    </Box>
  );
  const renderConflictAreas = drawConflictAreas && <ZonasDeConflicto />;

  // FILTER DRAWER
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);
  const [tiposLugares] = useFetch(() => getTiposLugares());
  const [activeFilters, setActiveFilters] = useState([]);
  useEffect(() => {
    tiposLugares?.length &&
      setActiveFilters(tiposLugares.map((tipo) => tipo.id));
  }, [tiposLugares]);

  const handleActiveFilters = (id) => {
    if (activeFilters.includes(id))
      setActiveFilters((prev) =>
        prev.filter((activeFilterId) => activeFilterId !== id)
      );
    else setActiveFilters((prev) => prev.concat([id]));
  };
  const renderFilters = tiposLugares?.length && (
    <FilterLugares
      tiposLugares={tiposLugares}
      handleActiveFilters={handleActiveFilters}
      activeFilters={activeFilters}
    />
  );
  const renderFilterDrawer = (
    <MapToolsDrawer
      openDrawer={openFilterDrawer}
      setOpenDrawer={setOpenFilterDrawer}
    >
      {renderFilters}
    </MapToolsDrawer>
  );

  // HANDLERS MARKERS
  const [selectedMarker, setSelectedMarker] = useState(null);
  const handleSelectedMarker = useCallback(
    (e, id) => {
      e.stopPropagation();
      const lugar = lugares.find((lugar) => lugar.id === id);
      setSelectedMarker(lugar);
      setActualView(2);
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
  const handleSelectedCluster = (e, cluster, supercluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    // const { cluster: isCluster, point_count: pointCount } =
    //   cluster.properties;
    e.stopPropagation();
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setDestination({
      ...actualViewport,
      latitude,
      longitude,
      zoom: expansionZoom,
      transitionDuration: 500,
    });
  };
  const [previewMarker, setPreviewMarker] = useState(null);
  const handlePreviewMarker = useCallback(
    ({ action, data }) => {
      if (action === "over") {
        data.e.stopPropagation();
        const lugar = lugares.find((lugar) => lugar.id === data.clusterId);
        setPreviewMarker(lugar);
      } else setPreviewMarker(null);
    },
    [lugares]
  );

  // FLY TO DESTINATION
  const [destination, setDestination] = useState(null);
  const flyToDestination = useMemo(() => {
    destination &&
      mapRef.current?.flyTo({
        ...actualViewport,
        center: [destination.longitude, destination.latitude],
        speed: destination.speed || 0.4,
        curve: destination.curve || 1.42,
        zoom: destination.zoom || 15,
        bearing: destination.bearing || 0,
        pitch: destination.pitch,
        essential: true,
      });
  }, [destination]);

  // DIALOG LUGAR
  const [openDialogLugar, setOpenDialogLugar] = useState(false);

  const handleOpenDialogLugar = () => {
    setOpenDialogLugar(true);
  };
  const handleCloseDialogLugar = () => {
    setOpenDialogLugar(false);
  };
  const index =
    selectedMarker && Math.floor(Math.abs(selectedMarker.latitud * 100)) % 2;
  const renderDialogContent =
    index === 0 ? (
      <Photo_360 onClose={() => handleCloseDialogLugar()} />
    ) : (
      <CasaMemoriaTumaco onClose={() => handleCloseDialogLugar()} />
    );
  const renderDialogLugar = (
    <Dialog
      open={openDialogLugar}
      onClose={() => handleCloseDialogLugar()}
      fullScreen
    >
      {renderDialogContent}
    </Dialog>
  );
  // POPUPS
  const renderPopupMarkerPermanent = selectedMarker && actualView === 2 && (
    <PopupMarkerPermanent
      selectedMarker={selectedMarker}
      handleClosePopup={() => handleClosePopup()}
      handleOpenDialogLugar={() => handleOpenDialogLugar()}
    />
  );
  const renderPopupMarkerPreview = previewMarker && actualView === 1 && (
    <PopupMarkerPreview
      previewMarker={previewMarker}
      setPreviewMarker={setPreviewMarker}
    />
  );

  const handleClosePopup = () => {
    setSelectedMarker(null);
    const regionCoordinates = viewports.find(
      (region) => region.id === actualRegion.id
    );
    setDestination(regionCoordinates);
  };
  // VIEWS NAVIGATOR
  const renderViewsBreadcrumbs = (
    <ViewsBreadcrumbs
      actualView={actualView}
      actualRegion={actualRegion}
      onClick0={() => {
        setActualView(0);
        setActualRegion(null);
        setSelectedMarker(null);
        setDestination({ ...viewports[0], pitch: 0 });
      }}
      onClick1={() => {
        setActualView(1);
        setSelectedMarker(null);
        setDestination(
          viewports.find((viewport) => viewport.id === actualRegion.id)
        );
      }}
    />
  );

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Stack
        spacing={1}
        sx={{
          position: "absolute",
          top: "100px",
          zIndex: 100,
          right: 0,
          padding: 0,
        }}
      >
        {renderViewsBreadcrumbs}
        {renderConflictAreasSwitch}
      </Stack>
      <Map
        ref={mapRef}
        initialViewState={viewports[0]}
        {...actualViewport}
        maxBounds={colombiaBounds}
        // mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        // mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        onMove={(evt) => handleViewportChange(evt.viewState)}
        // onViewportChange={(nextViewport) => handleViewportChange(nextViewport)}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {renderMacroregiones}
        {renderConflictAreas}
        {renderPopupMarkerPermanent}
        {renderPopupMarkerPreview}
        {flyToDestination}
        {/* {renderMarkers} */}
        {lugares?.length && (
          <MarkersLugares
            handleSelectedCluster={handleSelectedCluster}
            handleSelectedMarker={handleSelectedMarker}
            handlePreviewMarker={handlePreviewMarker}
            actualViewport={actualViewport}
            actualView={actualView}
            lugares={lugares}
            activeFilters={activeFilters}
            mapRef={mapRef}
          />
        )}
        {renderDialogLugar}
        {actualView === 1 && renderFilterDrawer}
        {actualRegion && <TituloMacroregion title={actualRegion.fullName} />}
        {!actualRegion && (
          <TituloMacroregion title={"Macroregiones"} label="COLOMBIA" />
        )}
        <FooterLogoCNMH />
      </Map>
    </Box>
  );
}
