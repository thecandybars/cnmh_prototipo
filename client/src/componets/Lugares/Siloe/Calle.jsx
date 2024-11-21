import video from "/siloe.mp4";
import VideoScroll from "../../common/buttons/VideoScroll/VideoScroll";

export default function SiloeCalle() {
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
      timeIn: 0.4,
      timeOut: 0.5,
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
    <div>
      <VideoScroll src={video} speed={800} hotspots={{ navigation }} />

      {/* <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box width={400} height={400} p={2}>
          Esta es una ventana de dialogo. Los dialogos bloquean la interacción
          con el resto del contenido e impiden hacer scroll.
          <b> ESC o click afuera para cerrar</b>
        </Box>
      </Dialog> */}
    </div>
  );
}
