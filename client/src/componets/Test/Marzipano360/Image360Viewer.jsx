import React, { useEffect, useRef } from "react";
import Marzipano from "marzipano";

const Image360Viewer = ({ imageUrl }) => {
  const viewerRef = useRef(null);

  useEffect(() => {
    if (!imageUrl) return;

    // Initialize viewer
    const viewer = new Marzipano.Viewer(viewerRef.current);

    // Create source
    const source = Marzipano.ImageUrlSource.fromString(imageUrl);

    // Create geometry
    const geometry = new Marzipano.EquirectGeometry([{ width: 4000 }]);

    // Create view
    const view = new Marzipano.RectilinearView(
      { yaw: Math.PI, pitch: 0, roll: 0, fov: Math.PI / 2 },
      Marzipano.RectilinearView.limit.traditional(1024, (100 * Math.PI) / 180)
    );

    // Create scene
    const scene = viewer.createScene({
      source: source,
      geometry: geometry,
      view: view,
      pinFirstLevel: true,
    });

    // Add hotspot
    addHotspot(scene, {
      yaw: 0.5, // Position in radians (0.5 ≈ 28.6 degrees)
      pitch: 0.2, // Position in radians
      onClick: () => {
        console.log("Hotspot clicked!");
        alert("You clicked the hotspot!");
        // Add your custom action here
      },
    });

    // Display scene
    scene.switchTo();

    return () => {
      viewer.destroy();
    };
  }, [imageUrl]);

  // Function to add a hotspot
  const addHotspot = (scene, { yaw, pitch, onClick }) => {
    // Create hotspot element
    const hotspotElement = document.createElement("div");
    hotspotElement.className = "hotspot";
    hotspotElement.innerHTML = "🔘"; // You can use any HTML or icon here
    hotspotElement.style.cursor = "pointer";

    // Hotspot position
    const position = { yaw, pitch };

    // Create hotspot
    const hotspot = new Marzipano.Hotspot(hotspotElement, position, {
      perspective: { radius: 1000, extraTransforms: "rotateY(-90deg)" },
    });

    // Add click handler
    hotspotElement.addEventListener("click", onClick);

    // Add hotspot to scene
    scene.hotspotContainer().createHotspot(hotspot);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        ref={viewerRef}
        style={{
          width: "100%",
          height: "400px",
          backgroundColor: "#000",
        }}
      />
      <style>
        {`
          .hotspot {
            width: 30px;
            height: 30px;
            font-size: 20px;
            text-align: center;
            color: white;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
          }
          .hotspot:hover {
            transform: scale(1.2);
            background: rgba(255,255,255,0.5);
          }
        `}
      </style>
    </div>
  );
};

export default Image360Viewer;
