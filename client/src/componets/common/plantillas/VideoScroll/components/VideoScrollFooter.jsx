/* eslint-disable react/prop-types */
import { Box, Button, Dialog, Typography } from "@mui/material";
import { useState } from "react";
import { CancelIcon, HelpIcon } from "../../../icons";
import VideoScrollMap from "./VideoScrollMap";
import VideoScrollAudioPlayer from "./VideoScrollAudioPlayer";

export default function VideoScrollFooter({ title, map, progress, audioSrc }) {
  // HELP
  const [openHelp, setOpenHelp] = useState(false);
  const renderHelpDialog = (
    <Dialog open={openHelp} onClose={() => setOpenHelp(false)}>
      <Button
        onClick={() => setOpenHelp(false)}
        sx={{
          position: "absolute",
          right: "0px",
          top: 0,
          p: 0.5,
          minWidth: 0,
          color: "black",
        }}
      >
        <CancelIcon />
      </Button>
      <Box display={"flex"} flexDirection={"column"} p={2}>
        <Box display="flex" alignItems={"center"} gap={2}>
          <img src="/scroll.png" height="100px" width="100px" />
          <Typography variant="h5" color="black">
            Desplázate hacia arriba o hacia abajo para recorrer las calles de
            Siloé
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
  return (
    <Box
      width={1}
      display="flex"
      justifyContent={"space-between"}
      alignItems={"end"}
      sx={{ position: "fixed", bottom: 0, left: 0 }}
    >
      <VideoScrollMap map={map} progress={progress} />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        width={1}
        px={1}
        sx={{ bgcolor: "black" }}
      >
        <Typography variant="h4" color="white">
          {title}
        </Typography>
        <Box display="flex" alignItems="center" gap={2}>
          <Button
            sx={{
              color: "white",
              border: "8px solid black",
              bgcolor: "gray",
              fontSize: "1.5rem",
              width: 60,
              height: 60,
              borderRadius: "100%",
            }}
            onClick={() => setOpenHelp((prev) => !prev)}
          >
            <HelpIcon />
          </Button>
          <VideoScrollAudioPlayer src={audioSrc} />
        </Box>
        {renderHelpDialog}
      </Box>
    </Box>
  );
}
