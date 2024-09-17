import { Layer, Source } from "react-map-gl";
import colombiaRegionsData from "../../../geojson/col.json";
import useFetch from "../../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../../services/departamentos";
import { theme } from "../../../utils/theme";

export default function Macroregiones(props) {
  const [departamentos] = useFetch(() => getAllDepartamentos());

  const DrawRegions =
    departamentos?.length &&
    colombiaRegionsData.features.map((feature) => {
      const id = parseInt(feature.properties.dpto);
      const region = departamentos?.find((dpto) => dpto.geoId === id)?.Region;
      const regionColor = {
        color: theme.palette[region.name]?.first || "pink",
        opacity: 0.5,
      };
      if (props.actualView !== 0 && region?.id === props.actualRegion.id)
        regionColor.opacity = 0;
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
          {/* <Layer
          id={`zone-${id}-line`}
          type="line"
          paint={{
            "line-color": colorRegion,
            "line-width": 1,
          }}
        /> */}
        </Source>
      );
    });
  return DrawRegions;
}
