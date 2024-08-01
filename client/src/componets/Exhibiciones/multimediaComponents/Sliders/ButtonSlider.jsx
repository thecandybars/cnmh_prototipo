import { Box, Button, Stack, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import getEnv from "../../../../utils/getEnv";
import { PhotoIconOutlined } from "../../../common/icons";
import { VideoIconOutlined } from "../../../common/icons";
import { AudioIconOutlined } from "../../../common/icons";
import { DocumentIconOutlined } from "../../../common/icons";

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
  height: "auto",
}));
export default function ButtonSlider(props) {
  console.log("🚀 ~ ButtonSlider ~ props:", props);
  const Icon =
    props.slider.tipoSlider === "Foto"
      ? PhotoIconOutlined
      : props.slider.tipoSlider === "Video"
      ? VideoIconOutlined
      : props.slider.tipoSlider === "Audio"
      ? AudioIconOutlined
      : props.slider.tipoSlider === "Documento"
      ? DocumentIconOutlined
      : null;
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
            // imageURL={
            //   props.slider.Slides[0]?.Medios[0]
            //     ? `url('${getEnv("ipfs")}/${
            //         props.slider.Slides[0].Medios[0].cid
            //       }')`
            //     : null
            // }
          >
            <Icon color="secondary" sx={{ fontSize: "7rem", m: 1 }} />
          </StyledButtonImage>
        </Box>
      </Stack>
    </Button>
  );
}
