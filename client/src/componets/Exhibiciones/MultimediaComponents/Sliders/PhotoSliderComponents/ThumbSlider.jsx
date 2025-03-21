import PropTypes from "prop-types";
import { Navigation, Thumbs, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Thumb from "./Thumb";

function ThumbSlider(props) {
  const renderThumbs = props.slides.map((slide) => {
    return (
      <SwiperSlide key={slide.id}>
        <Thumb slide={slide} />
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
