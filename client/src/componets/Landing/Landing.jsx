import Map, { Source, Layer, Popup } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojsonData from "./col.json";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";
import { theme } from "../../utils/theme";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getAllLugares } from "../../services/lugares";
import StyledMarker from "./components/StyledMarker";
import Supercluster from "supercluster";
import { Box, Button, Dialog, Drawer, Stack, Typography } from "@mui/material";
import CasaMemoriaTumaco from "../Lugares/CasaMemoriaTumaco";
// import Photo360 from "../Lugares/Photo360/Photo360";
import { Photo_360 } from "../../App";
import { ExpandIcon } from "../common/icons";
import useViewport from "../common/customHooks/useViewport";
import "./styles/styles.css";
import TipologiaTooltip from "./Region/Filter/components/TipologiaTooltip";
import ViewsBreadcrumbs from "./components/ViewsBreadcrumbs";

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

const viewports = [
  // THIS
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

const Landing = () => {
  const mapRef = useRef();
  const [fetchedLugares] = useFetch(() => getAllLugares());
  const [departamentos] = useFetch(() => getAllDepartamentos());
  const [actualRegion, setActualRegion] = useState(null);

  const { vh } = useViewport();

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

  // CLUSTER STATE
  const [clusters, setClusters] = useState([]);
  const [supercluster, setSupercluster] = useState(null);

  // HANDLE MOVE
  const [actualViewport, setActualViewport] = useState({ ...viewports[0] });
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
        if (actualView !== 0) {
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

  // FILTER DRAWER
  const tipologiasLugares = [
    {
      id: 0,
      image: "markerMuseoMemoria",
      title: "Museo de Memoria",
      description:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit eleifend mi, semper ac molestie natoque neque parturient vel vitae.",
    },
    {
      id: 1,
      image: "markerEspaciosSanar",
      title: "Espacio para sanar",
      description:
        "Mauris diam molestie cras litora elementum conubia eleifend posuere rhoncus scelerisque etiam blandit montes ultricies semper, turpis aliquet auctor sagittis fringilla magnis nisi vivamus feugiat odio sociis eu class augue.",
    },
    {
      id: 2,
      image: "markerLugarHorror",
      title: "Lugar del horror",
      description:
        "Torquent feugiat vitae vehicula penatibus metus vivamus pretium, sollicitudin fermentum bibendum laoreet natoque tincidunt mollis nisi, taciti lacus congue ornare iaculis vulputate.",
    },
    {
      id: 3,
      image: "markerLugarMemoria",
      title: "Lugar de Memoria",
      description:
        "Blandit commodo aliquam vulputate fusce duis ultrices, eros feugiat porta arcu luctus interdum, inceptos tempor mi vel neque",
    },
  ];
  const [activeFilters, setActiveFilters] = useState(
    tipologiasLugares.map((tipologia) => tipologia.id)
  );

  const handleActiveFilters = (id) => {
    if (activeFilters.includes(id))
      setActiveFilters((prev) =>
        prev.filter((activeFilterId) => activeFilterId !== id)
      );
    else setActiveFilters((prev) => prev.concat([id]));
  };
  const renderCloseFilterButton = (
    <Button onClick={() => setOpenFilterDrawer(false)}>
      <ExpandIcon size="large" color="title" />
    </Button>
  );
  const renderOpenFilterButton = (
    <Button onClick={() => setOpenFilterDrawer(true)} sx={{ height: "100%" }}>
      <ExpandIcon
        size="large"
        color="title"
        sx={{ transform: "rotate(180deg)" }}
      />
    </Button>
  );
  const renderFilters = (
    <Stack
      spacing={1}
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      {tipologiasLugares.map((tipologia) => (
        <Box
          key={tipologia.id}
          onClick={() => handleActiveFilters(tipologia.id)}
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: activeFilters.includes(tipologia.id)
              ? theme.palette.title.main
              : "transparent",
            cursor: "pointer",
            paddingRight: 2,
            borderRadius: "20px 0 0 20px",
            gap: 1,
          }}
        >
          <Box display="flex" alignItems="center">
            <img
              alt="filter"
              src={`/${tipologia.image}.png`}
              width="80px"
              style={{
                filter: activeFilters.includes(tipologia.id)
                  ? "brightness(0) saturate(100%) invert(86%) sepia(20%) saturate(6492%) hue-rotate(346deg) brightness(102%) contrast(106%)" // to yellow
                  : "brightness(0) saturate(100%) invert(14%) sepia(5%) saturate(4383%) hue-rotate(118deg) brightness(101%) contrast(86%)", // to green
              }}
            />
            <Typography
              variant="h6"
              color={
                activeFilters.includes(tipologia.id)
                  ? "primary"
                  : theme.palette.title.main
              }
            >
              {tipologia.title}
            </Typography>
          </Box>
          {activeFilters.includes(tipologia.id) && (
            <TipologiaTooltip description={tipologia.description} />
          )}
        </Box>
      ))}
    </Stack>
  );
  const [openFilterDrawer, setOpenFilterDrawer] = useState(false);

  const renderClosedFilterDrawer = (
    <Drawer
      variant="persistent"
      anchor="right"
      open={!openFilterDrawer}
      onClose={() => setOpenFilterDrawer(!false)}
      PaperProps={{
        sx: {
          height: "360px",
          // marginTop: "200px",
          marginTop: `${vh / 2 - 180}px`,
          backgroundColor: theme.palette.secondary.main,
          padding: 1,
          paddingRight: 0,
          borderRadius: "30px 0 0 30px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          marign: 0,
        }}
      >
        {renderOpenFilterButton}
      </Box>
    </Drawer>
  );
  const renderOpenedFilterDrawer = (
    <Drawer
      variant="persistent"
      anchor="right"
      open={openFilterDrawer}
      onClose={() => setOpenFilterDrawer(false)}
      PaperProps={{
        sx: {
          height: "360px",
          // marginTop: "200px",
          marginTop: `${vh / 2 - 180}px`,
          backgroundColor: theme.palette.secondary.main,
          padding: 1,
          paddingRight: 0,
          borderRadius: "30px 0 0 30px",
        },
      }}
    >
      <Box sx={{ display: "flex" }}>
        {renderCloseFilterButton}
        {renderFilters}
      </Box>
    </Drawer>
  );

  // MARKERS
  const renderMarkers =
    actualView !== 0 &&
    actualRegion &&
    clusters.map((cluster) => {
      const [longitude, latitude] = cluster.geometry.coordinates;
      const { cluster: isCluster, point_count: pointCount } =
        cluster.properties;

      if (isCluster) {
        return (
          <Box
            key={`cluster-${cluster.id}`}
            onClick={(e) => {
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
            }}
          >
            <StyledMarker
              marca={{ latitud: latitude, longitud: longitude }}
              zoom={actualViewport.zoom}
              text={pointCount}
            />
          </Box>
        );
      } else {
        return (
          <Box
            key={`marker-${cluster.properties.id}`}
            onClick={(e) => handleSelectedMarker(e, cluster.properties.id)}
            onMouseOver={(e) => handlePreviewMarker(e, cluster.properties.id)}
            onMouseOut={() => setPreviewMarker(null)}
          >
            <StyledMarker
              marca={cluster.properties}
              zoom={actualViewport.zoom}
            />
          </Box>
        );
      }
    });

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
  //
  const [previewMarker, setPreviewMarker] = useState(null);
  const handlePreviewMarker = useCallback(
    (e, id) => {
      e.stopPropagation();
      const lugar = lugares.find((lugar) => lugar.id === id);
      setPreviewMarker(lugar);
    },
    [lugares]
  );

  // CREATE MARKERS SUPERCLUSTER

  useEffect(() => {
    const index = new Supercluster({
      radius: 50, //40,
      maxZoom: 10, //16,
    });
    lugares?.length > 0 &&
      index.load(
        lugares
          .filter((lugar) =>
            activeFilters.includes(
              Math.floor(Math.abs(lugar.latitud * 100)) % 4
            )
          )
          .map((lugar) => ({
            type: "Feature",
            properties: { cluster: false, ...lugar },
            geometry: {
              type: "Point",
              coordinates: [lugar.longitud, lugar.latitud],
            },
          }))
      );

    setSupercluster(index);
  }, [lugares, activeFilters]);

  // CLUSTERS
  useEffect(() => {
    if (
      mapRef?.current !== null &&
      supercluster &&
      Object.keys(supercluster).length > 0 &&
      // supercluster.points?.length > 0 && // hay que poder quitar esto, para que los filtros filtren todo cuando no se selecciona ninguno
      Object.keys(actualViewport).length > 0
    ) {
      const bounds = mapRef.current.getBounds().toArray().flat();
      const zoom = Math.floor(actualViewport.zoom);

      setClusters(
        supercluster.points?.length > 0
          ? supercluster.getClusters(bounds, zoom)
          : []
      );
      // const clusters =
      //   supercluster.getClusters(bounds, zoom);
      // setClusters(clusters);
    }
  }, [supercluster, actualViewport, actualViewport.zoom, mapRef]);

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
  const renderLongPopup = selectedMarker && (
    <Popup
      latitude={selectedMarker.latitud}
      longitude={selectedMarker.longitud}
      anchor="top"
      onClose={() => handleClosePopup()}
      maxWidth="350px"
      closeButton={false}
      className="custom-popup"
    >
      <Stack
        spacing={0}
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: 2,
          borderRadius: "30px",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <img
            alt=""
            src={`${
              tipologiasLugares[
                Math.floor(Math.abs(selectedMarker.latitud * 100)) % 4
              ].image
            }.png`}
            width="80px"
          />
          <Stack spacing={1}>
            <Typography
              variant="h4"
              color={theme.palette.title.main}
              align="right"
              onClick={handleOpenDialogLugar}
              sx={{
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              VISITAR &#9656;
            </Typography>

            <Stack spacing={0}>
              <Typography variant="captionStrong" color="primary" align="left">
                {`REGIÓN ${selectedMarker.Municipio.Departamento.Region.fullName.toUpperCase()} - ${
                  selectedMarker.Municipio.nombre
                }`}
              </Typography>
              <Typography variant="caption" color="primary" align="left">
                {selectedMarker.nombre.toUpperCase()}
              </Typography>
              <Typography variant="caption" color="primary" align="left">
                {selectedMarker.TipologiasLugare.nombre}
              </Typography>
            </Stack>
          </Stack>
        </Box>
        <Typography variant="body" color="primary" align="left">
          {selectedMarker.descripcion}
        </Typography>
      </Stack>
    </Popup>
  );
  const renderShortPopup = previewMarker && (
    <Popup
      latitude={previewMarker.latitud}
      longitude={previewMarker.longitud}
      anchor="top"
      onClose={() => setPreviewMarker(null)}
      maxWidth="350px"
      closeButton={false}
      className="custom-popup"
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: 2,
          borderRadius: "30px",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Stack>
            <Typography variant="captionStrong" color="primary" align="left">
              {`REGIÓN ${previewMarker.Municipio.Departamento.Region.fullName.toUpperCase()} - ${
                previewMarker.Municipio.nombre
              }`}
            </Typography>
            <Typography variant="caption" color="primary" align="left">
              {previewMarker.nombre.toUpperCase()}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Popup>
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
    <div style={{ width: "100vw", height: "100vh" }}>
      {renderViewsBreadcrumbs}
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
        {/* <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        /> */}

        {drawRegions}
        {renderLongPopup}
        {renderShortPopup}
        {flyToDestination}
        <Layer {...skyLayer} />
        {renderMarkers}
        {renderDialogLugar}
        {actualView === 1 && renderClosedFilterDrawer}
        {actualView === 1 && renderOpenedFilterDrawer}
      </Map>
    </div>
  );
};

export default Landing;
