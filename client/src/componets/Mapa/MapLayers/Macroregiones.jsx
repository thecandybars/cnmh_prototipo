import { Layer, Source } from "react-map-gl";
import colombiaRegionsData from "../../../geojson/macroregiones.json";
import useAppStore from "../../../store/useAppStore";

export default function Macroregiones(props) {
  const actualRegion = useAppStore((state) => state.actualRegion);
  const actualView = useAppStore((state) => state.actualView);

  const DrawRegions = colombiaRegionsData.features.map((feature) => {
    const id = parseInt(feature.properties.id);
    const isHover = props.hoverFeature?.id === `macroregion-${id}`;
    const type = "fill";
    const calcOpacity = () => {
      if (actualView === 0) {
        return isHover ? 0.2 : 0;
      }
      if (actualView === 1) {
        return isHover && actualRegion?.id !== Number(feature.properties.id)
          ? 0.2
          : 0;
      }
      if (actualView === 2) {
        return 0;
      }
    };
    const paint = {
      "fill-color": "#cacaca",
      "fill-opacity": calcOpacity(),
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
