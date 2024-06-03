import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import RegionalMap from "./componets/RegionalMap";
import Landing from "./componets/Landing";

const NotFoundPage = () => (
  <div>
    <h1>404 - Page Not Found</h1>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/regiones">Regiones</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/regiones" element={<RegionalMap />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
