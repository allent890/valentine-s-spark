import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PicturePuzzle from "./PicturePuzzle";
import WordScramble from "./WordScramble";
import FloatingHearts from "./FloatingHearts";
import FloatingPhotos from "./FloatingPhotos";
import ValentineCard from "./ValentineCard";
import BackgroundMusic from "./BackgroundMusic";

type GameStage = "puzzle" | "scramble" | "valentine";

const GameFlow = () => {
  const [stage, setStage] = useState<GameStage>("puzzle");

  const handlePuzzleComplete = () => {
    setTimeout(() => setStage("scramble"), 500);
  };

  const handleScrambleComplete = () => {
    setTimeout(() => setStage("valentine"), 500);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <BackgroundMusic />
      <FloatingHearts />
      <FloatingPhotos />
      
      {/* Progress indicator */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2">
        {["puzzle", "scramble", "valentine"].map((s, i) => (
          <motion.div
            key={s}
            className={`w-3 h-3 rounded-full transition-colors ${
              stage === s
                ? "bg-primary"
                : i < ["puzzle", "scramble", "valentine"].indexOf(stage)
                ? "bg-primary/60"
                : "bg-secondary"
            }`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {stage === "puzzle" && (
          <motion.div
            key="puzzle"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <PicturePuzzle onComplete={handlePuzzleComplete} />
          </motion.div>
        )}

        {stage === "scramble" && (
          <motion.div
            key="scramble"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
          >
            <WordScramble onComplete={handleScrambleComplete} />
          </motion.div>
        )}

        {stage === "valentine" && (
          <motion.div
            key="valentine"
            className="min-h-screen flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "backOut" }}
          >
            <ValentineCard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GameFlow;
