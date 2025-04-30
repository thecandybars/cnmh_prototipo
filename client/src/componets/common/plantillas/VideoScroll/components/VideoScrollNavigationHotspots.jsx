/* eslint-disable react/prop-types */
import { Box, Dialog, Zoom } from "@mui/material";
import { forwardRef } from "react";
import DirectionButton from "./DirectionButton";
import VideoScrollContents from "./VideoScrollContents";

export default function VideoScrollNavigationHotspots({
  item,
  scrollyPosition,
  direction,
  endContentTop,
  endContentBottom,
}) {
  const navButtons = (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        gap: 1,
      }}
    >
      {item.links?.map((link) => (
        <DirectionButton key={link.direction} link={link} />
      ))}
    </Box>
  );
  const Container = item.isBlocking ? Dialog : Zoom;
  const containerProps = item.isBlocking
    ? // Dialog props
      {
        open: scrollyPosition > item.timeIn && direction === "up",
        TransitionComponent: Transition,
        fullWidth: true,
        maxWidth: "xl",
        sx: {
          "& .MuiDialog-paper": {
            backgroundColor: "transparent",
          },
        },
      }
    : // Zoom props
      {
        in: scrollyPosition > item.timeIn && scrollyPosition < item.timeOut,
        timeout: 1200,
      };

  return (
    <div key={item.id} display="flex" justifyContent="center" width="100%">
      <Container {...containerProps}>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          sx={{
            width: "100%",
            height: "100vh",
          }}
          gap={1}
        >
          {/* CONTENIDO ADICIONAL al final del scroll (AKA Paradas) */}
          {/* Necesita mas trabajo : se esta renderizando para cualquier hotspot, deberia solo renderizarse al final */}
          {endContentTop && <VideoScrollContents content={endContentTop} />}
          {navButtons}
          {endContentBottom && (
            <VideoScrollContents content={endContentBottom} />
          )}
        </Box>
      </Container>
    </div>
  );
}

const Transition = forwardRef(function Transition(props, ref) {
  return <Zoom ref={ref} timeout={1200} {...props} />;
});
