// import { useRef, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluz.glb";
// import useWheelCounter from "../common/customHooks/useWheelCounter";

// function ModelWithScrollControl({ url }) {
//   const { scene, animations, cameras } = useGLTF(url);
//   const mixer = useRef(null);
//   const { set, camera } = useThree(); // Access set and camera from useThree
//   const frame = useWheelCounter({ scale: 30 });

//   // Store the current animation time
//   const animationClock = useRef(0);

//   useEffect(() => {
//     // Set the GLB camera as the active camera if it exists
//     if (cameras && cameras.length > 0) {
//       set({ camera: cameras[0] }); // Set the first GLB camera as active
//     }
//     // Initialize the mixer and play the animation if available
//     if (animations.length) {
//       mixer.current = new THREE.AnimationMixer(scene);
//       const action = mixer.current.clipAction(animations[0]);
//       action.play();
//     }
//   }, [animations, scene, cameras, set]);

//   // Control the animation progress with the scroll wheel
//   useEffect(() => {
//     const handleScroll = (event) => {
//       animationClock.current += event.deltaY * 0.001; // Adjust scroll sensitivity
//       if (mixer.current) {
//         mixer.current.setTime(animationClock.current);
//       }
//     };
//     window.addEventListener("wheel", handleScroll);
//     return () => window.removeEventListener("wheel", handleScroll);
//   }, []);

//   // Update the mixer on each frame
//   useFrame((_, delta) => {
//     mixer.current?.update(delta);
//   });

//   return (
//     <>
//       <primitive object={scene} />
//       {/* <OrbitControls enableZoom={false} camera={camera} /> */}
//     </>
//   );
// }

// function Test4() {
//   return (
//     <div
//       style={{
//         position: "relative",
//         width: "100%",
//         height: "100vh",
//       }}
//     >
//       <Canvas camera={{ position: [0, 0, 10] }}>
//         <ambientLight intensity={1} />
//         {/* <directionalLight position={[5, 5, 5]} /> */}
//         <ModelWithScrollControl url={MuralBocachico} />
//       </Canvas>
//     </div>
//   );
// }

// export default Test4;
