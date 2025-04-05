/* eslint-disable react/prop-types */
import { Box, Button, Drawer, Stack, Typography } from "@mui/material";
import Trajectory360 from "./Trajectory360";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { DirectionRight } from "../../common/icons";

export default function Index({ selectedTrajectory }) {
  const trajectory = {
    hornos: [
      {
        id: 0,
        name: "Inicio",
        imageURL: "/lugares/juan_frio/images/360/hornos/03.jpg",
        initialPosition: { yaw: "320deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "0deg", pitch: "-10deg" },
            tooltip: "Hornos del trapiche",
            gotoId: 1,
          },
        ],
      },
      {
        id: 1,
        name: "Hornos del trapiche",
        imageURL: "/lugares/juan_frio/images/360/hornos/01.jpg",
        initialPosition: { yaw: "160deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "200deg", pitch: "-10deg" },
            tooltip: "Exterior",
            gotoId: 2,
          },
          {
            id: 2,
            position: { yaw: "140deg", pitch: "-10deg" },
            tooltip: "Fosa común",
            gotoId: 3,
          },
          {
            id: 3,
            position: { yaw: "-20deg", pitch: "-10deg" },
            tooltip: "Volver al inicio",
            gotoId: 0,
          },
        ],
      },

      {
        id: 2,
        name: "Zona exterior",
        imageURL: "/lugares/juan_frio/images/360/hornos/00.jpg",
        initialPosition: { yaw: "100deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "250deg", pitch: "-30deg" },
            tooltip: "Hornos del trapiche",
            gotoId: 1,
          },
        ],
      },
      {
        id: 3,
        name: "Fosa común",
        imageURL: "/lugares/juan_frio/images/360/hornos/02.jpg",
        initialPosition: { yaw: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "170deg", pitch: "-10deg" },
            tooltip: "Hornos del trapiche",
            gotoId: 1,
          },
        ],
      },
    ],
    murales: [
      {
        id: 0,
        name: "Mural00",
        imageURL: "/lugares/juan_frio/images/360/murales/00.jpg",
        initialPosition: { yaw: "0deg", pitch: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "60deg", pitch: "0deg" },
            tooltip: "Mural02",
            gotoId: 1,
            direction: "right",
          },
        ],
      },
      {
        id: 1,
        name: "Mural02",
        imageURL: "/lugares/juan_frio/images/360/murales/02.jpg",
        initialPosition: { yaw: "0deg", pitch: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "-60deg", pitch: "0deg" },
            tooltip: "Mural00",
            gotoId: 0,
            direction: "left",
          },
          {
            id: 2,
            position: { yaw: "60deg", pitch: "0deg" },
            tooltip: "Mural04",
            gotoId: 2,
            direction: "right",
          },
        ],
      },
      {
        id: 2,
        name: "Mural04",
        imageURL: "/lugares/juan_frio/images/360/murales/04.jpg",
        initialPosition: { yaw: "0deg", pitch: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "-60deg", pitch: "0deg" },
            tooltip: "Mural02",
            gotoId: 1,
            direction: "left",
          },
          {
            id: 2,
            position: { yaw: "60deg", pitch: "0deg" },
            tooltip: "Mural06",
            gotoId: 3,
            direction: "right",
          },
        ],
      },
      {
        id: 3,
        name: "Mural06",
        imageURL: "/lugares/juan_frio/images/360/murales/06.jpg",
        initialPosition: { yaw: "0deg", pitch: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "-60deg", pitch: "0deg" },
            tooltip: "Mural04",
            gotoId: 2,
            direction: "left",
          },
          {
            id: 2,
            position: { yaw: "60deg", pitch: "0deg" },
            tooltip: "Mural08",
            gotoId: 4,
            direction: "right",
          },
        ],
      },
      {
        id: 4,
        name: "Mural08",
        imageURL: "/lugares/juan_frio/images/360/murales/08.jpg",
        initialPosition: { yaw: "0deg", pitch: "0deg" },
        navigationMarkers: [
          {
            id: 1,
            position: { yaw: "-60deg", pitch: "-10deg" },
            tooltip: "Mural06",
            gotoId: 3,
            direction: "left",
          },
        ],
      },
    ],
  };
  const [openLeftDrawer, setOpenLeftDrawer] = useState(false);

  const renderDrawerContent = (
    <Stack p={2} bgcolor="#111" gap={2} height="100%">
      <Typography variant="h3" color="#63B0A4">
        Juan Frio
      </Typography>
      <Typography variant="h4" color="#fff">
        Seleccionar recorrido
      </Typography>
      <Button sx={{ width: "100%" }} component={Link} to="/juanfrio/hornos">
        <Box
          sx={{
            bgcolor: "transparent",
            color: "white",
            border: "0.5px solid #63B0A4",
            borderRadius: "5px",
            borderLeft: selectedTrajectory === "hornos" && "8px solid #63B0A4",
            display: "flex",
            p: 1,
            width: "100%",
          }}
        >
          Hornos
        </Box>
      </Button>
      <Button sx={{ width: "100%" }} component={Link} to="/juanfrio/murales">
        <Box
          sx={{
            bgcolor: "transparent",
            color: "white",
            border: "0.5px solid #63B0A4",
            borderRadius: "5px",
            borderLeft: selectedTrajectory === "murales" && "8px solid #63B0A4",
            display: "flex",
            p: 1,
            pl: 2,
            width: "100%",
          }}
        >
          Murales
        </Box>
      </Button>
    </Stack>
  );

  useEffect(() => {
    setOpenLeftDrawer(false);
  }, [selectedTrajectory]);

  return (
    <Stack bgcolor="#111" p={2}>
      <Drawer
        anchor="left"
        open={openLeftDrawer}
        onClose={() => setOpenLeftDrawer(false)}
      >
        {renderDrawerContent}
      </Drawer>
      <Box
        display="flex"
        alignItems="center"
        gap={0}
        mb={1}
        sx={{ color: "#D4A76A" }}
      >
        <Button
          variant="contained"
          onClick={() => setOpenLeftDrawer(true)}
          sx={{
            bgcolor: "transparent",
            color: "#D4A76A",
            // border: "0.5px solid #63B0A4",
            borderRadius: "100px",
            display: "flex",
          }}
        >
          <DirectionRight />
        </Button>
        <Typography variant="h2">
          Juan Frio :
          {" " +
            selectedTrajectory[0].toUpperCase() +
            selectedTrajectory.slice(1)}
        </Typography>
      </Box>
      <Trajectory360
        trajectory={trajectory[selectedTrajectory]}
        initialStep={0}
        key={selectedTrajectory}
      />
    </Stack>
  );
}
