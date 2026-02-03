import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

const BackgroundMusic = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showPrompt, setShowPrompt] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.4;
      audioRef.current.loop = true;
    }
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
      setHasInteracted(true);
      setShowPrompt(false);
    }
  };

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(console.error);
      setIsPlaying(true);
    }
    setHasInteracted(true);
    setShowPrompt(false);
  };

  return (
    <>
      <audio ref={audioRef} src="/audio/background-music.m4a" preload="auto" />
      
      {/* Initial music prompt */}
      <AnimatePresence>
        {showPrompt && !hasInteracted && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-background/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-card p-8 rounded-3xl shadow-card border border-white/50 text-center max-w-sm mx-4"
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 20 }}
            >
              <motion.div
                className="text-5xl mb-4"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                🎵
              </motion.div>
              <h2 className="font-romantic text-2xl text-gradient mb-2">
                A Special Experience
              </h2>
              <p className="text-muted-foreground mb-6">
                This website is best enjoyed with music!
              </p>
              <div className="flex gap-3 justify-center">
                <motion.button
                  onClick={startMusic}
                  className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground rounded-full font-semibold shadow-button hover:shadow-romantic transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Play Music 🎶
                </motion.button>
                <motion.button
                  onClick={() => { setShowPrompt(false); setHasInteracted(true); }}
                  className="px-6 py-3 bg-secondary text-secondary-foreground rounded-full font-semibold"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  No Thanks
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating music control */}
      {hasInteracted && (
        <motion.button
          onClick={toggleMusic}
          className="fixed bottom-4 right-4 z-50 w-12 h-12 rounded-full bg-card/90 backdrop-blur-xl border border-white/30 shadow-lg flex items-center justify-center text-foreground hover:bg-card transition-colors"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isPlaying ? (
            <Volume2 className="w-5 h-5" />
          ) : (
            <VolumeX className="w-5 h-5" />
          )}
        </motion.button>
      )}
    </>
  );
};

export default BackgroundMusic;
