// import { Layer, Source } from "react-map-gl";
// import colombiaRegionsData from "../../../geojson/macroregiones.json";
// import { theme } from "../../../utils/theme";

// export default function Macroregiones(props) {
//   const DrawRegions = colombiaRegionsData.features.map((feature) => {
//     const id = parseInt(feature.properties.id);
//     const regionColor = {
//       color: theme.palette[feature.properties.name]?.first || "pink",
//       opacity: 0.25,
//     };
//     if (
//       props.actualView !== 0 &&
//       feature.properties.id === props.actualRegion.id
//     )
//       regionColor.opacity = 0.2;
//     return (
//       <Source
//         key={`zone-${id}`}
//         id={`zone-${id}`}
//         type="geojson"
//         data={feature}
//       >
//         <Layer
//           id={`zone-${id}-fill`}
//           type="fill"
// paint={{
//   "fill-color": regionColor.color,
//   "fill-opacity": regionColor.opacity,
// }}
//         />
//         <Layer
//           id={`zone-${id}-line`}
//           type="line"
//           paint={{
//             "line-color": "#2b2b2b",
//             "line-width": 1,
//           }}
//         />
//       </Source>
//     );
//   });
//   return DrawRegions;
// }

import { Layer, Source } from "react-map-gl";
import colombiaRegionsData from "../../../geojson/macroregiones.json";
import { theme } from "../../../utils/theme";

export default function Macroregiones(props) {
  console.log("🚀 ~ Macroregiones ~ props:", props);
  const DrawRegions = colombiaRegionsData.features.map((feature) => {
    const id = parseInt(feature.properties.id);
    const isHover = id === props.mapHover;

    const regionColor = {
      color: theme.palette[feature.properties.name]?.first || "#ff9999",
      opacity: 0.25,
      height: feature.properties.height || 500, // Default height if not provided in properties
    };

    if (
      props.actualView !== 0 &&
      feature.properties.id === props.actualRegion.id
    ) {
      regionColor.opacity = 0.7;
    }

    // console.log("🚀 ~ DrawRegions ~ isHover:", `macroregion-${id}`, isHover);
    return (
      <Source
        key={`macroregion-${id}`}
        id={`macroregion-${id}`}
        type="geojson"
        data={feature}
      >
        {/* 3D Extruded Layer */}
        <Layer
          id={`macroregion-${id}`}
          type={isHover ? "fill-extrusion" : "fill"}
          paint={
            isHover
              ? {
                  "fill-extrusion-color": "#fdb519",
                  "fill-extrusion-opacity": 0.7,
                  "fill-extrusion-height": 20000,
                  "fill-extrusion-base": 0,
                  "fill-extrusion-vertical-gradient": true,
                }
              : {
                  "fill-color": "#cacaca",
                  "fill-opacity": 0.2,
                }
          }
        />
        {/* Line Layer */}
        <Layer
          id={`macroregion-${id}-line`}
          type="line"
          paint={{
            "line-color": "#cacaca",
            "line-width": 5,
            "line-opacity": 0.3,
            // "line-dasharray": [2, 4],
          }}
        />
      </Source>
    );
  });
  return DrawRegions;
}
