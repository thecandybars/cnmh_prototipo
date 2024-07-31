import { Box, Stack, Typography } from "@mui/material";
import PropTypes from "prop-types";

PhotoSlideData.propTypes = {
  data: PropTypes.object,
};
export default function PhotoSlideData(props) {
  return (
    <Box sx={{ position: "absolute", bottom: "80px", marginX: "16px" }}>
      <Box
        px={1}
        sx={{
          display: "flex",
          backgroundColor: "title.transparent.light",
          width: "100%",
          // paddingLeft: "8px",
          // paddingRight: "8px",
        }}
      >
        <Stack p={1} sx={{ margin: "0 auto" }}>
          <Typography variant="h4" color="secondary">
            {props.data.titulo}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ margin: "0 auto" }}>
            {props.data.descripcion}
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
