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
import Scrolly from "./componets/Test/Scrolly";
import Mural from "./componets/Test/Mural";

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
          {/* <Route path="/test2" element={<Test2 />} /> */}
          <Route path="/test3" element={<Test3 />} />
          {/* <Route path="/test4" element={<Test4 />} /> */}
          <Route path="/siloe" element={<Scrolly />} />
          <Route path="/guardianes" element={<Guardianes />} />
          <Route path="/mural" element={<Mural />} />
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
