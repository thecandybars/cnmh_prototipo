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
            width: "50%",
            margin: "0 auto",
            border: "2px solid white",
            p: 4,
            borderRadius: 2,
            backgroundColor: "rgba(55, 55, 55, 0.7)",
          }}
        >
          <Typography variant="h5" textAlign="center">
            Bienvenido/a al Museo Virtual, un espacio dedicado a preservar y
            compartir la memoria histórica de Colombia, a través de testimonios,
            documentos y archivos relacionados con el conflicto armado.
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
