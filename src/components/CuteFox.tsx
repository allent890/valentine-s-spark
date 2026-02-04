import { motion } from "framer-motion";

type FoxMood = "happy" | "sad" | "teary" | "angry" | "pleading";

interface CuteFoxProps {
  mood?: FoxMood;
}

const CuteFox = ({ mood = "happy" }: CuteFoxProps) => {
  const getMouthPath = () => {
    switch (mood) {
      case "sad":
      case "teary":
        return "M175 175 Q190 160 205 175"; // Frown
      case "angry":
        return "M175 172 L190 168 L205 172"; // Angry line
      case "pleading":
        return "M180 170 Q190 165 200 170"; // Slight frown
      default:
        return "M175 165 Q190 180 205 165"; // Smile
    }
  };

  const getEyeStyle = () => {
    switch (mood) {
      case "sad":
        return { cy: 135 }; // Eyes looking down
      case "teary":
        return { cy: 135 };
      case "angry":
        return { cy: 128 }; // Eyes looking up/intense
      case "pleading":
        return { cy: 132 };
      default:
        return { cy: 130 };
    }
  };

  const getEyebrows = () => {
    switch (mood) {
      case "angry":
        return (
          <>
            <motion.line
              x1="148" y1="110" x2="172" y2="118"
              stroke="#2d1810"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <motion.line
              x1="232" y1="110" x2="208" y2="118"
              stroke="#2d1810"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </>
        );
      case "sad":
      case "teary":
      case "pleading":
        return (
          <>
            <motion.line
              x1="148" y1="118" x2="172" y2="112"
              stroke="#2d1810"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
            <motion.line
              x1="232" y1="118" x2="208" y2="112"
              stroke="#2d1810"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          </>
        );
      default:
        return null;
    }
  };

  const getTears = () => {
    if (mood !== "teary") return null;
    return (
      <>
        <motion.ellipse
          cx="150"
          cy="158"
          rx="4"
          ry="8"
          fill="#87CEEB"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [0, 15], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.5 }}
        />
        <motion.ellipse
          cx="230"
          cy="158"
          rx="4"
          ry="8"
          fill="#87CEEB"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: [0, 15], opacity: [1, 0] }}
          transition={{ duration: 1, repeat: Infinity, repeatDelay: 0.3, delay: 0.2 }}
        />
      </>
    );
  };

  const eyeStyle = getEyeStyle();

  return (
    <motion.svg
      className="w-48 h-48 md:w-64 md:h-64 mx-auto drop-shadow-xl"
      viewBox="0 0 320 240"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: "backOut" }}
    >
      <defs>
        <linearGradient id="fur" x1="0" x2="1">
          <stop offset="0" stopColor="#f7c7a1" />
          <stop offset="1" stopColor="#f2a97b" />
        </linearGradient>
        <linearGradient id="heartGrad" x1="0" x2="1">
          <stop offset="0" stopColor="hsl(340, 82%, 52%)" />
          <stop offset="1" stopColor="hsl(350, 100%, 65%)" />
        </linearGradient>
      </defs>

      {/* Floating heart - only show when happy */}
      {mood === "happy" && (
        <motion.path
          d="M250 50 C250 33 270 25 282 38
             C294 25 314 33 314 50
             C314 78 282 92 282 106
             C282 92 250 78 250 50Z"
          fill="url(#heartGrad)"
          animate={{
            y: [0, -8, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="animate-pulse-glow"
        />
      )}

      {/* Broken heart when sad/teary */}
      {(mood === "sad" || mood === "teary") && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <path
            d="M250 50 C250 33 270 25 280 38 L280 106 L250 78 Z"
            fill="#999"
          />
          <path
            d="M284 38 C294 25 314 33 314 50 C314 78 284 92 284 106 L284 38Z"
            fill="#888"
          />
        </motion.g>
      )}

      {/* Angry symbol when angry */}
      {mood === "angry" && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <text x="270" y="70" fontSize="40" fill="#ff4444">💢</text>
        </motion.g>
      )}

      {/* Fox body */}
      <path
        d="M90 120 C90 70 140 40 190 60
           C240 40 290 70 290 120
           C290 180 240 210 190 210
           C140 210 90 180 90 120Z"
        fill="url(#fur)"
      />

      {/* Ears */}
      <path d="M110 92 L95 55 L140 78 Z" fill="#f2a97b" />
      <path d="M270 92 L285 55 L240 78 Z" fill="#f2a97b" />

      {/* Inner ears */}
      <path d="M115 90 L105 65 L130 80 Z" fill="#ffb8c6" />
      <path d="M265 90 L275 65 L250 80 Z" fill="#ffb8c6" />

      {/* Eyebrows */}
      {getEyebrows()}

      {/* Eyes */}
      <motion.g
        animate={mood === "happy" ? { scaleY: [1, 0.1, 1] } : {}}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <motion.circle
          cx="160"
          cy={eyeStyle.cy}
          r={mood === "pleading" ? 14 : 10}
          fill="#2d1810"
          animate={{ cy: eyeStyle.cy }}
        />
        <motion.circle
          cx="220"
          cy={eyeStyle.cy}
          r={mood === "pleading" ? 14 : 10}
          fill="#2d1810"
          animate={{ cy: eyeStyle.cy }}
        />
        <circle cx="163" cy={eyeStyle.cy - 3} r="3" fill="white" />
        <circle cx="223" cy={eyeStyle.cy - 3} r="3" fill="white" />
        
        {/* Extra shine for pleading eyes */}
        {mood === "pleading" && (
          <>
            <circle cx="166" cy={eyeStyle.cy + 2} r="2" fill="white" opacity="0.7" />
            <circle cx="226" cy={eyeStyle.cy + 2} r="2" fill="white" opacity="0.7" />
          </>
        )}
      </motion.g>

      {/* Tears */}
      {getTears()}

      {/* Nose */}
      <path
        d="M190 144 C186 144 182 148 182 152
           C182 160 190 164 190 170
           C190 164 198 160 198 152
           C198 148 194 144 190 144Z"
        fill="#ff7aa2"
      />

      {/* Cheeks - fade when angry */}
      <circle
        cx="140"
        cy="150"
        r="12"
        fill="#ffb8c6"
        opacity={mood === "angry" ? 0.3 : 0.6}
      />
      <circle
        cx="240"
        cy="150"
        r="12"
        fill="#ffb8c6"
        opacity={mood === "angry" ? 0.3 : 0.6}
      />

      {/* Mouth */}
      <motion.path
        d={getMouthPath()}
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={false}
        animate={{ d: getMouthPath() }}
      />
    </motion.svg>
  );
};

export default CuteFox;
