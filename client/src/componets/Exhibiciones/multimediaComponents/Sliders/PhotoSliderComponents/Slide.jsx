import PropTypes from "prop-types";
import { SwiperSlide } from "swiper/react";
import SlideCaption from "./SlideCaption";
import { Box, Stack, Typography } from "@mui/material";
import useSelectMediaSource from "../../../../common/customHooks/useSelectMediaSource";

export default function Slide(props) {
  console.log("🚀 ~ Slide ~ props:", props);
  // Get media sources. Slide may have one or two media sources
  const source0 = useSelectMediaSource({
    primary: props.slide.Medios[0].url,
    secondary: props.slide.Medios[0].cid,
  });

  const source1 = useSelectMediaSource({
    primary: props.slide.Medios[1]?.url,
    secondary: props.slide.Medios[1]?.cid,
  });

  let RenderSlide = null;
  if (props.slide.tipoSlide === "Foto")
    RenderSlide = (
      <SwiperSlide
        key={props.slide.id}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SlideCaption data={props.slide} />
        <img
          src={source0}
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </SwiperSlide>
    );
  if (props.slide.tipoSlide === "Video")
    RenderSlide = (
      <SwiperSlide
        key={props.slide.id}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <SlideCaption data={props.slide} />
        <video
          controls
          style={{
            width: "100%",
            height: "600px",
            objectFit: "cover",
            objectPosition: "center",
          }}
        >
          <source src={source0} />
        </video>
      </SwiperSlide>
    );
  if (props.slide.tipoSlide === "Audio")
    RenderSlide = (
      <SwiperSlide
        key={props.slide.id}
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
          <img src={source1} style={{ width: "60%" }} />
          <Stack alignItems="center" justifyContent="center" gap={2}>
            <Typography variant="body" color="primary">
              {props.slide.descripcion}
            </Typography>
            <audio
              controls
              style={{
                width: "100%",
              }}
            >
              <source src={source0} type="audio/mpeg" />
            </audio>
          </Stack>
        </Box>
      </SwiperSlide>
    );

  return RenderSlide;
}

Slide.propTypes = {
  slide: PropTypes.object,
};
