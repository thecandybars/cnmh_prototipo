import { Layer, Source } from "react-map-gl";
import conflictAreasData from "../../../geojson/conflicto.json";
import { centroid, area } from "@turf/turf";

export default function ZonasDeConflicto() {
  return (
    <Source
      id="conflictAreas"
      type="geojson"
      data={transformToPoints(conflictAreasData)}
      cluster={true}
      clusterMaxZoom={14}
      clusterRadius={50}
    >
      <Layer
        id="clusters"
        type="circle"
        filter={["has", "point_count"]}
        paint={{
          "circle-color": [
            "step",
            ["get", "point_count"],
            "#51bbd6",
            100,
            "#f1f075",
            750,
            "#f28cb1",
          ],
          "circle-radius": [
            "step",
            ["get", "point_count"],
            20,
            100,
            30,
            750,
            40,
          ],
        }}
      />

      <Layer
        id="cluster-count"
        type="symbol"
        filter={["has", "point_count"]}
        layout={{
          "text-field": "{point_count_abbreviated}",
          "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
          "text-size": 12,
        }}
      />

      <Layer
        id="unclustered-point"
        type="circle"
        filter={["!", ["has", "point_count"]]}
        paint={{
          "circle-color": "pink",
          // "circle-color": ["case", ["==", ["get", "class"], 1], "pink", "cyan"],
          "circle-radius": [
            "interpolate",
            ["linear"],
            ["get", "area"],
            0,
            5,
            1000000,
            20, // Example scale for area to radius
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#fff",
        }}
      />
    </Source>
  );
}

// const renderConflictAreas = conflictAreasData.features
//   .filter(
//     (feature, index) => feature.properties.class === 2 && index % 2 === 0
//   )
//   .map((feature, index) => {
//     const areaColor = "pink";
//     return (
//       <Source
//         key={`zone-${index}`}
//         id={`zone-${index}`}
//         type="geojson"
//         data={feature}
//       >
//         <Layer
//           id={`zone-${index}-fill`}
//           type="fill"
//           paint={{
//             "fill-color": areaColor,
//             "fill-opacity": 1,
//           }}
//         />
//         {/* <Layer
//           id={`zone-${index}-outline`}
//           type="line"
//           paint={{
//             "line-color": areaColor,
//             "line-width": 2,
//           }}
//         /> */}
//       </Source>
//     );
//   });

// Function to transform polygons to points (centroids)
const transformToPoints = (geojson) => {
  return {
    type: "FeatureCollection",
    features: geojson.features.map((feature) => {
      const center = centroid(feature);
      const polygonArea = area(feature);
      return {
        type: "Feature",
        properties: { ...feature.properties, area: polygonArea },
        geometry: {
          type: "Point",
          coordinates: center.geometry.coordinates, // Using the centroid
        },
      };
    }),
  };
};
