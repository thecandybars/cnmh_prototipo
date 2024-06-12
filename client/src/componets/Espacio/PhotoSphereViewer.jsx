import { Viewer } from "react-photo-sphere-viewer";
import "react-photo-sphere-viewer/dist/styles.css";

const PhotoSphereViewer = () => {
  const markers = [
    {
      id: "marker-1",
      longitude: 0.1,
      latitude: 0.1,
      image: "https://img.icons8.com/ios-filled/50/000000/marker.png",
      width: 32,
      height: 32,
      tooltip: "Marker 1",
      anchor: "bottom center",
    },
  ];

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Viewer
        panorama="https://cdn.pixabay.com/photo/2017/07/26/08/46/landscape-2544257_960_720.jpg" // Path to your 360 image
        width="100%"
        height="100%"
        markers={markers}
      />
    </div>
  );
};

export default PhotoSphereViewer;
