import { motion } from 'framer-motion';

export default function AnimatedProgressBar({ label, level }) {
  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span className="text-white/80">{label}</span>
        <span className="text-white/40">{level}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="h-full rounded-full bg-[var(--accent)] shadow-glow-sm"
        />
      </div>
    </div>
  );
}
