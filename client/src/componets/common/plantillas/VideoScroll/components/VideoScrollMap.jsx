/* eslint-disable react/prop-types */
import { Box } from "@mui/material";
import MapaConRuta from "./MapaConRuta";

export default function VideoScrollMap({ map, progress }) {
  return (
    <Box
      marginTop={1}
      sx={{
        border: `3px solid black`,
        zIndex: 1000,
      }}
    >
      <MapaConRuta
        points={map.points.map((point) => [point[1], point[0]])}
        progress={progress}
        width={200}
        height={200}
        zoom={map.zoom || 17}
      />
    </Box>
  );
}
