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
      <Stack>
        <Typography variant="h1">Siloé</Typography>
        <Button
          color="secondary"
          component={Link}
          to="/siloe/hacia-dona-ana"
          variant="contained"
        >
          Iniciar
        </Button>
      </Stack>
    </Box>
  );
}
