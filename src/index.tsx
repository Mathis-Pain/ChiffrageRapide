import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// pas besoin de spécifier .tsx .jsx .js .ts le bundler s'en occupe (prepare pour le navigateur)
import App from "./App";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
// recupere la div id root dans le fichier public/index.html pour y injecter l'app React
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

root.render(
  // React.StrictMode aide à détecter les problèmes potentiels dans l'application et a les remonter
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

// Activer le service worker pour la PWA
serviceWorkerRegistration.register();
