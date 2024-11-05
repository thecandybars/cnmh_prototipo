import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNextIcon } from "../../common/icons";
import PlaceIcon from "@mui/icons-material/Place";
import useAppStore from "../../../store/useAppStore";
import viewports from "../../common/viewports";

// ViewsBreadcrumbs.propTypes = {
// };

export default function ViewsBreadcrumbs() {
  const actualRegion = useAppStore((state) => state.actualRegion);
  const selectedMarker = useAppStore((state) => state.selectedMarker);
  const actualView = useAppStore((state) => state.actualView);
  const setActualView = useAppStore((state) => state.setActualView);
  const setActualRegion = useAppStore((state) => state.setActualRegion);
  const setSelectedMarker = useAppStore((state) => state.setSelectedMarker);
  const setDestination = useAppStore((state) => state.setDestination);

  const handleClickLevel0 = () => {
    const speed = actualView === 0 ? 0.5 : 0.2;
    setActualView(0);
    setActualRegion(null);
    setSelectedMarker(null);
    setDestination({ ...viewports[0], speed });
  };
  const handleClickLevel1 = () => {
    const speed = actualView === 0 ? 0.5 : 0.2;
    setActualView(1);
    setSelectedMarker(null);
    setDestination({
      ...viewports.find((viewport) => viewport.id === actualRegion.id),
      speed,
    });
  };

  return (
    <Box
      display="flex"
      alignItems={"center"}
      gap={1}
      bgcolor="rgba(109, 109, 109, 0.7)"
      px={2}
      py={1}
    >
      <PlaceIcon />
      <Typography variant="body" color="primary">
        Usted está en
      </Typography>
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
          <Typography
            variant="body"
            color={actualView === 0 ? "secondary.main" : "primary.main"}
          >
            Vista general
          </Typography>
        </Link>
        {actualView > 0 && (
          <Link
            underline={actualView === 1 ? "none" : "always"}
            onClick={handleClickLevel1}
            sx={{
              cursor: actualView === 1 ? "default" : "pointer",
            }}
          >
            <Typography
              variant="body"
              color={actualView === 1 ? "secondary.main" : "primary.main"}
            >
              {`Región ${actualRegion?.fullName}`}
            </Typography>
          </Link>
        )}
        {actualView > 1 && (
          <Link
            underline="none"
            sx={{
              cursor: "default",
            }}
          >
            {" "}
            <Typography
              variant="body"
              color={actualView === 2 ? "secondary.main" : "primary.main"}
            >
              {selectedMarker.nombreCorto || selectedMarker.nombre}
            </Typography>
          </Link>
        )}
      </Breadcrumbs>
    </Box>
  );
}
