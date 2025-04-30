/* eslint-disable react/prop-types */
import "aframe";

const Image360Viewer = ({
  imageUrl,
  hotspots = [],
  opacity = 1,
  style = {},
}) => {
  return (
    <div style={{ ...style, width: "100%", height: "100%" }}>
      <a-scene embedded cursor="rayOrigin:mouse">
        {/* 360 Image with opacity support */}
        <a-sky
          src={imageUrl}
          rotation="0 -130 0"
          material={`opacity: ${opacity}; transparent: ${opacity < 1}`}
        ></a-sky>

        {/* Camera with cursor */}
        <a-camera>{/* <a-cursor  /> */}</a-camera>

        {/* Hotspots (only visible when fully opaque) */}
        {opacity === 1 &&
          hotspots.map((hotspot, index) => (
            <a-entity
              id={`hotspot-${index}`}
              key={index}
              position={hotspot.position}
              geometry="primitive: circle; radius: 0.2"
              material="color: #FF3366; shader: flat"
              look-at="[camera]"
              class="clickable"
              cursor-listener
              onClick={() => {
                console.log("Hotspot clicked!!!!!!!!!!", hotspot);
                hotspot.onClick?.();
              }}
            >
              <a-text
                value={hotspot.label}
                position="0 0.3 0"
                align="center"
                color="#FFF"
                width="2"
              />
              {/* <a-cursor
              // onClick={() => {
              //   console.log("Hotspot clicked", hotspot);
              //   hotspot.onClick?.();
              // }}
              ></a-cursor> */}
            </a-entity>
          ))}
      </a-scene>
    </div>
  );
};

export default Image360Viewer;
