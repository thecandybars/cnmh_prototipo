import PropTypes from "prop-types";
import useFetch from "../common/customHooks/useFetch";
import { getExhibicion } from "../../services/exhibiciones";
import getEnv from "../../utils/getEnv";
import MultimediaExhibicion from "./multimediaComponents/MultimediaExhibicion";

Multimedia.propTypes = {
  exhibicionId: PropTypes.number,
};
export default function Multimedia(props) {
  const [exhibicion] = useFetch(() => getExhibicion(props.exhibicionId));
  //   console.log("🚀 ~ Multimedia ~ exhibicion:", exhibicion);
  const mediaSrc = getEnv("media");
  console.log("🚀 ~ Multimedia ~ mediaSrc:", mediaSrc);
  return (
    exhibicion &&
    Object.keys(exhibicion).length > 0 && (
      <MultimediaExhibicion data={exhibicion} />
    )
  );
}
