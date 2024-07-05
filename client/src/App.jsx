import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import MainNav from "./componets/MainNav";
import Landing from "./componets/Landing";
import Photo360 from "./componets/Lugares/Photo360/Photo360";
import PhotoGallery from "./componets/Lugares/PhotoGallery/PhotoGallery";
import CasaMemoriaTumaco from "./componets/Lugares/CasaMemoriaTumaco";

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
          <Route path="/" element={<Landing />} />
          <Route path="/foto360" element={<Photo360 />} />
          <Route path="/foto_360" element={<Photo_360 />} />
          <Route path="/galeria" element={<PhotoGallery />} />
          <Route path="/casa" element={<CasaMemoriaTumaco />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export const Photo_360 = () => {
  // const navigate = useNavigate();
  // navigate("https://badel.github.io/Tumaco360/");
  // window.location.href = "/html/360/index.htm";
  // window.open("https://badel.github.io/Tumaco360/", "_blank");
  window.location.href = "https://badel.github.io/Tumaco360/";
  return null;
};

export default App;
