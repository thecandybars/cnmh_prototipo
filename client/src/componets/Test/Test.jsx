import getEnv from "../../utils/getEnv";

export default function Test() {
  const api = getEnv("mediaLugares");
  return (
    <video
      src={api + "/siloe/videoscroll/A01.mp4"}
      autoPlay
      loop
      muted
      controls={true}
    />
  );
}
