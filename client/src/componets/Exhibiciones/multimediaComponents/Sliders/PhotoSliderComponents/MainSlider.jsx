import PropTypes from "prop-types";
import {
  A11y,
  Navigation,
  Pagination,
  Scrollbar,
  Thumbs,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import PhotoSlideData from "./PhotoSlideData";
import getEnv from "../../../../../utils/getEnv";

function MainSlider(props) {
  const renderSlides = props.slides.map((slide) => (
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
  return (
    <Swiper
      //  warning!!! 1200px is a fixed value!!!
      style={{ width: "1200px", height: "600px", margin: 0 }}
      direction="horizontal"
      modules={[Navigation, Pagination, Scrollbar, A11y, Thumbs]}
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

MainSlider.propTypes = {
  slides: PropTypes.array,
  thumbsSwiper: PropTypes.object,
};

export default MainSlider;
