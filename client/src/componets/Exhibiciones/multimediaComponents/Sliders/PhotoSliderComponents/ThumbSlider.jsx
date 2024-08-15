import PropTypes from "prop-types";
import { Navigation, Thumbs, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import getEnv from "../../../../../utils/getEnv";
import { Stack } from "@mui/material";

function ThumbSlider(props) {
  const renderThumbs = props.slides.map((slide) => {
    const source =
      slide.tipoSlide === "Foto" ? slide.Medios[0].cid : slide.Medios[1].cid;
    return (
      <SwiperSlide
        key={slide.id}
        style={{
          width: "100%",
          height: "fit-content",
        }}
      >
        <Stack>
          <img
            src={`${getEnv("ipfs")}/${source}`}
            style={{
              display: "block",
              width: "250px",
              height: "120px",
              borderRadius: "16px",
              objectFit: "cover",
              objectPosition: "center",
            }}
          />
          {/* <Typography variant="body" color="secondary">
          Hooa
        </Typography> */}
        </Stack>
      </SwiperSlide>
    );
  });
  return (
    <Swiper
      direction="vertical"
      loop={true}
      style={{
        width: "fit-content",
        height: "100%",
      }}
      onSwiper={props.setThumbsSwiper}
      slidesPerView={5}
      mousewheel={true}
      // navigation
      // Navigation button need style to be fixed
      // https://codesandbox.io/p/devbox/swiper-vertical-forked-jq5yyo?file=%2Findex.html&selection=%5B%7B%22endColumn%22%3A1%2C%22endLineNumber%22%3A63%2C%22startColumn%22%3A1%2C%22startLineNumber%22%3A63%7D%5D
      watchSlidesProgress={true}
      modules={[Thumbs, Navigation, Mousewheel]}
    >
      {renderThumbs}
    </Swiper>
  );
}

ThumbSlider.propTypes = {
  slides: PropTypes.array,
  setThumbsSwiper: PropTypes.func,
};

export default ThumbSlider;
