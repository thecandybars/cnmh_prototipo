import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { theme } from "../../../utils/theme";

InfoLugar.propTypes = {
  selectedMarker: PropTypes.object,
  handleClosePopup: PropTypes.func,
  handleOpenDialogLugar: PropTypes.func,
};

const tipologiasLugares = [
  {
    id: 0,
    image: "markerMuseoMemoria",
    title: "Museo de Memoria",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit eleifend mi, semper ac molestie natoque neque parturient vel vitae.",
  },
  {
    id: 1,
    image: "markerEspaciosSanar",
    title: "Espacio para sanar",
    description:
      "Mauris diam molestie cras litora elementum conubia eleifend posuere rhoncus scelerisque etiam blandit montes ultricies semper, turpis aliquet auctor sagittis fringilla magnis nisi vivamus feugiat odio sociis eu class augue.",
  },
  {
    id: 2,
    image: "markerLugarHorror",
    title: "Lugar del horror",
    description:
      "Torquent feugiat vitae vehicula penatibus metus vivamus pretium, sollicitudin fermentum bibendum laoreet natoque tincidunt mollis nisi, taciti lacus congue ornare iaculis vulputate.",
  },
  {
    id: 3,
    image: "markerLugarMemoria",
    title: "Lugar de Memoria",
    description:
      "Blandit commodo aliquam vulputate fusce duis ultrices, eros feugiat porta arcu luctus interdum, inceptos tempor mi vel neque",
  },
];

export default function InfoLugar(props) {
  return (
    <Stack
      spacing={0}
      sx={{
        backgroundColor: theme.palette.secondary.transparent.main,
        padding: 2,
        borderRadius: "30px",
        width: "300px",
      }}
    >
      <Box display="flex" alignItems="center" gap={1}>
        <img
          alt=""
          src={`${
            tipologiasLugares[
              Math.floor(Math.abs(props.selectedMarker.latitud * 100)) % 4
            ].image
          }.png`}
          width="80px"
        />
        <Stack spacing={1}>
          <Typography
            variant="h4"
            color={theme.palette.title.main}
            align="right"
            onClick={props.handleOpenDialogLugar}
            sx={{
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            VISITAR &#9656;
          </Typography>

          <Stack spacing={0}>
            <Typography variant="captionStrong" color="primary" align="left">
              {`REGIÓN ${props.selectedMarker.Municipio.Departamento.Region.fullName.toUpperCase()} - ${
                props.selectedMarker.Municipio.nombre
              }`}
            </Typography>
            <Typography variant="caption" color="primary" align="left">
              {props.selectedMarker.nombre.toUpperCase()}
            </Typography>
            <Typography variant="caption" color="primary" align="left">
              {props.selectedMarker.TipologiasLugare.nombre}
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Typography variant="body" color="primary" align="left">
        {props.selectedMarker.descripcion}
      </Typography>
    </Stack>
  );
}
