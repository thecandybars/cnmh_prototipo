import { Popup } from "react-map-gl";
import PropTypes from "prop-types";
import { Stack, Typography } from "@mui/material";
import { theme } from "../../../utils/theme";

PopupClusterPreview.propTypes = {
  previewCluster: PropTypes.object,
  onClose: PropTypes.func,
};

export default function PopupClusterPreview(props) {
  console.log("🚀 ~ PopupClusterPreview ~ props:", props);
  return (
    <Popup
      latitude={props.previewCluster.latitud}
      longitude={props.previewCluster.longitud}
      anchor="top"
      onClose={props.onClose}
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
        <Stack>
          {props.previewCluster.lugares.map((cluster) => {
            return (
              <Typography
                key={cluster.lugar.id}
                variant="caption"
                color="primary"
                align="left"
              >
                {cluster.lugar.nombre}
              </Typography>
            );
          })}
        </Stack>
      </Stack>
    </Popup>
  );
}
