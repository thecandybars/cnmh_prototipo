import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import { useEffect } from "react";
import video from "/lugares/siloe/video/b1_comp.mp4";

const RESET_SCROLL = true;

export default function EscalerasMiradorEsterlla() {
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
          title: "Tienda",
          href: "/hacia-dona-ana",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src={video}
      speed={800}
      navigationHotspots={navigation}
      map={{
        pointA: [-76.559311, 3.423558],
        pointB: [-76.559246, 3.423013],
        zoom: 17.5,
      }}
    />
  );
}
