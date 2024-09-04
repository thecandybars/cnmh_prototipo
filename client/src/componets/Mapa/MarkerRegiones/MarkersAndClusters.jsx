import PropTypes from "prop-types";
import MarkersLugares from "./MarkersLugares";
import { useCallback, useState } from "react";
import PopupMarkerPreview from "../components/PopupMarkerPreview";
import PopupClusterPreview from "../components/PopupClusterPreview";

function MarkersAndClusters(props) {
  // HANDLERS MARKERS
  const [previewMarker, setPreviewMarker] = useState(null);
  const handlePreviewMarker = useCallback(
    ({ action, data }) => {
      if (action === "over") {
        data.e.stopPropagation();
        const lugar = props.lugares.find(
          (lugar) => lugar.id === data.clusterId
        );
        setPreviewMarker(lugar);
      }
      if (action === "out") setPreviewMarker(null);
    },
    [props.lugares]
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
    <div>
      <MarkersLugares
        handleSelectedCluster={props.handleSelectedCluster}
        handlePreviewCluster={handlePreviewCluster}
        handleSelectedMarker={props.handleSelectedMarker}
        handlePreviewMarker={handlePreviewMarker}
        actualViewport={props.actualViewport}
        actualView={props.actualView}
        lugares={props.lugares}
        activeFilters={props.activeFilters}
        mapRef={props.mapRef}
      />
      {previewMarker && props.actualView === 1 && (
        <PopupMarkerPreview
          previewMarker={previewMarker}
          onClose={() => setPreviewMarker(null)}
        />
      )}
      {previewCluster && props.actualView === 1 && (
        <PopupClusterPreview
          previewCluster={previewCluster}
          onClose={() => setPreviewCluster(null)}
        />
      )}
    </div>
  );
}

MarkersAndClusters.propTypes = {
  handleSelectedCluster: PropTypes.func,
  handlePreviewCluster: PropTypes.func,
  handleSelectedMarker: PropTypes.func,
  handlePreviewMarker: PropTypes.func,
  actualViewport: PropTypes.object,
  actualView: PropTypes.number,
  lugares: PropTypes.array,
  activeFilters: PropTypes.array,
  mapRef: PropTypes.object,
};

export default MarkersAndClusters;
