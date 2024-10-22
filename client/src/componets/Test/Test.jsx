import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Test() {
  const canvasRef = useRef();
  useEffect(() => {
    // Scene
    const scene = new THREE.Scene();
    // Sphere
    const geometry = new THREE.SphereGeometry(1, 64, 64);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff83" });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    // Camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 3;
    scene.add(camera);
    // Light
    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(1, 1, 1);
    scene.add(light);
    // Renderer
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.render(scene, camera);
  }, [canvasRef]);

  return (
    <div>
      Test
      <canvas ref={canvasRef} style={{ border: "1px solid red" }} />
    </div>
  );
}
