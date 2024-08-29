import PropTypes from "prop-types";
import { A11y, Navigation, Scrollbar, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Slide from "./Slide";

MainSlider.propTypes = {
  slides: PropTypes.array,
  thumbsSwiper: PropTypes.object,
};

function MainSlider(props) {
  const renderSlides = props.slides.map((slide) => (
    <SwiperSlide key={slide.id}>
      <Slide slide={slide} />
    </SwiperSlide>
  ));

  return (
    <Swiper
      //  warning!!! 1200px is a fixed value!!!
      style={{
        width: "1200px",
        height: "600px",
        margin: 0,
      }}
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
