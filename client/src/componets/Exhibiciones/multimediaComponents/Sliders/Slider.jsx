import PropTypes from "prop-types";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import CloseCancelButton from "../../../common/buttons/CloseCancelButton";
import MainSlider from "./PhotoSliderComponents/MainSlider";
import ThumbSlider from "./PhotoSliderComponents/ThumbSlider";

Slider.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func,
};
export default function Slider(props) {
  console.log("🚀 ~ Slider ~ props:", props);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  const renderCloseButton = (
    <CloseCancelButton
      onClick={props.onClose}
      sx={{ position: "absolute", right: 0 }}
    />
  );

  // MAIN SLIDER
  const renderTitle = (
    <Typography variant="h3" color="secondary" sx={{ alignSelf: "start" }}>
      {props.data.titulo}
    </Typography>
  );
  const renderMainSlider = (
    <MainSlider slides={props.data.Slides} thumbsSwiper={thumbsSwiper} />
  );

  const renderDescription = (
    <Typography
      variant="body"
      color="primary"
      sx={{ alignSelf: "start", width: "60%" }}
    >
      {props.data.descripcion}
    </Typography>
  );

  // THUMBNAILS SLIDER
  const renderThumbSlider = (
    <ThumbSlider slides={props.data.Slides} setThumbsSwiper={setThumbsSwiper} />
  );
  return (
    <>
      {renderCloseButton}
      <Box
        sx={{
          display: "flex",
          backgroundColor: "#3e831b",
          backgroundImage: "url('/sliderFondo.png')",
          backgroundSize: "cover",
          backgroundBlendMode: "multiply",
          width: 1,
          height: 1,
          padding: 12,
        }}
      >
        {/* <Box width={1}> */}
        <Stack
          flex={3}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            width: "min-content",
            margin: "0 auto",
          }}
        >
          {renderTitle}
          {renderMainSlider}
          {renderDescription}
        </Stack>
        {/* </Box> */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            p: 4,
            backgroundColor: "#ffffff55",
            borderRadius: "40px",
          }}
        >
          {renderThumbSlider}
        </Box>
      </Box>
    </>
  );
}
