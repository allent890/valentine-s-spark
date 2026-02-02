import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import CuteFox from "./CuteFox";
import { Button } from "@/components/ui/button";

const ValentineCard = () => {
  const [accepted, setAccepted] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);
  const zoneRef = useRef<HTMLDivElement>(null);
  const noButtonRef = useRef<HTMLButtonElement>(null);

  const noMessages = [
    "No",
    "Are you sure?",
    "Really sure?",
    "Think again!",
    "Last chance!",
    "Surely not?",
    "You might regret this!",
    "Give it another thought!",
    "Are you kidding?",
    "Wrong answer!",
    "Try again!",
    "Nope, wrong button!",
    "Come on...",
    "I'll be sad 🥺",
    "Pretty please?",
  ];

  const fireConfetti = useCallback(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#ff3b7a", "#ff7aa2", "#ffb8c6", "#ffd6e7", "#ff1f68"];

    (function frame() {
      confetti({
        particleCount: 5,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors,
      });
      confetti({
        particleCount: 5,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    })();

    // Big burst
    setTimeout(() => {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors,
      });
    }, 250);
  }, []);

  const handleYesClick = () => {
    setAccepted(true);
    fireConfetti();
  };

  const moveNoButton = useCallback(
    (pointerX: number, pointerY: number) => {
      if (!zoneRef.current || !noButtonRef.current) return;

      const zone = zoneRef.current.getBoundingClientRect();
      const btn = noButtonRef.current.getBoundingClientRect();

      // Calculate direction away from pointer
      const btnCenterX = btn.left + btn.width / 2;
      const btnCenterY = btn.top + btn.height / 2;

      let dx = btnCenterX - pointerX;
      let dy = btnCenterY - pointerY;
      const mag = Math.hypot(dx, dy) || 1;
      dx /= mag;
      dy /= mag;

      // Move button away
      const moveDistance = 100 + Math.random() * 50;
      let newX = noPosition.x + dx * moveDistance;
      let newY = noPosition.y + dy * moveDistance;

      // Clamp to zone bounds
      const maxX = zone.width / 2 - btn.width / 2 - 10;
      const maxY = zone.height / 2 - btn.height / 2 - 10;

      newX = Math.max(-maxX, Math.min(maxX, newX));
      newY = Math.max(-maxY, Math.min(maxY, newY));

      setNoPosition({ x: newX, y: newY });
      setYesScale((prev) => Math.min(2, prev + 0.08));
      setAttempts((prev) => Math.min(noMessages.length - 1, prev + 1));
    },
    [noPosition, noMessages.length]
  );

  const handlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!noButtonRef.current) return;

      const btn = noButtonRef.current.getBoundingClientRect();
      const distance = Math.hypot(
        btn.left + btn.width / 2 - e.clientX,
        btn.top + btn.height / 2 - e.clientY
      );

      if (distance < 100) {
        moveNoButton(e.clientX, e.clientY);
      }
    },
    [moveNoButton]
  );

  return (
    <motion.div
      className="relative z-10 w-full max-w-lg mx-auto p-6 md:p-10"
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "backOut" }}
    >
      <div className="bg-card/90 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-card border border-white/50">
        <CuteFox />

        <AnimatePresence mode="wait">
          {!accepted ? (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <motion.h1
                className="font-romantic text-3xl md:text-5xl text-center mt-6 mb-2 text-gradient"
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Malu
              </motion.h1>
              <h2 className="text-xl md:text-2xl text-center font-semibold text-foreground mb-8">
                Will you be my Valentine? 💕
              </h2>

              <div
                ref={zoneRef}
                className="relative h-36 md:h-40 touch-none"
                onPointerMove={handlePointerMove}
              >
                {/* Yes Button */}
                <motion.div
                  className="absolute left-1/4 top-1/2"
                  style={{ x: "-50%", y: "-50%" }}
                  animate={{ scale: yesScale }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Button
                    onClick={handleYesClick}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-bold text-lg md:text-xl px-8 py-6 rounded-full shadow-button hover:shadow-romantic transition-all duration-300"
                  >
                    Yes! 💖
                  </Button>
                </motion.div>

                {/* No Button */}
                <motion.div
                  className="absolute left-3/4 top-1/2"
                  animate={{
                    x: noPosition.x - 50 + "%",
                    y: noPosition.y - 50 + "%",
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button
                    ref={noButtonRef}
                    variant="secondary"
                    className="font-semibold text-base md:text-lg px-6 py-5 rounded-full transition-all duration-200 hover:bg-secondary"
                    onClick={(e) => {
                      e.preventDefault();
                      moveNoButton(e.clientX, e.clientY);
                    }}
                  >
                    {noMessages[attempts]}
                  </Button>
                </motion.div>
              </div>

              <motion.p
                className="text-center text-muted-foreground text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: attempts > 0 ? 1 : 0.7 }}
              >
                {attempts > 0
                  ? '"No" seems a bit shy 😈'
                  : "Choose wisely... 💭"}
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "backOut" }}
            >
              <motion.h2
                className="font-romantic text-4xl md:text-6xl text-gradient mb-4"
                animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Yay! 🎉
              </motion.h2>
              <p className="text-xl md:text-2xl font-semibold text-foreground mb-6">
                You made me the happiest! 💕
              </p>
              <motion.div
                className="text-6xl md:text-8xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                💝
              </motion.div>
              <p className="text-muted-foreground mt-6 text-lg">
                I can't wait to spend Valentine's Day with you! ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ValentineCard;
