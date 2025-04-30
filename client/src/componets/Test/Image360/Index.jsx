import Trajectory360Manager from "./Trajectory360Manager";

const Index = () => {
  const trajectory = [
    {
      id: 1,
      src: "/lugares/fragua/images/01.png",
      hotspots: [
        {
          position: "1 0.5 -3",
          label: "View2",
          targetId: 2,
        },
      ],
    },
    {
      id: 2,
      src: "/lugares/fragua/images/02.png",
      hotspots: [
        { position: "3 0.5 -3", label: "View1", targetId: 1 },
        {
          position: "0 0 -3",
          rotation: "0 90 0",
          label: "View3",
          targetId: 3,
        },
      ],
    },
    {
      id: 3,
      src: "/lugares/fragua/images/03.png",
      hotspots: [{ position: "1 0.5 -3", label: "View2", targetId: 2 }],
    },
  ];

  return (
    <div className="App">
      <h1>Fragua</h1>
      <Trajectory360Manager trajectory={trajectory} initialViewId={1} />
    </div>
  );
};

export default Index;
