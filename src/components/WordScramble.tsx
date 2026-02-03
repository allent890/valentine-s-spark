import { useState, useEffect, useCallback } from "react";
import { motion, Reorder } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WordScrambleProps {
  onComplete: () => void;
}

const TARGET_SENTENCE = ["WILL", "YOU", "BE", "MY", "VALENTINE"];

const WordScramble = ({ onComplete }: WordScrambleProps) => {
  const [words, setWords] = useState<string[]>([]);
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);

  useEffect(() => {
    // Shuffle words
    const shuffled = [...TARGET_SENTENCE].sort(() => Math.random() - 0.5);
    // Make sure it's not already in order
    if (shuffled.join(" ") === TARGET_SENTENCE.join(" ")) {
      [shuffled[0], shuffled[shuffled.length - 1]] = [shuffled[shuffled.length - 1], shuffled[0]];
    }
    setWords(shuffled);
  }, []);

  const checkAnswer = useCallback(() => {
    setAttempts(a => a + 1);
    
    if (words.join(" ") === TARGET_SENTENCE.join(" ")) {
      setIsSolved(true);
      setShowFeedback("correct");
      setTimeout(onComplete, 1500);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(null), 1000);
    }
  }, [words, onComplete]);

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-card/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-card border border-white/50 max-w-lg w-full"
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <motion.h1
          className="font-romantic text-2xl md:text-4xl text-center mb-2 text-gradient"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Unscramble the Message! 💌
        </motion.h1>
        <p className="text-center text-muted-foreground mb-6">
          Drag the words to form the secret message
        </p>

        {/* Word tiles */}
        <Reorder.Group
          axis="x"
          values={words}
          onReorder={setWords}
          className="flex flex-wrap justify-center gap-2 md:gap-3 min-h-[80px] p-4 bg-secondary/30 rounded-xl"
        >
          {words.map((word) => (
            <Reorder.Item
              key={word}
              value={word}
              className={`px-4 py-3 rounded-xl font-bold text-lg md:text-xl cursor-grab active:cursor-grabbing select-none
                ${isSolved 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground shadow-md hover:shadow-lg"
                }
                ${showFeedback === "incorrect" ? "animate-shake" : ""}
              `}
              whileDrag={{ scale: 1.1, zIndex: 10 }}
              whileHover={{ scale: 1.05 }}
            >
              {word}
            </Reorder.Item>
          ))}
        </Reorder.Group>

        {/* Feedback */}
        {showFeedback === "correct" && (
          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <motion.span
              className="text-5xl"
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.3, 1] }}
              transition={{ duration: 0.5 }}
            >
              💖
            </motion.span>
            <p className="text-xl font-bold text-primary mt-2">Perfect!</p>
          </motion.div>
        )}

        {showFeedback === "incorrect" && (
          <motion.p
            className="mt-4 text-center text-destructive font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            Not quite right, try again! 🤔
          </motion.p>
        )}

        {/* Check button */}
        {!isSolved && (
          <motion.div
            className="mt-6 flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Button
              onClick={checkAnswer}
              className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg px-8 py-6 rounded-full shadow-button hover:shadow-romantic transition-all"
            >
              Check Answer ✨
            </Button>
            
            {attempts > 2 && (
              <motion.p
                className="text-sm text-muted-foreground"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Hint: It's a special question for someone special 💕
              </motion.p>
            )}
          </motion.div>
        )}

        {/* Progress indicator */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Attempts: {attempts}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WordScramble;
