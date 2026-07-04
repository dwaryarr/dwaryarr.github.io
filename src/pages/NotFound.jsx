import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';
import SEO from '../components/common/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 Not Found" description="The page you're looking for doesn't exist." />
      <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-7xl font-bold text-gradient">404</p>
        <h1 className="mt-4 text-xl font-semibold text-white">Page not found</h1>
        <p className="mt-2 text-white/50">The page you're looking for doesn't exist or has moved.</p>
        <Link to="/" className="btn-primary mt-8">
          <Home size={16} /> Back home
        </Link>
      </section>
    </>
  );
}
