import InteractiveImage from "../../common/InteractiveImage";
import mural from "/MuralAfro_comp.jpg";
// import mural from "/MuralPargos2x.jpg";

export default function MuralOficios() {
  const hotspots = [
    {
      id: "pacuranderargos",
      titulo: "La curandera",
      button: {
        top: "22%",
        left: "15%",
      },
      zoom: {
        amount: 2,
        top: 0,
        left: 0,
      },
      textBox: {
        top: "10%",
        left: "50%",
        content:
          "Esta mujer es una curandera, que tiene una amplia sabiduria en el uso de las plantas medicinales, lo que le permite curar las dolencias y enfermedades de la comunidad a través de su conocimiento ancestral.",
      },
    },
    {
      id: "medico",
      titulo: "El médico tradicional",
      button: {
        top: "35%",
        left: "83%",
      },
      zoom: {
        amount: 2,
        top: "30%",
        left: "200%",
      },
      textBox: {
        top: "15%",
        left: "15%",
        content:
          "Al igual que el oficio de la curandera, el médico tradicional hace uso de su saber ancestral para atender los síntomas, padecimientos y enfermedades de la comunidad.",
      },
    },
    {
      id: "partera",
      titulo: "La partera",
      button: {
        top: "65%",
        left: "50%",
      },
      zoom: {
        amount: 3,
        top: 100,
        left: 10,
      },
      textBox: {
        top: "5%",
        left: "15%",
        content:
          "Esta mujer es una partera, rol esencial en la comunidad por el acompañamiento que brinda a otras mujeres en su proceso antes, durante y despúes del parto, brindando su conocimiento también para el cuidado del recién nacido.",
      },
    },
    {
      id: "ombligada",
      titulo: "La ombligada",
      button: {
        top: "93%",
        left: "92%",
      },
      zoom: {
        amount: 8,
        top: 10,
        left: 10,
      },
      textBox: {
        top: "20%",
        left: "10%",
        content:
          "Aquí se representa la ombligada, una tradición afrodescendiente que consiste en enterrar los ombligos al pie de un árbol en señal de arraigo al territorio.",
      },
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <InteractiveImage
        src={mural}
        hotspots={hotspots}
        mainInfo={{
          title: "Mural de oficios tradicionales",
          content:
            "Este mural muestra curanderas, médicos tradicionales y parteras, oficios propios de la región, que curan con una sabiduría que viene desde África y que se transmite de madres a hijas.",
        }}
      />
    </div>
  );
}
