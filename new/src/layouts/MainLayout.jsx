import { useState, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CommandPalette from '../components/layout/CommandPalette';
import BackToTop from '../components/common/BackToTop';
import ScrollProgressBar from '../components/common/ScrollProgressBar';
import AuroraBackground from '../components/common/AuroraBackground';
import { useKeyboardShortcut } from '../hooks/useKeyboardShortcut';

export default function MainLayout() {
  const [paletteOpen, setPaletteOpen] = useState(false);

  const toggle = useCallback(() => setPaletteOpen((v) => !v), []);
  useKeyboardShortcut('k', toggle, { meta: true });

  return (
    <div className="relative min-h-screen">
      <AuroraBackground />
      <ScrollProgressBar />
      <Navbar onOpenCommandPalette={() => setPaletteOpen(true)} />
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} />

      <motion.main
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="pt-24"
      >
        <Outlet />
      </motion.main>

      <Footer />
      <BackToTop />
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#101118',
            color: 'white',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      />
    </div>
  );
}
