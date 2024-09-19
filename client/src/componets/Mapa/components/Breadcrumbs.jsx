import { Box } from "@mui/material";
import ViewsBreadcrumbs from "./ViewsBreadcrumbs";
import { theme } from "../../../utils/theme";

function Breadcrumbs() {
  return (
    <Box
      spacing={1}
      sx={{
        position: "absolute",
        top: "47px",
        zIndex: 100,
        left: 0,
      }}
    >
      <Box
        sx={{
          padding: 1,
          px: 3,
          borderRadius: "0 30px 30px 0",
          cursor: "pointer",
          backgroundColor: theme.palette.title.main,
        }}
      >
        <ViewsBreadcrumbs />
      </Box>
    </Box>
  );
}

export default Breadcrumbs;
