import { Box, Breadcrumbs, Link } from "@mui/material";
import { NavigateNextIcon } from "../../common/icons";
import { theme } from "../../../utils/theme";
import PropTypes from "prop-types";

ViewsBreadcrumbs.propTypes = {
  actualView: PropTypes.number,
  actualRegion: PropTypes.number,
  actualLugar: PropTypes.object,
  onClickView0: PropTypes.func,
  onClickView1: PropTypes.func,
};

export default function ViewsBreadcrumbs(props) {
  return (
    <Box
      sx={{
        padding: 1,
        px: 3,
        borderRadius: "0 30px 30px 0",
        cursor: "pointer",
        backgroundColor: theme.palette.title.main,
      }}
    >
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" color="primary" />}
      >
        <Link
          underline={props.actualView === 0 ? "none" : "always"}
          onClick={() => props.onClickView0()}
          sx={{
            cursor: props.actualView === 0 ? "default" : "pointer",
          }}
        >
          Vista general
        </Link>
        {props.actualView > 0 && (
          <Link
            underline={props.actualView === 1 ? "none" : "always"}
            onClick={() => props.onClickView1()}
            sx={{
              cursor: props.actualView === 1 ? "default" : "pointer",
            }}
          >
            {`Región ${props.actualRegion.fullName}`}
          </Link>
        )}
        {props.actualView > 1 && (
          <Link
            underline="none"
            sx={{
              cursor: "default",
            }}
          >
            {props.actualLugar.nombreCorto ||
              props.actualLugar.nombre.slice(0, 35) + " ..."}
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
}
