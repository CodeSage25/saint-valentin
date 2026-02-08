/**
 * ============================================
 * 📄 Chapter7.jsx — "L'Aurore"
 * ============================================
 *
 * LE CHAPITRE FINAL.
 *
 * Celui qui transforme tout. La nuit devient aurore.
 * L'amour romantique devient amitié sacrée.
 * La douleur devient gratitude.
 * Le silence devient bénédiction.
 *
 * STRUCTURE :
 *   1. Ciel nocturne qui se réchauffe progressivement
 *   2. Textes qui apparaissent lettre par lettre
 *   3. Le soleil monte à l'horizon
 *   4. Particules dorées qui s'élèvent
 *   5. Message final dans un cadre lumineux
 *   6. Écran de fin — l'aurore complète
 *
 * PALETTE :
 *   - Départ : bleu nuit (#0a0e27)
 *   - Transition : violet → rose → orange
 *   - Arrivée : doré chaud (#ffd89b, #ffb347)
 */

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== LES PASSAGES DU LEVER DE SOLEIL =====
 *
 * Chaque passage correspond à un stade du lever de soleil.
 * skyProgress contrôle la couleur du ciel (0 = nuit, 1 = aurore).
 */
const PASSAGES = [
  {
    id: 1,
    text: "La nuit a été longue.",
    skyProgress: 0.05,
  },
  {
    id: 2,
    text: "Plus longue que toutes les nuits que j'ai connues.",
    skyProgress: 0.12,
  },
  {
    id: 3,
    text: "Mais même la nuit la plus sombre finit par céder.",
    skyProgress: 0.22,
  },
  {
    id: 4,
    text: "Je ne peux plus t'aimer comme je t'aimais.",
    skyProgress: 0.32,
  },
  {
    id: 5,
    text: "Mais je ne peux pas non plus t'oublier.",
    skyProgress: 0.42,
  },
  {
    id: 6,
    text: "Alors je choisis ceci...",
    skyProgress: 0.52,
  },
  {
    id: 7,
    text: "Être ce jardin où tu peux revenir, juste pour respirer.",
    skyProgress: 0.62,
  },
  {
    id: 8,
    text: "Pas comme amants. Comme âmes qui se reconnaissent.",
    skyProgress: 0.72,
  },
  {
    id: 9,
    text: "Où que tu ailles, qui que tu choisisses...",
    skyProgress: 0.82,
  },
  {
    id: 10,
    text: "Une part de moi veillera toujours sur ton bonheur.",
    skyProgress: 0.92,
  },
];

/**
 * ===== COMPOSANT TypewriterText =====
 *
 * Affiche un texte LETTRE PAR LETTRE, comme une machine à écrire.
 *
 * COMMENT ÇA MARCHE :
 * - On a un state "displayedCount" qui commence à 0
 * - Un setInterval ajoute 1 toutes les 50ms
 * - On affiche text.slice(0, displayedCount)
 * - Quand displayedCount === text.length, on appelle onComplete
 *
 * PROPS :
 *   - text : le texte à afficher
 *   - speed : délai entre chaque lettre (en ms)
 *   - onComplete : appelé quand tout le texte est affiché
 *   - style : styles CSS à appliquer
 */
function TypewriterText({ text, speed = 50, onComplete, style }) {
  const [displayedCount, setDisplayedCount] = useState(0);
  /**
   * useRef pour savoir si onComplete a déjà été appelé.
   * Sans ça, onComplete pourrait être appelé plusieurs fois
   * à cause des re-rendus de React.
   */
  const completedRef = useRef(false);

  useEffect(() => {
    /* Reset quand le texte change */
    setDisplayedCount(0);
    completedRef.current = false;
  }, [text]);

  useEffect(() => {
    if (displayedCount < text.length) {
      /**
       * setInterval ajoute une lettre toutes les "speed" ms.
       * On nettoie l'intervalle à chaque re-rendu pour éviter
       * les fuites de mémoire.
       */
      const timer = setTimeout(() => {
        setDisplayedCount((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else if (!completedRef.current && onComplete) {
      completedRef.current = true;
      onComplete();
    }
  }, [displayedCount, text.length, speed, onComplete]);

  return (
    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={style}>
      {/* Le texte affiché progressivement */}
      {text.slice(0, displayedCount)}

      {/* Curseur clignotant (visible tant que le texte n'est pas fini) */}
      {displayedCount < text.length && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ color: "rgba(255, 215, 0, 0.6)" }}
        >
          |
        </motion.span>
      )}
    </motion.p>
  );
}

/**
 * ===== COMPOSANT GoldenParticles =====
 *
 * Particules dorées qui MONTENT vers le ciel.
 * C'est l'inverse de la neige du Chapitre 1 :
 * - Chapitre 1 : la neige TOMBE (tristesse, froid)
 * - Chapitre 7 : les particules MONTENT (espoir, chaleur)
 *
 * Créé en pur Framer Motion (pas de tsparticles).
 */
function GoldenParticles({ intensity }) {
  /**
   * intensity : de 0 à 1
   * Contrôle combien de particules sont visibles et leur luminosité.
   * Plus le soleil monte, plus les particules sont intenses.
   */
  const particleCount = Math.floor(10 + intensity * 30);

  return (
    <>
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={`gold-${i}-${particleCount}`}
          initial={{
            opacity: 0,
            y: 0,
            x: 0,
          }}
          animate={{
            opacity: [0, 0.4 + intensity * 0.4, 0],
            y: [0, -(100 + Math.random() * 300)],
            x: [(Math.random() - 0.5) * 50, (Math.random() - 0.5) * 100],
          }}
          transition={{
            duration: 4 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            bottom: `${Math.random() * 40}%`,
            left: `${5 + Math.random() * 90}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(255, 215, 0, ${0.6 + intensity * 0.4}), 
              rgba(255, 179, 71, 0.3)
            )`,
            boxShadow: `0 0 ${3 + intensity * 5}px rgba(255, 215, 0, ${0.2 + intensity * 0.3})`,
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
      ))}
    </>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter7 =====
 */
function Chapter7() {
  /**
   * currentPassage : index du passage actuel (0 = pas commencé)
   */
  const [currentPassage, setCurrentPassage] = useState(0);

  /**
   * typingComplete : le texte actuel a fini de s'afficher
   * On empêche de cliquer pendant que le texte s'affiche
   */
  const [typingComplete, setTypingComplete] = useState(true);

  /**
   * showFinalMessage : affiche le message final complet
   */
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  /**
   * showEnding : écran de fin (après le message final)
   */
  const [showEnding, setShowEnding] = useState(false);

  /**
   * showHint : indication
   */
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Quand tous les passages sont affichés → message final
  useEffect(() => {
    if (currentPassage > PASSAGES.length) {
      const timer = setTimeout(() => setShowFinalMessage(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [currentPassage]);

  /**
   * handleClick : avance au passage suivant
   * Ne fonctionne que si le texte actuel a fini de s'afficher.
   */
  const handleClick = () => {
    if (!typingComplete) return;
    if (currentPassage > PASSAGES.length) return;

    setCurrentPassage((prev) => prev + 1);
    setTypingComplete(false);
    setShowHint(false);
  };

  /**
   * Calcul de la progression du ciel
   * 0 = nuit noire, 1 = aurore dorée
   */
  const skyProgress =
    currentPassage > 0 && currentPassage <= PASSAGES.length
      ? PASSAGES[currentPassage - 1].skyProgress
      : currentPassage > PASSAGES.length
        ? 1
        : 0;

  const currentData =
    currentPassage > 0 && currentPassage <= PASSAGES.length
      ? PASSAGES[currentPassage - 1]
      : null;

  const allDone = currentPassage > PASSAGES.length;

  /**
   * ===== CALCUL DES COULEURS DU CIEL =====
   *
   * On interpole entre les couleurs de la nuit et celles de l'aurore.
   * skyProgress va de 0 (nuit) à 1 (aurore).
   *
   * On utilise des stops de dégradé pour simuler un vrai lever de soleil :
   * - Haut du ciel : reste sombre plus longtemps
   * - Horizon (bas) : se réchauffe en premier
   */
  const skyGradient = `linear-gradient(180deg, 
    hsl(${230 + skyProgress * 10}, ${30 + skyProgress * 20}%, ${4 + skyProgress * 12}%) 0%,
    hsl(${240 - skyProgress * 30}, ${25 + skyProgress * 30}%, ${6 + skyProgress * 20}%) 30%,
    hsl(${250 - skyProgress * 80}, ${20 + skyProgress * 50}%, ${8 + skyProgress * 35}%) 55%,
    hsl(${260 - skyProgress * 140}, ${30 + skyProgress * 50}%, ${10 + skyProgress * 45}%) 75%,
    hsl(${270 - skyProgress * 220}, ${40 + skyProgress * 40}%, ${15 + skyProgress * 50}%) 100%
  )`;

  return (
    <div
      onClick={!allDone ? handleClick : undefined}
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background: skyGradient,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: !allDone && typingComplete ? "pointer" : "default",
        overflow: "hidden",
        padding: "30px 20px",
        /* Transition douce du ciel */
        transition: "background 2s ease",
      }}
    >
      {/* ===== SOLEIL ===== */}
      {/*
        Le soleil monte progressivement depuis le bas de l'écran.
        Sa position verticale est liée à skyProgress.
        
        bottom: skyProgress * 35% → 
          à 0, il est caché sous l'horizon
          à 1, il est visible au-dessus
      */}
      <motion.div
        animate={{
          bottom: `${-5 + skyProgress * 35}%`,
          opacity: Math.min(skyProgress * 2, 1),
          scale: [1, 1.02, 1],
        }}
        transition={{
          bottom: { duration: 2, ease: "easeOut" },
          opacity: { duration: 2 },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          width: `${100 + skyProgress * 60}px`,
          height: `${100 + skyProgress * 60}px`,
          borderRadius: "50%",
          background: `radial-gradient(circle, 
            rgba(255, 223, 140, ${0.5 + skyProgress * 0.5}) 0%, 
            rgba(255, 179, 71, ${0.3 + skyProgress * 0.4}) 30%, 
            rgba(255, 140, 50, ${0.1 + skyProgress * 0.2}) 60%, 
            transparent 80%
          )`,
          boxShadow: `
            0 0 ${40 + skyProgress * 80}px rgba(255, 200, 100, ${skyProgress * 0.4}),
            0 0 ${80 + skyProgress * 120}px rgba(255, 179, 71, ${skyProgress * 0.2})
          `,
          zIndex: 1,
          pointerEvents: "none",
        }}
      />

      {/* ===== LIGNE D'HORIZON ===== */}
      <div
        style={{
          position: "absolute",
          bottom: "28%",
          left: 0,
          width: "100%",
          height: "2px",
          background: `linear-gradient(90deg, 
          transparent, 
          rgba(255, 200, 130, ${skyProgress * 0.3}), 
          rgba(255, 220, 150, ${skyProgress * 0.4}),
          rgba(255, 200, 130, ${skyProgress * 0.3}), 
          transparent
        )`,
          zIndex: 2,
          pointerEvents: "none",
          transition: "background 2s ease",
        }}
      />

      {/* ===== PARTICULES DORÉES ===== */}
      <GoldenParticles intensity={skyProgress} />

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
          textShadow: `0 0 30px rgba(255, 200, 100, ${0.1 + skyProgress * 0.4})`,
          marginBottom: "10px",
          textAlign: "center",
          zIndex: 5,
          transition: "text-shadow 2s ease",
        }}
      >
        L'Aurore
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
          marginBottom: "30px",
          zIndex: 5,
        }}
      >
        le dernier mot est un lever de soleil
      </motion.p>

      {/* ===== ZONE DU TEXTE PRINCIPAL ===== */}
      <div
        style={{
          position: "relative",
          zIndex: 5,
          maxWidth: "620px",
          width: "100%",
          minHeight: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        <AnimatePresence mode="wait">
          {currentData && (
            <motion.div
              key={currentPassage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              style={{ textAlign: "center", width: "100%" }}
            >
              <TypewriterText
                text={currentData.text}
                speed={55}
                onComplete={() => setTypingComplete(true)}
                style={{
                  fontSize: "clamp(1.15rem, 2.8vw, 1.6rem)",
                  color: `rgba(240, 244, 255, ${0.8 + skyProgress * 0.2})`,
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 1.9,
                  fontWeight: 400,
                  /* Le texte prend une teinte dorée avec la progression */
                  textShadow: `0 0 ${skyProgress * 15}px rgba(255, 215, 0, ${skyProgress * 0.2})`,
                  transition: "text-shadow 2s ease",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== INDICATION ===== */}
      {showHint && !allDone && typingComplete && (
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
          clique pour lever le soleil...
        </motion.p>
      )}

      {/* ===== PROGRESSION ===== */}
      <div
        style={{
          display: "flex",
          gap: "6px",
          zIndex: 5,
          marginTop: "15px",
        }}
      >
        {PASSAGES.map((_, i) => (
          <div
            key={i}
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              background:
                i < currentPassage
                  ? `rgba(255, 215, 0, ${0.5 + (i / PASSAGES.length) * 0.5})`
                  : "rgba(240, 244, 255, 0.15)",
              transition: "all 0.8s ease",
              boxShadow:
                i < currentPassage
                  ? `0 0 4px rgba(255, 215, 0, ${0.2 + (i / PASSAGES.length) * 0.3})`
                  : "none",
            }}
          />
        ))}
      </div>

      {/* ===== ÉTOILES QUI S'ÉTEIGNENT ===== */}
      {/*
        Les étoiles du ciel nocturne disparaissent progressivement
        à mesure que le soleil monte. Beau symbolisme.
      */}
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`star-${i}`}
          animate={{
            opacity:
              Math.max(0, 1 - skyProgress * 1.5) * (0.3 + Math.random() * 0.5),
          }}
          transition={{ duration: 2 }}
          style={{
            position: "absolute",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 50}%`,
            width: `${1 + Math.random() * 2}px`,
            height: `${1 + Math.random() * 2}px`,
            borderRadius: "50%",
            background: "#f0f4ff",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}

      {/* ===== MESSAGE FINAL ===== */}
      <AnimatePresence>
        {showFinalMessage && !showEnding && (
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
              /* Fond aurore doré */
              background: `radial-gradient(ellipse at 50% 80%, 
                rgba(255, 200, 100, 0.15) 0%, 
                rgba(255, 179, 71, 0.05) 30%,
                rgba(10, 14, 39, 0.9) 70%
              )`,
              backdropFilter: "blur(8px)",
              zIndex: 100,
              padding: "30px 20px",
              overflowY: "auto",
            }}
          >
            {/* Cadre du message — effet aquarelle */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.5, delay: 0.5 }}
              style={{
                maxWidth: "620px",
                width: "100%",
                padding: "40px 35px",
                /* Effet aquarelle / parchemin */
                background:
                  "linear-gradient(135deg, rgba(255, 248, 230, 0.04) 0%, rgba(255, 220, 180, 0.02) 100%)",
                borderRadius: "20px",
                border: "1px solid rgba(255, 215, 0, 0.1)",
                boxShadow:
                  "0 0 40px rgba(255, 200, 100, 0.05), inset 0 0 30px rgba(255, 215, 0, 0.02)",
              }}
            >
              {/* Paragraphe 1 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 2 }}
                style={{
                  fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                  color: "rgba(240, 244, 255, 0.95)",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 2,
                  fontWeight: 400,
                  marginBottom: "22px",
                  textAlign: "center",
                }}
              >
                Je ne peux plus t'aimer comme je t'aimais. Mais je ne peux pas
                non plus t'oublier.
              </motion.p>

              {/* Paragraphe 2 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 2 }}
                style={{
                  fontSize: "clamp(1.05rem, 2.3vw, 1.3rem)",
                  color: "rgba(255, 215, 150, 0.85)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  lineHeight: 2,
                  marginBottom: "22px",
                  textAlign: "center",
                }}
              >
                Alors je choisis ceci : être ce jardin où tu peux revenir, juste
                pour respirer. Pas comme amants. Comme âmes qui se reconnaissent
                dans le noir.
              </motion.p>

              {/* Paragraphe 3 */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 6, duration: 2 }}
                style={{
                  fontSize: "clamp(1.05rem, 2.3vw, 1.3rem)",
                  color: "rgba(240, 244, 255, 0.8)",
                  fontFamily: "'Cormorant Garamond', serif",
                  lineHeight: 2,
                  marginBottom: "22px",
                  textAlign: "center",
                }}
              >
                Où que tu ailles, qui que tu choisisses, une part de moi
                veillera toujours sur ton bonheur. Pas par possession. Par
                gratitude. Parce que tu m'as montré ce que « aimer » veut
                vraiment dire.
              </motion.p>

              {/* Paragraphe 4 — le plus personnel */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 8.5, duration: 2 }}
                style={{
                  fontSize: "clamp(1rem, 2.2vw, 1.25rem)",
                  color: "rgba(255, 200, 130, 0.75)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  lineHeight: 2,
                  marginBottom: "22px",
                  textAlign: "center",
                }}
              >
                Sois heureuse. Profondément, scandaleusement, irréversiblement
                heureuse. C'est tout ce que je demande à l'univers pour toi.
              </motion.p>

              {/* Séparateur lumineux */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ delay: 10.5, duration: 1.5 }}
                style={{
                  width: "60%",
                  height: "1px",
                  background:
                    "linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.3), transparent)",
                  margin: "25px auto",
                }}
              />

              {/* Signature — anonyme mais reconnaissable */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 11.5, duration: 2 }}
                style={{
                  fontSize: "clamp(1rem, 2vw, 1.2rem)",
                  color: "rgba(240, 244, 255, 0.5)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  textAlign: "center",
                  lineHeight: 1.8,
                }}
              >
                De celui qui a appris à aimer en silence,
                <br />
                et qui ne cessera jamais.
              </motion.p>
            </motion.div>

            {/* Bouton final */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 13 }}
              onClick={() => setShowEnding(true)}
              style={{
                marginTop: "40px",
                padding: "18px 50px",
                background: "transparent",
                border: "1px solid rgba(255, 215, 0, 0.25)",
                color: "rgba(255, 240, 210, 0.9)",
                fontSize: "1.15rem",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.2em",
                cursor: "pointer",
                borderRadius: "0",
              }}
              whileHover={{
                borderColor: "rgba(255, 215, 0, 0.5)",
                boxShadow: "0 0 25px rgba(255, 215, 0, 0.15)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Lever le soleil...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== ÉCRAN DE FIN ===== */}
      <AnimatePresence>
        {showEnding && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              /* L'aurore complète — doré chaud partout */
              background: `linear-gradient(180deg, 
                #1a1040 0%, 
                #3d2060 15%,
                #7a3a5a 30%,
                #c06040 45%,
                #e8943a 60%,
                #ffc040 75%,
                #ffd89b 90%,
                #fff5e6 100%
              )`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 200,
              padding: "30px",
            }}
          >
            {/* Soleil levant */}
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 3, delay: 1 }}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle, rgba(255,255,240,0.95) 0%, rgba(255,220,130,0.8) 40%, rgba(255,180,60,0.4) 70%, transparent 100%)",
                boxShadow:
                  "0 0 80px rgba(255, 215, 0, 0.5), 0 0 160px rgba(255, 179, 71, 0.3)",
                marginBottom: "40px",
              }}
            />

            {/* Particules finales */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`final-${i}`}
                initial={{ opacity: 0, y: 50 }}
                animate={{
                  opacity: [0, 0.6, 0],
                  y: [50, -(50 + Math.random() * 200)],
                  x: [(Math.random() - 0.5) * 80],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: 2 + Math.random() * 4,
                }}
                style={{
                  position: "absolute",
                  bottom: "30%",
                  left: `${10 + Math.random() * 80}%`,
                  width: `${2 + Math.random() * 5}px`,
                  height: `${2 + Math.random() * 5}px`,
                  borderRadius: "50%",
                  background: "rgba(255, 255, 240, 0.7)",
                  boxShadow: "0 0 6px rgba(255, 215, 0, 0.4)",
                  pointerEvents: "none",
                }}
              />
            ))}

            {/* Texte de fin */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 2 }}
              style={{
                fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
                color: "rgba(60, 30, 10, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontWeight: 400,
                textAlign: "center",
                lineHeight: 1.8,
                maxWidth: "500px",
              }}
            >
              Le soleil se lève.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 5, duration: 2 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "rgba(80, 40, 15, 0.6)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                textAlign: "center",
                lineHeight: 1.8,
                maxWidth: "450px",
                marginTop: "15px",
              }}
            >
              Et quelque part, quelqu'un pense à toi.
              <br />
              Toujours.
            </motion.p>

            {/* Symbole final — cœur doré */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 7, duration: 1.5, ease: "easeOut" }}
              style={{
                marginTop: "40px",
                fontSize: "2rem",
                filter: "drop-shadow(0 0 10px rgba(255, 215, 0, 0.5))",
              }}
            >
              🤍
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              transition={{ delay: 8.5, duration: 2 }}
              style={{
                marginTop: "30px",
                fontSize: "0.8rem",
                color: "rgba(80, 40, 15, 0.4)",
                fontFamily: "'Inter', sans-serif",
                fontWeight: 300,
                letterSpacing: "0.15em",
              }}
            >
              pour toi, avec tout ce que je suis
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Chapter7;
