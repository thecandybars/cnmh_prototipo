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
// import Test2 from "./componets/Test/Test2";
import Test3 from "./componets/Test/Test3";
// import Test4 from "./componets/Test/Test4";
import Siloe from "./componets/Lugares/Siloe/Index";
import MuralHistoria from "./componets/Lugares/Tumaco/MuralHistoria";
import Iframe from "./componets/Test/Iframe";
import MuralOficios from "./componets/Lugares/Tumaco/MuralOficios";
import TestMapaConRuta from "./componets/Test/Test2";
import EscalerasMiradorEstrella from "./componets/Lugares/Siloe/EscalerasMiradorEstrella";
// import Calle from "./componets/Lugares/Siloe/Calle";
import EscalerasMiradorAmoSiloe from "./componets/Lugares/Siloe/EscalerasMiradorAmoSiloe";
import HaciaDoñaAna from "./componets/Lugares/Siloe/HaciaDoñaAna";
// import TiendaDoñaAna from "./componets/Lugares/Siloe/TiendaDoñaAna";
// import EscalerasMiradorEsterlla from "./componets/Lugares/Siloe/EscalerasMiradorEstrella";

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
        <Route path="/test2" element={<TestMapaConRuta />} />
        <Route path="/test3" element={<Test3 />} />
        {/* SILOE */}
        <Route path="/siloe" element={<Siloe />}></Route>
        <Route path="/siloe/hacia-dona-ana" element={<HaciaDoñaAna />} />
        <Route
          path="/siloe/escaleras-mirador-estrella"
          element={<EscalerasMiradorEstrella />}
        />
        <Route
          path="/siloe/escaleras-mirador-amo-siloe"
          element={<EscalerasMiradorAmoSiloe />}
        />
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
