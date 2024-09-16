import Map from "react-map-gl";
import getEnv from "../../utils/getEnv";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
// import modelURL from "../../assets/BarramundiFish.glb";
import modelURL from "../../assets/pajarosAnimados.glb";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";

Model3D_cam.propTypes = { mapRef: PropTypes.object };

function Test2() {
  const mapRef = useRef(null);
  //   const posicion = {
  //     latitude: 3.9974761715434113,
  //     longitude: -74.25213515499391,
  //     zoom: 15.44,
  //     bearing: -102.8,
  //     pitch: 79,
  //   };
  const [actualViewport, setActualViewport] = useState({
    latitude: 3.9982242677229607,
    longitude: -74.24507905637381,
    zoom: 15.44,
    pitch: 79,
    bearing: -102.8,
  });
  console.log("🚀 ~ Test2 ~ actualViewport:", actualViewport);
  return (
    <Map
      ref={mapRef}
      initialViewState={actualViewport}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/juancortes79/clxpabyhm035q01qofghr7yo7"
      mapboxAccessToken={getEnv("mapboxToken")}
      onMove={(evt) => {
        setActualViewport(evt.viewState);
      }}
      antialias={true}
    >
      <div
        style={{ position: "absolute", top: 0, left: 0, pointerEvents: "none" }}
      >
        <Model3D_cam mapRef={mapRef} />
      </div>
    </Map>
  );
}

Test2.propTypes = {};

export default Test2;

function Model3D_cam({ mapRef }) {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const mixerRef = useRef(null); // Ref for the animation mixer
  let clock = new THREE.Clock(); // Used for updating animation timing

  useEffect(() => {
    mapRef.current.on("load", () => {
      console.log("Map is loaded");

      // SCENE
      const scene = new THREE.Scene();
      // CAMERA
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 1;
      // RENDERER
      const renderer = new THREE.WebGLRenderer({ alpha: true });
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 0);
      mountRef.current.appendChild(renderer.domElement);

      // LOAD MODEL
      const loader = new GLTFLoader();
      loader.load(
        modelURL,
        (gltf) => {
          const model = gltf.scene;
          model.scale.set(5, 5, 5);
          model.position.set(0, 0, 0);
          model.rotation.x = 90;
          // model.rotation.y = 0.1;
          modelRef.current = model;
          scene.add(model);

          // SETUP ANIMATION
          if (gltf.animations && gltf.animations.length > 0) {
            const mixer = new THREE.AnimationMixer(model); // Create AnimationMixer
            mixerRef.current = mixer;

            // Play the first animation
            const action = mixer.clipAction(gltf.animations[0]);
            action.play();
          }
        },
        undefined,
        (error) => {
          console.error("Error loading GLB model:", error);
          // Optionally show fallback content or alert user
        }
      );

      // LIGHTS
      const ambientLight = new THREE.AmbientLight(0xffffff, 1);
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 5, 5);
      scene.add(ambientLight);

      const handleMapRender = () => {
        const map = mapRef.current.getMap();
        const zoom = map.getZoom();
        const pitch = map.getPitch();
        const bearing = map.getBearing();
        const center = map.getCenter(); // Map's center in longitude and latitude

        // Convert the map center (longitude, latitude) to world coordinates
        const worldCenter = mapboxgl.MercatorCoordinate.fromLngLat([
          center.lng,
          center.lat,
        ]);

        const altitude = Math.pow(2, 20 - zoom);
        camera.position.set(worldCenter.x, worldCenter.y, altitude);

        camera.rotation.x = THREE.MathUtils.degToRad(pitch);
        camera.rotation.z = THREE.MathUtils.degToRad(-bearing);

        // Update animation mixer if present
        if (mixerRef.current) {
          const delta = clock.getDelta(); // Get time delta
          mixerRef.current.update(delta); // Update the mixer with the time delta
        }

        // Render the scene
        renderer.render(scene, camera);
      };

      mapRef.current.on("render", handleMapRender);

      const handleResize = () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
      };
      window.addEventListener("resize", handleResize);

      return () => {
        window.removeEventListener("resize", handleResize);
        mountRef.current.removeChild(renderer.domElement);
      };
    });
  }, [mapRef]);

  return <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} />;
}
