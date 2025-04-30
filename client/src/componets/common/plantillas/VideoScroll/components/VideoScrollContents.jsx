/* eslint-disable react/prop-types */
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { Box, Stack, Typography } from "@mui/material";

export default function VideoScrollContents({ content }) {
  const renderVideo = content.type === "video" && (
    <Stack gap={1} color="grey" width="300px">
      <video src={content.src} controls height="200px" />
      <Typography variant="h4">{content.title || null}</Typography>
      <Typography variant="body1">{content.description || null}</Typography>
    </Stack>
  );
  const renderPhoto = content.type === "photo" && (
    <Stack gap={1} color="grey" width="300px">
      {/* <img alt="photo" src={content.src} height="200px" /> */}
      <PhotoCarousel src={content.src} images={content.images} />
      <Typography variant="h4">{content.title || null}</Typography>
      <Typography variant="body1">{content.description || null}</Typography>
    </Stack>
  );
  return (
    <Box flex={1} display="flex" justifyContent="center" alignItems="center">
      {renderVideo}
      {renderPhoto}
    </Box>
  );
}

export function PhotoCarousel({ src, images = [] }) {
  return (
    <Swiper
      navigation={true}
      modules={[Navigation]}
      spaceBetween={10}
      slidesPerView={1}
      loop
    >
      {images.map((image, index) => (
        <SwiperSlide key={index}>
          <img
            src={`${src}/${image}`}
            alt={`Slide ${index + 1}`}
            style={{ width: "auto", height: "200px" }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
