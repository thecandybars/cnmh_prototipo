// import PanolensViewer from "./PanolensViewer";
import {
  ReactPhotoSphereViewer,
  GyroscopePlugin,
  // LensflarePlugin,
} from "react-photo-sphere-viewer";
import { MarkersPlugin } from "@photo-sphere-viewer/markers-plugin";
// import { LensflarePlugin} from "@photo-sphere-viewer/";
import "@photo-sphere-viewer/markers-plugin/index.css";
import { useRef, useState } from "react";
// import PanolensViewer from "./PanolensViewer";
// import PhotoSphereViewer from "./PhotoSphereViewer";

export default function Espacio() {
  const photoSphereRef = useRef();
  const handleOnClick = (markersPlugs) => console.log(markersPlugs);
  const handleReady = (instance) => {
    const markersPlugs = instance.getPlugin(MarkersPlugin);
    if (!markersPlugs) return;
    markersPlugs.addEventListener("select-marker", () =>
      handleOnClick(markersPlugs)
    );
  };
  const plugins = [
    // [
    //   LensflarePlugin,
    //   {
    //     position: { pitch: 0, yaw: 0 },
    //     src: "lensflare.png",
    //     width: 1000,
    //     height: 1000,
    //   },
    // ],
    // [CompassPlugin, {
    //   hotspots: [
    //     { longitude: '0deg' },
    //     { longitude: '90deg' },
    //     { longitude: '180deg' },
    //     { longitude: '270deg' },
    //   ],
    // }],
    [
      MarkersPlugin,
      {
        markers: [
          {
            // image marker rendered in the 3D scene
            id: 1,
            name: "choco",
            position: { yaw: "18.5deg", pitch: "-5.1deg" },
            image: "../../../public/choco.png",
            anchor: "bottom center",
            size: { width: 120, height: 120 },
            tooltip: "Image embedded in the scene",
          },
          {
            // image marker rendered in the 3D scene
            id: 2,
            name: "cucuta",
            position: { yaw: "148.5deg", pitch: "-10deg" },
            image: "../../../public/cucuta.png",
            anchor: "bottom center",
            size: { width: 120, height: 120 },
            tooltip: "Image embedded in the scene",
          },

          // {
          //   id: "polygon",
          //   polygonPx: [
          //     2941, 1413, 3042, 1402, 3222, 1419, 3433, 1463, 3480, 1505, 3438,
          //     1538, 3241, 1543, 3041, 1555, 2854, 1559, 2739, 1516, 2775, 1469,
          //     2941, 1413,
          //   ],
          //   svgStyle: {
          //     fill: "rgba(255,0,0,0.2)",
          //     stroke: "rgba(255, 0, 50, 0.8)",
          //     strokeWidth: "2px",
          //   },
          //   data: { compass: "rgba(255, 0, 50, 0.8)" },
          // },
          // {
          //   id: "polyline",
          //   polylinePx: [
          //     2478, 1635, 2184, 1747, 1674, 1953, 1166, 1852, 709, 1669, 301,
          //     1519, 94, 1399, 34, 1356,
          //   ],
          //   svgStyle: {
          //     stroke: "rgba(80, 150, 50, 0.8)",
          //     strokeLinecap: "round",
          //     strokeLinejoin: "round",
          //     strokeWidth: "20px",
          //   },
          //   data: { compass: "rgba(80, 150, 50, 0.8)" },
          // },
        ],
      },
    ],
  ];

  // ZOOM
  const [zoomLevel, setZoomLevel] = useState(50);
  // console.log("🚀 ~ Espacio ~ zoomLevel:", zoomLevel);
  const handleZoomChange = (e) => setZoomLevel(e.zoomLevel);

  const handleClick = () => {
    const gyro = photoSphereRef.current.getPlugin(GyroscopePlugin);
    console.log(gyro);
  };

  return (
    <div>
      {/* <h2>Espacio de memoria</h2>
      <img
        alt=""
        src="https://ipfs.io/ipfs/QmVdxofjyuXcyeyHUCin7vEnJGk1YC6GKHKPgoAuGAs952"
      /> */}
      {/* <PanolensViewer /> */}
      <ReactPhotoSphereViewer
        src="../../../public/mavicure2k.png"
        height={"100vh"}
        width={"100vw"}
        plugins={plugins}
        onClick={handleClick}
        onReady={handleReady}
        onZoomChange={(e) => handleZoomChange(e)}
      />
      {/* <PhotoSphereViewer /> */}
    </div>
  );
}
