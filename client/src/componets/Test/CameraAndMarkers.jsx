import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluz.glb";
import useWheelCounter from "../common/customHooks/useWheelCounter";
import MarkersFrom3dModel from "./MarkersFrom3dModel";

export default function CameraAndMarkers() {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const mixerRef = useRef(null);
  const cameraRef = useRef(null);
  const animationsRef = useRef([]);
  const modelRef = useRef(null);
  const [cameraPosition, setCameraPosition] = useState(null);
  const [markers, setMarkers] = useState(null);

  // State for animation control
  // const [duration, setDuration] = useState(0);

  const { frame } = useWheelCounter({ scale: 30 });

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    sceneRef.current = new THREE.Scene();

    // Renderer setup
    rendererRef.current = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current.setPixelRatio(window.devicePixelRatio);

    // Default camera (will be replaced by the camera from GLB)
    const defaultCamera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    defaultCamera.position.set(0, 0, 10);
    cameraRef.current = defaultCamera;

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff);
    sceneRef.current.add(ambientLight);

    // Load the GLB file
    const loader = new GLTFLoader();
    loader.load(
      MuralBocachico,
      (gltf) => {
        console.log("GLB file loaded:", gltf);
        modelRef.current = gltf;

        // Add the model to the scene
        sceneRef.current.add(gltf.scene);

        // Find the camera in the loaded scene
        let animatedCamera = null;
        gltf.scene.traverse((node) => {
          if (node.isCamera) {
            console.log("Found camera in scene:", node);
            animatedCamera = node;
          }
        });

        if (animatedCamera) {
          cameraRef.current = animatedCamera;
          cameraRef.current.aspect = window.innerWidth / window.innerHeight;
          cameraRef.current.updateProjectionMatrix();
        } else {
          console.warn("No camera found in the GLB file, using default camera");
        }

        // Setup animation mixer IF there are animations
        if (gltf.animations && gltf.animations.length > 0) {
          mixerRef.current = new THREE.AnimationMixer(gltf.scene);

          // Store animations and get the maximum duration
          let maxDuration = 0;
          gltf.animations.forEach((clip) => {
            const action = mixerRef.current.clipAction(clip);
            action.play();
            animationsRef.current.push(action);
            maxDuration = Math.max(maxDuration, clip.duration);
          });
          // setDuration(maxDuration);
        }
        animate(); // Start the render loop
      },
      (progress) => {
        console.log(
          "Loading progress:",
          (progress.loaded / progress.total) * 100 + "%"
        );
      },
      (error) => {
        console.error("Error loading GLB:", error);
      }
    );

    // Render loop: only render the scene, no animation updates here
    const animate = () => {
      requestAnimationFrame(animate);
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        if (cameraRef.current.position.x !== cameraPosition) {
          setCameraPosition(cameraRef.current.position.x);
        }
      }
    };

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);

      if (mixerRef.current) {
        mixerRef.current.stopAllAction();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
      }

      // Clean up geometries and materials
      if (sceneRef.current) {
        sceneRef.current.traverse((object) => {
          if (object instanceof THREE.Mesh) {
            if (object.geometry) {
              object.geometry.dispose();
            }
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((material) => material.dispose());
              } else {
                object.material.dispose();
              }
            }
          }
        });
      }
    };
  }, []);

  // Markers
  useEffect(() => {
    setMarkers(MarkersFrom3dModel({ modelRef, cameraRef }));
  }, [cameraPosition]);

  // Update animation time when counter changes
  useEffect(() => {
    if (mixerRef.current && animationsRef.current.length > 0) {
      // Reset the mixer's time to 0
      mixerRef.current.setTime(0);
      mixerRef.current.setTime(frame / 1);
    }
  }, [frame]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        // overflow: "hidden",
        // pointerEvents: "none",
      }}
    >
      <canvas
        ref={canvasRef}
        // style={{ overflow: "hidden", pointerEvents: "none" }}
      />
      {markers}
    </div>
  );
}
