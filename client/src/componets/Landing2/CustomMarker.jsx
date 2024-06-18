import PropTypes from "prop-types";
import { Marker } from "react-map-gl";

const CustomMarker = (props) => {
  const markerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  //   const circleStyle = {
  //     width: "50px",
  //     height: "50px",
  //     borderRadius: "50%",
  //     overflow: "hidden",
  //     border: "5px solid #ebaa44",
  //     boxShadow: "0 0 5px rgba(0,0,0,0.5)",
  //   };

  //   const imgStyle = {
  //     width: props.zoom * 10,
  //     height: props.zoom * 10,
  //     objectFit: "cover",
  //   };

  const arrowStyle = {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "15px solid #ebaa44",
    marginTop: "-2px",
  };

  const labelStyle = {
    marginTop: "5px",
    padding: "2px 6px",
    background: "#222",
    color: "white",
    borderRadius: "10px",
    fontSize: "12px",
    textAlign: "center",
  };

  return (
    <Marker
      latitude={props.place.latitud}
      longitude={props.place.longitud}
      anchor="bottom"
    >
      <div style={markerStyle}>
        <div style={arrowStyle}></div>
        <div style={labelStyle}>{props.place.nombre}</div>
      </div>
    </Marker>
  );
};

CustomMarker.propTypes = {
  place: PropTypes.object,
  zoom: PropTypes.number,
};

export default CustomMarker;
