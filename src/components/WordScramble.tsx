import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface WordScrambleProps {
  onComplete: () => void;
}

const TARGET_PHRASE = "STARBUCKS";

const WordScramble = ({ onComplete }: WordScrambleProps) => {
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [userInput, setUserInput] = useState("");
  const [isSolved, setIsSolved] = useState(false);
  const [showFeedback, setShowFeedback] = useState<"correct" | "incorrect" | null>(null);
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Create scrambled version of letters (keeping spaces visible)
    const letters = TARGET_PHRASE.split("");
    const onlyLetters = letters.filter(l => l !== " ");
    
    // Shuffle the letters
    for (let i = onlyLetters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [onlyLetters[i], onlyLetters[j]] = [onlyLetters[j], onlyLetters[i]];
    }
    
    setScrambledLetters(onlyLetters);
  }, []);

  const handleSubmit = useCallback(() => {
    setAttempts(a => a + 1);
    
    const normalized = userInput.toUpperCase().trim();
    
    if (normalized === TARGET_PHRASE) {
      setIsSolved(true);
      setShowFeedback("correct");
      setTimeout(onComplete, 1500);
    } else {
      setShowFeedback("incorrect");
      setTimeout(() => setShowFeedback(null), 1000);
    }
  }, [userInput, onComplete]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

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
          Rearrange these letters to reveal the secret message
        </p>

        {/* Scrambled Letters Display */}
        <div className="flex flex-wrap justify-center gap-1.5 md:gap-2 p-4 bg-secondary/30 rounded-xl mb-6">
          {scrambledLetters.map((letter, index) => (
            <motion.span
              key={index}
              className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-gradient-to-br from-primary/80 to-accent/80 text-primary-foreground rounded-lg font-bold text-sm md:text-lg shadow-md"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
            >
              {letter}
            </motion.span>
          ))}
        </div>

        {/* Hint about format */}
        <p className="text-center text-sm text-muted-foreground mb-4">
          Hint: How I asked you to be my valentine for the first time 💭
        </p>

        {/* Input field */}
        <div className="space-y-4">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your answer here..."
            disabled={isSolved}
            className={`w-full px-4 py-3 rounded-xl border-2 text-center font-semibold text-lg bg-background/50 focus:outline-none focus:ring-2 focus:ring-primary transition-all ${
              showFeedback === "incorrect" 
                ? "border-destructive animate-shake" 
                : showFeedback === "correct"
                ? "border-primary bg-primary/10"
                : "border-border focus:border-primary"
            }`}
          />

          {/* Feedback */}
          {showFeedback === "correct" && (
            <motion.div
              className="text-center"
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
              className="text-center text-destructive font-semibold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Not quite right, try again! 🤔
            </motion.p>
          )}

          {/* Submit button */}
          {!isSolved && (
            <Button
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg py-6 rounded-full shadow-button hover:shadow-romantic transition-all"
            >
              Check Answer ✨
            </Button>
          )}

          {/* Extra hint after attempts */}
          {attempts > 2 && !isSolved && (
            <motion.p
              className="text-sm text-muted-foreground text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              💡 The answer is: "_ _ _ _ _ _ _ _ _"
            </motion.p>
          )}
        </div>

        {/* Progress indicator */}
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Attempts: {attempts}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default WordScramble;
