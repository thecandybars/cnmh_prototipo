import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import { Box, CircularProgress, Dialog, Typography, Zoom } from "@mui/material";
import useViewport from "../../customHooks/useViewport";
import useWheelCounter from "../../customHooks/useWheelCounter";
import DirectionButton from "./DirectionButton";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});

function VideoScroll({ src, speed, hotspots = [] }) {
  const [loading, setLoading] = useState(true);
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const { navigation } = hotspots;

  const { direction } = useWheelCounter({ scale: 30 });
  const { vh, vw } = useViewport();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderNavigation = navigation.map((item) => {
    const content = (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-end",
          position: "fixed",
          //   transform: `translate(${-vw / 2}px, ${-vh / 2}px)`, // Zoom no funciona con transform
          top: vh / 2,
          left: vw / 2 - 100, // calcular -100 !!! Es la mitad del ancho de la caja
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
        onChange={(e) => setScrollyPosition(e)}
        onReady={() => setLoading(false)}
      />
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
