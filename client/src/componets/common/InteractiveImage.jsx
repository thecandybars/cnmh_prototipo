import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import { Box, Button, Fade, Stack, Typography, Zoom } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function InteractiveImage({ src, hotspots = [], zoom }) {
  const [showInfo, setShowInfo] = useState({ visible: false, tooltip: null });
  console.log("🚀 ~ InteractiveImage ~ showInfo:", showInfo);
  const [resetZoom, setResetZoom] = useState(null);

  const renderHotspots = (zoomToElement) => {
    return hotspots.map((hotspot) => (
      <Box
        key={hotspot.id}
        onClick={() => {
          zoomToElement(hotspot.id, zoom, 1000);
          setShowInfo({ visible: true, tooltip: { ...hotspot.tooltip } });
        }}
        id={hotspot.id}
        style={{ hidden: showInfo.visible }}
        sx={{
          position: "absolute",
          top: hotspot.top,
          left: hotspot.left,
          width: "40px",
          height: "40px",
          borderRadius: "50%",
          cursor: "pointer",
          transform: "translate(-50%, -50%)",
          backgroundColor: "secondary.main",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AddCircleOutlineIcon color="primary" size="large" />
      </Box>
    ));
  };

  return (
    <div style={{ position: "relative" }}>
      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={10}
        centerOnInit
        onZoomStart={(e) => console.log(e)}
        onPanningStart={(e) => console.log(e)}
        wheel={{ disabled: true }}
        panning={{ disabled: true }}
        pinch={{ disabled: true }}
        doubleClick={{ disabled: true }}
      >
        {({ zoomToElement, resetTransform }) => (
          <TransformComponent>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={src}
                alt="Zoomable"
                style={{ width: "100%", height: "auto" }}
              />
              <Fade in={!showInfo.visible} timeout={800}>
                <div> {renderHotspots(zoomToElement)}</div>
              </Fade>
              {setResetZoom(resetTransform(1500))}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
      {showInfo.tooltip && (
        <Zoom
          in={showInfo.visible}
          style={{
            transitionDelay: showInfo.visible ? "800ms" : "0ms",
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              top: showInfo.tooltip.top || "50%",
              left: showInfo.tooltip.left || "50%",
              backgroundColor: "black",
              padding: "10px",
              width: "40%",
              borderRadius: "8px",
              zIndex: 1000,
              color: "white",
              // transform: "translate(-40px, -40px)",
            }}
          >
            <Typography variant="body"> {showInfo.tooltip.content}</Typography>
            <Button
              onClick={() => {
                setShowInfo({ visible: false, tooltip: null });
                resetZoom();
              }}
            >
              Cerrar
            </Button>
          </Stack>
        </Zoom>
      )}
    </div>
  );
}

InteractiveImage.propTypes = {
  src: PropTypes.string,
  hotspots: PropTypes.array,
  zoom: PropTypes.number,
};
