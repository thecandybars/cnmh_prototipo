// import { useRef, useEffect } from "react";
// import { Canvas, useFrame, useThree } from "@react-three/fiber";
// import { useGLTF, OrbitControls } from "@react-three/drei";
// import * as THREE from "three";
// import MuralBocachico from "../../assets/MuralBocachicoCamaraSinluz.glb";

// function ModelWithScrollControl({ url }) {
//   const { scene, animations, cameras } = useGLTF(url);
//   const mixer = useRef(null);
//   const { set, camera } = useThree(); // Access set and camera from useThree
//   const animationClock = useRef(0); // Track the current animation time

//   useEffect(() => {
//     // Set the GLB camera as the active camera if it exists
//     if (cameras && cameras.length > 0) {
//       set({ camera: cameras[0] }); // Set the first GLB camera as active
//     }

//     // Initialize the mixer and play the camera animation if available
//     if (animations.length) {
//       mixer.current = new THREE.AnimationMixer(scene);
//       const action = mixer.current.clipAction(animations[0]);

//       action.paused = true; // Pause the animation initially
//       action.play(); // Set it ready to play but stay paused
//     }
//   }, [animations, scene, cameras, set]);

//   // Control the camera animation progress with the scroll wheel
//   useEffect(() => {
//     const handleScroll = (event) => {
//       animationClock.current += event.deltaY * 0.001; // Adjust scroll sensitivity

//       // Clamp the animation time within the clip duration
//       if (mixer.current && animations[0]) {
//         const duration = animations[0].duration;
//         animationClock.current = Math.max(
//           0,
//           Math.min(duration, animationClock.current)
//         );

//         mixer.current.setTime(animationClock.current); // Set mixer time to control the camera animation
//       }
//     };

//     window.addEventListener("wheel", handleScroll);
//     return () => window.removeEventListener("wheel", handleScroll);
//   }, [animations]);

//   return (
//     <>
//       <primitive object={scene} />
//       <OrbitControls enableZoom={false} camera={camera} />
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
//       <Canvas>
//         <ambientLight intensity={0.5} />
//         <directionalLight position={[5, 5, 5]} />
//         <ModelWithScrollControl url={MuralBocachico} />
//       </Canvas>
//     </div>
//   );
// }

// export default Test4;
