import video from "/bodrum.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";

export default function SiloeBodrum() {
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

  return <VideoScroll src={video} speed={1400} hotspots={{ navigation }} />;
}
