import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Mapa from "./componets/Mapa";
import Photo360 from "./componets/Lugares/Photo360/Photo360";
import PhotoGallery from "./componets/Lugares/PhotoGallery/PhotoGallery";
import CasaMemoriaTumaco from "./componets/Lugares/CasaMemoriaTumaco";
import Test from "./componets/Test/Test";
import Guardianes from "./componets/Guardianes/Guardianes";
import Siloe from "./componets/Lugares/Siloe/Index";
import MuralHistoria from "./componets/Lugares/Tumaco/MuralHistoria";
import Iframe from "./componets/Test/Iframe";
import MuralOficios from "./componets/Lugares/Tumaco/MuralOficios";
import { siloeVideoscrollData } from "./componets/Lugares/Siloe/components/siloeVideoscrollData";
import VideoScrollWrapper from "./componets/common/buttons/VideoScroll/VideoScrollWrapper";
import Index from "./componets/Test/Photo360/Index";
import IndexJuanFrio from "./componets/Lugares/JuanFrio/Index";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route>
        <Route path="/" element={<Mapa />} />
        <Route path="/foto360" element={<Photo360 />} />
        <Route path="/foto_360" element={<Photo_360 />} />
        <Route path="/galeria" element={<PhotoGallery />} />
        <Route path="/casa" element={<CasaMemoriaTumaco />} />
        <Route path="/test" element={<Test />} />
        <Route path="/test360" element={<Index />} />
        <Route
          path="/juanfrio/hornos"
          element={<IndexJuanFrio selectedTrajectory="hornos" />}
        />
        <Route
          path="/juanfrio/murales"
          element={<IndexJuanFrio selectedTrajectory="murales" />}
        />

        {/* BOJAYA */}
        {/* Este LM esta ubicado en la carpeta /public/lugares/bojaya y se accede directamente con la ruta /lugares/bojaya */}
        {/* SILOE */}
        <Route path="/siloe" element={<Siloe />} />
        {/* Las rutas con VideoScroll o VideoPlayer se crean a partir de siloeVideoscrollData. EJ : /siloe/A01 */}
        {Object.keys(siloeVideoscrollData).map((key) => {
          const type = siloeVideoscrollData[key].type;
          if (!type) return null;
          return (
            <Route
              key={key}
              path={"/siloe/" + key}
              element={<VideoScrollWrapper {...siloeVideoscrollData[key]} />}
            />
          );
        })}

        {/* TUMACO */}
        <Route path="/tumaco/mural_pargos" element={<MuralHistoria />} />
        <Route path="/tumaco/mural_oficios" element={<MuralOficios />} />
        {/* ------------------------------------------------ */}
        <Route path="/guardianes" element={<Guardianes />} />
        <Route path="/iframe" element={<Iframe />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
};

export const Photo_360 = () => {
  window.location.href = "https://badel.github.io/Tumaco360/";
  return null;
};

export default App;
