/**
 * ============================================
 * 📄 Chapter1.jsx — "L'Hiver Silencieux"
 * ============================================
 *
 * FIX APPLIQUÉ :
 * - react-tsparticles@2.9.3 (version exacte)
 * - tsparticles@2.9.3 (version exacte)
 * - loadFull importé depuis "tsparticles" (pas de sous-module)
 * - Ces deux versions sont GARANTIES compatibles
 */

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Import de la v2.9.3 de react-tsparticles
import Particles from "react-tsparticles";

// ✅ Import de loadFull depuis tsparticles v2.9.3
import { loadFull } from "tsparticles";

/**
 * ===== LES TEXTES DU CHAPITRE =====
 */
const TEXTS = [
  {
    type: "title",
    content: "L'Hiver Silencieux",
  },
  {
    type: "text",
    content: "Il y a des silences qui pèsent plus lourd que les mots.",
  },
  {
    type: "text",
    content:
      "Des distances qui ne se mesurent ni en kilomètres, ni en mois... mais en battements de cœur retenus.",
  },
  {
    type: "text",
    content:
      "La Saint-Valentin revient, comme chaque année. Et chaque année, elle murmure ton nom dans les recoins de ma mémoire.",
  },
  {
    type: "quote",
    content:
      "« On m'a demandé pourquoi j'étais si silencieux. Comment leur expliquer que mon silence est la seule langue qui te reste fidèle ? »",
  },
  {
    type: "text",
    content:
      "Je n'ai pas disparu par indifférence. Je me suis tu parce que chaque mot que j'aurais pu dire aurait été une tempête déguisée en murmure.",
  },
  {
    type: "text",
    content: "Et dans ce silence, il neige. Doucement. Comme ce soir.",
  },
  {
    type: "text",
    content: "Touche la neige. Elle a des choses à te raconter.",
  },
];

function Chapter1({ onComplete }) {
  const [revealedCount, setRevealedCount] = useState(0);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHint(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClick = () => {
    if (revealedCount < TEXTS.length) {
      setRevealedCount((prev) => prev + 1);
      setShowHint(false);
    }
  };

  /**
   * ✅ INITIALISATION DU MOTEUR — VERSION CORRIGÉE
   *
   * La clé : react-tsparticles@2.9.3 et tsparticles@2.9.3
   * utilisent la MÊME version de l'engine, donc loadFull fonctionne.
   */
  const particlesInit = useCallback(async (engine) => {
    console.log("🔧 Initialisation du moteur de particules...");
    await loadFull(engine);
    console.log("✅ Moteur de particules chargé avec succès !");
  }, []);

  const particlesLoaded = useCallback(async (container) => {
    console.log("❄️ Neige activée !", container);
  }, []);

  /**
   * ===== CONFIGURATION NEIGE =====
   * Configuration simplifiée et testée pour v2.9.3
   */
  const snowConfig = {
    background: {
      color: {
        value: "transparent",
      },
    },
    fpsLimit: 60,
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "repulse",
        },
        resize: true,
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#ffffff",
      },
      move: {
        direction: "bottom",
        enable: true,
        outModes: {
          default: "out",
        },
        random: false,
        speed: 1.5,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        /* ✅ FIX MOBILE : moins de particules sur petit écran
     window.innerWidth < 768 = mobile/tablette → 60 particules
     sinon → 120 particules */
        value:
          typeof window !== "undefined" && window.innerWidth < 768 ? 60 : 120,
      },
      opacity: {
        value: { min: 0.2, max: 0.8 },
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 4 },
      },
      wobble: {
        distance: 10,
        enable: true,
        speed: {
          min: -2,
          max: 2,
        },
      },
    },
    detectRetina: true,
  };

  return (
    <div
      onClick={handleClick}
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0a0e27 0%, #111640 50%, #0a0e27 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: revealedCount < TEXTS.length ? "pointer" : "default",
        overflow: "hidden",
        padding: "40px 20px",
      }}
    >
      {/* ===== NEIGE ===== */}
      <Particles
        id="snowfall"
        init={particlesInit}
        loaded={particlesLoaded}
        options={snowConfig}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* ===== TEXTE ===== */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "700px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "30px",
        }}
      >
        <AnimatePresence>
          {TEXTS.slice(0, revealedCount).map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.5,
                delay: 0.1,
                ease: "easeOut",
              }}
              style={{
                textAlign: "center",
                ...(item.type === "title"
                  ? {
                      fontSize: "clamp(2rem, 5vw, 3.5rem)",
                      fontWeight: 300,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: "#f0f4ff",
                      textShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
                      marginBottom: "20px",
                      fontFamily: "'Cormorant Garamond', serif",
                    }
                  : item.type === "quote"
                    ? {
                        fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                        fontStyle: "italic",
                        color: "rgba(240, 244, 255, 0.85)",
                        borderLeft: "2px solid rgba(99, 102, 241, 0.4)",
                        paddingLeft: "20px",
                        lineHeight: 1.8,
                        fontFamily: "'Cormorant Garamond', serif",
                      }
                    : {
                        fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                        color: "rgba(240, 244, 255, 0.9)",
                        lineHeight: 1.9,
                        fontWeight: 300,
                        fontFamily: "'Cormorant Garamond', serif",
                      }),
              }}
            >
              {item.content}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Indication */}
        {showHint && revealedCount < TEXTS.length && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              fontSize: "0.9rem",
              color: "rgba(240, 244, 255, 0.4)",
              fontFamily: "'Inter', sans-serif",
              fontWeight: 300,
              letterSpacing: "0.1em",
              marginTop: "40px",
            }}
          >
            touche l'écran pour continuer...
          </motion.p>
        )}

        {/* Bouton Continuer */}
        {revealedCount >= TEXTS.length && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 1 }}
            onClick={(e) => {
              e.stopPropagation();
              onComplete();
            }}
            style={{
              marginTop: "50px",
              padding: "15px 40px",
              background: "transparent",
              border: "1px solid rgba(240, 244, 255, 0.3)",
              color: "#f0f4ff",
              fontSize: "1.1rem",
              fontFamily: "'Cormorant Garamond', serif",
              letterSpacing: "0.15em",
              cursor: "pointer",
              transition: "all 0.4s ease",
              borderRadius: "0",
            }}
            whileHover={{
              borderColor: "rgba(99, 102, 241, 0.6)",
              boxShadow: "0 0 20px rgba(99, 102, 241, 0.2)",
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
          >
            Continuer...
          </motion.button>
        )}
      </div>

      {/* Points de progression */}
      <div
        style={{
          position: "fixed",
          bottom: "30px",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "8px",
          zIndex: 2,
        }}
      >
        {TEXTS.map((_, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                i < revealedCount
                  ? "rgba(99, 102, 241, 0.8)"
                  : "rgba(240, 244, 255, 0.2)",
              transition: "all 0.5s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Chapter1;
