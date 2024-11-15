import useViewport from "../common/customHooks/useViewport";

export default function Iframe() {
  const { vh, vw } = useViewport();
  return (
    <div width="100vw" height="100vh">
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h1>Iframe inicio</h1>
      <div style={{ display: "flex" }}>
        <iframe
          width={vw * 0.9}
          height={vh * 0.9}
          src="https://badel.github.io/Tumaco360/"
          style={{ margin: "0 auto" }}
        />
      </div>
      <h1>Iframe fin</h1>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
      <h3>Contenido de la plantilla</h3>
    </div>
  );
}
