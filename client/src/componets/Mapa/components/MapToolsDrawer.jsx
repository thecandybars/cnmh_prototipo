import { Box, Button, Drawer } from "@mui/material";
import { ExpandIcon } from "../../common/icons";
import { theme } from "../../../utils/theme";
import useViewport from "../../common/customHooks/useViewport";
import FilterLugares from "../Region/Filter/FilterLugares";
import useFetch from "../../common/customHooks/useFetch";
import { getTiposLugares } from "../../../services/tiposLugares";
import { useEffect, useState } from "react";
import useAppStore from "../../../store/useAppStore";

export default function MapToolsDrawer() {
  const { vh } = useViewport();
  const [openDrawer, setOpenDrawer] = useState(false);
  // const [activeFilters, setActiveFilters] = useState([]);

  const actualView = useAppStore((state) => state.actualView); // 0:Pais, 1:Region, 2:Lugar
  const setActiveFilters = useAppStore((state) => state.setActiveFilters);

  const [tiposLugares] = useFetch(() => getTiposLugares());
  useEffect(() => {
    tiposLugares?.length &&
      setActiveFilters(tiposLugares.map((tipo) => tipo.id));
  }, [tiposLugares]);

  const renderCloseFilterButton = (
    <Button onClick={() => setOpenDrawer(false)}>
      <ExpandIcon size="large" color="title" />
    </Button>
  );
  const renderOpenFilterButton = (
    <Button onClick={() => setOpenDrawer(true)} sx={{ height: "100%" }}>
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
      open={!openDrawer}
      onClose={() => setOpenDrawer(!false)}
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

  const renderDrawerContents = tiposLugares?.length && actualView === 1 && (
    <FilterLugares tiposLugares={tiposLugares} />
  );

  const renderOpenedFilterDrawer = (
    <Drawer
      variant="persistent"
      anchor="right"
      open={openDrawer}
      onClose={() => setOpenDrawer(false)}
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
    !!renderDrawerContents && (
      <Box>
        {renderClosedFilterDrawer}
        {renderOpenedFilterDrawer}
      </Box>
    )
  );
}
