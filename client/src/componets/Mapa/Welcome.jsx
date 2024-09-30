import { Box, Button, Fade, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

function Welcome({ show, disabled, onClick, onSkip }) {
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
            volutpat pro in erat.
          </Typography>
          <Box display="flex" gap={2}>
            <Button disabled={disabled} variant="outlined" onClick={onClick}>
              Iniciar
            </Button>
            <Button disabled={disabled} variant="outlined" onClick={onSkip}>
              {"Saltar >>"}
            </Button>
          </Box>
        </Stack>
      </Fade>
    )
  );
}

Welcome.propTypes = {
  show: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  onSkip: PropTypes.func,
};

export default Welcome;
