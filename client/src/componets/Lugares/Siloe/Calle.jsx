import video from "/siloe.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import { useEffect } from "react";

const RESET_SCROLL = true;

export default function SiloeCalle() {
  useEffect(() => {
    RESET_SCROLL && window.scrollTo(0, 0);
  }, []);
  const navigation = [
    {
      id: 0,
      timeIn: 0.2,
      timeOut: 0.3,
      isBlocking: false,
      links: [
        {
          direction: "forward",
          title: "Beirut",
          href: "/beirut",
        },
      ],
    },
    {
      id: 1,
      timeIn: 0.99,
      timeOut: 1,
      isBlocking: true,
      links: [
        {
          direction: "forward",
          title: "Bodrum",
          href: "/bodrum",
        },
      ],
    },
  ];

  return <VideoScroll src={video} speed={800} hotspots={{ navigation }} />;
}
