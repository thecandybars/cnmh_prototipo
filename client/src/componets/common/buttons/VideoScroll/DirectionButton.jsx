import { Link, useLocation } from "react-router-dom";
import getEnv from "../../../../utils/getEnv";
import PropTypes from "prop-types";
import { Button, Typography } from "@mui/material";
import ArrowIcon from "@mui/icons-material/KeyboardArrowUp";

export default function DirectionButton({ link }) {
  const location = useLocation();
  const baseLocation = location.pathname.slice(
    0,
    location.pathname.lastIndexOf("/")
  );
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
    <div
      style={{
        color: "red",
        padding: "10px",
      }}
    >
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
        to={`${baseURL}${link.href}`}
      >
        <ArrowIcon sx={{ ...styles.icon }} />
        {/* <Link to={`${baseURL}${link.href}`}> */}
        <Typography variant="h5" color="black">
          {link.title}
        </Typography>
        {/* </Link> */}
      </Button>
    </div>
  );
}

DirectionButton.propTypes = {
  link: PropTypes.shape({
    title: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
    direction: PropTypes.oneOf(["forward", "left", "right"]).isRequired,
  }).isRequired,
};
