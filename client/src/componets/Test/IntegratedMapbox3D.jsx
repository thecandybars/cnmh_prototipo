import React, { useEffect, useRef } from "react";
import Map from "react-map-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import mapboxgl from "mapbox-gl";

function IntegratedMapbox3D({ mapboxAccessToken, modelURL }) {
  const mapRef = useRef(null);
  const threeRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const map = mapRef.current.getMap();

    // Set up Three.js scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Set up camera
    const fov = 75;
    const camera = new THREE.PerspectiveCamera(
      fov,
      map.getCanvas().width / map.getCanvas().height,
      0.1,
      1000
    );
    cameraRef.current = camera;

    // Set up renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(map.getCanvas().width, map.getCanvas().height);
    renderer.setClearColor(0x000000, 0);
    threeRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Add axes helper
    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);

    // Load the model
    const loader = new GLTFLoader();
    loader.load(
      modelURL,
      (gltf) => {
        const model = gltf.scene;
        model.scale.set(1, 1, 1); // Adjust scale as needed
        modelRef.current = model;
        scene.add(model);
        console.log("Model loaded successfully");
      },
      (progress) => {
        console.log(
          `Loading model... ${(
            (progress.loaded / progress.total) *
            100
          ).toFixed(2)}%`
        );
      },
      (error) => {
        console.error("Error loading model:", error);
      }
    );

    // Function to update Three.js scene
    const updateThreeScene = () => {
      if (!modelRef.current) return;

      const modelLngLat = [-74.24507905637381, 3.9982242677229607]; // Replace with your model's coordinates
      const mapCenter = map.getCenter();

      // Convert positions to Mercator coordinates
      const modelMercator = mapboxgl.MercatorCoordinate.fromLngLat(
        modelLngLat,
        0
      );
      const centerMercator = mapboxgl.MercatorCoordinate.fromLngLat(mapCenter);

      // Set model position relative to map center
      modelRef.current.position.set(
        modelMercator.x - centerMercator.x,
        -(modelMercator.y - centerMercator.y), // Negate y to match Three.js coordinate system
        0
      );

      // Update camera
      const zoom = map.getZoom();
      const altitude = 1.5 ** (20 - zoom);
      camera.position.set(0, 0, altitude);
      camera.lookAt(0, 0, 0);

      // Scale scene to match Mapbox zoom
      const scale = mapboxgl.MercatorCoordinate.fromLngLat(
        mapCenter,
        0
      ).meterInMercatorCoordinateUnits();
      scene.scale.set(scale, scale, scale);

      // Render the scene
      renderer.render(scene, camera);
    };

    // Add render event listener
    map.on("render", updateThreeScene);

    // Handle window resize
    const handleResize = () => {
      const canvas = map.getCanvas();
      renderer.setSize(canvas.width, canvas.height);
      camera.aspect = canvas.width / canvas.height;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      map.off("render", updateThreeScene);
      window.removeEventListener("resize", handleResize);
      if (threeRef.current && rendererRef.current) {
        threeRef.current.removeChild(rendererRef.current.domElement);
      }
    };
  }, [modelURL]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <Map
        ref={mapRef}
        mapboxAccessToken={mapboxAccessToken}
        initialViewState={{
          longitude: -74.24507905637381,
          latitude: 3.9982242677229607,
          zoom: 15,
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      />
      <div
        ref={threeRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          pointerEvents: "none",
          border: "2px solid red",
        }}
      />
    </div>
  );
}

export default IntegratedMapbox3D;
