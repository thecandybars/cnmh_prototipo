import video from "/beirut.mp4";
import VideoScroll from "../../common/VideoScroll";

export default function SiloeBeirut() {
  const navigation = [
    {
      id: 0,
      timeIn: 0.4,
      timeOut: 0.5,
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
  ];

  return (
    <div>
      <VideoScroll src={video} speed={800} hotspots={{ navigation }} />
    </div>
  );
}
