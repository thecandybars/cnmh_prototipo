import "@photo-sphere-viewer/markers-plugin/index.css";
import "@photo-sphere-viewer/plan-plugin/index.css";
import { TileLayer } from "leaflet";
// import "@photo-sphere-viewer/compass-plugin/index.css";
import { ReactPhotoSphereViewer } from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
import { PlanPlugin } from "@photo-sphere-viewer/plan-plugin";
// import { CompassPlugin } from "@photo-sphere-viewer/compass-plugin";
import { useState } from "react";
import Dialog from "../common/UI/Dialog";

export default function Espacio() {
  const handleOnClick = (markersPlugs) => console.log(markersPlugs);
  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    markersPlugs.addEventListener("select-marker", () =>
      handleOnClick(markersPlugs)
    );
  };
  const plugins = [
    [
      PlanPlugin,
      {
        defaultZoom: 14,
        coordinates: [6.78677, 45.58241],
        bearing: "120deg",
        size: { width: "300px", height: "200px" },
        layers: [
          {
            name: "OpenStreetMap",
            urlTemplate: "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
            attribution: "&copy; OpenStreetMap",
          },
          {
            name: "OpenTopoMap",
            layer: new TileLayer(
              "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
              {
                subdomains: ["a", "b", "c"],
                maxZoom: 17,
              }
            ),
            attribution: "&copy; OpenTopoMap",
          },
        ],
        // hotspots: [
        //   {
        //     coordinates: [6.7783, 44.58506],
        //     id: "green-lake",
        //     tooltip: "Lac vert",
        //     color: "green",
        //   },
        // ],
      },
    ],
    [
      MarkersPlugin,
      {
        markers: [
          {
            id: 1,
            name: "choco",
            position: { yaw: "18.5deg", pitch: "-5.1deg" },
            imageLayer: "/choco.png", // Adjusted path
            anchor: "bottom center",
            size: { width: 120, height: 120 },
            tooltip: "Tooltip para Choco",
          },
          {
            id: 2,
            name: "cucuta",
            position: { yaw: "100.5deg", pitch: "-10deg" },
            imageLayer: "/cucuta.png", // Adjusted path
            anchor: "bottom center",
            size: { width: 120, height: 120 },
            tooltip: "Tooltip para Cucuta",
          },
        ],
      },
    ],
  ];

  // ZOOM
  const [zoomLevel, setZoomLevel] = useState(50);
  console.log("🚀 ~ Espacio ~ zoomLevel:", zoomLevel);
  const handleZoomChange = (e) => setZoomLevel(e.zoomLevel);

  return (
    <div>
      <ReactPhotoSphereViewer
        src="../../../public/mavicure4k.png"
        height={"100vh"}
        width={"100vw"}
        plugins={plugins}
        onReady={handleReady}
        onZoomChange={(e) => handleZoomChange(e)}
      />
    </div>
  );
}
