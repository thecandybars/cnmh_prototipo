import { useEffect, useState } from "react";

export default function useViewport() {
  const [viewportHeightInPixels, setViewportHeightInPixels] = useState(
    window.innerHeight
  );
  const [viewportWidthInPixels, setViewportWidthInPixels] = useState(
    window.innerWidth
  );
  const handleResize = () => {
    // console.log("RESIZING:::::::::::::::::::");
    setViewportHeightInPixels(window.innerHeight);
    setViewportWidthInPixels(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return {
    vw: viewportWidthInPixels,
    vh: viewportHeightInPixels,
  };
}
