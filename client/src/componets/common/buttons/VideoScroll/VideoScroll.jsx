import { forwardRef, useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  Typography,
  Zoom,
} from "@mui/material";
import useViewport from "../../customHooks/useViewport";
import useWheelCounter from "../../customHooks/useWheelCounter";
import DirectionButton from "./DirectionButton";
import MapaConRuta from "./MapaConRuta";
import { theme } from "../../../../utils/theme";
import { CancelIcon, Help, SoundOff, SoundOn } from "../../icons";

export default function VideoScroll(props) {
  // Esta funcion existe solo para resetear el scroll antes de cargar la pagina de VideoScroll y evitar re-renderizados
  window.scrollTo(0, 0);
  return <Page {...props} />;
}

function Page({
  src,
  speed,
  title,
  navigationHotspots = [],
  map,
  audioBackground,
}) {
  const [loading, setLoading] = useState(true);
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  // const [volume, setVolume] = useState(0.2); // Default volume
  const VOLUME = 0.2;
  const audioRef = useRef(null); // Ref to manage the audio instance

  const { direction } = useWheelCounter({ scale: 30 });
  const { vh, vw } = useViewport();

  // Cleanup video on unmount
  const cleanUp = () => {
    const videoElements = document.querySelectorAll("video");
    videoElements.forEach((video) => {
      video.pause();
      video.src = ""; // Clear the source to release memory
      video.load(); // Force garbage collection
    });
  };
  useEffect(() => {
    console.log("init");
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
    audio.volume = VOLUME;
    audio.loop = true;
    audioRef.current = audio;

    if (isPlaying) audio.play();

    return () => {
      audio.pause();
      audioRef.current = null;
      audio.load();
    };
  }, [audioBackground?.src, isPlaying]);
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
  // const handleVolumeChange = (event, newValue) => {
  //   setVolume(newValue);
  //   if (audioRef.current) {
  //     audioRef.current.volume = newValue;
  //   }
  // };
  // Render Audio Controls
  const renderAudioControls = (
    <MuteButton isOn={isPlaying} onClick={handlePlayPause} />
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
            <DirectionButton
              key={link.direction}
              link={link}
              onClick={cleanUp} // Esta funcion esta comentada en el componente original porque congela el equipo, daña mas de lo que arregla
            />
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
      marginTop={1}
      sx={{
        // borderRadius: "10px",
        border: `3px solid black`,
        zIndex: 1000,
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

  // HELP
  const [openHelp, setOpenHelp] = useState(false);
  const renderHelpDialog = (
    <Dialog open={openHelp} onClose={() => setOpenHelp(false)}>
      <Button
        onClick={() => setOpenHelp(false)}
        sx={{
          position: "absolute",
          right: "0px",
          top: 0,
          p: 0.5,
          minWidth: 0,
          color: "black",
        }}
      >
        <CancelIcon />
      </Button>
      <Box display={"flex"} flexDirection={"column"} p={2}>
        <Box display="flex" alignItems={"center"} gap={2}>
          <img src="/scroll.png" height="100px" width="100px" />
          <Typography variant="h5" color="black">
            Desplázate hacia arriba o hacia abajo para recorrer las calles de
            Siloé
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );

  return (
    <div
      className="scrolly-container"
      style={{
        width: "100%",
        height: `${speed}vh`,
        // height: `${Math.min(Math.max(speed, 10), 300)}vh`,
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

      {/* Hotspots */}
      {renderNavigationHotspots}

      <Box
        width={1}
        display="flex"
        justifyContent={"space-between"}
        alignItems={"end"}
        sx={{ position: "fixed", bottom: 0, left: 0 }}
      >
        {renderMapa}
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          width={1}
          px={1}
          // my={1}
          // mr={1}
          // borderRadius="0px 100px 100px 20px"
          sx={{ bgcolor: "black" }}
        >
          <Typography variant="h4" color="white">
            {title || src.slice(src.lastIndexOf("/") + 1, src.lastIndexOf("."))}
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <Button
              sx={{
                color: "white",
                border: "8px solid black",
                bgcolor: "gray",
                fontSize: "1.5rem",
                width: 60,
                height: 60,
                borderRadius: "100%",
              }}
              onClick={() => setOpenHelp((prev) => !prev)}
            >
              <Help />
            </Button>
            {renderAudioControls}
          </Box>
          {renderHelpDialog}
        </Box>
      </Box>
    </div>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});

Page.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  speed: PropTypes.number,
  navigationHotspots: PropTypes.array,
  audioBackground: PropTypes.object,
  map: PropTypes.object,
};

const MuteButton = ({ isOn, onClick }) => {
  const [icon, setIcon] = useState(isOn ? <SoundOn /> : <SoundOff />);
  const handleOnClick = () => {
    onClick();
    setIcon(isOn ? <SoundOff /> : <SoundOn />);
  };

  return (
    <Button
      // variant="contained"
      // color="white"
      onClick={handleOnClick}
      // onMouseEnter={() => setIcon(isOn ? <SoundOff /> : <SoundOn />)}
      // onMouseLeave={() => setIcon(isOn ? <SoundOn /> : <SoundOff />)}
      sx={{
        width: 60,
        height: 60,
        borderRadius: "50%",
        border: "8px solid black",
        bgcolor: "gray",
        fontSize: "2.5rem",
      }}
    >
      {icon}
    </Button>
  );
};
MuteButton.propTypes = {
  isOn: PropTypes.bool,
  onClick: PropTypes.func,
};
