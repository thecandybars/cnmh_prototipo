import { IconButton } from "@mui/material";
import { CancelIcon } from "../icons";
import PropTypes from "prop-types";

export default function CloseCancelButton(props) {
  return (
    <IconButton
      aria-label="delete"
      onClick={() => props.onClick()}
      color="primary"
      size="large"
      sx={props.sx}
    >
      <CancelIcon />
    </IconButton>
  );
}

CloseCancelButton.propTypes = {
  onClick: PropTypes.func,
  sx: PropTypes.object,
};
