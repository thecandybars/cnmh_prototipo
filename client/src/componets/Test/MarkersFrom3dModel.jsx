import PropTypes from "prop-types";
import * as THREE from "three";
import { theme } from "../../utils/theme";

function MarkersFrom3dModel({ modelRef, cameraRef }) {
  const points = modelRef?.current?.scene.children.filter(
    (child) => child.name.slice(0, 5) === "Punto"
  );
  const renderMarkers2 = points
    ?.map((point) => {
      // Project 3D position to 2D screen space
      const vector = new THREE.Vector3();
      vector.setFromMatrixPosition(point.matrixWorld);
      vector.project(cameraRef.current);

      const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
      const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

      return {
        title: point.name,
        top: y,
        left: x,
        zIndex: vector.z,
      };
    })
    .sort((a, b) => a.zIndex > b.zIndex)
    .map((marker) => (
      <Marker
        key={marker.title}
        title={marker.title}
        top={marker.top}
        left={marker.left}
      />
    ));

  const renderMarkers = points?.map((point) => {
    // Project 3D position to 2D screen space
    const vector = new THREE.Vector3();
    vector.setFromMatrixPosition(point.matrixWorld);
    vector.project(cameraRef.current);

    const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
    const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

    return <Marker key={point.name} title={point.name} top={y} left={x} />;
  });
  return renderMarkers2;
}

MarkersFrom3dModel.propTypes = {};

export default MarkersFrom3dModel;

export function Marker({ title, top, left }) {
  return (
    <div
      style={{
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        top: `${top}px`,
        left: `${left}px`,
        transform: "translate(-50%, -50%)", // Center the div over the marker
        backgroundColor: theme.palette.secondary.main,
        color: "white",
        padding: "20px",
        width: "70px",
        height: "70px",
        borderRadius: "50%",
        cursor: "pointer",
        // pointerEvents: "none",
      }}
      onClick={(e) => console.log(e)}
    >
      <p>{title}</p>
    </div>
  );
}

Marker.propTypes = {
  title: PropTypes.string,
  top: PropTypes.number,
  left: PropTypes.number,
};
