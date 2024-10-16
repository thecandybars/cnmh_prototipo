// import PropTypes from "prop-types";
import viewports from "../../common/viewports";
import { Marker } from "react-map-gl";
import { capitaliaze } from "../../../utils/strings";
import { Typography } from "@mui/material";
import useAppStore from "../../../store/useAppStore";

const styles = {
  textBox: {
    variant: "h6",
    color: "black",
    bgcolor: "white",
    p: 1,
    sx: { borderRadius: "20px" },
  },
};
function MarkersMacroregion() {
  const actualView = useAppStore((state) => state.actualView); // 0:Pais, 1:Region, 2:Lugar
  const renderMarkersMacroregion =
    actualView === 0 &&
    viewports
      .filter((viewport) => Object.keys(viewport).includes("center"))
      .map((viewport) => (
        <Marker
          key={viewport.id}
          latitude={viewport.center[0]}
          longitude={viewport.center[1]}
          anchor="bottom"
        >
          <Typography {...styles.textBox}>
            {capitaliaze(viewport.name)}
          </Typography>
        </Marker>
      ));

  return renderMarkersMacroregion;
}

MarkersMacroregion.propTypes = {};

export default MarkersMacroregion;
