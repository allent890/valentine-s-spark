import { motion } from "framer-motion";

const CuteFox = () => {
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

      {/* Floating heart */}
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

      {/* Eyes */}
      <motion.g
        animate={{ scaleY: [1, 0.1, 1] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
      >
        <circle cx="160" cy="130" r="10" fill="#2d1810" />
        <circle cx="220" cy="130" r="10" fill="#2d1810" />
        <circle cx="163" cy="127" r="3" fill="white" />
        <circle cx="223" cy="127" r="3" fill="white" />
      </motion.g>

      {/* Nose */}
      <path
        d="M190 144 C186 144 182 148 182 152
           C182 160 190 164 190 170
           C190 164 198 160 198 152
           C198 148 194 144 190 144Z"
        fill="#ff7aa2"
      />

      {/* Cheeks */}
      <circle cx="140" cy="150" r="12" fill="#ffb8c6" opacity="0.6" />
      <circle cx="240" cy="150" r="12" fill="#ffb8c6" opacity="0.6" />

      {/* Smile */}
      <path
        d="M175 165 Q190 180 205 165"
        stroke="#2d1810"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
    </motion.svg>
  );
};

export default CuteFox;
