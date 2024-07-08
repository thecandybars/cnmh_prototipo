import { Popup } from "react-map-gl";
import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../utils/theme";

PopupMarkerPreview.propTypes = {
  previewMarker: PropTypes.object,
  setPreviewMarker: PropTypes.func,
};

export default function PopupMarkerPreview(props) {
  return (
    <Popup
      latitude={props.previewMarker.latitud}
      longitude={props.previewMarker.longitud}
      anchor="top"
      onClose={() => props.setPreviewMarker(null)}
      maxWidth="350px"
      closeButton={false}
      className="custom-popup"
    >
      <Stack
        sx={{
          backgroundColor: theme.palette.secondary.main,
          padding: 2,
          borderRadius: "30px",
        }}
      >
        <Box display="flex" alignItems="center" gap={1}>
          <Stack>
            <Typography variant="captionStrong" color="primary" align="left">
              {`REGIÓN ${props.previewMarker.Municipio.Departamento.Region.fullName.toUpperCase()} - ${
                props.previewMarker.Municipio.nombre
              }`}
            </Typography>
            <Typography variant="caption" color="primary" align="left">
              {props.previewMarker.nombre.toUpperCase()}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Popup>
  );
}
