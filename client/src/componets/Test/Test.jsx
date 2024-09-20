import { Box, Fade, Typography } from "@mui/material";
import getEnv from "../../utils/getEnv";
import Map from "react-map-gl";
import { useEffect, useRef, useState } from "react";
import useAppStore from "../../store/useAppStore";

export default function Test() {
  const mapRef = useRef(null);
  const [actualViewport, setActualViewport] = useState({
    // latitude: 1.663549967166091,
    // longitude: -75.61292136539856,
    // zoom: 16.708146,
    // bearing: 133.6,
    // pitch: 31.5,
  });
  // console.log("🚀 ~ Test ~ actualViewport:", actualViewport);

  const [isFlying, setIsFlying] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  // destination -> {...lugar}
  const destination = useAppStore((state) => state.destination);
  const setDestination = useAppStore((state) => state.setDestination);

  useEffect(() => {
    {
      if (destination) {
        setIsFlying(true);
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

  // //
  const [animate, setAnimate] = useState(false);
  const [animationIndex, setAnimationIndex] = useState(0);
  console.log("🚀 ~ Test ~ animationIndex:", animationIndex);

  const animationSequence = [
    {
      // RIO
      latitude: 1.6688498162166212,
      longitude: -75.61709522047167,
      bearing: 111.63575975157869,
      pitch: 68.00000000000016,
      zoom: 16.649172318083263,
    },
    {
      // RIO
      latitude: 1.6788498162166212,
      longitude: -75.62709522047167,
      bearing: 111.63575975157869,
      pitch: 68.00000000000016,
      zoom: 16.649172318083263,
      speed: 0.1,
    },
    {
      // PANORAMICA
      textStart: "Nibh dictum inceptos senectus suspendisse augue lacinia",
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
  // RENDER CAMERA ANIMATION
  useEffect(() => {
    if (animate && !isMoving && animationIndex < animationSequence.length) {
      setDestination(animationSequence[animationIndex]);
      setAnimationIndex((prev) => prev + 1);
    }
  }, [isMoving, animate]);

  // RENDER TEXT ANIMATION
  const [renderAnimationText, setRenderAnimationText] = useState("");
  useEffect(() => {
    if (animationIndex && animationSequence[animationIndex - 1].textStart)
      setRenderAnimationText(animationSequence[animationIndex - 1].textStart);
    const renderTextTimeout = window.setTimeout(
      () => setRenderAnimationText(""),
      5000
    );
    return () => window.clearTimeout(renderTextTimeout);
  }, [animationIndex]);

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
        onLoad={() => setAnimate(true)}
        terrain={{ source: "mapbox-dem", exaggeration: 1.0 }}
        onMoveStart={() => {
          setIsMoving(true);
        }}
        onMoveEnd={() => {
          setIsFlying(false);
          setIsMoving(false);
        }}
      >
        {/* {flyToDestination} */}
      </Map>
      <Box sx={{ position: "absolute", top: 300 }}>
        {/* <button onClick={() => setAnimate((prev) => !prev)}>pause</button> */}
        <Box
          display="flex"
          justifyContents={"center"}
          alignItems={"center"}
          width="100%"
        >
          <Fade in={!!renderAnimationText}>
            <Typography
              variant="h1"
              sx={{ width: "85%", margin: "0 auto" }}
              textAlign="center"
            >
              {renderAnimationText}
            </Typography>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}
