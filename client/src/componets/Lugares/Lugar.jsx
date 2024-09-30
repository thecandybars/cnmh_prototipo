import PropTypes from "prop-types";
import { Photo_360 } from "../../App";
import MultimediaSliders from "../Exhibiciones/MultimediaSliders";

function Lugar(props) {
  const renderContents =
    (props.selectedMarker &&
      Math.floor(Math.abs(props.selectedMarker.latitud * 100)) % 2) === 0 ? (
      <Photo_360 onClose={props.onClose} />
    ) : (
      <MultimediaSliders exhibicionId={17} onClose={props.onClose} />
    );
  return renderContents;
}

Lugar.propTypes = { selectedMarker: PropTypes.object, onClose: PropTypes.func };

export default Lugar;
