import video from "/bodrum.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import audioBackground from "/lugares/siloe/audio/mercado.mp3";
import { useEffect } from "react";

const RESET_SCROLL = true;

export default function SiloeBodrum() {
  useEffect(() => {
    RESET_SCROLL && window.scrollTo(0, 0);
  }, []);
  const navigation = [
    {
      id: 0,
      timeIn: 0.2,
      timeOut: 0.4,
      isBlocking: false,
      links: [
        {
          direction: "left",
          title: "Beirut",
          href: "/beirut",
        },
        {
          direction: "right",
          title: "Siloe",
          href: "/calle",
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
          direction: "right",
          title: "Beirut",
          href: "/beirut",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src={video}
      speed={1400}
      navigationHotspots={navigation}
      audioBackground={{ src: audioBackground, volume: 0.3 }}
      map={{
        pointA: [-76.559311, 3.423558],
        pointB: [-76.559246, 3.423013],
        zoom: 17.5,
      }}
    />
  );
}
