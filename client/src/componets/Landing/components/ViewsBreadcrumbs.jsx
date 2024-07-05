import { Breadcrumbs, Link } from "@mui/material";
import { NavigateNextIcon } from "../../common/icons";
import { theme } from "../../../utils/theme";
import PropTypes from "prop-types";

ViewsBreadcrumbs.propTypes = {
  actualView: PropTypes.number,
  onClick0: PropTypes.func,
  onClick1: PropTypes.func,
};

export default function ViewsBreadcrumbs(props) {
  return (
    <Breadcrumbs
      separator={<NavigateNextIcon fontSize="small" />}
      display="flex"
      backgroundColor={theme.palette.title.main}
      sx={{
        position: "absolute",
        top: "100px",
        zIndex: 100,
        right: 0,
      }}
    >
      <Link
        underline={props.actualView === 0 ? "none" : "hover"}
        onClick={() => props.onClick0()}
      >
        LEVEL 1
      </Link>
      {props.actualView > 0 && (
        <Link
          underline={props.actualView === 1 ? "none" : "hover"}
          onClick={() => props.onClick1()}
        >
          LEVEL 2
        </Link>
      )}
      {props.actualView > 1 && <Link underline="none">LEVEL 3</Link>}
    </Breadcrumbs>
  );
}
