import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import { useTranslation } from '../../i18n/I18nProvider';
import { projectsStore, blogsStore } from '../../lib/stores';

export default function CommandPalette({ open, onClose }) {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const pages = useMemo(
    () => [
      { label: 'Home', path: '/' },
      { label: 'About', path: '/about' },
      { label: 'Skills', path: '/skills' },
      { label: 'Experience', path: '/experience' },
      { label: 'Education', path: '/education' },
      { label: 'Projects', path: '/projects' },
      { label: 'Certificates', path: '/certificates' },
      { label: 'Tech Stack', path: '/tech-stack' },
      { label: 'Timeline', path: '/timeline' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact', path: '/contact' },
    ],
    []
  );

  const results = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return { pages: pages.slice(0, 6), projects: [], blogs: [] };

    const projects = projectsStore
      .getAll()
      .filter((p) => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q))
      .slice(0, 5);

    const blogs = blogsStore
      .getAll()
      .filter((b) => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q))
      .slice(0, 5);

    return {
      pages: pages.filter((p) => p.label.toLowerCase().includes(q)),
      projects,
      blogs,
    };
  }, [query, pages]);

  function go(path) {
    navigate(path);
    onClose();
  }

  const noResults =
    results.pages.length === 0 && results.projects.length === 0 && results.blogs.length === 0;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/60 backdrop-blur-sm pt-24 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.97 }}
            onClick={(e) => e.stopPropagation()}
            className="glass w-full max-w-xl rounded-2xl p-2 shadow-glow"
          >
            <div className="flex items-center gap-2 border-b border-white/10 px-3 py-3">
              <Search size={16} className="text-white/50" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t('command.placeholder')}
                className="w-full bg-transparent text-sm text-white placeholder:text-white/40 outline-none"
              />
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {noResults && <p className="px-3 py-6 text-center text-sm text-white/40">{t('command.noResults')}</p>}

              {results.pages.length > 0 && (
                <Group title="Pages">
                  {results.pages.map((p) => (
                    <Item key={p.path} label={p.label} onClick={() => go(p.path)} />
                  ))}
                </Group>
              )}
              {results.projects.length > 0 && (
                <Group title="Projects">
                  {results.projects.map((p) => (
                    <Item key={p.id} label={p.title} onClick={() => go('/projects')} />
                  ))}
                </Group>
              )}
              {results.blogs.length > 0 && (
                <Group title="Blog">
                  {results.blogs.map((b) => (
                    <Item key={b.id} label={b.title} onClick={() => go(`/blog/${b.slug}`)} />
                  ))}
                </Group>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Group({ title, children }) {
  return (
    <div className="mb-1">
      <p className="px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-white/30">{title}</p>
      {children}
    </div>
  );
}

function Item({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full rounded-lg px-3 py-2 text-left text-sm text-white/80 hover:bg-white/5 hover:text-white focus-ring"
    >
      {label}
    </button>
  );
}
