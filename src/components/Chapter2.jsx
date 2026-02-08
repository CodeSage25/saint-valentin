/**
 * ============================================
 * 📄 Chapter2.jsx — "Le Jardin Sous la Glace"
 * ============================================
 *
 * CE COMPOSANT FAIT QUOI ?
 * Affiche un jardin gelé avec 5 blocs de glace.
 * L'utilisatrice clique sur chaque bloc pour le briser.
 * Chaque bloc brisé révèle une fleur vivante et un texte poétique.
 *
 * MÉTAPHORE ÉMOTIONNELLE :
 * "Ce que tu prends pour du gel est une armure de survie.
 *  Dessous, tout vit encore. Tout t'attend encore."
 *
 * CONCEPTS REACT UTILISÉS :
 *   - useState : pour savoir quels blocs sont brisés
 *   - useEffect : pour déclencher des effets après la casse
 *   - map : pour afficher les 5 blocs depuis un tableau de données
 *
 * CONCEPTS FRAMER MOTION :
 *   - variants : définir des états d'animation nommés (frozen/broken)
 *   - animate : basculer entre ces états
 *   - AnimatePresence : animer l'apparition/disparition
 */

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/**
 * ===== DONNÉES DES 5 BLOCS DE GLACE =====
 *
 * Chaque objet représente un bloc de glace contenant :
 *   - id : identifiant unique
 *   - flower : l'emoji de la fleur cachée sous la glace
 *   - color : la couleur de la lumière qui apparaît quand la glace se brise
 *   - text : le texte poétique révélé
 *   - position : placement à l'écran (en pourcentage pour le responsive)
 */
const ICE_BLOCKS = [
  {
    id: 1,
    flower: "🌹",
    color: "#ff6b8a", // Rose — couleur de l'amour qui survit
    glowColor: "rgba(255, 107, 138, 0.3)",
    text: "Ce que tu prends pour du gel est une armure de survie.",
  },
  {
    id: 2,
    flower: "🌸",
    color: "#f0a5c4", // Rose pâle — douceur cachée
    glowColor: "rgba(240, 165, 196, 0.3)",
    text: "Chaque silence portait ton nom comme une prière muette.",
  },
  {
    id: 3,
    flower: "🌺",
    color: "#c77dba", // Violet — profondeur des sentiments
    glowColor: "rgba(199, 125, 186, 0.3)",
    text: "Je n'ai pas gelé. J'ai préservé. Chaque souvenir, intact.",
  },
  {
    id: 4,
    flower: "🌷",
    color: "#ff8c69", // Corail — chaleur sous la glace
    glowColor: "rgba(255, 140, 105, 0.3)",
    text: "La froideur n'était qu'un voile. Dessous, chaque émotion brûle encore.",
  },
  {
    id: 5,
    flower: "🌻",
    color: "#ffd700", // Or — la lumière retrouvée
    glowColor: "rgba(255, 215, 0, 0.3)",
    text: "Sous la glace la plus épaisse, un jardin entier t'attendait.",
  },
];

/**
 * ===== COMPOSANT IceBlock =====
 *
 * Un seul bloc de glace cliquable.
 * C'est un "sous-composant" — il est utilisé par Chapter2
 * mais pas exporté (il reste privé à ce fichier).
 *
 * PROPS :
 *   - data : les données du bloc (id, flower, color, text...)
 *   - isBroken : true si ce bloc a été brisé, false sinon
 *   - onBreak : fonction à appeler quand on clique (brise la glace)
 *   - delay : délai d'animation pour l'entrée en scène
 */
/**
 * ===== COMPOSANT IceBlock — VERSION CORRIGÉE =====
 *
 * ✅ FIX : Réorganisation de la disposition
 *   - La fleur reste dans la zone du bloc (partie haute)
 *   - Le texte apparaît EN DESSOUS du bloc (partie basse)
 *   - Plus aucune superposition
 *
 * STRUCTURE VISUELLE :
 *   ┌─────────────┐
 *   │   🧊 / 🌹   │  ← Zone du bloc (glace OU fleur, jamais les deux)
 *   └─────────────┘
 *      texte ici      ← Le texte est SOUS le bloc, pas dedans
 */
function IceBlock({ data, isBroken, onBreak, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: delay, ease: "easeOut" }}
      style={{
        /* ✅ FIX : flexDirection column pour empiler verticalement
           La fleur/glace en haut, le texte en bas */
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        /* ✅ FIX : largeur fixe pour que chaque bloc ait le même espace */
        width: "160px",
        cursor: isBroken ? "default" : "pointer",
      }}
      onClick={() => {
        if (!isBroken) {
          onBreak(data.id);
        }
      }}
    >
      {/* ===== ZONE DU BLOC (glace + fleur superposées) ===== */}
      {/* ✅ FIX : Cette zone a une HAUTEUR FIXE de 130px
          La glace et la fleur sont dedans, superposées (position absolute)
          Le texte est EN DEHORS de cette zone */}
      <div
        style={{
          position: "relative",
          width: "130px",
          height: "130px",
          /* ✅ FIX : flex-shrink 0 empêche cette zone de rétrécir */
          flexShrink: 0,
        }}
      >
        {/* ===== LA COUCHE DE GLACE ===== */}
        <AnimatePresence>
          {!isBroken && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{
                opacity: 0,
                scale: 1.5,
                rotate: [0, -5, 5, -3, 0],
                filter: "blur(10px)",
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{
                /* Position absolute = superposé à la fleur */
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background:
                  "linear-gradient(135deg, rgba(200, 220, 255, 0.15) 0%, rgba(150, 190, 255, 0.08) 100%)",
                backdropFilter: "blur(4px)",
                WebkitBackdropFilter: "blur(4px)",
                border: "1px solid rgba(200, 220, 255, 0.25)",
                borderRadius: "12px",
                boxShadow:
                  "0 4px 20px rgba(100, 150, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "2.5rem",
                /* ✅ FIX : z-index 2 pour être AU-DESSUS de la fleur */
                zIndex: 2,
                overflow: "hidden",
              }}
              whileHover={{
                scale: 1.05,
                boxShadow:
                  "0 4px 30px rgba(100, 150, 255, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.25)",
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.95 }}
            >
              🧊
              {/* Effet de reflet lumineux */}
              <motion.div
                style={{
                  position: "absolute",
                  top: "-50%",
                  left: "-50%",
                  width: "200%",
                  height: "200%",
                  background:
                    "linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)",
                  pointerEvents: "none",
                }}
                animate={{
                  x: ["-100%", "100%"],
                  y: ["-100%", "100%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "linear",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===== LA FLEUR CACHÉE ===== */}
        {/* ✅ FIX : la fleur est DANS la même zone que la glace
            mais avec un z-index inférieur (1 vs 2)
            Quand la glace disparaît, la fleur devient visible */}
        <motion.div
          animate={
            isBroken
              ? {
                  opacity: 1,
                  scale: [0.5, 1.3, 1],
                  rotate: [0, 10, -10, 0],
                }
              : {
                  opacity: 0,
                  scale: 0.5,
                }
          }
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "3.5rem",
            /* ✅ FIX : z-index 1 = DERRIÈRE la glace */
            zIndex: 1,
            filter: isBroken
              ? `drop-shadow(0 0 15px ${data.glowColor})`
              : "none",
          }}
        >
          {data.flower}
        </motion.div>

        {/* ===== ÉCLATS DE GLACE ===== */}
        <AnimatePresence>
          {isBroken && (
            <>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={`shard-${i}`}
                  initial={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                    y: 0,
                  }}
                  animate={{
                    opacity: 0,
                    scale: 0,
                    x: Math.cos((i * Math.PI * 2) / 8) * 80,
                    y: Math.sin((i * Math.PI * 2) / 8) * 80,
                    rotate: Math.random() * 360,
                  }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                  }}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: `${6 + Math.random() * 8}px`,
                    height: `${6 + Math.random() * 8}px`,
                    background:
                      "linear-gradient(135deg, rgba(200, 220, 255, 0.6), rgba(150, 190, 255, 0.3))",
                    borderRadius: "2px",
                    zIndex: 10,
                    pointerEvents: "none",
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </div>
      {/* ===== FIN DE LA ZONE DU BLOC ===== */}

      {/* ===== TEXTE POÉTIQUE ===== */}
      {/* ✅ FIX : Le texte est maintenant COMPLÈTEMENT EN DEHORS
          de la zone du bloc. Il apparaît en dessous, avec un margin-top
          pour laisser de l'espace. Plus aucune superposition possible. */}
      <AnimatePresence>
        {isBroken && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            style={{
              /* ✅ FIX : margin-top crée l'espace entre la fleur et le texte */
              marginTop: "15px",
              fontSize: "clamp(0.75rem, 1.5vw, 0.85rem)",
              color: data.color,
              textAlign: "center",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
              lineHeight: 1.6,
              /* ✅ FIX : maxWidth limité à la largeur du bloc */
              maxWidth: "160px",
              textShadow: `0 0 20px ${data.glowColor}`,
              /* ✅ FIX : padding pour aérer le texte */
              padding: "0 5px",
            }}
          >
            {data.text}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

/**
 * ===== COMPOSANT PRINCIPAL : Chapter2 =====
 *
 * Gère l'ensemble du chapitre :
 *   - Affiche le titre et l'introduction
 *   - Affiche les 5 blocs de glace
 *   - Suit quels blocs sont brisés
 *   - Affiche le message final quand tout est brisé
 *   - Propose de continuer au chapitre suivant
 */
function Chapter2({ onComplete }) {
  /**
   * brokenIds : un Set (ensemble) contenant les IDs des blocs brisés
   *
   * POURQUOI un Set ?
   * Un Set est comme un tableau, mais :
   *   - Il ne peut PAS contenir de doublons (parfait pour notre cas)
   *   - La vérification .has(id) est très rapide
   *
   * Exemple : brokenIds = Set {1, 3} → blocs 1 et 3 sont brisés
   */
  const [brokenIds, setBrokenIds] = useState(new Set());

  /**
   * showFinalMessage : affiche le message final quand tout est brisé
   */
  const [showFinalMessage, setShowFinalMessage] = useState(false);

  /**
   * showIntro : contrôle l'affichage de l'introduction
   * Au début, on montre le titre et l'instruction
   */
  const [showIntro, setShowIntro] = useState(true);

  /**
   * Quand TOUS les blocs sont brisés (5 sur 5),
   * on affiche le message final après un délai de 1.5 secondes.
   *
   * useEffect surveille brokenIds.size :
   * à chaque changement de taille du Set, il vérifie si on a tout brisé.
   */
  useEffect(() => {
    if (brokenIds.size === ICE_BLOCKS.length) {
      const timer = setTimeout(() => {
        setShowFinalMessage(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [brokenIds.size]);

  /**
   * breakIce : fonction appelée quand un bloc est cliqué
   *
   * Elle ajoute l'ID du bloc au Set des blocs brisés.
   *
   * POURQUOI new Set(prev) ?
   * En React, on ne peut PAS modifier un state directement.
   * On doit créer un NOUVEAU Set (copie), ajouter l'ID,
   * puis remplacer l'ancien par le nouveau.
   * C'est le principe d'IMMUTABILITÉ de React.
   */
  const breakIce = (id) => {
    setBrokenIds((prev) => {
      const next = new Set(prev); // Copie du Set actuel
      next.add(id); // Ajoute le nouvel ID
      return next; // Retourne le nouveau Set
    });
  };

  // ===== RENDU =====
  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        minHeight: "100vh",
        /* Dégradé : bleu nuit en haut → bleu glacé au milieu → bleu nuit en bas
         Ça donne une impression de profondeur, comme un lac gelé */
        background:
          "linear-gradient(180deg, #0a0e27 0%, #0d1535 30%, #101d42 50%, #0d1535 70%, #0a0e27 100%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
        overflow: "hidden",
      }}
    >
      {/* ===== TITRE ET INTRODUCTION ===== */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          textAlign: "center",
          marginBottom: "50px",
          zIndex: 1,
        }}
      >
        {/* Titre du chapitre */}
        <h2
          style={{
            fontSize: "clamp(1.8rem, 4vw, 3rem)",
            fontWeight: 300,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#f0f4ff",
            fontFamily: "'Cormorant Garamond', serif",
            textShadow: "0 0 30px rgba(99, 102, 241, 0.3)",
            marginBottom: "20px",
          }}
        >
          Le Jardin Sous la Glace
        </h2>

        {/* Sous-titre / instruction */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            fontSize: "clamp(0.9rem, 2vw, 1.1rem)",
            color: "rgba(240, 244, 255, 0.5)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
            letterSpacing: "0.05em",
          }}
        >
          Brise la glace pour découvrir ce qui se cache en dessous...
        </motion.p>
      </motion.div>

      {/* ===== GRILLE DES BLOCS DE GLACE ===== */}
      {/* 
        On utilise flexbox avec flex-wrap pour que les blocs
        s'organisent automatiquement en lignes.
        Sur grand écran : 5 blocs en ligne
        Sur mobile : 2-3 blocs par ligne (grâce au wrap)
      */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "30px",
          maxWidth: "900px",
          width: "100%",
          zIndex: 1,
          marginBottom: "40px",
        }}
      >
        {ICE_BLOCKS.map((block, index) => (
          <IceBlock
            key={block.id}
            data={block}
            isBroken={brokenIds.has(block.id)}
            onBreak={breakIce}
            /* Chaque bloc arrive avec un léger décalage (effet cascade) */
            delay={0.5 + index * 0.2}
          />
        ))}
      </div>

      {/* ===== COMPTEUR DE PROGRESSION ===== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          textAlign: "center",
          zIndex: 1,
          marginBottom: "20px",
        }}
      >
        <p
          style={{
            fontSize: "0.85rem",
            color: "rgba(240, 244, 255, 0.35)",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 300,
          }}
        >
          {brokenIds.size} / {ICE_BLOCKS.length}
          {brokenIds.size === ICE_BLOCKS.length ? " — Tout est libéré" : ""}
        </p>
      </motion.div>

      {/* ===== MESSAGE FINAL ===== */}
      {/* 
        Apparaît quand tous les blocs sont brisés.
        C'est le cœur émotionnel du chapitre.
      */}
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
              /* Glassmorphism pour le conteneur du message */
              background: "rgba(255, 255, 255, 0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.06)",
            }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.4rem)",
                color: "rgba(240, 244, 255, 0.9)",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.9,
                fontWeight: 300,
                marginBottom: "15px",
              }}
            >
              Tu vois ? Rien n'a gelé pour de vrai.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1.5 }}
              style={{
                fontSize: "clamp(1rem, 2vw, 1.2rem)",
                color: "rgba(240, 244, 255, 0.7)",
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: "italic",
                lineHeight: 1.8,
                marginBottom: "15px",
              }}
            >
              Chaque fleur est un morceau de moi que j'ai mis à l'abri du monde.
              Pas par froideur. Par fidélité à ce qui était trop beau pour le
              laisser s'abîmer.
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 3, duration: 1.5 }}
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
                color: "#c77dba",
                fontFamily: "'Cormorant Garamond', serif",
                lineHeight: 1.8,
                fontWeight: 400,
              }}
            >
              Ce jardin n'a jamais cessé de fleurir. Il attendait juste que
              quelqu'un ose briser la glace.
            </motion.p>

            {/* ===== BOUTON CONTINUER ===== */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, delay: 4.5 }}
              onClick={() => onComplete()}
              style={{
                marginTop: "40px",
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
                borderColor: "rgba(199, 125, 186, 0.6)",
                boxShadow: "0 0 20px rgba(199, 125, 186, 0.2)",
                scale: 1.02,
              }}
              whileTap={{ scale: 0.98 }}
            >
              Continuer...
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== EFFET DE BRUME AU SOL ===== */}
      {/* 
        Un dégradé en bas de l'écran qui simule de la brume.
        Purement décoratif — renforce l'ambiance glaciale.
      */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "120px",
          background:
            "linear-gradient(0deg, rgba(10, 14, 39, 0.9) 0%, transparent 100%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
    </div>
  );
}

export default Chapter2;
