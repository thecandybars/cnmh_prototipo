/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import VideoPlayerFooter from "./components/VideoPlayerFooter";

export default function VideoPlayer({ src, title, startTime = 0, map }) {
  const videoRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [controlsVisible, setControlsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  // Como la API de <video> no permite saber si los controles son visibles o no, se simula el comportamiento.
  // Todo con el objetivo de mover el footer hacia arriba o abajo dependiendo de si los controles son visibles o no.
  // Se hace un timeout de 3 segundos para ocultar los controles, y si el mouse se mueve, se vuelve a mostrar.
  const handleMouseMove = () => {
    if (!controlsVisible) {
      setControlsVisible(true);
      clearTimeout(timeoutId);

      const newTimeoutId = setTimeout(() => {
        setControlsVisible(false);
      }, 3000);

      setTimeoutId(newTimeoutId);
    }
  };
  const handleMouseLeave = () => {
    clearTimeout(timeoutId);
    setControlsVisible(false);
  };

  useEffect(() => {
    const video = videoRef.current;
    const updateCurrentTime = () =>
      setCurrentTime(video.currentTime / video.duration);
    video.addEventListener("timeupdate", updateCurrentTime);
    video.addEventListener("loadedmetadata", () => {
      video.currentTime = startTime;
    });

    return () => {
      video.removeEventListener("timeupdate", updateCurrentTime);
      clearTimeout(timeoutId);
    };
  }, [videoRef, startTime, timeoutId]);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#000",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <VideoPlayerFooter
        title={
          title || src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."))
        }
        map={map}
        progress={currentTime}
        controlsVisible={controlsVisible}
      />
      <video
        ref={videoRef}
        controls={controlsVisible}
        type="video/mp4"
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <source src={src} type="video/mp4" preload="auto" autoPlay />
        Tu navegador no soporta el elemento <code>video</code>.
      </video>
    </Box>
  );
}
