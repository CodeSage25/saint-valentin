/**
 * ============================================
 * 📄 Chapter3.jsx — "Le Cœur en Armure"
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * Affiche un cœur battant au centre de l'écran, entouré de plaques
 * d'armure. À chaque clic, un battement se produit, une plaque tombe,
 * et un texte poétique apparaît. Quand toute l'armure est tombée,
 * le cœur brille — nu, vulnérable, mais vivant.
 *
 * MÉTAPHORE :
 * L'armure représente la protection émotionnelle, la froideur apparente.
 * Chaque plaque qui tombe révèle la vérité : le cœur n'a jamais cessé
 * de battre pour elle.
 *
 * CONCEPTS TECHNIQUES :
 *   - keyframes CSS pour le battement cardiaque
 *   - Framer Motion pour les plaques d'armure qui tombent
 *   - Synchronisation texte/animation au clic
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== TEXTES SYNCHRONISÉS AVEC LES BATTEMENTS =====
 *
 * Chaque objet = un battement de cœur.
 * À chaque clic, on passe au battement suivant.
 */
const HEARTBEATS = [
  {
    text: "On m'a dit que j'avais changé.",
    subtext: "Que j'étais devenu froid, distant, inaccessible.",
  },
  {
    text: "Ils ne savent pas que la froideur est le prix que je paie.",
    subtext: "Pour ne pas m'effondrer chaque fois que je pense à toi.",
  },
  {
    text: "J'ai construit cette armure le jour où j'ai compris...",
    subtext: "Que te perdre n'était pas un risque. C'était déjà fait.",
  },
  {
    text: "Mais un cœur en armure reste un cœur.",
    subtext: "Il bat. Il saigne. Il se souvient.",
  },
  {
    text: "Le mien n'a jamais appris à t'oublier.",
    subtext: "Il a juste appris à saigner en silence.",
  },
  {
    text: "Et ce soir, pour toi, il enlève son armure.",
    subtext: "Pas pour revenir. Juste pour te montrer qu'il est vivant.",
  },
];

/**
 * ===== PLAQUES D'ARMURE =====
 *
 * 6 plaques disposées autour du cœur.
 * Chaque plaque a une position (angle) et une taille.
 *
 * L'angle détermine OÙ la plaque se trouve autour du cœur.
 * On utilise les degrés d'un cercle (0° = droite, 90° = bas, etc.)
 *
 * Chaque plaque tombe dans une direction différente quand elle
 * se détache, pour un effet plus naturel et dramatique.
 */
const ARMOR_PLATES = [
  {
    id: 0,
    angle: 0, // Droite
    width: 45,
    height: 60,
    fallX: 120, // Direction de chute horizontale
    fallY: 80, // Direction de chute verticale
    fallRotate: 45, // Rotation pendant la chute
  },
  {
    id: 1,
    angle: 60, // Haut-droite
    width: 40,
    height: 55,
    fallX: 80,
    fallY: -100,
    fallRotate: -30,
  },
  {
    id: 2,
    angle: 120, // Haut-gauche
    width: 42,
    height: 58,
    fallX: -90,
    fallY: -90,
    fallRotate: 60,
  },
  {
    id: 3,
    angle: 180, // Gauche
    width: 45,
    height: 60,
    fallX: -120,
    fallY: 70,
    fallRotate: -50,
  },
  {
    id: 4,
    angle: 240, // Bas-gauche
    width: 38,
    height: 52,
    fallX: -80,
    fallY: 110,
    fallRotate: 35,
  },
  {
    id: 5,
    angle: 300, // Bas-droite
    width: 40,
    height: 55,
    fallX: 100,
    fallY: 100,
    fallRotate: -40,
  },
];

/**
 * ===== COMPOSANT ArmorPlate =====
 *
 * Une seule plaque d'armure.
 * Elle est positionnée autour du cœur grâce à la trigonométrie
 * (cos/sin de l'angle pour calculer x/y).
 *
 * Quand elle est "fallen", elle joue une animation de chute
 * puis disparaît.
 */
function ArmorPlate({ plate, isFallen, heartSize }) {
  /**
   * Calcul de la position autour du cœur
   *
   * On convertit l'angle en RADIANS (les fonctions cos/sin
   * de JavaScript utilisent des radians, pas des degrés).
   *
   * Formula : radians = degrés × (π / 180)
   *
   * Puis on calcule x et y :
   *   x = cos(angle) × rayon
   *   y = sin(angle) × rayon
   *
   * Le rayon (distance du centre) = la moitié de la taille du cœur + un peu
   */
  const radius = heartSize / 2 + 15;
  const angleRad = (plate.angle * Math.PI) / 180;
  const x = Math.cos(angleRad) * radius;
  const y = Math.sin(angleRad) * radius;

  return (
    <AnimatePresence>
      {!isFallen && (
        <motion.div
          initial={{
            opacity: 1,
            x: x,
            y: y,
            rotate: plate.angle + 90,
          }}
          exit={{
            /* Animation de CHUTE de la plaque */
            opacity: 0,
            x: x + plate.fallX,
            y: y + plate.fallY,
            rotate: plate.angle + plate.fallRotate,
            scale: 0.3,
          }}
          transition={{
            duration: 1.2,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{
            position: "absolute",
            width: `${plate.width}px`,
            height: `${plate.height}px`,
            /* Centrage : on décale de la moitié de la taille */
            marginLeft: `-${plate.width / 2}px`,
            marginTop: `-${plate.height / 2}px`,
            /* Apparence de métal / armure */
            background:
              "linear-gradient(135deg, rgba(120, 130, 160, 0.4) 0%, rgba(80, 90, 120, 0.2) 50%, rgba(120, 130, 160, 0.3) 100%)",
            border: "1px solid rgba(150, 160, 190, 0.3)",
            borderRadius: "4px",
            /* Reflet métallique */
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 10px rgba(0,0,0,0.3)",
            /* Texture légère */
            backdropFilter: "blur(2px)",
          }}
        >
          {/* Ligne de détail sur la plaque (rivet / jointure) */}
          <div
            style={{
              position: "absolute",
              top: "20%",
              left: "15%",
              width: "70%",
              height: "1px",
              background: "rgba(200, 210, 230, 0.15)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: "60%",
              left: "10%",
              width: "80%",
              height: "1px",
              background: "rgba(200, 210, 230, 0.1)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter3 =====
 */
function Chapter3({ onComplete }) {
  /**
   * currentBeat : index du battement actuel (0 à 5)
   * Chaque clic incrémente ce compteur.
   */
  const [currentBeat, setCurrentBeat] = useState(0);

  /**
   * fallenPlates : Set des IDs des plaques tombées
   * Même logique que brokenIds dans Chapter2.
   */
  const [fallenPlates, setFallenPlates] = useState(new Set());

  /**
   * showFinalMessage : affiche le message final
   */
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  /**
   * showHint : indication "clique pour continuer"
   */
  const [showHint, setShowHint] = useState(false);

  /**
   * isPulsing : déclenche une pulsation forte au clic
   * Redevient false après l'animation pour permettre la suivante.
   */
  const [isPulsing, setIsPulsing] = useState(false);

  /**
   * heartSize : taille du cœur en pixels.
   * On l'augmente légèrement quand l'armure tombe
   * pour montrer qu'il "respire" mieux sans elle.
   */
  const heartBaseSize = 140;

  // Affiche l'indication après 3 secondes
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Quand toutes les plaques sont tombées → message final
  useEffect(() => {
    if (
      fallenPlates.size === ARMOR_PLATES.length &&
      currentBeat >= HEARTBEATS.length
    ) {
      const timer = setTimeout(() => setShowFinalMessage(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [fallenPlates.size, currentBeat]);

  /**
   * handleClick : gère le clic sur la page
   *
   * 1. Déclenche une pulsation forte du cœur
   * 2. Fait tomber la plaque correspondante
   * 3. Révèle le texte suivant
   */
  const handleClick = () => {
    if (currentBeat >= HEARTBEATS.length) return;

    // Déclenche la pulsation
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 600);

    // Fait tomber la plaque correspondante
    setFallenPlates((prev) => {
      const next = new Set(prev);
      next.add(currentBeat);
      return next;
    });

    // Passe au battement suivant
    setCurrentBeat((prev) => prev + 1);
    setShowHint(false);
  };

  /**
   * Calcul du pourcentage d'armure restante
   * Utilisé pour ajuster la taille et la luminosité du cœur
   */
  const armorRemaining = 1 - fallenPlates.size / ARMOR_PLATES.length;
  const allDone = currentBeat >= HEARTBEATS.length;

  // ===== RENDU =====
  return (
    <div
      onClick={!allDone ? handleClick : undefined}
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        background:
          "linear-gradient(180deg, #0a0e27 0%, #120e24 50%, #0a0e27 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        cursor: !allDone ? "pointer" : "default",
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
          textShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
          marginBottom: "15px",
          textAlign: "center",
          zIndex: 1,
        }}
      >
        Le Cœur en Armure
      </motion.h2>

      {/* ===== ZONE DU CŒUR + ARMURE ===== */}
      {/*
        Cette zone contient :
        1. Le cœur central (emoji + halo)
        2. Les plaques d'armure positionnées autour
        
        Tout est centré avec flexbox.
        Les plaques utilisent position: absolute par rapport à cette zone.
      */}
      <div
        style={{
          position: "relative",
          width: "300px",
          height: "300px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "20px",
          marginBottom: "20px",
          zIndex: 1,
        }}
      >
        {/* ===== HALO DU CŒUR ===== */}
        {/*
          Un cercle lumineux derrière le cœur.
          Il devient PLUS LUMINEUX à mesure que l'armure tombe.
          
          armorRemaining va de 1 (tout couvert) à 0 (tout nu).
          Donc (1 - armorRemaining) va de 0 à 1 = de sombre à lumineux.
        */}
        <motion.div
          animate={{
            scale: isPulsing ? [1, 1.3, 1] : [1, 1.05, 1],
            opacity: 0.15 + (1 - armorRemaining) * 0.4,
          }}
          transition={{
            scale: {
              duration: isPulsing ? 0.6 : 2,
              repeat: isPulsing ? 0 : Infinity,
              ease: "easeInOut",
            },
            opacity: { duration: 1 },
          }}
          style={{
            position: "absolute",
            width: `${heartBaseSize + 80}px`,
            height: `${heartBaseSize + 80}px`,
            borderRadius: "50%",
            background: `radial-gradient(circle, 
              rgba(220, 50, 80, ${0.2 + (1 - armorRemaining) * 0.3}) 0%, 
              rgba(150, 30, 60, 0.1) 40%, 
              transparent 70%
            )`,
            filter: `blur(${10 + (1 - armorRemaining) * 10}px)`,
          }}
        />

        {/* ===== LE CŒUR ===== */}
        <motion.div
          animate={{
            /* Battement cardiaque :
               - Normal : léger pulse en boucle
               - Au clic (isPulsing) : battement fort et rapide */
            scale: isPulsing
              ? [1, 1.25, 0.95, 1.15, 1] // Battement fort (lub-dub)
              : [1, 1.03, 1], // Battement léger au repos
          }}
          transition={{
            duration: isPulsing ? 0.6 : 1.5,
            repeat: isPulsing ? 0 : Infinity,
            ease: "easeInOut",
          }}
          style={{
            fontSize: `${heartBaseSize * 0.6}px`,
            zIndex: 2,
            /* Le cœur devient plus lumineux à mesure que l'armure tombe */
            filter: `
              drop-shadow(0 0 ${5 + (1 - armorRemaining) * 25}px rgba(220, 50, 80, ${0.3 + (1 - armorRemaining) * 0.5}))
              brightness(${0.7 + (1 - armorRemaining) * 0.5})
            `,
            /* Transition douce du filtre */
            transition: "filter 1s ease",
            /* Empêche le cœur de capter les clics (on veut le div parent) */
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          ❤️
        </motion.div>

        {/* ===== LES PLAQUES D'ARMURE ===== */}
        {ARMOR_PLATES.map((plate) => (
          <ArmorPlate
            key={plate.id}
            plate={plate}
            isFallen={fallenPlates.has(plate.id)}
            heartSize={heartBaseSize}
          />
        ))}
      </div>

      {/* ===== ZONE DES TEXTES ===== */}
      {/*
        Les textes apparaissent sous le cœur.
        On n'affiche QUE le texte du battement actuel (le dernier révélé),
        pas tous les textes précédents — pour garder l'attention focalisée.
      */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "600px",
          width: "100%",
          minHeight: "120px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <AnimatePresence mode="wait">
          {currentBeat > 0 && currentBeat <= HEARTBEATS.length && (
            <motion.div
              /*
               * key={currentBeat} est CRUCIAL ici.
               * Quand la key change, React considère que c'est un NOUVEL élément.
               * Donc l'ancien sort (exit) et le nouveau entre (initial → animate).
               *
               * mode="wait" sur AnimatePresence fait que l'ancien
               * finit de sortir AVANT que le nouveau n'entre.
               */
              key={currentBeat}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1, ease: "easeOut" }}
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
                  marginBottom: "10px",
                }}
              >
                {HEARTBEATS[currentBeat - 1].text}
              </p>

              {/* Sous-texte (plus discret) */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
                  color: "rgba(220, 50, 80, 0.7)",
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: "italic",
                  lineHeight: 1.7,
                  fontWeight: 300,
                }}
              >
                {HEARTBEATS[currentBeat - 1].subtext}
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ===== INDICATION "CLIQUE" ===== */}
      {showHint && !allDone && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          style={{
            fontSize: "0.85rem",
            color: "rgba(240, 244, 255, 0.35)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.1em",
            zIndex: 1,
          }}
        >
          clique pour faire battre le cœur...
        </motion.p>
      )}

      {/* ===== COMPTEUR DE BATTEMENTS ===== */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          zIndex: 1,
          marginTop: "10px",
          marginBottom: "20px",
        }}
      >
        {HEARTBEATS.map((_, i) => (
          <motion.div
            key={i}
            animate={{
              /* Les points deviennent rouges quand le battement est passé */
              background:
                i < currentBeat
                  ? "rgba(220, 50, 80, 0.8)"
                  : "rgba(240, 244, 255, 0.15)",
              /* Le point du battement actuel pulse */
              scale: i === currentBeat - 1 ? [1, 1.4, 1] : 1,
            }}
            transition={{
              scale: { duration: 0.6 },
              background: { duration: 0.5 },
            }}
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
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
              background: "rgba(220, 50, 80, 0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(220, 50, 80, 0.1)",
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
                fontWeight: 400,
                marginBottom: "20px",
              }}
            >
              Le voilà, mon cœur. Sans armure. Sans défense.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.25rem)",
                color: "rgba(220, 100, 120, 0.8)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: "20px",
              }}
            >
              Il ne demande rien. Ni retour, ni pitié, ni seconde chance. Il
              veut juste que tu saches qu'il existe encore. Qu'il bat encore.
              Pour toi. Malgré tout. Malgré lui.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.35rem)",
                color: "rgba(240, 244, 255, 0.7)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.8,
              }}
            >
              « Mon cœur ne t'a jamais oubliée. Il a juste appris à saigner en
              silence. »
            </motion.p>

            {/* Bouton Continuer */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 5 }}
              onClick={(e) => {
                e.stopPropagation();
                onComplete();
              }}
              style={{
                marginTop: "40px",
                padding: "15px 40px",
                background: "transparent",
                border: "1px solid rgba(220, 100, 120, 0.3)",
                color: "#f0f4ff",
                fontSize: "1.1rem",
                fontFamily: "'Cormorant Garamond', serif",
                letterSpacing: "0.15em",
                cursor: "pointer",
                transition: "all 0.4s ease",
                borderRadius: "0",
              }}
              whileHover={{
                borderColor: "rgba(220, 100, 120, 0.6)",
                boxShadow: "0 0 20px rgba(220, 50, 80, 0.2)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Continuer...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== PARTICULES AMBIANTES ===== */}
      {/*
        De petites particules rouges flottent en arrière-plan.
        Elles sont plus nombreuses et lumineuses quand l'armure tombe.
        Créées en pur CSS/Framer Motion (pas de tsparticles).
      */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          animate={{
            y: [0, -30 - Math.random() * 40, 0],
            x: [0, (Math.random() - 0.5) * 60, 0],
            opacity: [0, 0.15 + (1 - armorRemaining) * 0.25, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            left: `${10 + Math.random() * 80}%`,
            top: `${10 + Math.random() * 80}%`,
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            borderRadius: "50%",
            background: "rgba(220, 50, 80, 0.6)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      ))}
    </div>
  );
}

export default Chapter3;
