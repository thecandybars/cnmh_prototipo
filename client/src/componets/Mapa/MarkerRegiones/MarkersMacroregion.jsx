// import PropTypes from "prop-types";
import viewports from "../../common/viewports";
import { Marker } from "react-map-gl";
import { capitaliaze } from "../../../utils/strings";
import { Typography } from "@mui/material";

function MarkersMacroregion() {
  const regions = viewports.filter((viewport) =>
    Object.keys(viewport).includes("center")
  );
  const renderMarkersMacroregion = regions.map((viewport) => (
    <Marker
      key={viewport.id}
      latitude={viewport.center[0]}
      longitude={viewport.center[1]}
      anchor="bottom"
    >
      <Typography
        variant="h5"
        color="black"
        bgcolor="white"
        p={1}
        sx={{ borderRadius: "20px" }}
      >
        {capitaliaze(viewport.name)}
      </Typography>
    </Marker>
  ));

  return renderMarkersMacroregion;
}

MarkersMacroregion.propTypes = {};

export default MarkersMacroregion;
