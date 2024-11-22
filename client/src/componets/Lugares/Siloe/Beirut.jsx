import video from "/beirut.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import audioBackground from "/lugares/siloe/audio/calle2.mp3";
import { useEffect } from "react";

const RESET_SCROLL = true;

export default function SiloeBeirut() {
  useEffect(() => {
    RESET_SCROLL && window.scrollTo(0, 0);
  }, []);
  const navigation = [
    {
      id: 0,
      timeIn: 0.4,
      timeOut: 0.5,
      isBlocking: false,
      links: [
        {
          direction: "left",
          title: "Beirut",
          href: "/beirut",
        },
        {
          direction: "forward",
          title: "Siloe",
          href: "/calle",
        },
        {
          direction: "right",
          title: "Bodrum",
          href: "/bodrum",
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
          direction: "left",
          title: "Beirut",
          href: "/beirut",
        },
        {
          direction: "right",
          title: "Bodrum",
          href: "/bodrum",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src={video}
      speed={800}
      navigationHotspots={navigation}
      audioBackground={{ src: audioBackground, volume: 0.3 }}
      map={{
        pointA: [-76.559311, 3.423558],
        pointB: [-76.559429, 3.424122],
      }}
    />
  );
}
