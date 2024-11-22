import React from "react";
import MapaConRuta from "../common/buttons/VideoScroll/MapaConRuta";

export default function TestMapaConRuta() {
  const [value, setValue] = React.useState(0);
  console.log("🚀 ~ TestMapaConRuta ~ value:", value);
  return (
    <div>
      <MapaConRuta
        pointA={[-76.558811, 3.423751]}
        pointB={[-76.559311, 3.423558]}
        progress={value}
        width="100%"
        height={"100vh"}
        zoom={19}
      />
      {/* SLIDER */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value}
        onChange={(event) => {
          setValue(event.target.value);
        }}
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "80%",
        }}
      />
    </div>
  );
}
