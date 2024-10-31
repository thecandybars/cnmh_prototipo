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
import { Fade } from "@mui/material";

function Scrolly() {
  const [scrollyPosition, setScrollyPosition] = useState(0);
  console.log("🚀 ~ Scrolly ~ scrollyPosition:", scrollyPosition);
  const altura = 400;
  const calcAltura = (perc) => {
    return (altura * (1 - 10 / altura) - 200) * -perc + "vh";
  };
  return (
    <div>
      <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
      <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
      <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
      <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
      <h1 style={{ marginBottom: "200px" }}>ScrollyVideo Test</h1>
      <div className={"scrolly-container"} style={{ height: `${altura}vh` }}>
        <ScrollyVideo
          src="https://scrollyvideo.js.org/goldengate.mp4"
          onChange={(e) => setScrollyPosition(e)}
        />
        <p style={{ position: "relative", bottom: calcAltura(0) }}>Hola!</p>
        <p
          style={{
            position: "relative",
            bottom: calcAltura(0.3),
            left: "100px",
          }}
        >
          Hola hacia un lado!
        </p>
        <p style={{ position: "relative", bottom: calcAltura(0.5) }}>
          ...en el medio
        </p>
        <p
          style={{ position: "relative", bottom: calcAltura(1), left: "200px" }}
        >
          Hola final!
        </p>
        <Fade in={scrollyPosition > 0.3 && scrollyPosition < 0.5} timeout={300}>
          <h2 style={{ position: "fixed", top: "200px", left: "400px" }}>
            Soy FIXED
          </h2>
        </Fade>
      </div>
      <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
      <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
      <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
      <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
      <h3 style={{ margin: "200px 0" }}>Ultimas palabras</h3>
    </div>
  );
}

Scrolly.propTypes = {};

export default Scrolly;
