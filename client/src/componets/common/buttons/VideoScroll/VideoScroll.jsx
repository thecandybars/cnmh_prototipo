import { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import {
  Box,
  CircularProgress,
  Dialog,
  Slider,
  Typography,
  Zoom,
} from "@mui/material";
import useViewport from "../../customHooks/useViewport";
import useWheelCounter from "../../customHooks/useWheelCounter";
import DirectionButton from "./DirectionButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});

function VideoScroll({ src, speed, hotspots = [] }) {
  const [loading, setLoading] = useState(true);
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.2); // Default volume
  const audioRef = useRef(null); // Ref to manage the audio instance
  const { navigation } = hotspots;

  const { direction } = useWheelCounter({ scale: 30 });
  const { vh, vw } = useViewport();

  //  AUDIO PLAYER
  // Init
  useEffect(() => {
    audioRef.current = new Audio("/sonic.mp3");
    audioRef.current.volume = volume;
    audioRef.current.loop = true;

    return () => {
      // Cleanup on component unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);
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

  const renderNavigation = navigation.map((item) => {
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
        {item.links.map((link) => (
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
            in={scrollyPosition > item.timeIn && scrollyPosition < item.timeOut}
            timeout={1200}
          >
            {content}
          </Zoom>
        )}
      </div>
    );
  });

  return (
    <div className={"scrolly-container"} style={{ height: `${speed}vh` }}>
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
      <ScrollyVideo
        src={src || "https://scrollyvideo.js.org/goldengate.mp4"}
        onChange={(e) => {
          setScrollyPosition(e);
          handlePlayPause();
        }}
        onReady={() => setLoading(false)}
      />
      {/* CONTROLES AUDIO */}
      <Box sx={{ position: "fixed", bottom: 20, left: 20 }}>
        {/* Play/Pause */}
        {/* <button onClick={handlePlayPause}>
          {isPlaying ? "Pause Audio" : "Play Audio"}
        </button> */}

        {/* Volume */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ mr: 2 }}>
            Volume
          </Typography>
          <Slider
            value={volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            sx={{ width: 200 }}
          />
        </Box>
      </Box>
      {!loading && renderNavigation}
    </div>
  );
}

VideoScroll.propTypes = {
  src: PropTypes.string,
  speed: PropTypes.number,
  hotspots: PropTypes.object,
};

export default VideoScroll;
