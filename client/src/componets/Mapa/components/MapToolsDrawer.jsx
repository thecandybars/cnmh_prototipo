import { Box, Button, Drawer } from "@mui/material";
import { ExpandIcon } from "../../common/icons";
import PropTypes from "prop-types";
import { theme } from "../../../utils/theme";
import useViewport from "../../common/customHooks/useViewport";
import InfoLugar from "./InfoLugar";
import FilterLugares from "../Region/Filter/FilterLugares";
import useFetch from "../../common/customHooks/useFetch";
import { getTiposLugares } from "../../../services/tiposLugares";
import { useEffect } from "react";

MapToolsDrawer.propTypes = {
  children: PropTypes.element,
  openDrawer: PropTypes.bool,
  setOpenDrawer: PropTypes.func,
  actualView: PropTypes.number,
  handleOpenDialogLugar: PropTypes.func,
  selectedMarker: PropTypes.object,
  activeFilters: PropTypes.array,
  setActiveFilters: PropTypes.func,
};

export default function MapToolsDrawer(props) {
  const { vh } = useViewport();

  const [tiposLugares] = useFetch(() => getTiposLugares());
  useEffect(() => {
    tiposLugares?.length &&
      props.setActiveFilters(tiposLugares.map((tipo) => tipo.id));
  }, [tiposLugares, props]);
  const handleActiveFilters = (id) => {
    if (props.activeFilters.includes(id))
      props.setActiveFilters((prev) =>
        prev.filter((activeFilterId) => activeFilterId !== id)
      );
    else props.setActiveFilters((prev) => prev.concat([id]));
  };

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

  const renderDrawerContents =
    tiposLugares?.length && props.actualView === 1 ? (
      <FilterLugares
        tiposLugares={tiposLugares}
        handleActiveFilters={handleActiveFilters}
        activeFilters={props.activeFilters}
      />
    ) : props.actualView === 2 ? (
      <InfoLugar
        selectedMarker={props.selectedMarker}
        handleOpenDialogLugar={() => props.handleOpenDialogLugar()}
      />
    ) : null;

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
        {renderDrawerContents}
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
