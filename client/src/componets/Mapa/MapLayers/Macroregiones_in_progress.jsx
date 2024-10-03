import { Layer, Source } from "react-map-gl";
import colombiaRegionsData from "../../../geojson/macroregiones.json";

export default function Macroregiones(props) {
  const DrawRegions = colombiaRegionsData.features.map((feature) => {
    const id = parseInt(feature.properties.id);
    const isHover = props.hoverFeature?.id === `macroregion-${id}`;
    // const paint = isHover
    //   ? {
    //       "fill-extrusion-color": "#fdb519",
    //       "fill-extrusion-opacity": 0.7,
    //       "fill-extrusion-height": 20000,
    //       "fill-extrusion-base": 0,
    //       "fill-extrusion-vertical-gradient": true,
    //     }
    //   : {
    //       "fill-color": "#cacaca",
    //       "fill-opacity": 0.2,
    //     };
    // const type = isHover ? "fill-extrusion" : "fill";
    const type = "fill";
    const paint = {
      "fill-color": "#cacaca",
      "fill-opacity": isHover ? 0.2 : 0,
    };

    return (
      <Source
        key={`macroregion-${id}`}
        id={`macroregion-${id}`}
        type="geojson"
        data={feature}
      >
        {/* 3D Extruded Layer */}
        <Layer id={`macroregion-${id}`} type={type} paint={paint} />
        {/* Line Layer */}
        <Layer
          id={`macroregion-${id}-line`}
          type="line"
          paint={{
            "line-color": "#cacaca",
            "line-width": 3,
            "line-opacity": 0.5,
          }}
        />
      </Source>
    );
  });
  return DrawRegions;
}
