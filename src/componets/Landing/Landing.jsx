import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useRef } from "react";
import geojsonData from "./col.json";

const TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const departamentos = [
  {
    id: 15,
    name: "Boyacá",
    region: "Andina",
  },
  {
    id: 44,
    name: "Guajira",
    region: "Caribe",
  },
  {
    id: 47,
    name: "Magdalena",
    region: "Caribe",
  },
  {
    id: 85,
    name: "Casanare",
    region: "Orinoquía",
  },
  {
    id: 94,
    name: "Guainía",
    region: "Amazonía",
  },
  {
    id: 88,
    name: "Archipielago de San Andrés y Providencia",
    region: "Insular",
  },
  {
    id: 23,
    name: "Córdoba",
    region: "Caribe",
  },
  {
    id: 52,
    name: "Nariño",
    region: "Pacífico",
  },
  {
    id: 73,
    name: "Tolima",
    region: "Andina",
  },
  {
    id: 76,
    name: "Valle del Cauca",
    region: "Pacífico",
  },
  {
    id: 95,
    name: "Guaviare",
    region: "Amazonía",
  },
  {
    id: 97,
    name: "Vaupés",
    region: "Amazonía",
  },
  {
    id: 17,
    name: "Caldas",
    region: "Andina",
  },
  {
    id: 86,
    name: "Putumayo",
    region: "Amazonía",
  },
  {
    id: 25,
    name: "Cundinamarca",
    region: "Andina",
  },
  {
    id: 86,
    name: "Putumayo",
    region: "Amazonía",
  },
  {
    id: 5,
    name: "Antioquia",
    region: "Andina",
  },
  {
    id: 19,
    name: "Cauca",
    region: "Pacífico",
  },
  {
    id: 81,
    name: "Arauca",
    region: "Orinoquía",
  },
  {
    id: 91,
    name: "Amazonas",
    region: "Amazonía",
  },
  {
    id: 20,
    name: "Cesar",
    region: "Caribe",
  },
  {
    id: 68,
    name: "Santander",
    region: "Andina",
  },
  {
    id: 13,
    name: "Bolívar",
    region: "Caribe",
  },
  {
    id: 18,
    name: "Caquetá",
    region: "Amazonía",
  },
  {
    id: 27,
    name: "Chocó",
    region: "Pacífico",
  },
  {
    id: 50,
    name: "Meta",
    region: "Orinoquía",
  },
  {
    id: 8,
    name: "Atlántico",
    region: "Caribe",
  },
  {
    id: 41,
    name: "Huila",
    region: "Andina",
  },
  {
    id: 54,
    name: "Norte de Santander",
    region: "Andina",
  },
  {
    id: 63,
    name: "Quindío",
    region: "Andina",
  },
  {
    id: 99,
    name: "Vichada",
    region: "Orinoquía",
  },
  {
    id: 11,
    name: "Bogotá",
    region: "Andina",
  },
  {
    id: 66,
    name: "Risaralda",
    region: "Andina",
  },
  {
    id: 70,
    name: "Sucre",
    region: "Caribe",
  },
];
const regions = [
  {
    name: "Caribe",
    color: "red",
  },
  {
    name: "Insular",
    color: "blue",
  },
  {
    name: "Pacífico",
    color: "yellow",
  },
  {
    name: "Andina",
    color: "brown",
  },
  {
    name: "Amazonía",
    color: "green",
  },
  {
    name: "Orinoquía",
    color: "orange",
  },
];

// const zones = [
//   {
//     id: "caribe",
//     name: "Caribe",
//     coordinates: [
//       [-75.0, 13.0],
//       [-74.5, 10.0],
//       [-73.0, 10.0],
//       [-72.5, 11.0],
//       [-74.0, 12.0],
//     ],
//     color: "yellow",
//   },
//   {
//     id: "pacifico",
//     name: "Pacifico",
//     coordinates: [
//       [-78.0, 5.0],
//       [-77.5, 3.0],
//       [-76.0, 3.0],
//       [-75.5, 4.0],
//       [-77.0, 5.0],
//     ],
//     color: "purple",
//   },
//   {
//     id: "andes",
//     name: "Andes",
//     coordinates: [
//       [-75.0, 5.0],
//       [-74.5, 2.0],
//       [-73.0, 2.0],
//       [-72.5, 3.0],
//       [-74.0, 4.0],
//     ],
//     color: "brown",
//   },
//   {
//     id: "orinoquia",
//     name: "Orinoquia",
//     coordinates: [
//       [-72.0, 7.0],
//       [-71.5, 4.0],
//       [-70.0, 4.0],
//       [-69.5, 5.0],
//       [-71.0, 6.0],
//     ],
//     color: "lightgreen",
//   },
//   {
//     id: "amazonia",
//     name: "Amazonia",
//     coordinates: [
//       [-70.0, 0.0],
//       [-69.5, -3.0],
//       [-68.0, -3.0],
//       [-67.5, -2.0],
//       [-69.0, -1.0],
//     ],
//     color: "darkgreen",
//   },
// ];

const Landing = () => {
  const mapInit = {
    latitude: 4.5709,
    longitude: -74.2973,
    zoom: 5,
  };

  const mapRef = useRef();

  //   const handleZoneClick = useCallback((event) => {
  //     const features = mapRef.current.queryRenderedFeatures(event.point, {
  //       layers: geojsonData.features.map(
  //         (feature, index) => `zone-${index}-fill`
  //       ),
  //     });

  //     if (features.length > 0) {
  //       const clickedFeature = features[0];
  //       console.log(`You clicked on the ${clickedFeature.properties.name} zone`);
  //     }
  //   }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        initialViewState={mapInit}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
        ref={mapRef}
      >
        {geojsonData.features.map((feature, index) => {
          const id = parseInt(feature.properties.dpto);
          console.log("🚀 ~ {geojsonData.features.map ~ id:", id);
          const depto = departamentos.find((dpto) => dpto.id === id);
          console.log("🚀 ~ {geojsonData.features.map ~ depto:", depto);
          const color =
            regions.find((region) => region.name === depto.region)?.color ||
            "pink";
          return (
            <Source
              key={`zone-${index}`}
              id={`zone-${index}`}
              type="geojson"
              data={feature}
            >
              <Layer
                id={`zone-${index}-fill`}
                type="fill"
                paint={{
                  "fill-color": color,
                  "fill-opacity": 0.5,
                }}
              />
              <Layer
                id={`zone-${index}-line`}
                type="line"
                paint={{
                  "line-color": "#008888",
                  "line-width": 1,
                }}
              />
            </Source>
          );
        })}
      </Map>
    </div>
  );
};

export default Landing;
