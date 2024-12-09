import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import { useEffect } from "react";

const RESET_SCROLL = true;

export default function EscalerasMiradorAmoSiloe() {
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
          title: "Mirador Estrella",
          href: "/escaleras-mirador-estrella",
        },
      ],
    },
  ];

  return (
    <VideoScroll
      src="/lugares/siloe/video/tienda_dona_Ana.mp4"
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
