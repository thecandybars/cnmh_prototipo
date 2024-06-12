import Map, { Source, Layer } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import geojsonData from "./col.json";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getEnv from "../../utils/getEnv";
import useFetch from "../common/customHooks/useFetch";
import { getAllDepartamentos } from "../../services/departamentos";

const TOKEN = getEnv("mapboxToken");

// const departamentos = [
//   {
//     id: 15,
//     name: "Boyacá",
//     region: "Andina",
//   },
//   {
//     id: 44,
//     name: "Guajira",
//     region: "Caribe",
//   },
//   {
//     id: 47,
//     name: "Magdalena",
//     region: "Caribe",
//   },
//   {
//     id: 85,
//     name: "Casanare",
//     region: "Orinoquía",
//   },
//   {
//     id: 94,
//     name: "Guainía",
//     region: "Amazonía",
//   },
//   {
//     id: 88,
//     name: "Archipielago de San Andrés y Providencia",
//     region: "Insular",
//   },
//   {
//     id: 23,
//     name: "Córdoba",
//     region: "Caribe",
//   },
//   {
//     id: 52,
//     name: "Nariño",
//     region: "Pacífico",
//   },
//   {
//     id: 73,
//     name: "Tolima",
//     region: "Andina",
//   },
//   {
//     id: 76,
//     name: "Valle del Cauca",
//     region: "Pacífico",
//   },
//   {
//     id: 95,
//     name: "Guaviare",
//     region: "Amazonía",
//   },
//   {
//     id: 97,
//     name: "Vaupés",
//     region: "Amazonía",
//   },
//   {
//     id: 17,
//     name: "Caldas",
//     region: "Andina",
//   },
//   {
//     id: 25,
//     name: "Cundinamarca",
//     region: "Andina",
//   },
//   {
//     id: 86,
//     name: "Putumayo",
//     region: "Amazonía",
//   },
//   {
//     id: 5,
//     name: "Antioquia",
//     region: "Andina",
//   },
//   {
//     id: 19,
//     name: "Cauca",
//     region: "Pacífico",
//   },
//   {
//     id: 81,
//     name: "Arauca",
//     region: "Orinoquía",
//   },
//   {
//     id: 91,
//     name: "Amazonas",
//     region: "Amazonía",
//   },
//   {
//     id: 20,
//     name: "Cesar",
//     region: "Caribe",
//   },
//   {
//     id: 68,
//     name: "Santander",
//     region: "Andina",
//   },
//   {
//     id: 13,
//     name: "Bolívar",
//     region: "Caribe",
//   },
//   {
//     id: 18,
//     name: "Caquetá",
//     region: "Amazonía",
//   },
//   {
//     id: 27,
//     name: "Chocó",
//     region: "Pacífico",
//   },
//   {
//     id: 50,
//     name: "Meta",
//     region: "Orinoquía",
//   },
//   {
//     id: 8,
//     name: "Atlántico",
//     region: "Caribe",
//   },
//   {
//     id: 41,
//     name: "Huila",
//     region: "Andina",
//   },
//   {
//     id: 54,
//     name: "Norte de Santander",
//     region: "Andina",
//   },
//   {
//     id: 63,
//     name: "Quindío",
//     region: "Andina",
//   },
//   {
//     id: 99,
//     name: "Vichada",
//     region: "Orinoquía",
//   },
//   {
//     id: 11,
//     name: "Bogotá",
//     region: "Andina",
//   },
//   {
//     id: 66,
//     name: "Risaralda",
//     region: "Andina",
//   },
//   {
//     id: 70,
//     name: "Sucre",
//     region: "Caribe",
//   },
// ];

const Landing = () => {
  const navigate = useNavigate();
  const [departamentos] = useFetch(() => getAllDepartamentos());

  const mapInit = {
    latitude: 4.5709,
    longitude: -74.2973,
    zoom: 5,
  };

  // const [clickedFeature, setClickedFeature] = useState(null);

  const handleMapClick = (event) => {
    if (event.features.length > 0) {
      const clickedId = parseInt(event.features[0].properties.dpto);
      // setClickedFeature(clickedId);
      console.log("Clicked on region with ID:", clickedId);
      navigate("/regiones");
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Map
        initialViewState={mapInit}
        mapStyle="mapbox://styles/mapbox/light-v10"
        mapboxAccessToken={TOKEN}
        onClick={handleMapClick}
        interactiveLayerIds={departamentos?.map(
          (dpto) => `zone-${dpto.id}-fill`
        )}
      >
        {geojsonData.features.map((feature) => {
          const id = parseInt(feature.properties.dpto);
          const color =
            departamentos?.find((dpto) => dpto.geoId === id)?.Region.color ||
            "pink";
          return (
            <Source
              key={`zone-${id}`}
              id={`zone-${id}`}
              type="geojson"
              data={feature}
            >
              <Layer
                id={`zone-${id}-fill`}
                type="fill"
                paint={{
                  "fill-color": color,
                  "fill-opacity": 0.5,
                }}
              />
              <Layer
                id={`zone-${id}-line`}
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
