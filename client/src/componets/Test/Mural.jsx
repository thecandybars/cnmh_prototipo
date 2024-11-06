import InteractiveImage from "../common/InteractiveImage";
import mural from "/MuralBocachico.jpg";

const Mural = () => {
  const hotspots = [
    {
      id: "pescao",
      titulo: "Titulo para Bocachico",
      top: "70%",
      left: "60%",
      tooltip: {
        top: "50%",
        left: "50%",
        content:
          "Bibendum eleifend id mattis auctor in duis ad aliquet, praesent facilisi maecenas mollis arcu congue fames penatibus tellus, porttitor commodo tincidunt rutrum interdum habitasse ornare. Duis porta euismod sagittis montes facilisis pellentesque aliquam dis habitant, a interdum congue maecenas fames malesuada metus sed, quam magna donec tincidunt dignissim leo ullamcorper nec.",
      },
    },
    {
      id: "camion",
      titulo: "Titulo para camión",
      top: "40%",
      left: "20%",
      tooltip: {
        top: "30%",
        left: "50%",
        content:
          "Lorem ipsum dolor sit amet consectetur adipiscing elit accumsan habitasse at netus fermentum felis lacus ad donec, nec tristique ultrices habitant natoque curae aliquet maecenas iaculis etiam commodo magna dapibus platea nascetur. Rutrum iaculis felis nam aliquet congue primis risus nunc dapibus, dis netus potenti feugiat purus mauris interdum pulvinar aptent scelerisque, est egestas varius fringilla in libero tellus viverra.",
      },
    },
    {
      id: "isla",
      titulo: "Titulo para Isla",
      top: "45%",
      left: "51%",
      tooltip: {
        top: "50%",
        left: "50%",
        content:
          "Ridiculus tristique vulputate neque eleifend justo tempus integer, mauris per vel purus nisi suscipit, fusce pharetra malesuada rhoncus natoque interdum. Posuere cras ullamcorper laoreet consequat neque curae enim semper hac lobortis dictumst donec vestibulum aliquam proin dapibus, libero nulla et rutrum ultrices cum nam vitae duis quis porttitor ac morbi convallis",
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
      <InteractiveImage src={mural} hotspots={hotspots} zoom={3.5} />
    </div>
  );
};

export default Mural;
