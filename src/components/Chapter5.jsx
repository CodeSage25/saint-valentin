/**
 * ============================================
 * 📄 Chapter5.jsx — "Les Constellations du Passé"
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * Affiche un ciel étoilé interactif. Chaque étoile représente
 * un souvenir, un moment partagé, un fragment de leur histoire.
 *
 * L'utilisatrice SURVOLE les étoiles pour les activer.
 * Quand une étoile est activée, elle brille plus fort et révèle
 * un texte poétique. Des lignes se tracent entre les étoiles
 * activées pour former des constellations.
 *
 * MÉTAPHORE :
 * "Tu es cette lumière rare que le monde essaie d'apprivoiser.
 *  Je ne demande plus ton amour, juste ta présence dans ce monde."
 *
 * CONCEPT TECHNIQUE :
 *   - SVG pour dessiner les lignes entre étoiles
 *   - onMouseEnter / onClick pour activer les étoiles
 *   - Positions calculées pour former une constellation cohérente
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== LES ÉTOILES-SOUVENIRS =====
 *
 * Chaque étoile a :
 *   - id : identifiant unique
 *   - x, y : position en POURCENTAGE (pour le responsive)
 *   - size : taille de l'étoile (plus elle est grande, plus le souvenir est important)
 *   - text : le souvenir/texte poétique révélé
 *   - connectsTo : IDs des étoiles auxquelles elle se connecte (constellation)
 */
const STARS = [
  {
    id: 1,
    x: 25,
    y: 20,
    size: 6,
    text: "Le premier regard. Celui qui a tout déclenché.",
    connectsTo: [2],
  },
  {
    id: 2,
    x: 40,
    y: 15,
    size: 5,
    text: "Ces rires qu'on ne peut pas inventer. Purs. Absolus.",
    connectsTo: [3],
  },
  {
    id: 3,
    x: 55,
    y: 25,
    size: 7,
    text: "Le jour où j'ai su que mon cœur ne m'appartenait plus.",
    connectsTo: [4],
  },
  {
    id: 4,
    x: 70,
    y: 18,
    size: 5,
    text: "Les silences partagés, plus éloquents que mille discours.",
    connectsTo: [5],
  },
  {
    id: 5,
    x: 80,
    y: 35,
    size: 6,
    text: 'Cette promesse muette : "Je serai là. Toujours."',
    connectsTo: [6],
  },
  {
    id: 6,
    x: 65,
    y: 45,
    size: 8,
    text: "Ton âme. Cette lumière rare que le monde essaie d'apprivoiser.",
    connectsTo: [7],
  },
  {
    id: 7,
    x: 45,
    y: 42,
    size: 5,
    text: "Les rêves qu'on a tissés ensemble, fil à fil, étoile à étoile.",
    connectsTo: [8],
  },
  {
    id: 8,
    x: 30,
    y: 48,
    size: 7,
    text: "Et cette dernière nuit. Celle où tout a basculé dans le silence.",
    connectsTo: [1],
  },
];

/**
 * ===== COMPOSANT Star =====
 *
 * Une seule étoile interactive.
 * Elle pulse doucement au repos, brille fort quand elle est activée.
 */
/**
 * ===== COMPOSANT Star — OPTIMISÉ MOBILE =====
 *
 * ✅ FIX MOBILE :
 *   - Ajout de onClick en plus de onMouseEnter
 *   - Zone de tap agrandie (44px minimum — recommandation Apple)
 *   - onMouseEnter gardé pour desktop
 */
function Star({ star, isActive, onActivate }) {
  return (
    <motion.div
      /* ✅ onClick fonctionne sur mobile ET desktop */
      onClick={(e) => {
        e.stopPropagation();
        onActivate(star.id);
      }}
      /* onMouseEnter fonctionne uniquement sur desktop (bonus) */
      onMouseEnter={() => onActivate(star.id)}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: 0.8,
        delay: star.id * 0.15,
      }}
      style={{
        position: "absolute",
        left: `${star.x}%`,
        top: `${star.y}%`,
        transform: "translate(-50%, -50%)",
        cursor: "pointer",
        zIndex: 3,
        /* ✅ FIX MOBILE : zone de tap minimum 44x44px 
           Apple recommande minimum 44px pour les éléments tactiles */
        padding: "20px",
        /* Empêche le texte de se sélectionner au tap */
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    >
      {/* Halo extérieur */}
      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.5, 1.2],
                opacity: [0, 0.6, 0.4],
              }
            : {
                scale: 1,
                opacity: 0,
              }
        }
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: `${star.size * 6}px`,
          height: `${star.size * 6}px`,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.4), transparent)",
          pointerEvents: "none",
        }}
      />

      {/* L'étoile */}
      <motion.div
        animate={
          isActive
            ? {
                scale: [1, 1.3, 1.1],
                boxShadow: [
                  `0 0 ${star.size * 2}px rgba(99, 102, 241, 0.5)`,
                  `0 0 ${star.size * 5}px rgba(99, 102, 241, 0.8)`,
                  `0 0 ${star.size * 3}px rgba(99, 102, 241, 0.6)`,
                ],
              }
            : {
                scale: [1, 1.1, 1],
                boxShadow: `0 0 ${star.size}px rgba(240, 244, 255, 0.3)`,
              }
        }
        transition={{
          duration: isActive ? 0.8 : 3,
          repeat: isActive ? 0 : Infinity,
          ease: "easeInOut",
        }}
        style={{
          width: `${star.size}px`,
          height: `${star.size}px`,
          borderRadius: "50%",
          background: isActive
            ? "radial-gradient(circle, #a5b4fc, #6366f1)"
            : "radial-gradient(circle, #f0f4ff, #c7d2fe)",
          transition: "background 0.5s ease",
        }}
      />
    </motion.div>
  );
}

/**
 * ===== COMPOSANT ConstellationLines =====
 *
 * Dessine les lignes SVG entre les étoiles activées.
 *
 * POURQUOI SVG ?
 * SVG (Scalable Vector Graphics) est parfait pour dessiner
 * des lignes et des formes. Il se superpose au HTML normal
 * et s'adapte à toutes les tailles d'écran.
 */
function ConstellationLines({ stars, activeIds }) {
  /**
   * On parcourt chaque étoile active et on trace une ligne
   * vers les étoiles auxquelles elle est connectée
   * (uniquement si l'étoile cible est aussi active).
   */
  const lines = [];

  stars.forEach((star) => {
    if (activeIds.has(star.id)) {
      star.connectsTo.forEach((targetId) => {
        if (activeIds.has(targetId)) {
          const target = stars.find((s) => s.id === targetId);
          if (target) {
            /* On évite les doublons (ligne A→B = ligne B→A) */
            const lineKey = [star.id, targetId].sort().join("-");
            if (!lines.find((l) => l.key === lineKey)) {
              lines.push({
                key: lineKey,
                x1: star.x,
                y1: star.y,
                x2: target.x,
                y2: target.y,
              });
            }
          }
        }
      });
    }
  });

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 2,
        pointerEvents: "none",
      }}
    >
      {lines.map((line) => (
        <motion.line
          key={line.key}
          x1={`${line.x1}%`}
          y1={`${line.y1}%`}
          x2={`${line.x2}%`}
          y2={`${line.y2}%`}
          stroke="rgba(99, 102, 241, 0.35)"
          strokeWidth="1"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </svg>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter5 =====
 */
function Chapter5({ onComplete }) {
  /**
   * activeStars : Set des IDs des étoiles activées
   */
  const [activeStars, setActiveStars] = useState(new Set());

  /**
   * currentText : le texte de la dernière étoile activée
   */
  const [currentText, setCurrentText] = useState("");

  /**
   * showFinalMessage : message final quand tout est activé
   */
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  /**
   * showHint : indication
   */
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Quand toutes les étoiles sont activées
  useEffect(() => {
    if (activeStars.size === STARS.length) {
      const timer = setTimeout(() => setShowFinalMessage(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [activeStars.size]);

  /**
   * activateStar : active une étoile et affiche son texte
   */
  const activateStar = (id) => {
    const star = STARS.find((s) => s.id === id);
    if (!star) return;

    setActiveStars((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    setCurrentText(star.text);
    setShowHint(false);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        /* Ciel nocturne profond */
        background:
          "radial-gradient(ellipse at 50% 30%, #111640 0%, #0a0e27 50%, #060918 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        overflow: "hidden",
        padding: "30px 20px",
      }}
    >
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
          textShadow: "0 0 30px rgba(99, 102, 241, 0.4)",
          marginBottom: "5px",
          textAlign: "center",
          zIndex: 5,
        }}
      >
        Les Constellations du Passé
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          fontSize: "clamp(0.85rem, 1.8vw, 1rem)",
          color: "rgba(240, 244, 255, 0.4)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          marginBottom: "15px",
          zIndex: 5,
        }}
      >
        survole les étoiles pour réveiller les souvenirs
      </motion.p>

      {/* ===== ZONE DU CIEL ÉTOILÉ ===== */}
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "800px",
          height: "55vh",
          minHeight: "350px",
          zIndex: 1,
        }}
      >
        {/* Étoiles de fond (décor) */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            animate={{ opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 2 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
            style={{
              position: "absolute",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 1.5}px`,
              height: `${1 + Math.random() * 1.5}px`,
              borderRadius: "50%",
              background: "#f0f4ff",
              pointerEvents: "none",
            }}
          />
        ))}

        {/* Lignes de constellation */}
        <ConstellationLines stars={STARS} activeIds={activeStars} />

        {/* Étoiles interactives */}
        {STARS.map((star) => (
          <Star
            key={star.id}
            star={star}
            isActive={activeStars.has(star.id)}
            onActivate={activateStar}
          />
        ))}
      </div>

      {/* ===== TEXTE DU SOUVENIR ===== */}
      <div
        style={{
          minHeight: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "600px",
          width: "100%",
          zIndex: 5,
          marginBottom: "10px",
        }}
      >
        <AnimatePresence mode="wait">
          {currentText && (
            <motion.p
              key={currentText}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                color: "rgba(165, 180, 252, 0.9)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                textAlign: "center",
              }}
            >
              {currentText}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Indication */}
      {showHint && activeStars.size === 0 && (
        <motion.p
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "0.85rem",
            color: "rgba(240, 244, 255, 0.3)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.1em",
            zIndex: 5,
          }}
        >
          touche les étoiles...
        </motion.p>
      )}

      {/* Compteur */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(240, 244, 255, 0.25)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          zIndex: 5,
          marginTop: "5px",
        }}
      >
        {activeStars.size} / {STARS.length} souvenirs
      </p>

      {/* ===== AURORE BORÉALE SUBTILE ===== */}
      {/*
        Apparaît progressivement quand les étoiles sont activées.
        Plus il y a d'étoiles actives, plus l'aurore est visible.
      */}
      <motion.div
        animate={{
          opacity: (activeStars.size / STARS.length) * 0.3,
        }}
        transition={{ duration: 2 }}
        style={{
          position: "absolute",
          top: "10%",
          left: "10%",
          width: "80%",
          height: "40%",
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.05), transparent)",
          filter: "blur(40px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ===== MESSAGE FINAL ===== */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              background: "rgba(6, 9, 24, 0.85)",
              backdropFilter: "blur(10px)",
              zIndex: 100,
              padding: "30px",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.15rem, 2.5vw, 1.5rem)",
                color: "rgba(240, 244, 255, 0.95)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
                textAlign: "center",
                maxWidth: "600px",
                marginBottom: "20px",
              }}
            >
              Chaque étoile est un fragment de nous. Dispersé dans le ciel, mais
              jamais éteint.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                color: "rgba(165, 180, 252, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                textAlign: "center",
                maxWidth: "600px",
                marginBottom: "20px",
              }}
            >
              Tu es cette lumière rare que le monde essaie d'apprivoiser. Ne les
              laisse pas. Ta lumière n'appartient à personne — pas même à moi.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                color: "rgba(240, 244, 255, 0.7)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
                textAlign: "center",
                maxWidth: "580px",
              }}
            >
              Je ne demande plus ton amour. Juste ta présence dans ce monde.
              Savoir que tu brilles quelque part suffit à illuminer mes nuits.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5 }}
              onClick={() => onComplete()}
              style={{
                marginTop: "40px",
                padding: "15px 40px",
                background: "transparent",
                border: "1px solid rgba(165, 180, 252, 0.3)",
                color: "#f0f4ff",
                fontSize: "1.1rem",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.15em",
                cursor: "pointer",
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
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chapter5;
