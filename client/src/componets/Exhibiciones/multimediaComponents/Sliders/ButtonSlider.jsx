import { Box, Button, Stack, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import getEnv from "../../../../utils/getEnv";

ButtonSlider.propTypes = {
  slider: PropTypes.object,
  onClick: PropTypes.func,
};
const StyledButtonImage = styled(Box)(({ imageURL }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "20%",
  backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  backgroundPosition: "center",
  backgroundImage: imageURL,
  width: "220px",
  height: "130px",
}));
export default function ButtonSlider(props) {
  return (
    <Button onClick={props.onClick}>
      <Stack p={2} alignItems="center">
        <Typography variant="h3" color="secondary">
          {props.slider.titulo}
        </Typography>
        <Box
          sx={{
            borderRadius: "10%",
            backgroundColor: "rgba(200,200,200,0.5)",
            p: 1,
          }}
        >
          <StyledButtonImage
            imageURL={
              props.slider.portadaCID
                ? `url('${getEnv("ipfs")}/${props.slider.portadaCID}')`
                : null
            }
          ></StyledButtonImage>
        </Box>
      </Stack>
    </Button>
  );
}
