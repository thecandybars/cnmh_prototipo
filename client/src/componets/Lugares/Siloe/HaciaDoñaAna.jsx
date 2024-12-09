import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";
import { useEffect } from "react";
// import video from "/lugares/siloe/video/B1_Horqueta hasta la Mina.mp4";
// import video from "/lugares/siloe/video/A8_Entrar Galería donde Miriam.mp4";
// import video from "/lugares/siloe/video/b1_comp.mp4";
// import video from "/lugares/siloe/video/2024-11-15_Camino_Mirador-abajo_hacia_tienda_dona_Ana.mp4";
import video from "/lugares/siloe/video/tienda_dona_Ana.mp4";

const RESET_SCROLL = true;

export default function HaciaDoñaAna() {
  useEffect(() => {
    RESET_SCROLL && window.scrollTo(0, 0);
  }, []);
  const navigation = [
    {
      id: 0,
      timeIn: 0.991,
      timeOut: 1,
      isBlocking: true,
      links: [
        {
          direction: "left",
          title: "Amo a Siloé",
          href: "/escaleras-mirador-amo-siloe",
        },
        {
          direction: "forward",
          title: "Mirador",
          href: "/escaleras-mirador-estrella",
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
        pointA: [-76.558811, 3.423751],
        pointB: [-76.559311, 3.423558],
        zoom: 17.5,
      }}
    />
  );
}
