import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegionalMap from "./componets/RegionalMap";
import Landing from "./componets/Landing";
import Espacio from "./componets/Espacio/Espacio";
import MainNav from "./componets/MainNav/MainNav";

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
          <Route path="/regiones" element={<RegionalMap />} />
          <Route path="/espacio" element={<Espacio />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
