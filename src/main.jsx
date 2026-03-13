import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* O BrowserRouter pode ficar aqui ou dentro do App.
        Nesta versão, deixamos o App usando apenas Routes/Route,
        então o BrowserRouter fica no main. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
