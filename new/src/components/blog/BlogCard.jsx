import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { readingTime, formatDate } from '../../lib/utils';

export default function BlogCard({ post }) {
  return (
    <Link to={`/blog/${post.slug}`} className="glass-card group flex h-full flex-col overflow-hidden rounded-2xl">
      <div className="aspect-[16/9] w-full overflow-hidden bg-white/5">
        <img
          src={post.coverImage}
          alt={post.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => { e.currentTarget.style.opacity = 0; }}
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="badge w-fit">{post.category}</span>
        <h3 className="mt-3 font-display text-lg font-semibold text-white group-hover:text-[var(--accent)]">{post.title}</h3>
        <p className="mt-2 flex-1 text-sm text-white/50">{post.excerpt}</p>
        <div className="mt-4 flex items-center justify-between text-xs text-white/40">
          <span>{formatDate(post.date)}</span>
          <span className="flex items-center gap-1"><Clock size={12} /> {readingTime(post.content)}</span>
        </div>
      </div>
    </Link>
  );
}
