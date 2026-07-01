import { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Clock, ArrowLeft, ArrowRight, Tag } from 'lucide-react';
import SEO from '../components/common/SEO';
import ScrollReveal from '../components/ui/ScrollReveal';
import TableOfContents from '../components/blog/TableOfContents';
import { useTranslation } from '../i18n/I18nProvider';
import { blogsStore } from '../lib/stores';
import { readingTime, formatDate } from '../lib/utils';

export default function BlogPost() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const posts = useMemo(() => [...blogsStore.getAll()].sort((a, b) => (a.date < b.date ? 1 : -1)), []);
  const index = posts.findIndex((p) => p.slug === slug);
  const post = posts[index];

  if (!post) return <Navigate to="/blog" replace />;

  const prev = posts[index + 1];
  const next = posts[index - 1];

  return (
    <>
      <SEO title={post.title} description={post.excerpt} image={post.coverImage} />
      <article className="section-padding">
        <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_240px]">
          <div>
            <Link to="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-white/50 hover:text-white">
              <ArrowLeft size={14} /> Back to blog
            </Link>

            <ScrollReveal>
              <span className="badge">{post.category}</span>
              <h1 className="mt-4 font-display text-3xl font-semibold text-white sm:text-4xl">{post.title}</h1>
              <div className="mt-4 flex items-center gap-4 text-sm text-white/40">
                <span>{post.author}</span>
                <span>·</span>
                <span>{formatDate(post.date)}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {readingTime(post.content)}</span>
              </div>
            </ScrollReveal>

            {post.coverImage && (
              <ScrollReveal delay={0.1} className="glass-card mt-8 overflow-hidden rounded-2xl">
                <img src={post.coverImage} alt={post.title} className="aspect-video w-full object-cover" onError={(e)=>{e.currentTarget.style.opacity=0}} />
              </ScrollReveal>
            )}

            <ScrollReveal delay={0.15} className="prose prose-invert mt-10 max-w-none prose-headings:font-display prose-headings:font-semibold prose-a:text-[var(--accent)] prose-strong:text-white">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug]}
                components={{
                  code({ inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter style={oneDark} language={match[1]} PreTag="div" {...props}>
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="rounded bg-white/10 px-1.5 py-0.5 text-sm" {...props}>{children}</code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </ScrollReveal>

            {post.tags?.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="badge"><Tag size={11} /> {tag}</span>
                ))}
              </div>
            )}

            <div className="mt-12 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2">
              {prev && (
                <Link to={`/blog/${prev.slug}`} className="glass-card rounded-xl p-4 hover:border-white/20">
                  <p className="mb-1 flex items-center gap-1 text-xs text-white/40"><ArrowLeft size={12} /> {t('blog.prev')}</p>
                  <p className="text-sm font-medium text-white">{prev.title}</p>
                </Link>
              )}
              {next && (
                <Link to={`/blog/${next.slug}`} className="glass-card rounded-xl p-4 text-right hover:border-white/20 sm:col-start-2">
                  <p className="mb-1 flex items-center justify-end gap-1 text-xs text-white/40">{t('blog.next')} <ArrowRight size={12} /></p>
                  <p className="text-sm font-medium text-white">{next.title}</p>
                </Link>
              )}
            </div>
          </div>

          <TableOfContents content={post.content} />
        </div>
      </article>
    </>
  );
}
