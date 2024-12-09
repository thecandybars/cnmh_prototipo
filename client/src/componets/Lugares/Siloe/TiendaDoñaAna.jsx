import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import { useEffect } from "react";

const RESET_SCROLL = true;

export default function TiendaDoñaAna() {
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
          title: "Bodrum",
          href: "/bodrum",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src="/public/lugares/siloe/video/tienda-ana.mp4"
      // src={video}
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
