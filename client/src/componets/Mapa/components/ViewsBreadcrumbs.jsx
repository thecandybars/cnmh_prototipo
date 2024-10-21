import { Box, Breadcrumbs, Link } from "@mui/material";
import { NavigateNextIcon } from "../../common/icons";
import { theme } from "../../../utils/theme";
// import PropTypes from "prop-types";
import useAppStore from "../../../store/useAppStore";
import viewports from "../../common/viewports";

// ViewsBreadcrumbs.propTypes = {
// };

export default function ViewsBreadcrumbs() {
  const actualView = useAppStore((state) => state.actualView);
  const actualRegion = useAppStore((state) => state.actualRegion);
  const selectedMarker = useAppStore((state) => state.selectedMarker);
  const setActualView = useAppStore((state) => state.setActualView);
  const setActualRegion = useAppStore((state) => state.setActualRegion);
  const setSelectedMarker = useAppStore((state) => state.setSelectedMarker);
  const setDestination = useAppStore((state) => state.setDestination);

  const handleClickLevel0 = () => {
    setActualView(0);
    setActualRegion(null);
    setSelectedMarker(null);
    setDestination({ ...viewports[0], speed: 0.3 });
  };
  const handleClickLevel1 = () => {
    setActualView(1);
    setSelectedMarker(null);
    setDestination({
      ...viewports.find((viewport) => viewport.id === actualRegion.id),
      speed: 0.3,
    });
  };

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
          underline={actualView === 0 ? "none" : "always"}
          onClick={handleClickLevel0}
          sx={{
            cursor: actualView === 0 ? "default" : "pointer",
          }}
        >
          Vista general
        </Link>
        {actualView > 0 && (
          <Link
            underline={actualView === 1 ? "none" : "always"}
            onClick={handleClickLevel1}
            sx={{
              cursor: actualView === 1 ? "default" : "pointer",
            }}
          >
            {`Región ${actualRegion?.fullName}`}
          </Link>
        )}
        {actualView > 1 && (
          <Link
            underline="none"
            sx={{
              cursor: "default",
            }}
          >
            {selectedMarker.nombreCorto ||
              selectedMarker.nombre.slice(0, 35) + " ..."}
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
}
