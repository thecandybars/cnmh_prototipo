import PropTypes from "prop-types";
import { Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function MarkerLugar(props) {
  return (
    <>
      <Marker
        latitude={props.place.latitude}
        longitude={props.place.longitude}
        anchor="bottom"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "yellow",
          }}
        >
          <img
            src={props.place.image}
            width={props.zoom * 10}
            height={props.zoom * 10}
            style={{
              borderRadius: "100%",
              border: "3px solid yellow",
            }}
          />
          &#9660;
        </div>
      </Marker>
    </>
  );
}

MarkerLugar.propTypes = {
  place: PropTypes.object,
  zoom: PropTypes.number,
};
