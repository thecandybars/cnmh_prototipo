import ScrollyVideoComponent from "scrolly-video/dist/ScrollyVideo.esm";
// import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";

import getEnv from "../../utils/getEnv";

export default function Test() {
  const api = getEnv("videosLugares");
  console.log("🚀 ~ Test ~ api:", api);
  return (
    <div className={"scrolly-container"} style={{ height: "200vh" }}>
      {/* <video
      src={api + "/siloe/videoscroll/A01.mp4"}
      // src={
      //   "http://localhost:3002/video/media/lugares/siloe/videoscroll/A05.mp4"
      // }
      autoPlay
      loop
      muted
      controls={true}
      width="80%"
    /> */}
      <ScrollyVideoComponent
        // src={"https://scrollyvideo.js.org/goldengate.mp4"}
        src={api + "/siloe/videoscroll/A01_1080.mp4"}
        // onChange={(e) => console.log(e)}
        onReady={(e) => console.log(e)}
        // cover={true}
      />
    </div>
  );
}
