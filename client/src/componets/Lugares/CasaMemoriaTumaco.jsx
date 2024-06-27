import { Box, Stack, Typography } from "@mui/material";
import PhotoGallery from "./PhotoGallery/PhotoGallery";

export default function CasaMemoriaTumaco() {
  const images = [
    "/casamemoriatumaco/photos/00.mp4",
    "/casamemoriatumaco/photos/01.jpg",
    "/casamemoriatumaco/photos/02.jpg",
    "/casamemoriatumaco/photos/03.jpg",
    "/casamemoriatumaco/photos/04.jpg",
    "/casamemoriatumaco/photos/05.jpg",
    "/casamemoriatumaco/photos/06.jpg",
    "/casamemoriatumaco/photos/07.jpg",
    "/casamemoriatumaco/photos/08.jpg",
    "/casamemoriatumaco/photos/09.jpg",
    "/casamemoriatumaco/photos/10.jpg",
    "/casamemoriatumaco/photos/11.jpeg",
    "/casamemoriatumaco/photos/12.jpeg",
    "/casamemoriatumaco/photos/13.jpeg",
    "/casamemoriatumaco/photos/14.jpeg",
    "/casamemoriatumaco/photos/15.jpeg",
    "/casamemoriatumaco/photos/16.jpeg",
    "/casamemoriatumaco/photos/17.jpeg",
    "/casamemoriatumaco/photos/18.jpeg",
    "/casamemoriatumaco/photos/19.jpeg",
  ];

  return (
    <Box width="100vw" height="100vh" sx={{ display: "flex" }}>
      <Box display="flex" flex={2}>
        <PhotoGallery images={images} />
      </Box>
      <Stack
        display="flex"
        flex={1}
        sx={{
          backgroundImage: "url('/fondo_plantas.png')",
          backgroundSize: "cover",
        }}
      >
        <Box margin="0 auto">
          <img alt="Logo lugar" src="/casamemoriatumaco/logo.jpg" />
        </Box>
        <Stack p={3} spacing={1} sx={{ overflow: "scroll", height: "100%" }}>
          <Typography color="secondary" variant="h3">
            PROYECTO - CASA DE LA MEMORIA DE LA COSTA PACIFICA NARIÑENSE
          </Typography>
          <Typography color="primary" variant="body">
            La Casa de Memoria de la Costa Pacífica Nariñense, ubicado en el
            casco urbano del municipio de Tumaco. es una iniciativa comunitaria
            impulsada por la Diócesis de Tumaco que aborda, a través de
            estrategias museográficas y pedagógicas, la problemática del
            conflicto armado, la construcción de una cultura de paz y el
            reconocimiento de las víctimas en Colombia.
          </Typography>
          <Typography color="primary" variant="body">
            Además del museo, el cual está inscrito en el Sistema de Información
            de Museos Colombianos (SIMCO), desarrollamos varias iniciativas
            pedagógicas con docentes, víctimas, jóvenes, niñas y niños. Tiene
            como misión educar para la Paz y la transformación social rescatado
            también las tradiciones culturales que han sido y representan las
            fortalezas de la comunidad y su resiliencia durante los años del
            conflicto armado.
          </Typography>
          <Typography color="primary" variant="body">
            A través de actos simbólicos y celebraciones esta iniciativa ha
            contribuido al reconocimiento de la memoria de los líderes
            asesinados en esta región. Finalmente, los ejercicios de memoria que
            se apoyan y fortalecen mediante la Casa de la Memoria han
            contribuido también a reconocer nuestra responsabilidad sobre lo que
            sucedió en pro de la reconciliación.
          </Typography>
          <Typography color="primary" variant="body">
            Durante los diez años de funcionamiento ha recibido varios premios
            por su labor, entre ellos el Premio Franco-alemán de Derechos
            Humanos Antonio Nariño y el premio del Centro Nacional de Memoria
            Histórica (CNMH) como mejor exposición museográfica de memoria del
            conflicto armado.
          </Typography>
        </Stack>
        <Box
          width="100%"
          bgcolor="yellowCNMH"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <img alt="footer CNMH" src="/footer-cnmh-logo-yellow.png" />
        </Box>
      </Stack>
    </Box>
  );
}
