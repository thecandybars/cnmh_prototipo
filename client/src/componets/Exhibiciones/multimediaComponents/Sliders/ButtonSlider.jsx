import { Box, Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import useSelectMediaSource from "../../../common/customHooks/useSelectMediaSource";

ButtonSlider.propTypes = {
  slider: PropTypes.object,
  onClick: PropTypes.func,
};
export default function ButtonSlider(props) {
  const portadaSource = useSelectMediaSource({
    primary: props.slider.Portada.url,
    secondary: props.slider.Portada.cid,
  });
  return (
    <Button onClick={props.onClick}>
      <Stack p={2} alignItems="center">
        <Typography variant="h3" color="secondary">
          {props.slider.titulo}
        </Typography>
        <Box
          sx={{
            borderRadius: "10%",
            backgroundColor: "rgba(200,200,200,0.5)",
            p: 1,
          }}
        >
          <img
            src={portadaSource}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: "20%",
              objectFit: "cover",
              objectPosition: "center",
              width: "220px",
              height: "130px",
            }}
          />
        </Box>
      </Stack>
    </Button>
  );
}
