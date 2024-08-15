import PropTypes from "prop-types";
import { A11y, Navigation, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import getEnv from "../../../../../utils/getEnv";
import SlideCaption from "./SlideCaption";
import { Box, Stack, Typography } from "@mui/material";

MainSlider.propTypes = {
  slides: PropTypes.array,
  thumbsSwiper: PropTypes.object,
};

function MainSlider(props) {
  console.log("🚀 ~ MainSlider ~ props:", props);
  const renderSlides = props.slides.map((slide) => {
    if (slide.tipoSlide === "Foto")
      return (
        <SwiperSlide
          key={slide.id}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <SlideCaption data={slide} />
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
      );
    if (slide.tipoSlide === "Video")
      return (
        <SwiperSlide
          key={slide.id}
          style={{
            width: "100%",
            height: "100%",
          }}
        >
          <SlideCaption data={slide} />
          <video
            controls
            style={{
              width: "100%",
              height: "600px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          >
            <source src={`${getEnv("ipfs")}/${slide.Medios[0].cid}`} />
          </video>
        </SwiperSlide>
      );
    if (slide.tipoSlide === "Audio")
      return (
        <SwiperSlide
          key={slide.id}
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            sx={{
              backgroundColor: "rgba(255,255,255,0.3)",
              p: 4,
              gap: 2,
              borderRadius: 9,
            }}
          >
            {/* <p>cacca</p> */}
            <img
              src={`${getEnv("ipfs")}/${slide.Medios[1].cid}`}
              style={{ width: "60%" }}
            />
            <Stack alignItems="center" justifyContent="center" gap={2}>
              <Typography variant="body" color="primary">
                {slide.descripcion}
              </Typography>
              <audio
                controls
                style={{
                  width: "100%",
                }}
              >
                <source
                  src={`${getEnv("ipfs")}/${slide.Medios[0].cid}`}
                  type="audio/mpeg"
                />
              </audio>
            </Stack>
          </Box>
        </SwiperSlide>
      );
  });
  return (
    <Swiper
      //  warning!!! 1200px is a fixed value!!!
      style={{ width: "1200px", height: "600px", margin: 0 }}
      direction="horizontal"
      modules={[Navigation, Scrollbar, A11y, Thumbs]}
      thumbs={{
        swiper:
          props.thumbsSwiper && !props.thumbsSwiper.destroyed
            ? props.thumbsSwiper
            : null,
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
  );
}

export default MainSlider;
