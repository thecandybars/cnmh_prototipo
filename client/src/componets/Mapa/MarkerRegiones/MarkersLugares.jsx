import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import StyledMarker from "./StyledMarker";
import Supercluster from "supercluster";

MarkersLugares.propTypes = {
  handleSelectedCluster: PropTypes.func,
  handleSelectedMarker: PropTypes.func,
  handlePreviewMarker: PropTypes.func,
  handlePreviewCluster: PropTypes.func,
  actualViewport: PropTypes.object,
  lugares: PropTypes.array,
  activeFilters: PropTypes.array,
  mapRef: PropTypes.object,
};
export default function MarkersLugares(props) {
  // CLUSTER STATE
  const [clusters, setClusters] = useState([]);
  const [supercluster, setSupercluster] = useState(null);
  // MARKERS
  const renderMarkers = clusters.map((cluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    const { cluster: isCluster, point_count: pointCount } = cluster.properties;

    if (isCluster) {
      return (
        <Box
          key={`cluster-${cluster.id}`}
          onClick={(e) => {
            props.handleSelectedCluster(e, cluster, supercluster);
          }}
          onMouseOver={(e) =>
            props.handlePreviewCluster({
              action: "over",
              data: { e, cluster, supercluster },
            })
          }
          onMouseOut={() =>
            props.handlePreviewCluster({
              action: "out",
              data: null,
            })
          }
        >
          <StyledMarker
            marca={{ latitud: latitude, longitud: longitude }}
            text={pointCount}
          />
        </Box>
      );
    } else {
      return (
        <Box
          key={`marker-${cluster.properties.id}`}
          onClick={(e) => {
            props.handleSelectedMarker(e, cluster.properties.id);
          }}
          onMouseOver={(e) =>
            props.handlePreviewMarker({
              action: "over",
              data: { e, clusterId: cluster.properties.id },
            })
          }
          onMouseOut={() =>
            props.handlePreviewMarker({
              action: "out",
              data: null,
            })
          }
        >
          <StyledMarker marca={cluster.properties} />
        </Box>
      );
    }
  });

  // CREATE MARKERS SUPERCLUSTER

  useEffect(() => {
    const zoom = props.actualViewport.zoom;
    const index = new Supercluster({
      radius: zoom < 6 ? 75 : zoom < 5 ? 50 : 40, // 75, //50, //40,
      maxZoom: 10, //16,
    });
    props.lugares?.length > 0 &&
      props.activeFilters.length &&
      index.load(
        props.lugares
          .filter((lugar) => props.activeFilters.includes(lugar.TiposLugare.id))
          .map((lugar) => ({
            type: "Feature",
            properties: { cluster: false, ...lugar },
            geometry: {
              type: "Point",
              coordinates: [lugar.longitud, lugar.latitud],
            },
            lugar,
          }))
      );

    setSupercluster(index);
  }, [props.lugares, props.activeFilters]);

  // CLUSTERS
  useEffect(() => {
    if (
      props.mapRef?.current !== null &&
      supercluster &&
      Object.keys(supercluster).length > 0 &&
      // supercluster.points?.length > 0 && // hay que poder quitar esto, para que los filtros filtren todo cuando no se selecciona ninguno
      Object.keys(props.actualViewport).length > 0
    ) {
      const bounds = props.mapRef.current.getBounds().toArray().flat();
      const zoom = Math.floor(props.actualViewport.zoom);

      // console.log(supercluster.getLeaves(14));

      setClusters(
        supercluster.points?.length > 0
          ? supercluster.getClusters(bounds, zoom)
          : []
      );
      // const clusters =
      //   supercluster.getClusters(bounds, zoom);
      // setClusters(clusters);
    }
  }, [
    supercluster,
    props.actualViewport,
    props.actualViewport.zoom,
    props.mapRef,
  ]);

  return renderMarkers;
}
