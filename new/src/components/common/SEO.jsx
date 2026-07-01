import { useEffect } from 'react';

/**
 * Lightweight SEO helper that updates document title and meta tags on
 * mount/route change, without needing react-helmet (keeps bundle small).
 */
export default function SEO({ title, description, image }) {
  useEffect(() => {
    if (title) document.title = `${title} — Your Name`;
    if (description) setMeta('description', description);
    if (title) setMeta('og:title', title, true);
    if (description) setMeta('og:description', description, true);
    if (image) setMeta('og:image', image, true);
  }, [title, description, image]);

  return null;
}

function setMeta(name, content, isProperty = false) {
  const attr = isProperty ? 'property' : 'name';
  let el = document.querySelector(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
