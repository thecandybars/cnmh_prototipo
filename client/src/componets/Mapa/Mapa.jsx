import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import { Box, Dialog, FormControlLabel, Stack, Switch } from "@mui/material";
import { Photo_360 } from "../../App";
import "./styles/styles.css";
import ViewsBreadcrumbs from "./components/ViewsBreadcrumbs";
import ZonasDeConflicto from "./MapLayers/ZonasDeConflicto";
import Macroregiones from "./MapLayers/Macroregiones";
import InfoLugar from "./components/InfoLugar";
import PopupMarkerPreview from "./components/PopupMarkerPreview";
import MapToolsDrawer from "./components/MapToolsDrawer";
import { getTiposLugares } from "../../services/tiposLugares";
import FilterLugares from "./Region/Filter/FilterLugares";
import MarkersLugares from "./MarkerRegiones/MarkersLugares";
import TituloMacroregion from "./components/TituloMacroregion";
import FooterLogoCNMH from "./components/FooterLogoCNMH";
import Multimedia from "../Exhibiciones/Multimedia";
import PopupClusterPreview from "./components/PopupClusterPreview";

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
    <Box
      sx={{ bgcolor: "secondary.main", px: 4, borderRadius: "30px 0 0 30px" }}
    >
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

  // FILTERS
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
    const destination = {
      ...actualViewport,
      latitude,
      longitude,
      zoom: expansionZoom,
      transitionDuration: 500,
    };
    delete destination.bearing;
    setDestination(destination);
  };
  const [previewMarker, setPreviewMarker] = useState(null);
  const handlePreviewMarker = useCallback(
    ({ action, data }) => {
      if (action === "over") {
        data.e.stopPropagation();
        const lugar = lugares.find((lugar) => lugar.id === data.clusterId);
        setPreviewMarker(lugar);
      }
      if (action === "out") setPreviewMarker(null);
    },
    [lugares]
  );
  const [previewCluster, setPreviewCluster] = useState(null);
  const handlePreviewCluster = useCallback(({ action, data }) => {
    if (action === "over") {
      const lugaresCluster = data.supercluster.getLeaves(data.cluster.id);
      setPreviewCluster({
        lugares: lugaresCluster,
        latitud: data.cluster.geometry.coordinates[1],
        longitud: data.cluster.geometry.coordinates[0],
      });
    }
    if (action === "out") setPreviewCluster(null);
  }, []);
  const renderMarkersAndClusters = lugares?.length && (
    <MarkersLugares
      handleSelectedCluster={handleSelectedCluster}
      handlePreviewCluster={handlePreviewCluster}
      handleSelectedMarker={handleSelectedMarker}
      handlePreviewMarker={handlePreviewMarker}
      actualViewport={actualViewport}
      actualView={actualView}
      lugares={lugares}
      activeFilters={activeFilters}
      mapRef={mapRef}
    />
  );

  // DEFAULT OPEN DRAWER
  useEffect(() => {
    const open = views.find(
      (view) => view.id === actualView
    )?.defaultOpenDrawer;
    setOpenFilterDrawer(open);
  }, [actualView]);

  const renderLugarDeMemoria = (
    <InfoLugar
      selectedMarker={selectedMarker}
      handleClosePopup={() => handleClosePopup()}
      handleOpenDialogLugar={() => handleOpenDialogLugar()}
    />
  );
  const renderDrawer = actualView !== 0 && (
    <MapToolsDrawer
      openDrawer={openFilterDrawer}
      setOpenDrawer={setOpenFilterDrawer}
    >
      {actualView === 1 && renderFilters}
      {actualView === 2 && renderLugarDeMemoria}
    </MapToolsDrawer>
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
        bearing:
          typeof destination.bearing === "number"
            ? destination.bearing
            : actualViewport.bearing + Math.random() * 50 - 25,
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
      <Multimedia exhibicionId={17} onClose={() => handleCloseDialogLugar()} />
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
  const renderPopupMarkerPreview = previewMarker && actualView === 1 && (
    <PopupMarkerPreview
      previewMarker={previewMarker}
      onClose={() => setPreviewMarker(null)}
    />
  );
  const renderPopupClusterPreview = previewCluster && actualView === 1 && (
    <PopupClusterPreview
      previewCluster={previewCluster}
      onClose={() => setPreviewCluster(null)}
    />
  );
  const handleClosePopup = () => {
    setSelectedMarker(null);
    const regionCoordinates = viewports.find(
      (region) => region.id === actualRegion.id
    );
    setDestination(regionCoordinates);
  };

  // BREADCUMBS
  const renderBreadcrumbs = (
    <ViewsBreadcrumbs
      actualView={actualView}
      actualRegion={actualRegion}
      actualLugar={selectedMarker}
      onClickView0={() => {
        setActualView(0);
        setActualRegion(null);
        setSelectedMarker(null);
        setDestination({ ...viewports[0], pitch: 0 });
      }}
      onClickView1={() => {
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
      <Box
        spacing={1}
        sx={{
          position: "absolute",
          top: "47px",
          zIndex: 100,
          left: 0,
        }}
      >
        {renderBreadcrumbs}
      </Box>
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
        {renderConflictAreasSwitch}
      </Stack>
      <Map
        ref={mapRef}
        initialViewState={viewports[0]}
        {...actualViewport}
        maxBounds={colombiaBounds}
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        onMove={(evt) => {
          setActualViewport(evt.viewState);
        }}
        interactiveLayerIds={interactiveLayerIds}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        {renderMacroregiones}
        {renderConflictAreas}
        {renderPopupMarkerPreview}
        {renderPopupClusterPreview}
        {flyToDestination}
        {renderMarkersAndClusters}
        {renderDialogLugar}
        {renderDrawer}
        {/* {actualView !== 0 && renderFilterDrawer} */}
        {actualRegion && <TituloMacroregion title={actualRegion.fullName} />}
        {!actualRegion && (
          <TituloMacroregion title={"Macroregiones"} label="COLOMBIA" />
        )}
        <FooterLogoCNMH />
      </Map>
    </Box>
  );
}
