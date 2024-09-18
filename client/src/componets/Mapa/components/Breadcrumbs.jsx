import { Box } from "@mui/material";
import PropTypes from "prop-types";
import ViewsBreadcrumbs from "./ViewsBreadcrumbs";
import { theme } from "../../../utils/theme";

function Breadcrumbs(props) {
  return (
    <Box
      spacing={1}
      sx={{
        position: "absolute",
        top: "47px",
        zIndex: 100,
        left: 0,
      }}
    >
      <Box
        sx={{
          padding: 1,
          px: 3,
          borderRadius: "0 30px 30px 0",
          cursor: "pointer",
          backgroundColor: theme.palette.title.main,
        }}
      >
        <ViewsBreadcrumbs
          actualView={props.actualView}
          actualRegion={props.actualRegion}
          actualLugar={props.selectedMarker}
          onClickView0={props.handleClickLevel0}
          onClickView1={props.handleClickLevel1}
        />
      </Box>
    </Box>
  );
}

Breadcrumbs.propTypes = {
  actualView: PropTypes.number,
  actualRegion: PropTypes.object,
  selectedMarker: PropTypes.object,
  handleClickLevel0: PropTypes.func,
  handleClickLevel1: PropTypes.func,
};

export default Breadcrumbs;
