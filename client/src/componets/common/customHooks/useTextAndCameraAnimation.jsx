import PropTypes from "prop-types";
import useAppStore from "../../../store/useAppStore";
import { useEffect, useState } from "react";
import { Fade, Typography } from "@mui/material";

function useTextAndCameraAnimation({
  animationSequence,
  animate,
  isCameraMoving,
}) {
  const [animationIndex, setAnimationIndex] = useState(0);

  // SETUP CAMERA ANIMATION
  const setDestination = useAppStore((state) => state.setDestination);

  // RENDER CAMERA ANIMATION
  useEffect(() => {
    if (
      animate &&
      !isCameraMoving &&
      animationIndex < animationSequence.length
    ) {
      setDestination(animationSequence[animationIndex]);
      setAnimationIndex((prev) => prev + 1);
    }
  }, [isCameraMoving, animate]);

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
  const renderAnimatedText = animate && (
    <Fade
      in={playAnimationText}
      timeout={{
        appear: 10000,
        enter: 2000,
        exit: 3000,
      }}
    >
      <Typography
        variant="h1"
        sx={{ width: "85%", margin: "0 auto" }}
        textAlign="center"
      >
        {renderAnimationText}
      </Typography>
    </Fade>
  );

  return renderAnimatedText;
}

useTextAndCameraAnimation.propTypes = {
  animationSequence: PropTypes.array,
  animate: PropTypes.bool,
  isMoving: PropTypes.bool,
};

export default useTextAndCameraAnimation;
