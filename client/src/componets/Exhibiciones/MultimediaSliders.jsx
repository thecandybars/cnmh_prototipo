import PropTypes from "prop-types";
import useFetch from "../common/customHooks/useFetch";
import { getExhibicion } from "../../services/exhibiciones";
import ExhibicionMultimedia from "./MultimediaComponents/ExhibicionMultimedia";

MultimediaSliders.propTypes = {
  exhibicionId: PropTypes.number,
  onClose: PropTypes.func,
};
//
export default function MultimediaSliders(props) {
  const [exhibicion] = useFetch(() => getExhibicion(props.exhibicionId));
  return (
    exhibicion &&
    Object.keys(exhibicion).length > 0 && (
      <ExhibicionMultimedia data={exhibicion} onClose={props.onClose} />
    )
  );
}
