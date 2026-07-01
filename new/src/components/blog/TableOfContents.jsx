import { useMemo } from 'react';
import { slugify } from '../../lib/utils';
import { useTranslation } from '../../i18n/I18nProvider';

export default function TableOfContents({ content }) {
  const { t } = useTranslation();

  const headings = useMemo(() => {
    const lines = content.split('\n').filter((l) => /^##\s|^###\s/.test(l));
    return lines.map((line) => {
      const depth = line.startsWith('###') ? 3 : 2;
      const text = line.replace(/^#{2,3}\s/, '');
      return { text, depth, id: slugify(text) };
    });
  }, [content]);

  if (headings.length === 0) return null;

  return (
    <nav className="glass-card sticky top-28 hidden rounded-2xl p-5 lg:block">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-white/40">{t('blog.toc')}</p>
      <ul className="space-y-2 text-sm">
        {headings.map((h) => (
          <li key={h.id} className={h.depth === 3 ? 'pl-3' : ''}>
            <a href={`#${h.id}`} className="text-white/60 hover:text-[var(--accent)]">
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
