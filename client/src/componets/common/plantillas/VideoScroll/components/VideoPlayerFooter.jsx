/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";
import VideoScrollMap from "./VideoScrollMap";

export default function VideoPlayerFooter({
  title,
  map,
  progress,
  controlsVisible,
}) {
  return (
    <Box
      width={1}
      display="flex"
      justifyContent={"space-between"}
      alignItems={"end"}
      sx={{
        position: "fixed",
        left: 0,
        bottom: controlsVisible ? 70 : 0,
        transition: "0.2s",
      }}
    >
      <VideoScrollMap map={map} progress={progress} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={1}
        height={60}
        px={1}
        sx={{ bgcolor: "black" }}
      >
        <Typography variant="h4" color="white">
          {title}
        </Typography>
      </Box>
    </Box>
  );
}
