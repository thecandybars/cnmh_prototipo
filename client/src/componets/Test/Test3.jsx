import { useRef } from "react";
import Map from "react-map-gl";
import getEnv from "../../utils/getEnv";
import { useEffect } from "react";
import mapboxgl from "mapbox-gl";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import PropTypes from "prop-types";
// import modelURL from "../../assets/BarramundiFish.glb";
import modelURL from "../../assets/pajarosAnimados.glb";

Model3D.propTypes = { mapRef: PropTypes.object };

function Model3D({ mapRef }) {
  useEffect(() => {
    const map = mapRef.current.getMap();
    const modelOrigin = [-73.7028614, 10.8263749];
    // const modelOrigin = [148.9819, -35.39847];
    const modelAltitude = 3300; //100
    const modelRotate = [Math.PI / 2, 0, 0];
    const clock = new THREE.Clock(); // Clock to track time for animations
    let mixer; // AnimationMixer to control the animations

    const modelAsMercatorCoordinate = mapboxgl.MercatorCoordinate.fromLngLat(
      modelOrigin,
      modelAltitude
    );
    console.log(
      "🚀 ~ useEffect ~ modelAsMercatorCoordinate:",
      modelAsMercatorCoordinate.meterInMercatorCoordinateUnits()
    );

    const modelTransform = {
      translateX: modelAsMercatorCoordinate.x,
      translateY: modelAsMercatorCoordinate.y,
      translateZ: modelAsMercatorCoordinate.z,
      rotateX: modelRotate[0],
      rotateY: modelRotate[1],
      rotateZ: modelRotate[2],
      scale: modelAsMercatorCoordinate.meterInMercatorCoordinateUnits() * 500, //50
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

        this.renderer = new THREE.WebGLRenderer({
          canvas: map.getCanvas(),
          context: gl,
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

    map.on("style.load", () => {
      map.addLayer(customLayer), "place-labels";
    });
  }, [mapRef]);

  return null; // No UI for this component, it's purely for adding the custom layer
}

function Test3() {
  const mapRef = useRef(null);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        ref={mapRef}
        initialViewState={{
          // longitude: 148.9819,
          // latitude: -35.3981,
          // zoom: 12,
          // pitch: 60,
          // bearing: 0,

          longitude: -73.7028614,
          latitude: 10.8263749,
          zoom: 12,
          pitch: 60,
          bearing: 0,
        }}
        style={{ width: "100%", height: "100%" }}
        // mapStyle="mapbox://styles/mapbox/light-v11"
        // mapStyle="mapbox://styles/juancortes79/cm15j6h54001001qk3rrhbsqn" // standard
        mapStyle="mapbox://styles/juancortes79/cm15gwoxb000i01qkdie1g1og" // 3D terrain
        mapboxAccessToken={getEnv("mapboxToken")}
        antialias={true}
      >
        <Model3D mapRef={mapRef} />
      </Map>
    </div>
  );
}

export default Test3;
