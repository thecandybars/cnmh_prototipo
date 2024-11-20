import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Mapa from "./componets/Mapa";
import Photo360 from "./componets/Lugares/Photo360/Photo360";
import PhotoGallery from "./componets/Lugares/PhotoGallery/PhotoGallery";
import CasaMemoriaTumaco from "./componets/Lugares/CasaMemoriaTumaco";
import Test from "./componets/Test/Test";
import Guardianes from "./componets/Guardianes/Guardianes";
// import Test2 from "./componets/Test/Test2";
import Test3 from "./componets/Test/Test3";
// import Test4 from "./componets/Test/Test4";
import Calle from "./componets/Lugares/Siloe/Calle";
import Siloe from "./componets/Lugares/Siloe/Index";
import Beirut from "./componets/Lugares/Siloe/Beirut";
import Bodrum from "./componets/Lugares/Siloe/Bodrum";
import MuralPargos from "./componets/Lugares/Tumaco/MuralPargos";
import Iframe from "./componets/Test/Iframe";
import MuralOficios from "./componets/Lugares/Tumaco/MuralOficios";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        {/* {location.pathname !== "/casa" && <MainNav />} */}
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/foto360" element={<Photo360 />} />
          <Route path="/foto_360" element={<Photo_360 />} />
          <Route path="/galeria" element={<PhotoGallery />} />
          <Route path="/casa" element={<CasaMemoriaTumaco />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test3" element={<Test3 />} />
          <Route path="/siloe" element={<Siloe />} />
          <Route path="/siloe/calle" element={<Calle />} />
          <Route path="/siloe/beirut" element={<Beirut />} />
          <Route path="/siloe/bodrum" element={<Bodrum />} />
          <Route path="/guardianes" element={<Guardianes />} />
          <Route path="/tumaco/mural_pargos" element={<MuralPargos />} />
          <Route path="/tumaco/mural_oficios" element={<MuralOficios />} />
          <Route path="/iframe" element={<Iframe />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export const Photo_360 = () => {
  window.location.href = "https://badel.github.io/Tumaco360/";
  return null;
};

export default App;
