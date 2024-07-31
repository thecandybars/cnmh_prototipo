import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PropTypes from "prop-types";
import getEnv from "../../../../utils/getEnv";
import PhotoSlideData from "./PhotoSliderComponents/PhotoSlideData";
import { Box, Stack, Typography } from "@mui/material";
import { useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

PhotoSlider.propTypes = {
  data: PropTypes.object,
};
export default function PhotoSlider(props) {
  console.log("🚀 ~ PhotoSlider ~ props:", props);

  const renderSlides = props.data.Slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <PhotoSlideData data={slide} />
      <img
        src={`${getEnv("ipfs")}/${slide.Medios[0].cid}`}
        style={{
          width: "100%",
          height: "600px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </SwiperSlide>
  ));

  const renderThumbs = props.data.Slides.map((slide) => (
    <SwiperSlide
      key={slide.id}
      style={{
        width: "100%",
        height: "fit-content",
        // border: "1px solid red",
      }}
    >
      <img
        src={`${getEnv("ipfs")}/${slide.Medios[0].cid}`}
        style={{
          // margin: "30px",
          display: "block",
          width: "250px",
          height: "200px",
          objectFit: "cover",
          objectPosition: "center",
          // marginBottom: "300px",
          // border: "1px solid yellow",
        }}
      />
    </SwiperSlide>
  ));

  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "#3e831b",
        backgroundImage: "url('/sliderFondo.jpg')",
        backgroundSize: "cover",
        backgroundBlendMode: "multiply",
        width: "100%",
        height: "100%",
        padding: "100px",
      }}
    >
      <Box
        sx={{
          // border: "1px solid yellow",
          width: "100%",
        }}
      >
        <Stack
          flex={3}
          gap={1}
          sx={{
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            width: "min-content",
            margin: "0 auto",
            // border: "1px solid red",
          }}
        >
          <Typography
            variant="h3"
            color="secondary"
            sx={{ alignSelf: "start" }}
          >
            {props.data.titulo}
          </Typography>
          <Swiper
            //  warning!!! 1200px is a fixed value!!!
            style={{ width: "1200px", height: "600px", margin: 0 }}
            direction="horizontal"
            modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            spaceBetween={50}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            //   scrollbar={{ draggable: true }}
            //   onSwiper={(swiper) => console.log(swiper)}
            //   onSlideChange={() => console.log("slide change")}
            loop={true}
          >
            {renderSlides}
          </Swiper>
          <Typography
            variant="body"
            color="primary"
            sx={{ alignSelf: "start", width: "60%" }}
          >
            {props.data.descripcion}
          </Typography>
        </Stack>
      </Box>
      <Box
        // flex={1}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          backgroundColor: "#ffffff55",
          borderRadius: "40px",
        }}
      >
        <Swiper
          direction="vertical"
          loop={true}
          style={{
            width: "fit-content",
            height: "100%",
            // border: "1px solid blue",
          }}
          onSwiper={setThumbsSwiper}
          // spaceBetween={200}
          slidesPerView={5}
          // freeMode={true}
          navigation
          watchSlidesProgress={true}
          modules={[Thumbs, Navigation]}
          // className="mySwiper"
        >
          {renderThumbs}
        </Swiper>
      </Box>
    </Box>
  );
}
