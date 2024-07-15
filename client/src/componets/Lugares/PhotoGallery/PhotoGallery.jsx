import PropTypes from "prop-types";
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { v4 as uuidv4 } from "uuid";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Box, Grid, Stack, Typography } from "@mui/material";
// CSS
// import "./PhotoGallery.css";

export default function PhotoGallery(props) {
  const renderSlides = props.images.map((image, ndx) => (
    <SwiperSlide key={uuidv4()}>
      <Box sx={{ position: "absolute", bottom: "80px", marginX: "16px" }}>
        <Box
          px={1}
          sx={{
            display: "flex",
            backgroundColor: "title.transparent.light",
            width: "100%",
            // paddingLeft: "8px",
            // paddingRight: "8px",
          }}
        >
          <Stack p={1} sx={{ margin: "0 auto" }}>
            <Typography variant="h4" color="secondary">
              NEC NAM ALIQUAM
            </Typography>
            <Typography variant="h6" color="primary" sx={{ margin: "0 auto" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Arcu
              felis bibendum ut tristique et egestas quis ipsum suspendisse.
            </Typography>
          </Stack>
        </Box>
      </Box>
      {ndx === 0 ? (
        <video
          src={image}
          controls
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : ndx === 1 ? (
        <audio controls>
          <source src="/casamemoriatumaco/photos/sonic.mp3" type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      ) : ndx === 2 ? (
        <Grid container>
          <Grid item xs={4}>
            <img src="/comuna13.png" />
          </Grid>
          <Grid item xs={4}>
            <img src="/comuna13.png" />
          </Grid>
          <Grid item xs={4}>
            <img src="/comuna13.png" />
          </Grid>
          <Grid item xs={4}>
            <audio controls>
              <source
                src="/casamemoriatumaco/photos/sonic.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>{" "}
          </Grid>
          <Grid item xs={4}>
            <audio controls>
              <source
                src="/casamemoriatumaco/photos/sonic.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>{" "}
          </Grid>
          <Grid item xs={4}>
            <audio controls>
              <source
                src="/casamemoriatumaco/photos/sonic.mp3"
                type="audio/mpeg"
              />
              Your browser does not support the audio element.
            </audio>{" "}
          </Grid>
        </Grid>
      ) : ndx === 3 ? (
        <Swiper>
          {props.images.map((image) => (
            <SwiperSlide key={uuidv4()}>
              <img
                src={image}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <img
          src={image}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
    </SwiperSlide>
  ));
  return (
    <div style={{ marginTop: "0px" }}>
      <div>
        <Swiper
          style={{ margin: "0 auto", width: "1000px", height: "100vh" }}
          direction="vertical"
          // install Swiper modules
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          //   scrollbar={{ draggable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
          loop={true}
        >
          {renderSlides}
        </Swiper>
      </div>
    </div>
  );
}

PhotoGallery.propTypes = {
  images: PropTypes.array,
};
