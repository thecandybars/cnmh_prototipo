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
      separator={<NavigateNextIcon fontSize="small" color="primary" />}
      display="flex"
      backgroundColor={theme.palette.title.main}
      sx={{
        position: "absolute",
        top: "100px",
        zIndex: 100,
        right: 0,
        padding: 1,
        cursor: "pointer",
      }}
    >
      <Link
        underline={props.actualView === 0 ? "none" : "hover"}
        onClick={() => props.onClick0()}
        sx={{
          fontWeight: props.actualView === 0 ? "bolder" : "normal",
          cursor: props.actualView === 0 ? "default" : "pointer",
        }}
      >
        Pais
      </Link>
      {props.actualView > 0 && (
        <Link
          underline={props.actualView === 1 ? "none" : "hover"}
          onClick={() => props.onClick1()}
          sx={{
            fontWeight: props.actualView === 1 ? "bolder" : "normal",
            cursor: props.actualView === 1 ? "default" : "pointer",
          }}
        >
          Region
        </Link>
      )}
      {props.actualView > 1 && (
        <Link underline="none" sx={{ fontWeight: "bolder", cursor: "default" }}>
          Lugar
        </Link>
      )}
    </Breadcrumbs>
  );
}
