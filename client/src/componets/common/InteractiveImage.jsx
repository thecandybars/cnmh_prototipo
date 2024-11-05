import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useState } from "react";
import { Box, Button, Stack, Typography, Zoom } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function InteractiveImage({ src, hotspots = [], zoom }) {
  const [showInfo, setShowInfo] = useState({ visible: false, content: "" });
  const [resetZoom, setResetZoom] = useState(null);

  const renderHotspots = (zoomToElement) => {
    return hotspots.map(
      (hotspot) =>
        !showInfo.visible && (
          <Box
            key={hotspot.id}
            onClick={() => {
              zoomToElement(hotspot.id, zoom, 1000);
              setShowInfo({ visible: true, content: hotspot.content });
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
        )
    );
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
      >
        {({ zoomToElement, resetTransform }) => (
          <TransformComponent>
            <div style={{ position: "relative", display: "inline-block" }}>
              <img
                src={src}
                alt="Zoomable"
                style={{ width: "100%", height: "auto" }}
              />
              {renderHotspots(zoomToElement)}
              {setResetZoom(resetTransform(1500))}
            </div>
          </TransformComponent>
        )}
      </TransformWrapper>
      <Zoom
        in={showInfo.visible}
        style={{ transitionDelay: showInfo.visible ? "800ms" : "0ms" }}
      >
        <Stack
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "black",
            padding: "10px",
            width: "40%",
            borderRadius: "8px",
            zIndex: 1000,
            color: "white",
            // transform: "translate(-40px, -40px)",
          }}
        >
          <Typography variant="body"> {showInfo.content}</Typography>
          <Button
            onClick={() => {
              setShowInfo({ visible: false, content: "" });
              resetZoom();
            }}
          >
            Cerrar
          </Button>
        </Stack>
      </Zoom>
    </div>
  );
}

InteractiveImage.propTypes = {
  src: PropTypes.string.isRequired,
  hotspots: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      top: PropTypes.string.isRequired,
      left: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    })
  ),
  zoom: PropTypes.number.isRequired,
};
