/**
 * ============================================
 * 📄 main.jsx — Point d'entrée de l'application
 * ============================================
 *
 * CE FICHIER FAIT QUOI ?
 * C'est le "démarreur" de l'application React.
 * Il prend le composant App (notre application) et l'insère
 * dans le <div id="root"> du fichier index.html.
 *
 * Tu ne modifieras presque jamais ce fichier.
 * C'est comme le contact d'une voiture : tu le tournes une fois,
 * et ensuite tout le reste fonctionne.
 */

// On importe React et ReactDOM
// React = la bibliothèque qui gère les composants
// ReactDOM = la bibliothèque qui connecte React au navigateur (au DOM)
import React from "react";
import ReactDOM from "react-dom/client";

// On importe notre composant principal App
import App from "./App.jsx";

// On importe les styles globaux (appliqués à TOUTE l'application)
import "./index.css";

// On crée la "racine" React et on y insère notre App
// document.getElementById('root') = on cherche le <div id="root"> dans index.html
// .render(<App />) = on affiche le composant App dedans
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
