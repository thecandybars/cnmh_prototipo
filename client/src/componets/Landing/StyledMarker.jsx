import PropTypes from "prop-types";
import { Marker } from "react-map-gl";

const StyledMarker = (props) => {
  const markerStyle = {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  };

  const circleStyle = {
    width: "50px",
    height: "50px",
    backgroundColor: "#ebaa44",
    borderRadius: "50%",
    overflow: "hidden",
    border: "3px solid #ebaa44",
    boxShadow: "0 0 5px rgba(127, 125, 0, 0.405)",
  };

  const imgStyle = {
    marginTop: "5px",
    marginLeft: "5px",
    width: props.zoom * 5,
    height: props.zoom * 5,
    objectFit: "cover",
    filter:
      "invert(100%) sepia(0%) saturate(7490%) hue-rotate(254deg) brightness(105%) contrast(99%)",
    // filter:
    //   "invert(91%) sepia(8%) saturate(6446%) hue-rotate(325deg) brightness(97%) contrast(90%)",
  };

  const arrowStyle = {
    width: "10px",
    height: "10px",
    backgroundColor: "#ebaa44",
    borderRadius: "50%",
    overflow: "hidden",
    boxShadow: "0 0 5px rgba(127, 125, 0, 0.405)",
    marginTop: "2px",
  };
  // const arrowStyle = {
  //   width: 0,
  //   height: 0,
  //   borderLeft: "10px solid transparent",
  //   borderRight: "10px solid transparent",
  //   borderTop: "15px solid #ebaa44",
  //   marginTop: "-2px",
  // };

  // const labelStyle = {
  //   marginTop: "5px",
  //   padding: "2px 6px",
  //   background: "#222",
  //   color: "white",
  //   borderRadius: "10px",
  //   fontSize: "12px",
  //   textAlign: "center",
  // };

  return (
    <Marker
      latitude={props.marca.latitud}
      longitude={props.marca.longitud}
      anchor="bottom"
      // onClick={(e) => {
      //   console.log("🚀 ~ StyledMarker ~ e:", e);
      //   props.onClick(e, props.marca.id);
      // }}
    >
      <div style={markerStyle}>
        <div style={circleStyle}>
          <img
            src="../../../public/markerMuseoMemoria.png"
            alt="Marker"
            style={imgStyle}
          />
        </div>
        <div style={arrowStyle} />
        {/* <div style={labelStyle}>{props.marca.nombre}</div> */}
      </div>
    </Marker>
  );
};

StyledMarker.propTypes = {
  marca: PropTypes.object,
  zoom: PropTypes.number,
  onClick: PropTypes.func,
};

export default StyledMarker;
