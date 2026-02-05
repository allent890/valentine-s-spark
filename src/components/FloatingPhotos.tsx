import { motion } from "framer-motion";
import photo1 from "@/assets/floating-photos/photo1.jpg";
import photo2 from "@/assets/floating-photos/photo2.jpg";
import photo3 from "@/assets/floating-photos/photo3.jpg";
import photo4 from "@/assets/floating-photos/photo4.jpg";
import photo5 from "@/assets/floating-photos/photo5.jpg";
import photo6 from "@/assets/floating-photos/photo6.jpg";
import photo7 from "@/assets/floating-photos/photo7.jpg";
import photo8 from "@/assets/floating-photos/photo8.jpg";
import photo9 from "@/assets/floating-photos/photo9.jpg";
import photo10 from "@/assets/floating-photos/photo10.jpg";

const photos = [photo1, photo2, photo3, photo4, photo5, photo6, photo7, photo8, photo9, photo10];

const floatingPhotos = photos.map((src, i) => ({
  id: i,
  src,
  x: Math.random() * 100,
  delay: Math.random() * 3,
  duration: 8 + Math.random() * 6,
  size: 60 + Math.random() * 40,
  rotation: Math.random() * 30 - 15,
}));

const FloatingPhotos = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {floatingPhotos.map((photo) => (
        <motion.div
          key={photo.id}
          className="absolute rounded-lg shadow-lg overflow-hidden border-2 border-white/50"
          style={{
            left: `${photo.x}%`,
            width: photo.size,
            height: photo.size,
          }}
          initial={{ y: "110vh", rotate: photo.rotation - 10, opacity: 0.7 }}
          animate={{
            y: "-20vh",
            rotate: photo.rotation + 10,
            opacity: [0.7, 0.9, 0.7],
          }}
          transition={{
            duration: photo.duration,
            delay: photo.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <img
            src={photo.src}
            alt=""
            className="w-full h-full object-cover"
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingPhotos;
