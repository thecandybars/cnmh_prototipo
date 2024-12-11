import getEnv from "../../utils/getEnv";

export default function Test() {
  const api = getEnv("mediaLugares");
  console.log("🚀 ~ Test ~ api:", api);
  // src={api + "/siloe/videoscroll/A05.mp4"}
  return (
    <video
      src={api + "/siloe/videoscroll/A05.mp4"}
      // src={
      //   "http://localhost:3002/video/media/lugares/siloe/videoscroll/A05.mp4"
      // }
      autoPlay
      loop
      muted
      controls={true}
    />
  );
}
