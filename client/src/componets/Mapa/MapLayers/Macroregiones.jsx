import { Layer, Source } from "react-map-gl";
import colombiaRegionsData from "../../../geojson/col.json";
import useFetch from "../../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../../services/departamentos";
import { theme } from "../../../utils/theme";
import useAppStore from "../../../store/useAppStore";

export default function Macroregiones() {
  const actualView = useAppStore((state) => state.actualView);
  const actualRegion = useAppStore((state) => state.actualRegion);

  const [departamentos] = useFetch(() => getAllDepartamentos());

  const DrawRegions =
    departamentos?.length &&
    colombiaRegionsData.features.map((feature) => {
      const id = parseInt(feature.properties.dpto);
      const region = departamentos?.find((dpto) => dpto.geoId === id)?.Region;
      const regionColor = {
        color: theme.palette[region.name]?.first || "pink",
        opacity: 0.3,
      };
      if (actualView !== 0 && region?.id === actualRegion?.id)
        regionColor.opacity = 0.1;
      return (
        <Source
          key={`zone-${id}`}
          id={`zone-${id}`}
          type="geojson"
          data={feature}
        >
          <Layer
            onMouseEnter={() => console.log(id)}
            id={`zone-${id}-fill`}
            type="fill"
            paint={{
              "fill-color": regionColor.color,
              "fill-opacity": regionColor.opacity,
            }}
          />
          <Layer
            id={`zone-${id}-line`}
            type="line"
            paint={{
              "line-color": "rgba(0, 125, 15, 0.18)",
              "line-width": 1,
            }}
          />
        </Source>
      );
    });
  return DrawRegions;
}
