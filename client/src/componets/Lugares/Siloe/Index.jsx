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
        <video src="/lugares/siloe/video/intro.mp4" controls width="100%" />
        <Box display="flex" gap={2}>
          <Button
            color="secondary"
            component={Link}
            to="/siloe/A01"
            variant="contained"
          >
            Entrar al Museo
          </Button>
          <Button
            color="secondary"
            component={Link}
            to="/siloe/A01"
            variant="contained"
          >
            Caminar por Siloé
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}
