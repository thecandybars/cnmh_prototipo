import { Stack, Typography } from "@mui/material";
import Trajectory360 from "./Trajectory360";

export default function Index() {
  const trajectory = [
    {
      id: 0,
      name: "Exterior",
      imageURL: "/lugares/fragua/images/01.png",
      initialPosition: { yaw: "150deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "150deg", pitch: "-30deg" },
          tooltip: "Entrar al bosque",
          gotoId: 1,
        },
      ],
    },
    {
      id: 1,
      name: "Entrada",
      imageURL: "/lugares/fragua/images/02.png",
      initialPosition: { yaw: "130deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "-70deg", pitch: "-30deg" },
          tooltip: "Volver a la entrada",
          gotoId: 0,
        },
        {
          id: 2,
          position: { yaw: "100deg", pitch: "-30deg" },
          tooltip: "Ir a las hamacas",
          gotoId: 2,
        },
      ],
    },
    {
      id: 2,
      name: "Hamacas",
      imageURL: "/lugares/fragua/images/03.png",
      initialPosition: { yaw: "30deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "150deg", pitch: "-30deg" },
          tooltip: "Regresar a la entrada",
          gotoId: 1,
        },
        {
          id: 2,
          position: { yaw: "70deg", pitch: "-30deg" },
          tooltip: "Ir a la Linea del tiempo",
          gotoId: 3,
        },
      ],
    },
    {
      id: 3,
      name: "Linea del Tiempo",
      imageURL: "/lugares/fragua/images/04.png",
      initialPosition: { yaw: "210deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "30deg", pitch: "-30deg" },
          tooltip: "Regresar a las hamacas",
          gotoId: 2,
        },
        {
          id: 2,
          position: { yaw: "220deg", pitch: "-30deg" },
          tooltip: "Ir al mular",
          gotoId: 4,
        },
      ],
    },
    {
      id: 4,
      name: "Mular",
      imageURL: "/lugares/fragua/images/05.png",
      initialPosition: { yaw: "10deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "130deg", pitch: "-30deg" },
          tooltip: "Regresar a la linea del tiempo",
          gotoId: 3,
        },
        {
          id: 2,
          position: { yaw: "0deg", pitch: "-30deg" },
          tooltip: "Ir a las huellas",
          gotoId: 5,
        },
      ],
    },
    {
      id: 5,
      name: "Huellas",
      imageURL: "/lugares/fragua/images/06.png",
      initialPosition: { yaw: "-80deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "90deg", pitch: "-30deg" },
          tooltip: "Regresar al mular",
          gotoId: 4,
        },
        {
          id: 2,
          position: { yaw: "270deg", pitch: "-30deg" },
          tooltip: "Ir al Ágora del Pensamiento",
          gotoId: 6,
        },
      ],
    },
    {
      id: 6,
      name: "Agora del Pensamiento",
      imageURL: "/lugares/fragua/images/07.png",
      initialPosition: { yaw: "-210deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "0deg", pitch: "-30deg" },
          tooltip: "Regresar al mular",
          gotoId: 5,
        },
        {
          id: 2,
          position: { yaw: "150deg", pitch: "-30deg" },
          tooltip: "Ir al Ágora de la Palabra",
          gotoId: 7,
        },
      ],
    },
    {
      id: 7,
      name: "Ágora de la Palabra",
      imageURL: "/lugares/fragua/images/08.png",
      initialPosition: { yaw: "-60deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "100deg", pitch: "-30deg" },
          tooltip: "Regresar al Ágora del Pensamiento",
          gotoId: 6,
        },
        {
          id: 2,
          position: { yaw: "-70deg", pitch: "-30deg" },
          tooltip: "Ir al kiosco",
          gotoId: 8,
        },
      ],
    },
    {
      id: 8,
      name: "Kiosco",
      imageURL: "/lugares/fragua/images/09.png",
      initialPosition: { yaw: "150deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "0deg", pitch: "-30deg" },
          tooltip: "Regresar al Ágora de la Palabra",
          gotoId: 7,
        },
        {
          id: 2,
          position: { yaw: "150deg", pitch: "-30deg" },
          tooltip: "Ir al camino",
          gotoId: 9,
        },
      ],
    },
    {
      id: 9,
      name: "Camino",
      imageURL: "/lugares/fragua/images/10.png",
      initialPosition: { yaw: "0deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "170deg", pitch: "-30deg" },
          tooltip: "Regresar al kiosco",
          gotoId: 8,
        },
        {
          id: 2,
          position: { yaw: "-10deg", pitch: "-30deg" },
          tooltip: "Ir a la huerta",
          gotoId: 10,
        },
      ],
    },
    {
      id: 10,
      name: "Huerta",
      imageURL: "/lugares/fragua/images/11.png",
      initialPosition: { yaw: "20deg" },
      navigationMarkers: [
        {
          id: 1,
          position: { yaw: "150deg", pitch: "-30deg" },
          tooltip: "Regresar al camino",
          gotoId: 9,
        },
        {
          id: 2,
          position: { yaw: "40deg", pitch: "-30deg" },
          tooltip: "Ir a la entrada",
          gotoId: 1,
        },
      ],
    },
  ];
  return (
    <Stack bgcolor="#111" p={2}>
      <Typography variant="h2" color="#63B0A4">
        Bosque de la Memoria de San José de Fragua
      </Typography>
      <Trajectory360 trajectory={trajectory} initialStep={0} />
    </Stack>
  );
}
