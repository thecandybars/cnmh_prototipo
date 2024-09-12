import IntegratedMapbox3D from "./IntegratedMapbox3D";
import modelURL from "../../assets/BarramundiFish.glb";
import getEnv from "../../utils/getEnv";

export default function Test3() {
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <IntegratedMapbox3D
        mapboxAccessToken={getEnv("mapboxToken")}
        modelURL={modelURL}
      />
    </div>
  );
}
