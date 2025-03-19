import { Box, Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Index() {
  return (
    <Box
      display="flex"
      justifyContent={"center"}
      alignItems={"center"}
      height="100vh"
    >
      <Stack gap={2} alignItems="center" width="60%">
        <Typography variant="h1">Museo Popular de Siloé</Typography>
        <Box display="flex" justifyContent="space-around" gap={1}>
          <img
            src="/lugares/siloe/imagen/inicio.png"
            style={{ width: "40%" }}
          />
          <Box>
            <Typography variant="body1" style={{ width: "50%" }}>
              Siloé es una comuna de Cali, Colombia. Es conocida por su cultura
              y tradiciones. En este recorrido virtual podrás conocer más sobre
              este lugar. Siloé es una comuna de Cali, Colombia. Es conocida por
              su cultura y tradiciones. En este recorrido virtual podrás conocer
              más sobre este lugar.
            </Typography>
            <Typography variant="body1" style={{ width: "50%" }}>
              Siloé es una comuna de Cali, Colombia. Es conocida por su cultura
              y tradiciones. En este recorrido virtual podrás conocer más sobre
              este lugar. Siloé es una comuna de Cali, Colombia. Es conocida por
              su cultura y tradiciones. En este recorrido virtual podrás conocer
              más sobre este lugar.
            </Typography>
          </Box>
        </Box>
        <Button
          color="secondary"
          component={Link}
          to="/siloe/A01"
          variant="contained"
        >
          Iniciar
        </Button>
      </Stack>
    </Box>
  );
}
