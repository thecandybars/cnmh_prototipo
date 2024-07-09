import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { Marker } from "react-map-gl";

const MarkerRegiones = (props) => {
  // console.log("🚀 ~ MarkerRegiones ~ props:", props);
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
    boxShadow: "0 0 5px rgba(127, 125, 0, 0.405)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const imgStyle = {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    objectPosition: "center",
  };
  // DOT ARROW
  // const arrowStyle = {
  //   width: "10px",
  //   height: "10px",
  //   backgroundColor: "#ebaa44",
  //   borderRadius: "50%",
  //   overflow: "hidden",
  //   boxShadow: "0 0 5px rgba(127, 125, 0, 0.405)",
  //   marginTop: "2px",
  // };
  const arrowStyle = {
    width: 0,
    height: 0,
    borderLeft: "10px solid transparent",
    borderRight: "10px solid transparent",
    borderTop: "15px solid #ebaa44",
    marginTop: "-2px",
  };

  // const sources = [
  //   "museoMemoria",
  //   "espacioSanar",
  //   "lugarHorror",
  //   "lugarMemoria",
  // ];
  // const index = Math.floor(Math.abs(props.marca.latitud * 100)) % 4;
  // const imageName = props.marca.TiposLugare.imagenURL.slice(
  //   props.marca.TiposLugare.imagenURL.lastIndexOf("/")
  // );

  const renderContent = props.text ? (
    <Typography> {props.text}</Typography>
  ) : (
    <img
      src={`${props.marca.TiposLugare.imagenURL.slice(
        props.marca.TiposLugare.imagenURL.lastIndexOf("/")
      )}`}
      alt="Marker"
      style={imgStyle}
    />
    // <img src={`${sources[index]}.png`} alt="Marker" style={imgStyle} />
  );

  return (
    <Marker
      latitude={props.marca.latitud}
      longitude={props.marca.longitud}
      anchor="bottom"
    >
      <div style={markerStyle}>
        <div style={circleStyle}>{renderContent}</div>
        <div style={arrowStyle} />
      </div>
    </Marker>
  );
};

MarkerRegiones.propTypes = {
  marca: PropTypes.object,
  zoom: PropTypes.number,
  onClick: PropTypes.func,
  text: PropTypes.any,
};

export default MarkerRegiones;
