import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import couplePhoto from "@/assets/couple-photo.jpg";
import { Button } from "@/components/ui/button";

interface PicturePuzzleProps {
  onComplete: () => void;
}

const GRID_SIZE = 2;
const TILE_COUNT = GRID_SIZE * GRID_SIZE;

const PicturePuzzle = ({ onComplete }: PicturePuzzleProps) => {
  const [tiles, setTiles] = useState<number[]>([]);
  const [emptyIndex, setEmptyIndex] = useState(TILE_COUNT - 1);
  const [moves, setMoves] = useState(0);
  const [isSolved, setIsSolved] = useState(false);
  const [showHint, setShowHint] = useState(false);

  // Initialize shuffled puzzle
  useEffect(() => {
    const shuffled = shufflePuzzle();
    setTiles(shuffled.tiles);
    setEmptyIndex(shuffled.emptyIndex);
  }, []);

  const shufflePuzzle = () => {
    // Start with solved state
    let arr = Array.from({ length: TILE_COUNT }, (_, i) => i);
    let empty = TILE_COUNT - 1;

    // Perform random valid moves to shuffle (ensures solvability)
    for (let i = 0; i < 30; i++) {
      const neighbors = getNeighbors(empty);
      const randomNeighbor = neighbors[Math.floor(Math.random() * neighbors.length)];
      [arr[empty], arr[randomNeighbor]] = [arr[randomNeighbor], arr[empty]];
      empty = randomNeighbor;
    }

    return { tiles: arr, emptyIndex: empty };
  };

  const getNeighbors = (index: number) => {
    const neighbors: number[] = [];
    const row = Math.floor(index / GRID_SIZE);
    const col = index % GRID_SIZE;

    if (row > 0) neighbors.push(index - GRID_SIZE); // up
    if (row < GRID_SIZE - 1) neighbors.push(index + GRID_SIZE); // down
    if (col > 0) neighbors.push(index - 1); // left
    if (col < GRID_SIZE - 1) neighbors.push(index + 1); // right

    return neighbors;
  };

  const handleTileClick = useCallback((clickedIndex: number) => {
    if (isSolved) return;

    const neighbors = getNeighbors(emptyIndex);
    if (!neighbors.includes(clickedIndex)) return;

    setTiles(prev => {
      const newTiles = [...prev];
      [newTiles[emptyIndex], newTiles[clickedIndex]] = [newTiles[clickedIndex], newTiles[emptyIndex]];
      
      // Check if solved (all tiles in order 0,1,2,3...)
      const solved = newTiles.every((tile, idx) => tile === idx);
      if (solved) {
        setIsSolved(true);
        setTimeout(onComplete, 2000);
      }
      
      return newTiles;
    });
    setEmptyIndex(clickedIndex);
    setMoves(m => m + 1);
  }, [emptyIndex, isSolved, onComplete]);

  const getTileStyle = (tileValue: number, isEmptyTile: boolean) => {
    // When solved, show all tiles including the "empty" one
    if (isSolved || !isEmptyTile) {
      const originalRow = Math.floor(tileValue / GRID_SIZE);
      const originalCol = tileValue % GRID_SIZE;
      
      return {
        backgroundImage: `url(${couplePhoto})`,
        backgroundSize: `${GRID_SIZE * 100}% ${GRID_SIZE * 100}%`,
        backgroundPosition: `${(originalCol / (GRID_SIZE - 1)) * 100}% ${(originalRow / (GRID_SIZE - 1)) * 100}%`,
      };
    }
    
    return {}; // Empty tile when not solved
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        className="bg-card/90 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-card border border-white/50 max-w-md w-full"
        initial={{ y: 50, scale: 0.9 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.6, ease: "backOut" }}
      >
        <motion.h1
          className="font-romantic text-2xl md:text-4xl text-center mb-2 text-gradient"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Solve the Puzzle! 🧩
        </motion.h1>
        <p className="text-center text-muted-foreground mb-4">
          Slide the tiles to reveal the picture
        </p>

        <div className="relative">
          {/* Puzzle Grid */}
          <div 
            className="grid gap-1 mx-auto aspect-square max-w-[300px] rounded-xl overflow-hidden bg-secondary/50 p-1"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
          >
            {tiles.map((tileValue, index) => {
              const isEmptyTile = tileValue === TILE_COUNT - 1;
              return (
                <motion.button
                  key={index}
                  className={`aspect-square rounded-lg cursor-pointer transition-all ${
                    isEmptyTile && !isSolved
                      ? "bg-secondary/30" 
                      : "shadow-md hover:shadow-lg border-2 border-white/20"
                  }`}
                  style={getTileStyle(tileValue, isEmptyTile)}
                  onClick={() => handleTileClick(index)}
                  whileHover={!isEmptyTile || isSolved ? { scale: 1.02 } : {}}
                  whileTap={!isEmptyTile || isSolved ? { scale: 0.98 } : {}}
                  layout
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              );
            })}
          </div>

          {/* Solved Overlay */}
          {isSolved && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center rounded-xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <motion.div
                className="bg-primary/90 px-6 py-4 rounded-2xl text-center text-primary-foreground"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.5 }}
              >
                <motion.div
                  className="text-4xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5 }}
                >
                  🎉
                </motion.div>
                <p className="font-bold text-xl">Perfect!</p>
              </motion.div>
            </motion.div>
          )}
        </div>

        <div className="mt-4 flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Moves: <span className="font-semibold text-foreground">{moves}</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowHint(!showHint)}
          >
            {showHint ? "Hide Hint" : "Show Hint"} 💡
          </Button>
        </div>

        {/* Hint Image */}
        {showHint && (
          <motion.div
            className="mt-4 rounded-xl overflow-hidden border-2 border-primary/30"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            <img 
              src={couplePhoto} 
              alt="Hint" 
              className="w-full aspect-square object-cover opacity-70"
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default PicturePuzzle;
