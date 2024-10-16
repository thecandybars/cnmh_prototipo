import PropTypes from "prop-types";
import useAppStore from "../../../store/useAppStore";
import { useEffect, useState } from "react";
import { Box, Fade, Typography } from "@mui/material";

function useTextAndCameraAnimation({ animationSequence }) {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLastKeyframe, setIsLastKeyframe] = useState(false);
  const isCameraMoving = useAppStore((state) => state.camera.isMoving);

  // SETUP CAMERA ANIMATION
  const setDestination = useAppStore((state) => state.setDestination);

  // RENDER CAMERA ANIMATION
  useEffect(() => {
    if (
      isPlaying &&
      !isCameraMoving &&
      animationIndex < animationSequence.length
    ) {
      setDestination(animationSequence[animationIndex]);
      setAnimationIndex((prev) => prev + 1);
    }
    if (animationIndex >= animationSequence.length) setIsPlaying(false);
  }, [isCameraMoving, isPlaying]);

  // RENDER TEXT ANIMATION
  const [renderAnimationText, setRenderAnimationText] = useState("");
  const [playAnimationText, setPlayAnimationText] = useState(false);
  useEffect(() => {
    const delay =
      animationIndex && animationSequence[animationIndex - 1].delay
        ? animationSequence[animationIndex - 1].delay
        : 0;
    if (animationIndex === animationSequence.length) setIsLastKeyframe(true);

    const delayTextTimeout = window.setTimeout(() => {
      if (animationIndex && animationSequence[animationIndex - 1].textStart) {
        setRenderAnimationText(animationSequence[animationIndex - 1].textStart);
        setPlayAnimationText(true);
      }
    }, delay);

    // if (animationIndex && animationSequence[animationIndex - 1].textStart) {
    //   setTimeout(() => {
    //     setRenderAnimationText(animationSequence[animationIndex - 1].textStart);
    //     setPlayAnimationText(true);
    //   }, delay);
    // }

    const renderTextTimeout = window.setTimeout(
      () => setPlayAnimationText(false),
      animationIndex &&
        Object.keys(animationSequence[animationIndex - 1]).includes(
          "textDuration"
        )
        ? animationSequence[animationIndex - 1].textDuration + delay
        : 3000 + delay
    );
    return () => {
      window.clearTimeout(renderTextTimeout);
      window.clearTimeout(delayTextTimeout);
    };
  }, [animationIndex]);

  const renderAnimatedText = isPlaying && (
    <Box
      sx={{
        position: "absolute",
        top: "50vh",
        margin: "0 auto",
        width: "100vw",
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Fade
        in={playAnimationText}
        timeout={{
          // appear: false,
          enter: 2000,
          exit: 3000,
        }}
      >
        <Typography
          variant="intro"
          sx={{ width: "85%", margin: "0 auto", bgcolor: "#cacaca00", p: 1 }}
          textAlign="center"
        >
          {renderAnimationText}
        </Typography>
      </Fade>
    </Box>
  );
  return [renderAnimatedText, setIsPlaying, isLastKeyframe, setIsLastKeyframe];
}

useTextAndCameraAnimation.propTypes = {
  animationSequence: PropTypes.array,
};

export default useTextAndCameraAnimation;
