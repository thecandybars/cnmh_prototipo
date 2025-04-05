/* eslint-disable react/prop-types */
import "./styles.css";
import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/plan-plugin/index.css";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
// import { useState } from "react";
// import { Dialog } from "@mui/material";
// import CloseCancelButton from "../../common/buttons/CloseCancelButton";
import PropTypes from "prop-types";

export default function PhotoSphereViewer(props) {
  const { imageURL, navigationMarkers, onNavigate, initialPosition } = props;
  // const [clickedMarker, setClickedMarker] = useState(null);

  // HANDLERS
  const handleOnClick = (markerData) => {
    onNavigate(markerData.gotoId);
  };
  const handleReady = (instance) => {
    // console.log("Viewer container:", instance.container);
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    markersPlugs.addEventListener("select-marker", () =>
      handleOnClick(markersPlugs.state.currentMarker.config)
    );
  };

  // DIALOG
  // const renderDialog = (
  //   <Dialog open={!!clickedMarker} onClose={() => setClickedMarker(null)}>
  //     {clickedMarker && clickedMarker.texto}
  //   </Dialog>
  // );

  // MARKERS
  // const hotspot =
  //   "<svg width='100' height='100' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'><style>{`@keyframes bounce {0%, 100% { transform: translateY(0); } 50% { transform: translateY(-40px); }} .hotspot {animation: bounce 1s ease-in-out infinite;}`}</style><g className='hotspot'><circle cx='12' cy='12' r='12' fill='black'/><path fill='#63b0a4' d='M7.41,15.41 L12,10.83 l4.59,4.58 L18,14 l-6,-6 l-6,6 z'/></g></svg>";

  const navigationMarkersExtended = navigationMarkers.map((marker) => ({
    ...marker,
    anchor: "center center",
    image: "/icons/directionUpAndina.png",
    // imageLayer: "/icons/directionUp.png",
    size: { width: 100, height: 100 },
    scale: {
      yaw: [1, 2],
      zoom: [0.5, 1],
    },
    opacity: 0.7,
    style: {
      cursor: "pointer",
      //rotate: "0deg",
      transform:
        marker.direction === "right"
          ? "rotate(90deg)"
          : marker.direction === "left"
          ? "rotate(-90deg)"
          : "rotate(0deg)",
    },
    // html: hotspot,
  }));

  // PLUGINS
  const plugins = [
    [
      MarkersPlugin,
      {
        // defaultHoverScale: true,
        defaultHoverScale: { amount: 1.5, duration: 150 },
        markers: navigationMarkersExtended,
      },
    ],
  ];

  // const renderCloseButton = (
  //   <CloseCancelButton
  //     onClick={props.onClose}
  //     sx={{ position: "absolute", right: 0, zIndex: 100 }}
  //   />
  // );

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "80vh", // desired height
        overflow: "hidden", // prevents scrollbars
      }}
    >
      {/* {renderCloseButton} */}
      <ReactPhotoSphereViewer
        src={imageURL}
        autoSize={true}
        height={"100%"}
        width={"100%"}
        plugins={plugins}
        onReady={handleReady}
        loadingTxt=" "
        // onZoomChange={(e) => handleZoomChange(e)}
        // style={{ width: "100%" }}
        defaultYaw={initialPosition?.yaw || "150deg"}
        defaultPitch={initialPosition?.pitch || "-10deg"}
        defaultZoomLvl={initialPosition?.zoom || 10}
        cursor="help"
      />
      {/* {renderDialog} */}
    </div>
  );
}

PhotoSphereViewer.propTypes = {
  onClose: PropTypes.func,
};
