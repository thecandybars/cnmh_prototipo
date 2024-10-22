import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import MuralBocachico from "../../assets/MuralBocachico.glb";

export default function Test() {
  const canvasRef = useRef();
  const mouse = useRef(new THREE.Vector2());
  const raycaster = useRef(new THREE.Raycaster());

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
        gltf.scene.position.set(5, 0, 0);
        scene.add(gltf.scene);
      },
      undefined,
      (error) => {
        console.error(error);
      }
    );

    // Orbit Controls (for pan, zoom, rotate)
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true; // Smooth camera motion
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = true; // Orbit (F) or panning (T)

    // Light
    const light = new THREE.AmbientLight(0xffffff);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Raycasting on click
    const handleMouseClick = (event) => {
      // Convert mouse click position to normalized device coordinates (-1 to +1)
      mouse.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(event.clientY / window.innerHeight) * 2 + 1;

      // Update the picking ray with the camera and mouse position
      raycaster.current.setFromCamera(mouse.current, camera);

      // Calculate objects intersecting the picking ray
      const intersects = raycaster.current.intersectObjects(
        scene.children,
        true
      );

      if (intersects.length > 0) {
        const clickedObject = intersects[0].object;
        console.log("Clicked on:", clickedObject.name);
      }
    };

    window.addEventListener("click", handleMouseClick);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // Render Loop
    const renderScene = () => {
      requestAnimationFrame(renderScene);
      controls.update();
      renderer.render(scene, camera);
    };
    renderScene();

    return () => {
      renderer.dispose();
      window.removeEventListener("click", handleMouseClick);
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasRef]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
