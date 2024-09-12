// import { useEffect, useRef } from "react";
// import * as THREE from "three";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
// import modelURL from "../../assets/BarramundiFish.glb";
// import PropTypes from "prop-types";

// Model3D.propTypes = { mapRef: PropTypes.object };

// function Model3D({ mapRef }) {
//   console.log("🚀 ~ Model3D ~ mapRef:", mapRef);
//   const mountRef = useRef(null);
//   const modelRef = useRef(null); // Ref for the model

//   useEffect(() => {
//     if (Object.keys(mapRef).length === 0 && !mapRef.current) return;
//     const map = mapRef.current;
//     // Set up Three.js scene, camera, and renderer
//     const scene = new THREE.Scene();
//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000
//     );

//     const renderer = new THREE.WebGLRenderer({ alpha: true });
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     renderer.setClearColor(0x000000, 0);
//     mountRef.current.appendChild(renderer.domElement);

//     // Load GLB model with GLTFLoader
//     const loader = new GLTFLoader();
//     loader.load(
//       modelURL,
//       (gltf) => {
//         const model = gltf.scene;
//         model.scale.set(1, 1, 1); // Adjust the scale as needed
//         // model.scale.set(0.005, 0.005, 0.005); // Adjust the scale as needed
//         model.position.set(0, 0, -10); // Initialize model position
//         modelRef.current = model;
//         scene.add(model);

//         // Add lighting
//         const ambientLight = new THREE.AmbientLight(0x404040, 1);
//         const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
//         directionalLight.position.set(5, 5, 5);
//         scene.add(ambientLight, directionalLight);

//         // Animation loop to render the scene!
//         const animate = () => {
//           requestAnimationFrame(animate);

//           // Slowly rotate the model
//           if (model) {
//             model.rotation.x += 0.01;
//             model.rotation.y += 0.01;
//           }

//           renderer.render(scene, camera);
//         };
//         animate();
//       },
//       undefined,
//       (error) => {
//         console.error("Error loading GLB model:", error);
//       }
//     );

//     // Handle window resize
//     const handleResize = () => {
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();
//     };
//     window.addEventListener("resize", handleResize);

//     // Sync the Three.js camera with Mapbox camera on every map render
//     const handleMapRender = () => {
//       const mapCenter = map.getCenter(); // Get map center (longitude, latitude)
//       const zoom = map.getZoom();
//       const pitch = map.getPitch();
//       const bearing = map.getBearing();

//       const altitude = Math.pow(2, 20 - zoom); // Estimate altitude from zoom level

//       // Update Three.js camera to sync with Mapbox
//       camera.position.set(mapCenter.lng, altitude, mapCenter.lat);
//       camera.rotation.set(
//         THREE.MathUtils.degToRad(pitch),
//         THREE.MathUtils.degToRad(bearing),
//         0
//       );

//       // Adjust model's position in front of the camera
//       if (modelRef.current) {
//         modelRef.current.position.set(
//           mapCenter.lng,
//           mapCenter.lat,
//           altitude - 100 // Offset the model a bit in front of the camera
//         );
//       }
//     };

//     map.on("render", handleMapRender);

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current.removeChild(renderer.domElement);
//       map.off("render", handleMapRender); // Remove the map render event listener
//     };
//   }, [mapRef.current]);

//   return (
//     <div
//       ref={mountRef}
//       style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
//     />
//   );
// }

// export default Model3D;

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import modelURL from "../../assets/BarramundiFish.glb";
import PropTypes from "prop-types";

Model3D.propTypes = { mapRef: PropTypes.object };

function Model3D({ mapRef }) {
  const mountRef = useRef(null);
  const modelRef = useRef(null); // Ref for the model

  useEffect(() => {
    if (Object.keys(mapRef).length === 0 && !mapRef.current) return;
    const map = mapRef.current;
    // Set up Three.js scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    // Transparent renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Load the GLB model
    const loader = new GLTFLoader();
    loader.load(
      modelURL,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(100, 100, 100); // Adjust model scale to fit the scene
        scene.add(model);
        modelRef.current = model;

        // Animation loop to render the scene
        const animate = () => {
          requestAnimationFrame(animate);

          // Slowly rotate the model (optional)
          if (model) {
            model.rotation.y += 0.01;
          }

          renderer.render(scene, camera);
        };
        animate();
      },
      undefined,
      (error) => {
        console.error("Error loading GLB model:", error);
      }
    );

    // Sync Three.js camera with Mapbox camera on every map render
    const handleMapRender = () => {
      const mapCenter = map.getCenter(); // Get map center (longitude, latitude)
      const zoom = map.getZoom(); // Mapbox zoom level
      const pitch = map.getPitch(); // Mapbox pitch
      const bearing = map.getBearing(); // Mapbox bearing

      // Use Mapbox's project() to convert lng/lat to Cartesian coordinates
      const projectedCenter = map.project(mapCenter);

      // Set the Three.js camera position to match Mapbox's camera
      const altitude = Math.pow(2, 20 - zoom); // Approximate altitude from zoom level

      camera.position.set(projectedCenter.x, projectedCenter.y, altitude);

      // Update camera orientation to match Mapbox's bearing and pitch
      camera.rotation.set(
        THREE.MathUtils.degToRad(pitch),
        THREE.MathUtils.degToRad(bearing),
        0
      );

      // Place the model slightly in front of the camera
      if (modelRef.current) {
        modelRef.current.position.set(0, 0, altitude - 100);
        // modelRef.current.position.set(
        //   projectedCenter.x,
        //   projectedCenter.y,
        //   altitude - 100
        // );
      }

      // Render the scene
      renderer.render(scene, camera);
    };

    // Sync the Three.js camera with the Mapbox camera on each map render
    map.on("render", () => handleMapRender(map));

    // Handle window resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      map.off("render", handleMapRender); // Remove the map render event listener
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [mapRef]);

  return (
    <div
      ref={mountRef}
      style={{ width: "100vw", height: "100vh", pointerEvents: "none" }}
    />
  );
}

export default Model3D;
