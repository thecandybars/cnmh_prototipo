import video from "/bodrum.mp4";
import VideoScroll from "../../common/VideoScroll";

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
  ];

  return (
    <div>
      <VideoScroll src={video} speed={800} hotspots={{ navigation }} />
    </div>
  );
}