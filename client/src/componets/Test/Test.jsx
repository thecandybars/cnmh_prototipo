import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluzPuntos.glb";
// import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluz.glb";
import { Box, Dialog } from "@mui/material";
import MarkersFrom3dModel from "./MarkersFrom3dModel";

export default function Test() {
  //LOCAL
  const [dialogOpen, setDialogOpen] = useState(false);
  const canvasRef = useRef();
  const modelRef = useRef();
  const cameraRef = useRef();
  const [markers, setMarkers] = useState(null);
  const [cameraPosition, setCameraPosition] = useState(null);

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
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // GLTF Loader
    const loader = new GLTFLoader();
    loader.load(
      MuralBocachico,
      (gltf) => {
        console.log("🚀 ~ useEffect ~ gltf:", gltf);
        modelRef.current = gltf;
        gltf.scene.position.set(0, 0, 0);
        gltf.scene.rotation.y = Math.PI / 2;

        scene.add(gltf.scene);

        // Render Loop
        const renderScene = () => {
          requestAnimationFrame(renderScene);
          controls.update();
          renderer.render(scene, camera);
          if (camera.position.x !== cameraPosition) {
            setCameraPosition(camera.position.x);
          }
        };
        renderScene();
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

  useEffect(() => {
    setMarkers(MarkersFrom3dModel({ modelRef, cameraRef }));
  }, [cameraPosition]);
  return (
    <div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <Box width="400px" height="400px">
          ESC para salir
        </Box>
      </Dialog>
      <canvas ref={canvasRef} />
      {markers}
    </div>
  );
}
