import PropTypes from "prop-types";
import MarkersLugares from "./MarkersLugares";
import { useCallback, useEffect, useState } from "react";
import PopupMarkerPreview from "../components/PopupMarkerPreview";
import PopupClusterPreview from "../components/PopupClusterPreview";
import useAppStore from "../../../store/useAppStore";
import { getAllLugares } from "../../../services/lugares";
import useFetch from "../../common/customHooks/useFetch";

function MarkersAndClusters(props) {
  const setDestination = useAppStore((state) => state.setDestination);
  const actualView = useAppStore((state) => state.actualView);
  const setActualView = useAppStore((state) => state.setActualView);
  const setSelectedMarker = useAppStore((state) => state.setSelectedMarker);
  const actualRegion = useAppStore((state) => state.actualRegion);
  // LUGARES
  const [fetchedLugares] = useFetch(() => getAllLugares());
  const [lugares, setLugares] = useState([]);

  // FILTER LUGARES
  useEffect(() => {
    const filteredLugares =
      actualRegion !== null && fetchedLugares?.length
        ? fetchedLugares.filter(
            (lugar) =>
              lugar.Municipio.Departamento.Region.id === actualRegion.id
          )
        : fetchedLugares;
    setLugares(filteredLugares);
  }, [fetchedLugares, actualRegion]);

  // HANDLE SELECT
  const handleSelectedCluster = (e, cluster, supercluster) => {
    const [longitude, latitude] = cluster.geometry.coordinates;
    e.stopPropagation();
    const expansionZoom = Math.min(
      supercluster.getClusterExpansionZoom(cluster.id),
      20
    );
    setDestination({
      latitude,
      longitude,
      zoom: expansionZoom,
      transitionDuration: 500,
      pitch: props.actualViewport.pitch,
    });
  };
  // const handleSelectedMarker = (e, id) => {
  //   e.stopPropagation();
  //   const lugar = lugares.find((lugar) => {
  //     return lugar.id === id;
  //   });
  //   if (!lugar) {
  //     console.error("Selected marker not found", id);
  //     return;
  //   }
  //   setSelectedMarker(lugar);
  //   setActualView(2);
  //   if (lugar && true)
  //     setDestination({
  //       longitude: lugar.longitud,
  //       latitude: lugar.latitud,
  //       speed: 0.4,
  //       curve: 1.42,
  //       zoom: 16.5, //15
  //       pitch: 70,
  //     });
  // };
  const handleSelectedMarker = (e, id) => {
    e.stopPropagation();
    const lugar = lugares.find((lugar) => {
      return lugar.id === id;
    });
    setSelectedMarker(lugar);
    setActualView(2);
    lugar &&
      true &&
      setDestination({
        longitude: lugar.longitud,
        latitude: lugar.latitud,
        speed: 0.4,
        curve: 1.42,
        zoom: 16.5, //15
        pitch: 70,
      });
  };

  // HANDLERS MARKERS
  const [previewMarker, setPreviewMarker] = useState(null);
  const handlePreviewMarker = useCallback(
    ({ action, data }) => {
      if (action === "over") {
        data.e.stopPropagation();
        const lugar = lugares.find((lugar) => lugar.id === data.clusterId);
        setPreviewMarker(lugar);
      }
      if (action === "out") setPreviewMarker(null);
    },
    [lugares]
  );
  const [previewCluster, setPreviewCluster] = useState(null);
  const handlePreviewCluster = useCallback(({ action, data }) => {
    if (action === "over") {
      const lugaresCluster = data.supercluster.getLeaves(data.cluster.id);
      setPreviewCluster({
        lugares: lugaresCluster,
        latitud: data.cluster.geometry.coordinates[1],
        longitud: data.cluster.geometry.coordinates[0],
      });
    }
    if (action === "out") setPreviewCluster(null);
  }, []);

  return (
    lugares?.length &&
    actualView !== 0 && (
      <div>
        <MarkersLugares
          handleSelectedCluster={handleSelectedCluster}
          handlePreviewCluster={handlePreviewCluster}
          handleSelectedMarker={handleSelectedMarker}
          handlePreviewMarker={handlePreviewMarker}
          actualViewport={props.actualViewport}
          lugares={lugares}
          activeFilters={props.activeFilters}
          mapRef={props.mapRef}
        />
        {previewMarker && actualView === 1 && (
          <PopupMarkerPreview
            previewMarker={previewMarker}
            onClose={() => setPreviewMarker(null)}
          />
        )}
        {previewCluster && actualView === 1 && (
          <PopupClusterPreview
            previewCluster={previewCluster}
            onClose={() => setPreviewCluster(null)}
          />
        )}
      </div>
    )
  );
}

MarkersAndClusters.propTypes = {
  actualViewport: PropTypes.object,
  activeFilters: PropTypes.array,
  mapRef: PropTypes.object,
};

export default MarkersAndClusters;
