import { Button, Fade, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

function Welcome({ show, disabled, onClick }) {
  return (
    show && (
      <Fade
        in={show}
        timeout={{
          appear: 100,
          enter: 2000,
          exit: 1000,
        }}
      >
        <Stack
          spacing={2}
          sx={{
            alignItems: "center",
            width: "35%",
            margin: "0 auto",
            border: "2px solid white",
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(255,255,255,0.1)",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Bienvenidus, congue sed accumsan eros nisi, penatibus etiam aliquet
            volutpat eget auctor proin erat viverra vulputate praesent per velit
            facilisis
          </Typography>
          <Button disabled={disabled} variant="outlined" onClick={onClick}>
            Iniciar
          </Button>
        </Stack>
      </Fade>
    )
  );
}

Welcome.propTypes = {
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Welcome;
