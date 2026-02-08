/**
 * ============================================
 * 📄 Chapter6.jsx — "Les Voix du Dehors"
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * Affiche une lumière centrale (qui la représente, ELLE)
 * entourée d'ombres menaçantes qui tentent de l'éteindre.
 *
 * L'utilisatrice CLIQUE sur les ombres pour les repousser
 * et protéger la lumière. Chaque ombre repoussée révèle
 * un avertissement tendre.
 *
 * MÉTAPHORE :
 * Les ombres = les influences extérieures (amies toxiques,
 * attentes sociales, pressions) qui pourraient altérer
 * son essence unique. La lumière = son authenticité.
 *
 * MESSAGE : "Ne laisse personne éteindre ce qui fait de toi... toi."
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== LES OMBRES/VOIX =====
 *
 * Chaque ombre représente une influence extérieure négative.
 * Elle a un "murmure" (ce qu'elle dit) et un "message" (la vérité
 * que le protagoniste oppose à cette voix).
 */
const SHADOWS = [
  {
    id: 1,
    whisper: "« Tu mérites mieux que quelqu'un qui se tait... »",
    truth: "Personne ne connaît la valeur de notre silence mieux que nous.",
    angle: 30,
    distance: 85,
  },
  {
    id: 2,
    whisper: "« Oublie-le, il ne changera jamais... »",
    truth:
      "Je n'ai pas besoin de changer. J'ai besoin qu'on comprenne que ma profondeur n'est pas un défaut.",
    angle: 90,
    distance: 90,
  },
  {
    id: 3,
    whisper: "« Il est trop compliqué, trop distant... »",
    truth:
      "La complexité n'est pas un mur. C'est un labyrinthe avec un jardin au centre.",
    angle: 150,
    distance: 85,
  },
  {
    id: 4,
    whisper: "« Le bonheur, c'est la simplicité... »",
    truth:
      "Le bonheur n'est ni simple ni compliqué. Il est authentique. Ou il n'est rien.",
    angle: 210,
    distance: 88,
  },
  {
    id: 5,
    whisper: "« Tu perds ton temps avec le passé... »",
    truth:
      "Ce n'est pas le passé que je protège. C'est la personne que tu es quand personne ne te regarde.",
    angle: 270,
    distance: 82,
  },
  {
    id: 6,
    whisper: "« Sois comme tout le monde, c'est plus sûr... »",
    truth:
      "Ne laisse personne éteindre ce qui fait de toi... toi. Ta singularité est ton plus beau trésor.",
    angle: 330,
    distance: 86,
  },
];

/**
 * ===== COMPOSANT Shadow =====
 *
 * Une ombre/voix individuelle qui flotte autour de la lumière.
 * Au clic, elle se dissipe et révèle la vérité.
 */
function Shadow({ shadow, isRepelled, onRepel, containerSize }) {
  /**
   * Position de l'ombre autour de la lumière centrale
   * Calculée avec cos/sin comme pour les plaques d'armure.
   */
  const angleRad = (shadow.angle * Math.PI) / 180;
  const radius = (containerSize / 2) * (shadow.distance / 100);
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <AnimatePresence>
      {!isRepelled && (
        <motion.div
          onClick={(e) => {
            e.stopPropagation();
            onRepel(shadow.id);
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.95, 1.05, 0.95],
            x: [x - 5, x + 5, x - 5],
            y: [y - 3, y + 3, y - 3],
          }}
          exit={{
            opacity: 0,
            scale: 2,
            filter: "blur(20px)",
            transition: { duration: 0.8, ease: "easeOut" },
          }}
          transition={{
            duration: 4 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            cursor: "pointer",
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            maxWidth: "120px",
          }}
        >
          {/* Forme de l'ombre (nuage sombre) */}
          <div
            style={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(20, 10, 30, 0.7), rgba(40, 20, 50, 0.3), transparent)",
              boxShadow: "0 0 20px rgba(20, 10, 30, 0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.2rem",
            }}
          >
            👁️
          </div>

          {/* Le murmure de l'ombre */}
          <p
            style={{
              marginTop: "8px",
              fontSize: "0.65rem",
              color: "rgba(180, 150, 200, 0.6)",
              fontFamily: "'Inter', sans-serif",
              fontStyle: "italic",
              textAlign: "center",
              lineHeight: 1.4,
              maxWidth: "110px",
            }}
          >
            {shadow.whisper}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter6 =====
 */
function Chapter6({ onComplete }) {
  const [repelledIds, setRepelledIds] = useState(new Set());
  const [currentTruth, setCurrentTruth] = useState("");
  const [showFinalMessage, setShowFinalMessage] = useState(false);
  const [showHint, setShowHint] = useState(false);

  /**
   * containerSize : taille de la zone centrale
   * On l'adapte à la taille de l'écran.
   */
  /**
   * ✅ FIX MOBILE : taille adaptative du conteneur
   * Sur mobile, le conteneur est plus petit pour que les ombres
   * restent accessibles au doigt.
   */
  const [containerSize, setContainerSize] = useState(350);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setContainerSize(280); // Petit mobile
      } else if (width < 768) {
        setContainerSize(340); // Grand mobile / petite tablette
      } else {
        setContainerSize(420); // Desktop
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (repelledIds.size === SHADOWS.length) {
      const timer = setTimeout(() => setShowFinalMessage(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [repelledIds.size]);

  const repelShadow = (id) => {
    const shadow = SHADOWS.find((s) => s.id === id);
    if (!shadow) return;

    setRepelledIds((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    setCurrentTruth(shadow.truth);
    setShowHint(false);
  };

  /**
   * Intensité de la lumière centrale
   * Plus d'ombres sont repoussées, plus la lumière est forte
   */
  const lightIntensity = repelledIds.size / SHADOWS.length;
  const allDone = repelledIds.size === SHADOWS.length;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background:
          "radial-gradient(ellipse at 50% 50%, #12101f 0%, #0a0e27 50%, #060818 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
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
          textShadow: "0 0 30px rgba(139, 92, 246, 0.3)",
          marginBottom: "5px",
          textAlign: "center",
          zIndex: 10,
        }}
      >
        Les Voix du Dehors
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
          marginBottom: "20px",
          zIndex: 10,
        }}
      >
        repousse les ombres pour protéger la lumière
      </motion.p>

      {/* ===== ZONE CENTRALE (lumière + ombres) ===== */}
      <div
        style={{
          position: "relative",
          width: `${containerSize}px`,
          height: `${containerSize}px`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {/* ===== LUMIÈRE CENTRALE ===== */}
        {/* 
          Représente SON essence, SA lumière intérieure.
          Elle devient plus forte à mesure que les ombres sont repoussées.
        */}

        {/* Halo externe */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
            opacity: 0.1 + lightIntensity * 0.4,
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            opacity: { duration: 1 },
          }}
          style={{
            position: "absolute",
            width: `${120 + lightIntensity * 60}px`,
            height: `${120 + lightIntensity * 60}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(139, 92, 246, ${0.2 + lightIntensity * 0.3}), 
              rgba(99, 102, 241, 0.1), 
              transparent
            )`,
            filter: `blur(${15 + lightIntensity * 15}px)`,
            transition: "width 1s, height 1s",
          }}
        />

        {/* Noyau lumineux */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            boxShadow: [
              `0 0 ${20 + lightIntensity * 30}px rgba(139, 92, 246, ${0.3 + lightIntensity * 0.4})`,
              `0 0 ${30 + lightIntensity * 40}px rgba(139, 92, 246, ${0.4 + lightIntensity * 0.4})`,
              `0 0 ${20 + lightIntensity * 30}px rgba(139, 92, 246, ${0.3 + lightIntensity * 0.4})`,
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            width: `${40 + lightIntensity * 20}px`,
            height: `${40 + lightIntensity * 20}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(255, 255, 255, ${0.6 + lightIntensity * 0.4}), 
              rgba(165, 180, 252, ${0.4 + lightIntensity * 0.3}), 
              rgba(139, 92, 246, ${0.2 + lightIntensity * 0.2})
            )`,
            zIndex: 3,
            transition: "width 1s, height 1s",
          }}
        />

        {/* ===== LES OMBRES ===== */}
        {SHADOWS.map((shadow) => (
          <Shadow
            key={shadow.id}
            shadow={shadow}
            isRepelled={repelledIds.has(shadow.id)}
            onRepel={repelShadow}
            containerSize={containerSize}
          />
        ))}
      </div>

      {/* ===== TEXTE DE VÉRITÉ ===== */}
      <div
        style={{
          minHeight: "90px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          maxWidth: "580px",
          width: "100%",
          zIndex: 10,
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        <AnimatePresence mode="wait">
          {currentTruth && (
            <motion.p
              key={currentTruth}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.8 }}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                color: "rgba(165, 180, 252, 0.9)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                textAlign: "center",
              }}
            >
              {currentTruth}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Indication */}
      {showHint && repelledIds.size === 0 && (
        <motion.p
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "0.85rem",
            color: "rgba(240, 244, 255, 0.3)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.1em",
            zIndex: 10,
          }}
        >
          clique sur les ombres pour les repousser...
        </motion.p>
      )}

      {/* Compteur */}
      <p
        style={{
          fontSize: "0.8rem",
          color: "rgba(240, 244, 255, 0.25)",
          fontFamily: "'Inter', sans-serif",
          fontWeight: 300,
          zIndex: 10,
          marginTop: "5px",
        }}
      >
        {repelledIds.size} / {SHADOWS.length} voix repoussées
      </p>

      {/* ===== MESSAGE FINAL ===== */}
      <AnimatePresence>
        {showFinalMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
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
              /* Fond lumineux — la lumière a gagné */
              background:
                "radial-gradient(ellipse at 50% 50%, rgba(139, 92, 246, 0.1) 0%, rgba(6, 8, 24, 0.95) 60%)",
              backdropFilter: "blur(10px)",
              zIndex: 100,
              padding: "30px",
            }}
          >
            {/* Grande lumière victorieuse */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  "0 0 60px rgba(139, 92, 246, 0.4)",
                  "0 0 100px rgba(139, 92, 246, 0.6)",
                  "0 0 60px rgba(139, 92, 246, 0.4)",
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,255,0.9), rgba(165, 180, 252, 0.6), rgba(139, 92, 246, 0.3))",
                marginBottom: "40px",
              }}
            />

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
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
              La lumière est intacte. Ta lumière.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2.2vw, 1.3rem)",
                color: "rgba(165, 180, 252, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                textAlign: "center",
                maxWidth: "580px",
                marginBottom: "20px",
              }}
            >
              Ne laisse jamais les voix du dehors te dire qui tu es. Celles qui
              t'aiment vraiment ne chercheront jamais à te changer. Elles
              admireront en silence ce que les autres ne peuvent pas voir.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 4, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)",
                color: "rgba(240, 244, 255, 0.7)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
                textAlign: "center",
                maxWidth: "560px",
              }}
            >
              Reste exactement celle que tu es. Cette femme que j'ai vue, celle
              que le monde n'a pas encore compris. C'est elle, ma constellation
              préférée.
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5.5 }}
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
    </div>
  );
}

export default Chapter6;
