import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainNav from "./componets/MainNav";
import Landing from "./componets/Landing";
import Photo360 from "./componets/Lugares/Photo360/Photo360";
import PhotoGallery from "./componets/Lugares/PhotoGallery/PhotoGallery";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <MainNav />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/foto360" element={<Photo360 />} />
          <Route path="/galeria" element={<PhotoGallery />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
