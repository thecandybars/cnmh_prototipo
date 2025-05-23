// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import axios from "axios";

import getEnv from "./utils/getEnv.js";
import { ThemeProvider } from "@mui/material";
import { muiTheme } from "./utils/theme.js";

// SETUP AXIOS
axios.defaults.baseURL = getEnv("api");

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <ThemeProvider theme={muiTheme}>
    <App />
  </ThemeProvider>
  // </React.StrictMode>
);
