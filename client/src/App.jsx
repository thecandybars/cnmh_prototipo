import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNav from "./componets/MainNav";
import Mapa from "./componets/Mapa";
import Photo360 from "./componets/Lugares/Photo360/Photo360";
import PhotoGallery from "./componets/Lugares/PhotoGallery/PhotoGallery";
import CasaMemoriaTumaco from "./componets/Lugares/CasaMemoriaTumaco";
import Test from "./componets/Test/Test";
import Guardianes from "./componets/Guardianes/Guardianes";
import Test2 from "./componets/Test/Test2";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        {location.pathname !== "/casa" && <MainNav />}
        <Routes>
          <Route path="/" element={<Mapa />} />
          <Route path="/foto360" element={<Photo360 />} />
          <Route path="/foto_360" element={<Photo_360 />} />
          <Route path="/galeria" element={<PhotoGallery />} />
          <Route path="/casa" element={<CasaMemoriaTumaco />} />
          <Route path="/test" element={<Test />} />
          <Route path="/test2" element={<Test2 />} />
          <Route path="/guardianes" element={<Guardianes />} />
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
