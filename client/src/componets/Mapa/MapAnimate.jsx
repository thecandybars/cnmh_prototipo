import { useEffect } from "react";
import { useMap } from "react-map-gl";
import PropTypes from "prop-types";

// const centerPoint = {
//   latitude: 3.034492,
//   longitude: -72.86716,
//   zoom: 5,
//   bearing: -11,
//   pitch: 48,
// };
export default function MapAnimate({ centerPoint }) {
  const { current: map } = useMap();

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: [centerPoint.longitude, centerPoint.latitude],
        zoom: centerPoint.zoom,
        speed: 0.6,
        curve: 1.42,
        bearing: centerPoint.bearing,
        pitch: centerPoint.pitch,
        essential: true,
      });
    }
  }, [map]);
  return <div></div>;
}
MapAnimate.propTypes = {
  centerPoint: PropTypes.object,
};
