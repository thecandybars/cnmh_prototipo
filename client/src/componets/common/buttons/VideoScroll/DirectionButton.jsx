import { Link, useLocation } from "react-router-dom";
import getEnv from "../../../../utils/getEnv";
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import ArrowIcon from "@mui/icons-material/KeyboardArrowUp";

export default function DirectionButton({ link, onClick }) {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean); // Remove empty segments
  const baseLocation = `/${pathSegments[0] || ""}`; // Toma solo el primer segmento. Para hacerlo mas robusto, deberia tomarlos todos menos el ultimo
  const baseURL = getEnv("client") + baseLocation;

  const styles = {
    button:
      link.direction === "forward"
        ? {
            flexDirection: "column",
          }
        : link.direction === "left"
        ? {
            flexDirection: "row",
          }
        : {
            flexDirection: "row-reverse",
          },
    icon:
      link.direction === "forward"
        ? {
            rotate: "0deg",
          }
        : link.direction === "left"
        ? {
            rotate: "-90deg",
          }
        : {
            rotate: "90deg",
          },
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      display="flex"
      gap={1}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.8,
        ...styles.button,
      }}
      component={Link}
      to={sanitizeURL(baseURL, link.href)}
      // onClick={onClick}
    >
      <ArrowIcon sx={{ ...styles.icon }} />
      <Typography variant="h5" color="black">
        {link.title}
      </Typography>
    </Button>
  );
}

DirectionButton.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["forward", "left", "right"]).isRequired,
  }).isRequired,
};

const sanitizeURL = (base, path) => {
  const baseNormalized = base.endsWith("/") ? base.slice(0, -1) : base;
  const pathNormalized = path.startsWith("/") ? path : `/${path}`;
  return `${baseNormalized}${pathNormalized}`;
};
