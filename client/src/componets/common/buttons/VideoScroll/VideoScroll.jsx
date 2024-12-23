import { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Slider,
  Typography,
  Zoom,
} from "@mui/material";
import useViewport from "../../customHooks/useViewport";
import useWheelCounter from "../../customHooks/useWheelCounter";
import DirectionButton from "./DirectionButton";
import MapaConRuta from "./MapaConRuta";
import { theme } from "../../../../utils/theme";
import LazyLoad from "react-lazyload";

export default function VideoScroll(props) {
  // Esta funcion existe solo para resetear el scroll antes de cargar la pagina de VideoScroll y evitar re-renderizados
  window.scrollTo(0, 0);
  return <Page {...props} />;
}

function Page({ src, speed, navigationHotspots = [], map, audioBackground }) {
  const [loading, setLoading] = useState(true);
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default volume
  const audioRef = useRef(null); // Ref to manage the audio instance

  const { direction } = useWheelCounter({ scale: 30 });
  const { vh, vw } = useViewport();

  // Cleanup video on unmount
  useEffect(() => {
    return () => {
      const videoElements = document.querySelectorAll("video");
      videoElements.forEach((video) => {
        video.pause();
        video.src = ""; // Clear the source to release memory
        video.load(); // Force garbage collection
      });
    };
  }, []);

  //  AUDIO PLAYER
  // Init
  useEffect(() => {
    if (!audioBackground?.src) return;

    const audio = new Audio(audioBackground.src);
    audio.volume = volume;
    audio.loop = true;
    audioRef.current = audio;

    if (isPlaying) audio.play();

    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, [audioBackground?.src, isPlaying, volume]);
  // Play/pause
  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };
  // Volumen
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    if (audioRef.current) {
      audioRef.current.volume = newValue;
    }
  };
  // Render Audio Controls
  const renderAudioControls = (
    <Box sx={{ position: "fixed", bottom: 20, right: 20 }}>
      <Button
        onClick={handlePlayPause}
        variant="contained"
        color="secondary"
        sx={{ width: 60, height: 60 }}
      >
        {isPlaying ? "Pause" : "Play"}
      </Button>
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Slider
          color="secondary"
          value={volume}
          onChange={handleVolumeChange}
          min={0}
          max={1}
          step={0.01}
        />
      </Box>
    </Box>
  );

  const renderNavigationHotspots =
    !loading &&
    navigationHotspots.map((item) => {
      const content = (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            position: "fixed",
            top: vh / 2,
            left: vw / 2 - 100,
            gap: 1,
          }}
        >
          {item.links?.map((link) => (
            <DirectionButton key={link.direction} link={link} />
          ))}
        </Box>
      );
      return (
        <div key={item.id}>
          {item.isBlocking ? (
            <Dialog
              open={scrollyPosition > item.timeIn && direction === "up"}
              TransitionComponent={Transition}
            >
              {content}
            </Dialog>
          ) : (
            <Zoom
              in={
                scrollyPosition > item.timeIn && scrollyPosition < item.timeOut
              }
              timeout={1200}
            >
              {content}
            </Zoom>
          )}
        </div>
      );
    });

  // MAPA
  const renderMapa = map?.points?.length > 0 && (
    <Box
      margin={1}
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        borderRadius: "10px",
        border: `8px solid ${theme.palette.secondary.main}`,
      }}
    >
      <MapaConRuta
        // points={map.points}
        points={map.points.map((point) => [point[1], point[0]])}
        progress={scrollyPosition}
        width={200}
        height={200}
        zoom={map.zoom || 17}
      />
    </Box>
  );

  return (
    <LazyLoad height={500} once>
      <div
        className="scrolly-container"
        style={{
          width: "100%",
          height: `${Math.min(Math.max(speed, 10), 300)}vh`,
        }}
      >
        {/* Conditional Loading */}
        {loading && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <CircularProgress color="secondary" />
            <Typography variant="h6" color="secondary" sx={{ ml: 2 }}>
              Cargando...
            </Typography>
          </Box>
        )}

        {/* Video Content */}
        {src && (
          <ScrollyVideo
            src={src}
            onChange={(e) => setScrollyPosition(e)}
            onReady={() => setLoading(false)}
            cover={true}
          />
        )}

        {/* Audio Controls */}
        {false && renderAudioControls}

        {/* Map and Hotspots */}
        {renderMapa}
        {renderNavigationHotspots}
      </div>
    </LazyLoad>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});

Page.propTypes = {
  src: PropTypes.string,
  speed: PropTypes.number,
  navigationHotspots: PropTypes.array,
  audioBackground: PropTypes.object,
  map: PropTypes.object,
};
