import video from "/beirut.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";

export default function SiloeBeirut() {
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

  return <VideoScroll src={video} speed={800} hotspots={{ navigation }} />;
}
