// import { Fade } from "@mui/material";
// import useScrollyVideo from "../Lugares/useScrollyVideo";

// function Scrolly() {
//   const [Scrolly, calcAltura, scrollyPosition] = useScrollyVideo({
//     src: "https://scrollyvideo.js.org/goldengate.mp4",
//     length: 400,
//   });

//   return (
//     <div>
//       <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
//       <Scrolly>
//         <p style={{ position: "relative", bottom: calcAltura(0) }}>Hola!</p>
//         <p
//           style={{
//             position: "relative",
//             bottom: calcAltura(0.3),
//             left: "100px",
//           }}
//         >
//           Hola hacia un lado!
//         </p>
//         <p style={{ position: "relative", bottom: calcAltura(0.5) }}>
//           ...en el medio
//         </p>
//         <p
//           style={{ position: "relative", bottom: calcAltura(1), left: "200px" }}
//         >
//           Hola final!
//         </p>
//         <Fade in={scrollyPosition > 0.3 && scrollyPosition < 0.5} timeout={300}>
//           <h2 style={{ position: "fixed", top: "200px", left: "400px" }}>
//             Soy FIXED
//           </h2>
//         </Fade>
//       </Scrolly>
//       <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
//     </div>
//   );
// }

// Scrolly.propTypes = {};

// export default Scrolly;

import { useState } from "react";
import ScrollyVideo from "scrolly-video/dist/ScrollyVideo.esm.jsx";
import { Box, Dialog, Fade, Typography } from "@mui/material";
import video from "/siloe.mp4";

function Scrolly() {
  const [scrollyPosition, setScrollyPosition] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [showHiddenText, setShowHiddenText] = useState(false);
  const altura = 800;
  const calcAltura = (perc) => {
    return (altura * (1 - 10 / altura) - 200) * -perc + "vh";
    // return altura * -perc + "vh";
  };
  return (
    <div>
      <Typography variant="h3" m={4}>
        Video Scroll de Siloé
      </Typography>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <Box width={400} height={400} p={2}>
          Esta es una ventana de dialogo. Los dialogos bloquean la interacción
          con el resto del contenido e impiden hacer scroll.
          <b> ESC o click afuera para cerrar</b>
        </Box>
      </Dialog>

      <div className={"scrolly-container"} style={{ height: `${altura}vh` }}>
        <ScrollyVideo
          src={video}
          // src="https://scrollyvideo.js.org/goldengate.mp4"
          onChange={(e) => setScrollyPosition(e)}
          // cover={false}
        />
        <div
          style={{
            width: "400px",
            margin: "20px",
          }}
        >
          <Typography
            variant="h4"
            style={{
              position: "relative",
              bottom: calcAltura(0),
              color: "red",
            }}
          >
            Esto es un titulo
          </Typography>

          <p
            variant="body"
            style={{
              position: "relative",
              bottom: calcAltura(0),
              color: "white",
              backgroundColor: "rgba(0,0,0,0.5)",
              padding: "10px",
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipiscing elit justo, augue
            imperdiet molestie rutrum aliquet pharetra suscipit venenatis
            hendrerit, pellentesque donec fringilla lacus orci magna euismod.
            Ridiculus blandit non varius bibendum duis montes lacus, integer
            fringilla enim lectus natoque aliquam, egestas eleifend pellentesque
            id netus tristique.
          </p>
        </div>
        <h1
          style={{
            position: "relative",
            bottom: calcAltura(0.5),
            color: "white",
            margin: "20px",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setOpenDialog(true)}
        >
          Click para abrir dialogo
        </h1>
        <h1
          style={{
            position: "relative",
            bottom: calcAltura(0.7),
            color: "white",
            margin: "20px",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px",
            cursor: "pointer",
          }}
          onClick={() => setShowHiddenText((prev) => !prev)}
        >
          Pero se pueden hacer links que abren y cierran cajas de texto que
          fluyen con el scroll. Haz click.
        </h1>
        {showHiddenText && (
          <p
            style={{
              position: "relative",
              bottom: calcAltura(0.7),
              color: "white",
              margin: "20px",
              backgroundColor: "rgba(175, 210, 108, 0.5)",
              padding: "10px",
              width: "300px",
            }}
          >
            Algo asi! Hendrerit laoreet cursus id conubia diam in egestas, et
            quam non mi facilisis dignissim eu ad, curabitur semper pretium
            blandit ridiculus imperdiet. Ac iaculis quis sed dictumst libero
            neque pretium, vehicula natoque praesent proin primis ante vulputate
            ornare, at a facilisis tempus ridiculus nibh.
          </p>
        )}
        <h1
          style={{
            position: "relative",
            bottom: "-530vh",
            // bottom: calcAltura(1),
            color: "white",
            margin: "20px",
            backgroundColor: "rgba(0,0,0,0.5)",
            padding: "10px",
          }}
        >
          Este es el último texto
        </h1>
        <Fade
          in={scrollyPosition > 0.27 && scrollyPosition < 0.39}
          timeout={700}
        >
          <h2
            style={{
              position: "fixed",
              top: "400px",
              left: "400px",
              color: "red",
              width: "300px",
              backgroundColor: "rgba(255,255,255,0.5)",
              padding: "10px",
            }}
          >
            Este texto aparece fijado a la pantalla y sincronizado con la
            entrada y salida del niño de saco rojo
          </h2>
        </Fade>
      </div>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
      <h1 style={{ margin: "40px" }}>La pagina sigue con su flujo normal</h1>
    </div>
  );
}

Scrolly.propTypes = {};

export default Scrolly;
