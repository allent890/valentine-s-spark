import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface RedEnvelopeProps {
  letterContent?: string;
}

const RedEnvelope = ({ letterContent = "Your special message will go here..." }: RedEnvelopeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLetter, setShowLetter] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
    setTimeout(() => setShowLetter(true), 600);
  };

  const handleClose = () => {
    setShowLetter(false);
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <>
      {/* Trigger Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          onClick={handleOpen}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg"
        >
          <Mail className="mr-2 h-5 w-5" />
          Open My Letter 💌
        </Button>
      </motion.div>

      {/* Envelope Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          >
            <motion.div
              className="relative"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, y: 100 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.5, y: 100 }}
              transition={{ type: "spring", damping: 20 }}
            >
              {/* Envelope Container */}
              <div className="relative w-[320px] h-[220px] md:w-[400px] md:h-[280px]">
                {/* Envelope Body */}
                <div className="absolute inset-0 bg-gradient-to-b from-red-500 to-red-700 rounded-lg shadow-2xl overflow-hidden">
                  {/* Envelope Pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-4 left-4 text-yellow-300 text-4xl">福</div>
                    <div className="absolute bottom-4 right-4 text-yellow-300 text-4xl">愛</div>
                  </div>
                  
                  {/* Gold Border */}
                  <div className="absolute inset-2 border-2 border-yellow-400/50 rounded-md" />
                </div>

                {/* Envelope Flap */}
                <motion.div
                  className="absolute top-0 left-0 right-0 h-[110px] md:h-[140px] origin-top"
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: showLetter ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  {/* Front of flap */}
                  <div 
                    className="absolute inset-0 bg-gradient-to-b from-red-600 to-red-500"
                    style={{ backfaceVisibility: "hidden" }}
                  >
                    <svg viewBox="0 0 400 140" className="w-full h-full">
                      <polygon 
                        points="0,0 200,140 400,0" 
                        fill="url(#flapGradient)"
                        stroke="#fbbf24"
                        strokeWidth="2"
                      />
                      <defs>
                        <linearGradient id="flapGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#dc2626" />
                          <stop offset="100%" stopColor="#b91c1c" />
                        </linearGradient>
                      </defs>
                    </svg>
                    {/* Seal */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-12 h-12 md:w-16 md:h-16 bg-yellow-500 rounded-full flex items-center justify-center shadow-lg border-2 border-yellow-300">
                      <span className="text-red-800 text-xl md:text-2xl font-bold">♥</span>
                    </div>
                  </div>
                  
                  {/* Back of flap */}
                  <div 
                    className="absolute inset-0 bg-red-800"
                    style={{ backfaceVisibility: "hidden", transform: "rotateX(180deg)" }}
                  />
                </motion.div>

                {/* Letter coming out */}
                <AnimatePresence>
                  {showLetter && (
                    <motion.div
                      className="absolute left-4 right-4 bg-gradient-to-b from-amber-50 to-amber-100 rounded-t-lg shadow-lg overflow-hidden"
                      initial={{ top: "60%", height: "30%" }}
                      animate={{ top: "-120%", height: "200%" }}
                      exit={{ top: "60%", height: "30%" }}
                      transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                    >
                      <div className="p-6 md:p-8 h-full overflow-y-auto">
                        {/* Letter Header */}
                        <div className="text-center mb-4">
                          <div className="text-red-500 text-2xl mb-2">💕</div>
                          <div className="w-16 h-0.5 bg-red-300 mx-auto" />
                        </div>
                        
                        {/* Letter Content */}
                        <div className="font-serif text-gray-700 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                          {letterContent}
                        </div>
                        
                        {/* Letter Footer */}
                        <div className="text-center mt-6">
                          <div className="w-16 h-0.5 bg-red-300 mx-auto mb-2" />
                          <div className="text-red-500 text-xl">♥</div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Close hint */}
              <motion.p
                className="text-center text-white/80 text-sm mt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Tap outside to close
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default RedEnvelope;
