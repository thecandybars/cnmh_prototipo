/* eslint-disable react/prop-types */
import { useState } from "react";
import Image360Viewer from "./Image360Viewer";

const Trajectory360Manager = ({ trajectory, initialViewId }) => {
  const [currentViewId, setCurrentViewId] = useState(initialViewId);
  const [transitioning, setTransitioning] = useState(false);
  const [currentImage, setCurrentImage] = useState("");
  const [nextImage, setNextImage] = useState("");
  const [opacity, setOpacity] = useState(1);

  // Find current view data
  const currentView = trajectory.find((view) => view.id === currentViewId);

  // Prepare hotspots with transition handlers
  const enhancedHotspots =
    currentView?.hotspots?.map((hotspot) => {
      const targetView = trajectory.find(
        (view) => view.id === hotspot.targetId
      );
      return {
        ...hotspot,
        onClick: () => handleTransition(hotspot.targetId, targetView.src),
      };
    }) || [];

  const handleTransition = (targetId, targetImageSrc) => {
    if (transitioning) return;

    setTransitioning(true);
    setNextImage(targetImageSrc);
    console.log(
      "🚀 ~ handleTransition ~ transitioning:",
      transitioning,
      targetImageSrc
    );

    // Start fade out animation
    let start = null;
    const duration = 800; // ms

    const animate = (timestamp) => {
      if (!start) start = timestamp;
      const progress = (timestamp - start) / duration;
      const newOpacity = Math.max(0, 1 - progress);
      setOpacity(newOpacity);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Complete transition
        setCurrentViewId(targetId);
        setCurrentImage(targetImageSrc);
        setOpacity(1);
        setTransitioning(false);
        setNextImage("");
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "500px" }}>
      {transitioning && (
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backgroundColor: "rgba(0,0,0,0.7)",
            color: "white",
          }}
        >
          Loading...
        </div>
      )}

      <Image360Viewer
        imageUrl={currentView.src}
        hotspots={enhancedHotspots}
        opacity={opacity}
        key={currentViewId} // Force re-render on view change
      />

      {transitioning && nextImage && (
        <Image360Viewer
          imageUrl={nextImage}
          hotspots={[]}
          opacity={1 - opacity}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
      )}
    </div>
  );
};

export default Trajectory360Manager;
