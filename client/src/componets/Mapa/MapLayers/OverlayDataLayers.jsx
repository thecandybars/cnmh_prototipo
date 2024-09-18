import { FormControlLabel, Stack, Switch } from "@mui/material";
// import PropTypes from 'prop-types'
import { useState } from "react";
import ZonasDeConflicto from "./ZonasDeConflicto";

function OverlayDataLayers() {
  const [drawConflictAreas, setDrawConflictAreas] = useState(false);
  const renderConflictAreasSwitch = (
    <Stack
      spacing={1}
      sx={{
        position: "absolute",
        top: "100px",
        zIndex: 100,
        right: 0,
        bgcolor: "secondary.main",
        px: 4,
        borderRadius: "30px 0 0 30px",
      }}
    >
      <FormControlLabel
        control={
          <Switch
            checked={drawConflictAreas}
            onChange={() => setDrawConflictAreas((prev) => !prev)}
          />
        }
        label="Zonas de conflicto"
      />
    </Stack>
  );
  const renderConflictAreas = drawConflictAreas && <ZonasDeConflicto />;
  return (
    <div>
      {renderConflictAreasSwitch}
      {renderConflictAreas}
    </div>
  );
}

OverlayDataLayers.propTypes = {};

export default OverlayDataLayers;
