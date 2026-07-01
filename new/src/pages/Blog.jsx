import { useMemo, useState } from 'react';
import SEO from '../components/common/SEO';
import SectionHeading from '../components/ui/SectionHeading';
import ScrollReveal from '../components/ui/ScrollReveal';
import BlogCard from '../components/blog/BlogCard';
import { useTranslation } from '../i18n/I18nProvider';
import { blogsStore } from '../lib/stores';
import { cn } from '../lib/utils';

export default function Blog() {
  const { t } = useTranslation();
  const posts = [...blogsStore.getAll()].sort((a, b) => (a.date < b.date ? 1 : -1));
  const [category, setCategory] = useState('All');

  const categories = useMemo(() => ['All', ...new Set(posts.map((p) => p.category))], [posts]);
  const filtered = category === 'All' ? posts : posts.filter((p) => p.category === category);

  return (
    <>
      <SEO title="Blog" description="Thoughts on engineering, design, and tooling." />
      <section className="section-padding">
        <div className="mx-auto max-w-6xl">
          <SectionHeading eyebrow="Writing" title={t('blog.title')} subtitle={t('blog.subtitle')} />

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={cn(
                  'rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors',
                  category === c
                    ? 'border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)]'
                    : 'border-white/10 bg-white/5 text-white/60 hover:text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((post, i) => (
              <ScrollReveal key={post.id} delay={(i % 3) * 0.06}>
                <BlogCard post={post} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
