import PropTypes from "prop-types";
import useFetch from "../common/customHooks/useFetch";
import { getExhibicion } from "../../services/exhibiciones";
import MultimediaExhibicion from "./MultimediaComponents/MultimediaExhibicion";

Multimedia2.propTypes = {
  exhibicionId: PropTypes.number,
  onClose: PropTypes.func,
};
//
export default function Multimedia2(props) {
  const [exhibicion] = useFetch(() => getExhibicion(props.exhibicionId));
  return (
    exhibicion &&
    Object.keys(exhibicion).length > 0 && (
      <MultimediaExhibicion data={exhibicion} onClose={props.onClose} />
    )
  );
}
