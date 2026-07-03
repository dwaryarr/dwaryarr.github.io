import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2,
  });

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[3px] overflow-hidden">
      <motion.div
        className="h-full origin-left bg-[var(--accent)] shadow-glow-sm"
        style={{ scaleX }}
      />
    </div>
  );
}
