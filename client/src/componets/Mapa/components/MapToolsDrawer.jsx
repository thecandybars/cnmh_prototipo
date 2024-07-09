import { Box, Button, Drawer } from "@mui/material";
import { ExpandIcon } from "../../common/icons";
import PropTypes from "prop-types";
import { theme } from "../../../utils/theme";
import useViewport from "../../common/customHooks/useViewport";

MapToolsDrawer.propTypes = {
  children: PropTypes.element,
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
};

export default function MapToolsDrawer(props) {
  const { vh } = useViewport();
  const renderCloseFilterButton = (
    <Button onClick={() => props.setOpenDrawer(false)}>
      <ExpandIcon size="large" color="title" />
    </Button>
  );
  const renderOpenFilterButton = (
    <Button onClick={() => props.setOpenDrawer(true)} sx={{ height: "100%" }}>
      <ExpandIcon
        size="large"
        color="title"
        sx={{ transform: "rotate(180deg)" }}
      />
    </Button>
  );
  const renderClosedFilterDrawer = (
    <Drawer
      variant="persistent"
      anchor="right"
      open={!props.openDrawer}
      onClose={() => props.setOpenDrawer(!false)}
      PaperProps={{
        sx: {
          height: "360px",
          marginTop: `${vh / 2 - 180}px`,
          backgroundColor: theme.palette.secondary.main,
          padding: 1,
          paddingRight: 0,
          borderRadius: "30px 0 0 30px",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "100%",
          marign: 0,
        }}
      >
        {renderOpenFilterButton}
      </Box>
    </Drawer>
  );
  const renderOpenedFilterDrawer = (
    <Drawer
      variant="persistent"
      anchor="right"
      open={props.openDrawer}
      onClose={() => props.setOpenDrawer(false)}
      PaperProps={{
        sx: {
          height: "360px",
          marginTop: `${vh / 2 - 180}px`,
          backgroundColor: theme.palette.secondary.main,
          padding: 1,
          paddingRight: 0,
          borderRadius: "30px 0 0 30px",
        },
      }}
    >
      <Box sx={{ display: "flex" }}>
        {renderCloseFilterButton}
        {props.children}
      </Box>
    </Drawer>
  );

  return (
    <Box>
      {renderClosedFilterDrawer}
      {renderOpenedFilterDrawer}
    </Box>
  );
}
