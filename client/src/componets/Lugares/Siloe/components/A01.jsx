import { useEffect } from "react";
import VideoScroll from "../../../common/buttons/VideoScroll/VideoScroll";
// import getEnv from "../../../../utils/getEnv";

const RESET_SCROLL = true;
export default function A01() {
  // const src = `${getEnv(
  //   "pinataGateway"
  // )}/bafybeiappmn2r37djy6qwiidyytxje4jcwzmdoncenjxgq3qsrcub4kyq4`;
  useEffect(() => {
    RESET_SCROLL && window.scrollTo(0, 0);
  }, []);
  const navigation = [
    {
      id: 1,
      timeIn: 0.99,
      timeOut: 1,
      isBlocking: true,
      links: [
        {
          direction: "forward",
          title: "Cementerio",
          href: "/A02",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src="/lugares/siloe/video/A02.mp4"
      // src={getEnv("videosLugares") + "/siloe/videoscroll/A01.mp4"}
      speed={800}
      navigationHotspots={navigation}
      map={{
        pointA: [-76.558811, 3.423751],
        pointB: [-76.559311, 3.423558],
        zoom: 17.5,
      }}
    />
  );
}
