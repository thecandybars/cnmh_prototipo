import { Grid, Typography } from "@mui/material";
import { theme } from "../../../utils/theme";
import PropTypes from "prop-types";

TituloMacroregion.propTypes = {
  title: PropTypes.string,
};

export default function TituloMacroregion(props) {
  const yellowLinesStyle = `3px solid ${theme.palette.secondary.main}`;
  return (
    <Grid
      container
      sx={{
        position: "absolute",
        color: "primary.main",
        bottom: 0,
        left: 0,
        width: "25%",
        zIndex: 1,
        display: "flex",
      }}
    >
      <Grid item xs={2} sx={{ borderRight: yellowLinesStyle }}></Grid>
      <Grid item xs={10}>
        <Typography variant="h5" pt={4} pl={1}>
          {props.title ? "REGIÓN" : "COLOMBIA"}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{
          borderRight: yellowLinesStyle,
          borderBottom: yellowLinesStyle,
        }}
      ></Grid>
      <Grid item xs={10} sx={{ borderBottom: yellowLinesStyle }}>
        <Typography
          variant="h1"
          sx={{
            mb: -4,
            pl: 1,
            textShadow: `2px 2px 4px ${theme.palette.translucidBlack}`,
          }}
        >
          {props.title || "Macroregiones"}
        </Typography>
      </Grid>
      <Grid
        item
        xs={2}
        sx={{ borderRight: yellowLinesStyle, height: "40px" }}
      ></Grid>
      <Grid item xs={10}></Grid>
    </Grid>
  );
}
