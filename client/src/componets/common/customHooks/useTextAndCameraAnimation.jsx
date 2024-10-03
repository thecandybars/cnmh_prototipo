import PropTypes from "prop-types";
import useAppStore from "../../../store/useAppStore";
import { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";

function useTextAndCameraAnimation({ animationSequence }) {
  const [animationIndex, setAnimationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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
    if (animationIndex && animationSequence[animationIndex - 1].textStart) {
      setRenderAnimationText(animationSequence[animationIndex - 1].textStart);
      setPlayAnimationText(true);
    }
    const renderTextTimeout = window.setTimeout(
      () => setPlayAnimationText(false),
      animationIndex &&
        Object.keys(animationSequence[animationIndex - 1]).includes(
          "textDuration"
        )
        ? animationSequence[animationIndex - 1].textDuration
        : 3000
    );
    return () => window.clearTimeout(renderTextTimeout);
  }, [animationIndex]);
  const renderAnimatedText = isPlaying && (
    <Fade
      in={playAnimationText}
      timeout={{
        appear: 10000,
        enter: 2000,
        exit: 3000,
      }}
    >
      <Typography
        variant="intro"
        sx={{ width: "85%", margin: "0 auto" }}
        textAlign="center"
      >
        {renderAnimationText}
      </Typography>
    </Fade>
  );
  return [renderAnimatedText, setIsPlaying];
}

useTextAndCameraAnimation.propTypes = {
  animationSequence: PropTypes.array,
};

export default useTextAndCameraAnimation;
