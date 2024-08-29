import { Stack } from "@mui/material";
import PropTypes from "prop-types";
import useSelectMediaSource from "../../../../common/customHooks/useSelectMediaSource";

export default function Thumb(props) {
  console.log("🚀 ~ Thumb ~ props:", props);
  // Get media sources. Slide may have one or two media sources
  const source = useSelectMediaSource({
    primary:
      props.slide.tipoSlide === "Foto"
        ? props.slide.Medios[0].url
        : props.slide.Medios[1].url,
    secondary:
      props.slide.tipoSlide === "Foto"
        ? props.slide.Medios[0].cid
        : props.slide.Medios[1].cid,
  });
  return (
    <Stack
      style={{
        width: "100%",
        height: "fit-content",
      }}
    >
      <img
        src={source}
        style={{
          display: "block",
          width: "250px",
          height: "120px",
          borderRadius: "16px",
          objectFit: "cover",
          objectPosition: "center",
        }}
      />
    </Stack>
  );
}

Thumb.propTypes = { slide: PropTypes.object };
