import PropTypes from "prop-types";
import useFetch from "../common/customHooks/useFetch";
import { getExhibicion } from "../../services/exhibiciones";
import MultimediaExhibicion from "./MultimediaComponents/MultimediaExhibicion";

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
      <MultimediaExhibicion data={exhibicion} onClose={props.onClose} />
    )
  );
}
