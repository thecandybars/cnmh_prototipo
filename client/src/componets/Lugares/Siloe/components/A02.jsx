import { useEffect } from "react";
import VideoScroll from "../../../common/buttons/VideoScroll/VideoScroll";
import getEnv from "../../../../utils/getEnv";

const RESET_SCROLL = true;
export default function A02() {
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
          title: "Casa",
          href: "/A01",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src={"/lugares/siloe/video/A02.mp4"}
      // src={getEnv("videosLugares") + "/siloe/videoscroll/A02.mp4"}
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
