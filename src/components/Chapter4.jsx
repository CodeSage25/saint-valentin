/**
 * ============================================
 * 📄 Chapter4.jsx — "Le Désert Affectif"
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * Affiche un désert émotionnel avec des silhouettes fantomatiques
 * qui tentent d'approcher mais se dissolvent. Une seule silhouette
 * reste nette — la sienne. L'utilisatrice clique pour avancer
 * dans le désert et découvrir chaque scène.
 *
 * MÉTAPHORE ÉMOTIONNELLE :
 * "J'ai essayé d'aimer ailleurs. Le mot 'amour' est devenu
 *  un écho vide, une coquille sans âme. Mon cœur ne languit
 *  que pour toi... mais je ne te veux plus. Plus comme avant."
 *
 * C'est le chapitre le plus douloureux et le plus honnête.
 * Le paradoxe : languit pour elle mais renonce à elle.
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== LES SCÈNES DU DÉSERT =====
 *
 * Chaque scène = un moment de l'errance affective.
 * Les premières montrent des silhouettes floues (les autres).
 * La dernière montre SA silhouette, lumineuse et nette.
 *
 * hasSilhouette : true si une silhouette fantôme apparaît
 * isHer : true si c'est SA silhouette (la seule qui reste nette)
 */
const SCENES = [
  {
    id: 1,
    text: "Après toi, j'ai marché longtemps.",
    subtext: "Dans un désert que je ne savais même pas nommer.",
    hasSilhouette: false,
    isHer: false,
  },
  {
    id: 2,
    text: "Des visages sont venus. Des sourires. Des mains tendues.",
    subtext: "J'ai essayé. Sincèrement. De leur donner ce qu'ils méritaient.",
    hasSilhouette: true,
    isHer: false,
    silhouetteCount: 3,
  },
  {
    id: 3,
    text: 'Mais chaque fois que je murmurais le mot "amour"...',
    subtext: "Il sonnait creux. Comme un écho dans une cathédrale vide.",
    hasSilhouette: true,
    isHer: false,
    silhouetteCount: 2,
  },
  {
    id: 4,
    text: "Les visages se dissolvaient comme aquarelles sous la pluie.",
    subtext:
      "Ce n'était pas leur faute. C'est mon cœur qui refusait de les peindre.",
    hasSilhouette: true,
    isHer: false,
    silhouetteCount: 4,
  },
  {
    id: 5,
    text: "J'ai banalisé ce qui était sacré.",
    subtext:
      'Le mot "amour" est devenu une coquille sans âme. Un son vide que je prononçais par habitude, sans jamais le ressentir.',
    hasSilhouette: false,
    isHer: false,
  },
  {
    id: 6,
    text: "Parce que mon cœur ne languit que pour une seule personne.",
    subtext: "Et cette personne, c'est toi.",
    hasSilhouette: true,
    isHer: true,
  },
  {
    id: 7,
    text: "Mais je ne te veux plus. Plus comme avant.",
    subtext:
      "Je veux juste que tu existes dans ma vie. Comme une amie. Comme une lumière lointaine qui me rappelle que la beauté existe encore.",
    hasSilhouette: false,
    isHer: false,
  },
];

/**
 * ===== COMPOSANT GhostSilhouette =====
 *
 * Une silhouette fantomatique qui apparaît, flotte un instant,
 * puis se dissout. Représente "les autres" qu'il a essayé d'aimer.
 *
 * PROPS :
 *   - index : position de la silhouette (pour le décalage)
 *   - isHer : si true, la silhouette est lumineuse et ne disparaît PAS
 */
function GhostSilhouette({ index, isHer }) {
  /**
   * Position horizontale semi-aléatoire
   * On utilise l'index pour espacer les silhouettes
   * et éviter qu'elles se superposent.
   */
  const positions = [20, 40, 60, 75];
  const leftPos = positions[index % positions.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={
        isHer
          ? {
              /* SA silhouette : apparaît et RESTE, lumineuse */
              opacity: 1,
              y: 0,
            }
          : {
              /* Les autres : apparaissent puis se DISSOLVENT */
              opacity: [0, 0.4, 0.35, 0],
              y: [20, 0, -5, -15],
            }
      }
      transition={
        isHer
          ? {
              duration: 1.5,
              ease: "easeOut",
            }
          : {
              duration: 4,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }
      }
      style={{
        position: "absolute",
        left: `${leftPos}%`,
        bottom: "25%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pointerEvents: "none",
        transform: "translateX(-50%)",
      }}
    >
      {/* ===== LE CORPS DE LA SILHOUETTE ===== */}
      {/*
        On dessine une silhouette humaine simplifiée avec des divs :
        - Un cercle pour la tête
        - Un trapèze pour le corps
        
        Si c'est ELLE : couleur violette lumineuse
        Si c'est les autres : gris transparent
      */}

      {/* Tête */}
      <div
        style={{
          width: isHer ? "20px" : "16px",
          height: isHer ? "20px" : "16px",
          borderRadius: "50%",
          background: isHer
            ? "radial-gradient(circle, rgba(139, 92, 246, 0.9), rgba(99, 102, 241, 0.6))"
            : "radial-gradient(circle, rgba(180, 170, 155, 0.35), rgba(150, 140, 125, 0.15))",
          marginBottom: "4px",
          boxShadow: isHer
            ? "0 0 20px rgba(139, 92, 246, 0.5), 0 0 40px rgba(139, 92, 246, 0.2)"
            : "none",
        }}
      />

      {/* Corps */}
      <div
        style={{
          width: isHer ? "28px" : "22px",
          height: isHer ? "45px" : "38px",
          background: isHer
            ? "linear-gradient(180deg, rgba(139, 92, 246, 0.7), rgba(99, 102, 241, 0.3))"
            : "linear-gradient(180deg, rgba(180, 170, 155, 0.25), rgba(150, 140, 125, 0.05))",
          borderRadius: "8px 8px 4px 4px",
          boxShadow: isHer ? "0 0 25px rgba(139, 92, 246, 0.3)" : "none",
        }}
      />

      {/* Halo au sol (uniquement pour ELLE) */}
      {isHer && (
        <motion.div
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: "60px",
            height: "8px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(139, 92, 246, 0.4), transparent)",
            marginTop: "5px",
          }}
        />
      )}
    </motion.div>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter4 =====
 */
function Chapter4({ onComplete }) {
  /**
   * currentScene : index de la scène actuellement affichée (0 à 6)
   */
  const [currentScene, setCurrentScene] = useState(0);

  /**
   * showFinalMessage : affiche le message final
   */
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  /**
   * showHint : indication "clique pour continuer"
   */
  const [showHint, setShowHint] = useState(false);

  // Affiche l'indication après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Message final quand toutes les scènes sont passées
  useEffect(() => {
    if (currentScene >= SCENES.length) {
      const timer = setTimeout(() => setShowFinalMessage(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [currentScene]);

  /**
   * handleClick : avance à la scène suivante
   */
  const handleClick = () => {
    if (currentScene < SCENES.length) {
      setCurrentScene((prev) => prev + 1);
      setShowHint(false);
    }
  };

  const allDone = currentScene >= SCENES.length;
  /**
   * currentData : la scène actuellement affichée
   * On utilise currentScene - 1 car currentScene est incrémenté
   * APRÈS le clic, donc la scène affichée est la précédente.
   */
  const currentData = currentScene > 0 ? SCENES[currentScene - 1] : null;

  return (
    <div
      onClick={!allDone ? handleClick : undefined}
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        /* Dégradé désertique : ciel sombre en haut, sable en bas */
        background: `linear-gradient(180deg, 
          #0a0e27 0%, 
          #1a1530 20%, 
          #2d2340 35%,
          #4a3a2a 55%, 
          #6b5540 70%, 
          #8b7355 85%, 
          #a08968 100%
        )`,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: !allDone ? "pointer" : "default",
        overflow: "hidden",
        padding: "30px 20px",
      }}
    >
      {/* ===== ÉTOILES DANS LE CIEL ===== */}
      {/*
        De petites étoiles fixes dans la partie haute de l'écran.
        Elles scintillent doucement. Purement décoratif.
        On en crée 30 positionnées aléatoirement.
      */}
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            /* Les étoiles sont dans le tiers supérieur de l'écran */
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 35}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            borderRadius: "50%",
            background: "#f0f4ff",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ===== TITRE ===== */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
        style={{
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 300,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "#f0f4ff",
          fontFamily: "'Cormorant Garamond', serif",
          textShadow: "0 0 30px rgba(212, 165, 116, 0.3)",
          marginBottom: "10px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        Le Désert Affectif
      </motion.h2>

      {/* Sous-titre */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
          color: "rgba(240, 244, 255, 0.4)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          marginBottom: "30px",
          zIndex: 1,
        }}
      >
        où les visages se dissolvent
      </motion.p>

      {/* ===== ZONE DE LA SCÈNE (silhouettes + paysage) ===== */}
      {/*
        Cette zone représente le "désert".
        Les silhouettes apparaissent dedans.
        Elle a une hauteur fixe pour simuler l'horizon.
      */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "700px",
          height: "250px",
          marginBottom: "20px",
          zIndex: 1,
          /* Ligne d'horizon subtile */
          borderBottom: "1px solid rgba(212, 165, 116, 0.15)",
        }}
      >
        {/* ===== DUNES DE SABLE (décor) ===== */}
        {/*
          Formes ondulées en bas de la zone pour simuler des dunes.
          Purement décoratif — créé avec des border-radius arrondis.
        */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "-5%",
            width: "110%",
            height: "60px",
            background: "rgba(139, 115, 85, 0.15)",
            borderRadius: "50% 50% 0 0",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            width: "70%",
            height: "40px",
            background: "rgba(160, 137, 104, 0.1)",
            borderRadius: "50% 50% 0 0",
            pointerEvents: "none",
          }}
        />

        {/* ===== SILHOUETTES ===== */}
        {/*
          On affiche les silhouettes de la scène actuelle.
          
          AnimatePresence + key fait que les anciennes silhouettes
          disparaissent et les nouvelles apparaissent à chaque changement.
        */}
        <AnimatePresence mode="wait">
          {currentData && currentData.hasSilhouette && (
            <motion.div
              key={`silhouettes-${currentScene}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            >
              {currentData.isHer ? (
                /* ===== SA SILHOUETTE (unique, lumineuse) ===== */
                <GhostSilhouette index={0} isHer={true} />
              ) : (
                /* ===== SILHOUETTES FANTÔMES (les autres) ===== */
                [...Array(currentData.silhouetteCount || 2)].map((_, i) => (
                  <GhostSilhouette key={i} index={i} isHer={false} />
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== VENT DE SABLE (particules) ===== */}
        {/*
          Petites particules de sable qui dérivent horizontalement.
          Simule le vent du désert. Purement atmosphérique.
        */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={`sand-${i}`}
            animate={{
              x: ["-20px", "100vw"],
              opacity: [0, 0.3, 0.3, 0],
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "linear",
            }}
            style={{
              position: "absolute",
              bottom: `${5 + Math.random() * 30}%`,
              left: 0,
              width: `${15 + Math.random() * 25}px`,
              height: "1px",
              background: `linear-gradient(90deg, transparent, rgba(212, 165, 116, ${0.2 + Math.random() * 0.2}), transparent)`,
              pointerEvents: "none",
            }}
          />
        ))}
      </div>

      {/* ===== ZONE DU TEXTE ===== */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "620px",
          width: "100%",
          minHeight: "150px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "15px",
        }}
      >
        <AnimatePresence mode="wait">
          {currentData && (
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              style={{ textAlign: "center" }}
            >
              {/* Texte principal */}
              <p
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                  color: "rgba(240, 244, 255, 0.95)",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1.8,
                  fontWeight: 400,
                  marginBottom: "12px",
                }}
              >
                {currentData.text}
              </p>

              {/* Sous-texte */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                  /* Couleur spéciale si c'est SA scène (violet)
                     sinon couleur sable */
                  color: currentData.isHer
                    ? "rgba(139, 92, 246, 0.8)"
                    : "rgba(212, 165, 116, 0.7)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {currentData.subtext}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== INDICATION ===== */}
      {showHint && !allDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "0.85rem",
            color: "rgba(240, 244, 255, 0.3)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.1em",
            zIndex: 1,
          }}
        >
          clique pour avancer dans le désert...
        </motion.p>
      )}

      {/* ===== PROGRESSION ===== */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          zIndex: 1,
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        {SCENES.map((_, i) => (
          <div
            key={i}
            style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              background:
                i < currentScene
                  ? SCENES[i].isHer
                    ? "rgba(139, 92, 246, 0.9)"
                    : "rgba(212, 165, 116, 0.7)"
                  : "rgba(240, 244, 255, 0.15)",
              transition: "all 0.5s ease",
              /* Le point de SA scène est plus gros */
              transform:
                SCENES[i].isHer && i < currentScene ? "scale(1.4)" : "scale(1)",
            }}
          />
        ))}
      </div>

      {/* ===== MESSAGE FINAL ===== */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2, ease: "easeOut" }}
            style={{
              textAlign: "center",
              maxWidth: "600px",
              zIndex: 1,
              padding: "30px",
              background: "rgba(139, 92, 246, 0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(139, 92, 246, 0.1)",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "rgba(240, 244, 255, 0.95)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
                fontWeight: 400,
                marginBottom: "18px",
              }}
            >
              Les autres visages se dissolvent comme aquarelles sous la pluie.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                color: "rgba(139, 92, 246, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: "18px",
              }}
            >
              Seul le tien reste gravé. Non pas parce que je le veux. Mais parce
              que mon cœur ne connaît aucune autre forme de beauté.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(212, 165, 116, 0.7)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.8,
                marginBottom: "18px",
              }}
            >
              Ce désert n'est pas une punition. C'est le prix de t'avoir connue.
              Et je le paierais encore. Mille fois.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                color: "rgba(240, 244, 255, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
              }}
            >
              Je ne demande plus ton amour. Juste ta présence dans ce monde.
              Savoir que tu ris quelque part suffit à donner un sens à ce
              silence.
            </motion.p>

            {/* Bouton Continuer */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 6.5 }}
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              style={{
                marginTop: "40px",
                padding: "15px 40px",
                background: "transparent",
                border: "1px solid rgba(212, 165, 116, 0.3)",
                color: "#f0f4ff",
                fontSize: "1.1rem",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.15em",
                cursor: "pointer",
                transition: "all 0.4s ease",
                borderRadius: "0",
              }}
              whileHover={{
                borderColor: "rgba(139, 92, 246, 0.6)",
                boxShadow: "0 0 20px rgba(139, 92, 246, 0.2)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Continuer...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== BRUME DE CHALEUR (bas de l'écran) ===== */}
      {/*
        Effet de brume désertique en bas de l'écran.
        Simule la chaleur qui monte du sable.
      */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
          background:
            "linear-gradient(0deg, rgba(139, 115, 85, 0.2) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Chapter4;
