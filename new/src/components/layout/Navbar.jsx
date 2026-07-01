import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Command, Globe, Palette } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nProvider';
import { useTheme } from '../../hooks/useTheme';
import { cn } from '../../lib/utils';

const ACCENT_COLORS = {
  blue: '#3b82f6',
  purple: '#a855f7',
  cyan: '#06b6d4',
  green: '#22c55e',
};

export default function Navbar({ onOpenCommandPalette }) {
  const [open, setOpen] = useState(false);
  const { t, lang, setLang } = useTranslation();
  const { accent, setAccent, accents } = useTheme();

  const links = [
    ['home', '/'],
    ['about', '/about'],
    ['skills', '/skills'],
    ['experience', '/experience'],
    ['projects', '/projects'],
    ['timeline', '/timeline'],
    ['blog', '/blog'],
    ['contact', '/contact'],
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto mt-3 max-w-6xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-4 py-3">
          <Link to="/" className="font-display text-lg font-semibold tracking-tight text-white">
            YN<span className="text-[var(--accent)]">.</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {links.map(([key, path]) => (
              <li key={key}>
                <NavLink
                  to={path}
                  className={({ isActive }) =>
                    cn(
                      'rounded-lg px-3 py-2 text-sm font-medium text-white/70 transition-colors hover:text-white focus-ring',
                      isActive && 'text-white bg-white/5'
                    )
                  }
                >
                  {t(`nav.${key}`)}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <button
              onClick={onOpenCommandPalette}
              className="hidden items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/60 hover:text-white sm:flex focus-ring"
            >
              <Command size={14} /> K
            </button>

            <button
              onClick={() => setLang(lang === 'en' ? 'id' : 'en')}
              aria-label="Toggle language"
              className="hidden h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white sm:flex focus-ring"
            >
              <Globe size={16} />
            </button>

            <div className="relative hidden group sm:block">
              <button
                aria-label="Theme accent"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/70 hover:text-white focus-ring"
              >
                <Palette size={16} />
              </button>
              <div className="absolute right-0 top-11 hidden gap-2 rounded-xl glass p-2 group-hover:flex group-focus-within:flex">
                {accents.map((a) => (
                  <button
                    key={a}
                    onClick={() => setAccent(a)}
                    aria-label={`Accent ${a}`}
                    className={cn(
                      'h-6 w-6 rounded-full ring-2 ring-offset-2 ring-offset-ink-900',
                      accent === a ? 'ring-white' : 'ring-transparent'
                    )}
                    style={{ background: ACCENT_COLORS[a] }}
                  />
                ))}
              </div>
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white lg:hidden focus-ring"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden lg:hidden"
            >
              <ul className="glass mt-2 flex flex-col gap-1 rounded-2xl p-3">
                {links.map(([key, path]) => (
                  <li key={key}>
                    <NavLink
                      to={path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        cn(
                          'block rounded-lg px-3 py-2 text-sm font-medium text-white/70 hover:text-white',
                          isActive && 'text-white bg-white/5'
                        )
                      }
                    >
                      {t(`nav.${key}`)}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
