import { Box, Button, Fade, Stack, Typography } from "@mui/material";
import getEnv from "../../utils/getEnv";
import Map from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import useAppStore from "../../store/useAppStore";
import useTextAndCameraAnimation from "../common/customHooks/useTextAndCameraAnimation";

export default function Test() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isMoving, setIsMoving] = useState(false);

  const mapRef = useRef(null);
  const [actualViewport, setActualViewport] = useState({});

  const [animate, setAnimate] = useState(false);

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
      speed: 0.1,
      curve: 4,
    },
  ];

  const renderAnimatedText = useTextAndCameraAnimation({
    animationSequence: animationSequence,
    animate: animate,
    isCameraMoving: isMoving,
  });

  // SETUP CAMERA ANIMATION
  const destination = useAppStore((state) => state.destination);
  useEffect(() => {
    {
      if (destination) {
        mapRef.current?.flyTo({
          center: [destination.longitude, destination.latitude],
          speed: destination.speed || 0.01,
          curve: destination.curve || 1.42,
          zoom: destination.zoom || actualViewport.zoom,
          bearing: destination.bearing,
          pitch: destination.pitch,
          essential: true,
        });
      }
    }
  }, [destination]);

  // MAP STATE
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  return (
    <Box sx={{ width: "100vw", height: "100vh" }}>
      <Map
        ref={mapRef}
        initialViewState={animationSequence[0]}
        mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
        mapboxAccessToken={getEnv("mapboxToken")}
        onMove={(evt) => {
          setActualViewport(evt.viewState);
        }}
        onLoad={() => setIsMapLoaded(true)}
        terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
        onMoveStart={() => {
          setIsMoving(true);
        }}
        onMoveEnd={() => {
          setIsMoving(false);
        }}
      />
      <Box sx={{ position: "absolute", top: 300 }}>
        <Box
          display="flex"
          justifyContent={"center"}
          alignItems={"center"}
          width="100%"
        >
          {renderAnimatedText}
          {showWelcome && (
            <Fade
              in={showWelcome}
              timeout={{
                appear: 100,
                enter: 3000,
                exit: 3000,
              }}
            >
              <Stack
                spacing={2}
                sx={{
                  alignItems: "center",
                  width: "35%",
                  margin: "0 auto",
                  border: "2px solid white",
                  p: 4,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.1)",
                }}
              >
                <Typography variant="h5" textAlign="center">
                  Bienvenidus, congue sed accumsan eros nisi, penatibus etiam
                  aliquet volutpat eget auctor proin erat viverra vulputate
                  praesent per velit facilisis
                </Typography>
                <Button
                  disabled={!isMapLoaded}
                  variant="outlined"
                  onClick={() => {
                    setShowWelcome(false);
                    setAnimate(true);
                  }}
                >
                  Iniciar
                </Button>
              </Stack>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  );
}
