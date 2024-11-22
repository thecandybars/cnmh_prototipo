import video from "/siloe.mp4";
import audioBackground from "/lugares/siloe/audio/calle.mp3";
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

  return (
    <VideoScroll
      src={video}
      speed={800}
      navigationHotspots={navigation}
      audioBackground={{ src: audioBackground, volume: 0.3 }}
      map={{
        pointA: [-76.558811, 3.423751],
        pointB: [-76.559311, 3.423558],
        zoom: 17.5,
      }}
      // sounds={[
      //   {
      //     id: "paletas",
      //     src: "/lugares/siloe/audio/paletas.mp3",
      //     in: 0.3,
      //     out: 0.4,
      //   },
      // ]}
    />
  );
}
