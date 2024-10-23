import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluz.glb";
import { theme } from "../../utils/theme";
import { Box, Dialog } from "@mui/material";

export default function Test() {
  //LOCAL
  const [dialogOpen, setDialogOpen] = useState(false);

  const canvasRef = useRef();
  const markerRef = useRef(); // For the marker div
  const [markerPosition, setMarkerPosition] = useState({ top: 0, left: 0 });
  const prevMarkerPosition = useRef(markerPosition); // Track previous marker position to avoid unnecessary updates

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene
    const scene = new THREE.Scene();

    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      MuralBocachico,
      (gltf) => {
        console.log("🚀 ~ useEffect ~ gltf:", gltf);
        gltf.scene.position.set(0, 0, 0);
        // Rotate the model 90 degrees on the Y-axis (in radians)
        gltf.scene.rotation.y = Math.PI / 2;
        scene.add(gltf.scene);

        // Access the first child of the loaded scene
        const firstChild = gltf.scene.children[0];

        if (firstChild) {
          // Function to update marker position
          const updateMarkerPosition = () => {
            // Project 3D position to 2D screen space
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(firstChild.matrixWorld);
            vector.project(camera);
            // console.log("🚀 ~ updateMarkerPosition ~ vector:", vector);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

            // Update marker position (CSS top and left)
            // Only update marker position if it has changed
            if (
              prevMarkerPosition.current.top !== y ||
              prevMarkerPosition.current.left !== x
            ) {
              prevMarkerPosition.current = { top: y, left: x }; // Update previous position
              setMarkerPosition({ top: y, left: x });
            }
          };

          // Update marker position initially and on render
          updateMarkerPosition();

          // Render Loop
          const renderScene = () => {
            requestAnimationFrame(renderScene);
            controls.update();
            renderer.render(scene, camera);
            updateMarkerPosition(); // Update the marker position on each render
          };

          renderScene();
        }
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // Orbit Controls (for pan, zoom, rotate)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera motion
    controls.dampingFactor = 1; //0.05;
    controls.screenSpacePanning = true; // Orbit or panning

    // Light
    const light = new THREE.AmbientLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      renderer.dispose();
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log("RENDERING:::");

  return (
    <div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box width="400px" height="400px">
          ESC para salir
        </Box>
      </Dialog>
      <canvas ref={canvasRef} />
      <div
        ref={markerRef}
        style={{
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          top: `${markerPosition.top}px`,
          left: `${markerPosition.left}px`,
          transform: "translate(-50%, -50%)", // Center the div over the marker
          backgroundColor: theme.palette.secondary.main,
          color: "white",
          padding: "20px",
          width: "70px",
          height: "70px",
          borderRadius: "50%",
          cursor: "pointer",
          // pointerEvents: "none", // So it doesn’t block mouse events to the 3D scene
        }}
        onClick={() => setDialogOpen(true)}
      >
        <p>Marker</p>
      </div>
    </div>
  );
}
