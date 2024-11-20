import { forwardRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import { Box, Button, Dialog, Typography, Zoom } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import getEnv from "../../utils/getEnv";
import useViewport from "./customHooks/useViewport";
import ArrowIcon from "@mui/icons-material/KeyboardArrowUp";
import useWheelCounter from "./customHooks/useWheelCounter";

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});

function VideoScroll({ src, speed, hotspots = [] }) {
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
      <ScrollyVideo
        src={src || "https://scrollyvideo.js.org/goldengate.mp4"}
        onChange={(e) => setScrollyPosition(e)}
      />
      {renderNavigation}
    </div>
  );
}

VideoScroll.propTypes = {
  src: PropTypes.string,
  speed: PropTypes.number,
  hotspots: PropTypes.object,
};

export function DirectionButton({ link }) {
  const location = useLocation();
  const baseLocation = location.pathname.slice(
    0,
    location.pathname.lastIndexOf("/")
  );

  const baseURL = getEnv("client") + baseLocation; // usar location para generar "/siloe"

  const styles = {
    button:
      link.direction === "forward"
        ? {
            flexDirection: "column",
          }
        : link.direction === "left"
        ? {
            flexDirection: "row",
          }
        : {
            flexDirection: "row-reverse",
          },
    icon:
      link.direction === "forward"
        ? {
            rotate: "0deg",
          }
        : link.direction === "left"
        ? {
            rotate: "-90deg",
          }
        : {
            rotate: "90deg",
          },
  };

  return (
    <div
      key={link.direction}
      style={{
        color: "red",
        padding: "10px",
      }}
    >
      <Button
        variant="contained"
        color="secondary"
        display="flex"
        gap={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
          opacity: 0.8,
          ...styles.button,
        }}
      >
        <ArrowIcon sx={{ ...styles.icon }} />
        <Link to={`${baseURL}${link.href}`}>
          <Typography variant="h5" color="black">
            {link.title}
          </Typography>
        </Link>
      </Button>
    </div>
  );
}

DirectionButton.propTypes = {
  link: PropTypes.object,
};

export default VideoScroll;
