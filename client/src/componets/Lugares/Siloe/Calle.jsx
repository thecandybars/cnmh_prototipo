// import { Typography } from "@mui/material";
// import video from "/siloe.mp4";
// import useVideoScroll from "../common/useVideoScroll";

// function Scrolly() {
//   const altura = 800;

//   const content = [
//     {
//       id: 0,
//       content: (
//         <div style={{ position: "relative", top: "-100vh" }}>Hola</div>
//         // <div style={{ position: "relative", bottom: "100vh" }}>Hola</div>
//       ),
//     },
//     {
//       id: 1,
//       content: (
//         <div style={{ position: "relative", top: "700vh" }}>Chau</div>
//         // <div style={{ position: "relative", bottom: "-700vh" }}>Chau</div>
//       ),
//     },
//   ];

//   const [ScrollVideo, scrollPosition] = useVideoScroll({
//     src: video,
//     altura: altura,
//     content,
//   });
//   console.log("🚀 ~ Scrolly ~ scrollPosition:", scrollPosition);
//   return (
//     <div>
//       <Typography variant="h3" m={4}>
//         Video Scroll de Siloé
//       </Typography>
//       {ScrollVideo}
//     </div>
//   );
// }

// Scrolly.propTypes = {};

// export default Scrolly;

import video from "/siloe.mp4";
import VideoScroll from "../../common/VideoScroll";

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
