import { Box, Button, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";
import getEnv from "../../../../utils/getEnv";
import { useLocation, useNavigate } from "react-router-dom";

export default function VideoPlayer({ src, title, link }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
  const baseLocation = `/${pathSegments[0] || ""}`; // Toma solo el primer segmento. Para hacerlo mas robusto, deberia tomarlos todos menos el ultimo
  const baseURL = getEnv("client") + baseLocation;
  const navigate = useNavigate();

  return (
    <Stack
      justifyContent="flex-start"
      alignItems="center"
      sx={{ height: "100vh" }}
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={1}
        margin={2}
      >
        <Typography variant="h2">{title}</Typography>
        <Button
          sx={{ position: "absolute", right: 0 }}
          href={sanitizeURL(baseURL, link)}
        >
          Saltar
        </Button>
      </Box>
      <video
        // loop
        // muted
        // playsInline
        controls
        type="video/mp4"
        style={{
          width: "80%",
          //   height: "100%",
        }}
        onEnded={() => navigate("/" + sanitizeURL(baseURL, link))}
      >
        <source src={src} type="video/mp4" preload="auto" autoPlay />
        Your browser does not support the video tag.
      </video>
    </Stack>
  );
}
VideoPlayer.propTypes = {
  src: PropTypes.string,
  title: PropTypes.string,
  link: PropTypes.string,
};

const sanitizeURL = (base, path) => {
  const baseNormalized = base.endsWith("/") ? base.slice(0, -1) : base;
  const pathNormalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseNormalized}${pathNormalized}`;
};
