import { Box } from "@mui/material";
import logo from "/cnmhLogo.svg";

export default function FooterLogoCNMH() {
  return (
    <Box
      sx={{
        position: "absolute",
        width: "250px",
        padding: "8px 16px",
        bottom: 0,
        left: 0,
        zIndex: 10,
        bgcolor: "primary.main",
      }}
    >
      <img src={logo} />
    </Box>
  );
}
