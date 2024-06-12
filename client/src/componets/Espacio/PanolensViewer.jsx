// src/components/PanolensViewer.js
import { useEffect, useRef } from "react";
// import * as THREE from "three";
import { Panorama, Viewer } from "panolens";

const PanolensViewer = () => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (viewerRef.current) {
      const panorama = new Panorama("../../../public/360.jpeg");
      const viewer = new Viewer({ container: viewerRef.current });
      viewer.add(panorama);

      // Clean up on unmount
      //   return () => {
      //     viewer.dispose();
      //   };
    }
  }, [viewerRef]);

  return (
    <div
      ref={viewerRef}
      style={{
        width: "100%",
        height: "500px", // Adjust as needed
      }}
    />
  );
};

export default PanolensViewer;
