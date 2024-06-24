import OriginalSvgIcon from "../svg/marker_museo_memoria.svg?react";
import { SvgIcon } from "@mui/material";
import PropTypes from "prop-types";

export default function MarkerMuseoMemoria(props) {
  return (
    <SvgIcon component={OriginalSvgIcon} viewBox="0 0 210 297" {...props} />
  );
}
MarkerMuseoMemoria.propTypes = {
  style: PropTypes.object,
};
