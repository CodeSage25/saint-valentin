/**
 * ============================================
 * 📄 App.jsx — Composant principal de l'application
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * C'est le "chef d'orchestre" de toute l'application.
 * Il gère :
 *   1. Quel chapitre est actuellement affiché
 *   2. Les transitions entre chapitres
 *   3. L'état global de la navigation
 *
 * Pour l'instant, il n'affiche QUE le Chapitre 1.
 * On ajoutera les autres chapitres progressivement.
 *
 * CONCEPT CLÉ : le "conditional rendering" (rendu conditionnel)
 * En fonction de la valeur de currentChapter, on affiche
 * un composant différent. C'est comme un aiguillage.
 */

// On importe React et le hook useState
import { useState } from "react";

// On importe notre composant Chapitre 1
import Chapter1 from "./components/Chapter1";
import Chapter2 from "./components/Chapter2";
import Chapter3 from "./components/Chapter3";
import Chapter4 from "./components/Chapter4";
import Chapter5 from "./components/Chapter5";
import Chapter6 from "./components/Chapter6";
import Chapter7 from "./components/Chapter7";

// On importe les styles de App
import "./App.css";

/**
 * ===== COMPOSANT APP =====
 *
 * C'est le composant racine. Tout passe par lui.
 *
 * STATE :
 *   - currentChapter : numéro du chapitre actuellement affiché (1, 2, 3, etc.)
 *     On commence à 1 (Chapitre 1 : L'Hiver Silencieux)
 */
function App() {
  // Le chapitre actuellement affiché
  // useState(1) = on commence au chapitre 1
  const [currentChapter, setCurrentChapter] = useState(1);

  /**
   * goToNextChapter : passe au chapitre suivant
   *
   * Cette fonction est passée en "prop" à chaque chapitre.
   * Quand un chapitre est terminé, il appelle cette fonction
   * pour dire "j'ai fini, passe au suivant".
   *
   * prev + 1 : on incrémente le numéro du chapitre
   */
  const goToNextChapter = () => {
    setCurrentChapter((prev) => prev + 1);
    // On scroll vers le haut de la page pour le nouveau chapitre
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  /**
   * renderChapter : affiche le bon composant selon currentChapter
   *
   * C'est un "switch" : selon la valeur de currentChapter,
   * on retourne un composant React différent.
   *
   * onComplete={goToNextChapter} : on passe la fonction goToNextChapter
   * en tant que "prop" nommée "onComplete". Le chapitre pourra l'appeler
   * quand il est terminé.
   */
  const renderChapter = () => {
    switch (currentChapter) {
      case 1:
        return <Chapter1 onComplete={goToNextChapter} />;

      // Les prochains chapitres seront ajoutés ici :
      case 2:
        return <Chapter2 onComplete={goToNextChapter} />;
      case 3:
        return <Chapter3 onComplete={goToNextChapter} />;
      case 4:
        return <Chapter4 onComplete={goToNextChapter} />;
      case 5:
        return <Chapter5 onComplete={goToNextChapter} />;
      case 6:
        return <Chapter6 onComplete={goToNextChapter} />;
      case 7:
        return <Chapter7 />;

      default:
        // Si on dépasse le dernier chapitre (pour l'instant, juste le 1)
        // On affiche un message temporaire
        return (
          <div
            style={{
              width: "100vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#0a0e27",
              color: "#f0f4ff",
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem",
              textAlign: "center",
              padding: "20px",
            }}
          >
            <p>La suite arrive bientôt...</p>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {/* On appelle renderChapter() qui retourne le bon composant */}
      {renderChapter()}
    </div>
  );
}

// Export par défaut = c'est ce composant qui est importé dans main.jsx
export default App;
