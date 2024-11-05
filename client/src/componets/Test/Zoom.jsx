import PropTypes from "prop-types";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import mural from "/MuralBocachico.jpg";
import { useState } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
const Zoom = () => {
  const hotspots = [
    {
      id: "pescao",
      top: "70%",
      left: "60%",
      content:
        "Bibendum eleifend id mattis auctor in duis ad aliquet, praesent facilisi maecenas mollis arcu congue fames penatibus tellus, porttitor commodo tincidunt rutrum interdum habitasse ornare. Duis porta euismod sagittis montes facilisis pellentesque aliquam dis habitant, a interdum congue maecenas fames malesuada metus sed, quam magna donec tincidunt dignissim leo ullamcorper nec.",
    },
    {
      id: "camion",
      top: "40%",
      left: "20%",
      content:
        "Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan habitasse at netus fermentum felis lacus ad donec, nec tristique ultrices habitant natoque curae aliquet maecenas iaculis etiam commodo magna dapibus platea nascetur. Rutrum iaculis felis nam aliquet congue primis risus nunc dapibus, dis netus potenti feugiat purus mauris interdum pulvinar aptent scelerisque, est egestas varius fringilla in libero tellus viverra.",
    },
    {
      id: "grupo",
      top: "45%",
      left: "51%",
      content:
        "Ridiculus tristique vulputate neque eleifend justo tempus integer, mauris per vel purus nisi suscipit, fusce pharetra malesuada rhoncus natoque interdum. Posuere cras ullamcorper laoreet consequat neque curae enim semper hac lobortis dictumst donec vestibulum aliquam proin dapibus, libero nulla et rutrum ultrices cum nam vitae duis quis porttitor ac morbi convallis",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InteractiveImage src={mural} hotspots={hotspots} zoom={3.5} />
    </div>
  );
};

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

const InteractiveImage = ({ src, hotspots = [], zoom }) => {
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
      {showInfo.visible && (
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
      )}
    </div>
  );
};

export default Zoom;
