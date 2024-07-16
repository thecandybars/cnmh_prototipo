import { Box } from "@mui/material";
import logo from "/curvaLogo.svg";

export default function FooterLogoCNMH() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "30%",
        bottom: -5,
        right: 0,
        zIndex: 10,
      }}
    >
      <img src={logo} />
    </Box>
  );
}
