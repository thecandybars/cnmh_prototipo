import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PropTypes from "prop-types";
import { v4 as uuidv4 } from "uuid";

Model3D.propTypes = {
  mapRef: PropTypes.object,
  origin: PropTypes.array,
  modelURL: PropTypes.string,
  scale: PropTypes.number,
  altitude: PropTypes.number,
  display: PropTypes.bool,
};

export default function Model3D({
  mapRef,
  origin,
  modelURL,
  scale,
  altitude,
  display,
}) {
  useEffect(() => {
    const map = mapRef.current.getMap();
    const modelOrigin = origin;
    // const modelOrigin = [-73.7028614, 10.8263749];
    // const modelOrigin = [148.9819, -35.39847];
    // const altitude = Math.pow(2, 20 - zoom)

    // Query the terrain elevation at the model's origin
    // const elevation = map.queryTerrainElevation(origin) || 0; // Fallback to 0 if terrain elevation is unavailable
    const elevation = mapRef.current.queryTerrainElevation(origin); // Fallback to 0 if terrain elevation is unavailable
    const modelAltitude = Math.ceil(elevation) + altitude; // Add desired altitude above terrain
    // const modelAltitude = altitude; // 3300; //100

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );
    // console.log(
    //   "🚀 ~ useEffect ~ modelAsMercatorCoordinate:",
    //   modelAsMercatorCoordinate
    // );
    const modelRotate = [Math.PI / 2, 0, 0];
    const clock = new THREE.Clock(); // Clock to track time for animations
    let mixer; // AnimationMixer to control the animations

    // console.log(modelAsMercatorCoordinate.meterInMercatorCoordinateUnits());

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * scale, //500
    };

    const customLayer = {
      id: "3d-model",
      type: "custom",
      renderingMode: "3d",
      onAdd: function (map, gl) {
        this.camera = new THREE.Camera();
        this.scene = new THREE.Scene();

        // Add lights to the scene
        const directionalLight = new THREE.DirectionalLight(0xffffff);
        directionalLight.position.set(0, -70, 100).normalize();
        this.scene.add(directionalLight);

        const directionalLight2 = new THREE.DirectionalLight(0xffffff);
        directionalLight2.position.set(0, 70, 100).normalize();
        this.scene.add(directionalLight2);

        // Load 3D model with animation
        const loader = new GLTFLoader();
        loader.load(
          modelURL,
          // "https://docs.mapbox.com/mapbox-gl-js/assets/34M_17/34M_17.gltf",
          (gltf) => {
            this.scene.add(gltf.scene);

            // Setup the AnimationMixer and play the animation
            mixer = new THREE.AnimationMixer(gltf.scene);
            if (gltf.animations && gltf.animations.length > 0) {
              const action = mixer.clipAction(gltf.animations[0]);
              action.play(); // Start the animation
            }
          }
        );

        this.map = map;

        // Set up renderer
        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl, // Reuse Mapbox's WebGL context
          antialias: true,
        });

        this.renderer.autoClear = false;
      },
      render: function (gl, matrix) {
        const delta = clock.getDelta(); // Get time elapsed since last frame

        // Update the animation mixer if it exists
        if (mixer) {
          mixer.update(delta); // Update animations
        }

        const rotationX = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(1, 0, 0),
          modelTransform.rotateX
        );
        const rotationY = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 1, 0),
          modelTransform.rotateY
        );
        const rotationZ = new THREE.Matrix4().makeRotationAxis(
          new THREE.Vector3(0, 0, 1),
          modelTransform.rotateZ
        );

        const m = new THREE.Matrix4().fromArray(matrix);
        const l = new THREE.Matrix4()
          .makeTranslation(
            modelTransform.translateX,
            modelTransform.translateY,
            modelTransform.translateZ
          )
          .scale(
            new THREE.Vector3(
              modelTransform.scale,
              -modelTransform.scale,
              modelTransform.scale
            )
          )
          .multiply(rotationX)
          .multiply(rotationY)
          .multiply(rotationZ);

        this.camera.projectionMatrix = m.multiply(l);
        this.renderer.resetState();
        this.renderer.render(this.scene, this.camera);
        this.map.triggerRepaint();
      },
    };

    // map.on("style.load", () => {
    map.addLayer(customLayer), `${uuidv4()}`;
    // map.addLayer(customLayer, `${uuidv4()}`);

    // });

    // Cleanup function, wrong: resets animation on every mouse movement
    return () => {
      if (map.getLayer(customLayer.id) && display === false) {
        map.removeLayer(customLayer.id);
      }
    };
  }, [altitude, mapRef, modelURL, origin, scale]);

  return null; // No UI for this component, it's purely for adding the custom layer
}
