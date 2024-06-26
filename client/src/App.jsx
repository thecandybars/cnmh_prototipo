import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./componets/Landing";
import Espacio from "./componets/Espacio/Espacio";
import MainNav from "./componets/MainNav";
import Testpacio from "./componets/Espacio";

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
          <Route path="/espacio" element={<Testpacio />} />
          <Route path="/espacio/test" element={<Espacio />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
