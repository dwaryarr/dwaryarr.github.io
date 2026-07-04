import clsx from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(dateStr, locale = 'en-US') {
  if (!dateStr || dateStr === 'Present') return 'Present';
  const [year, month] = dateStr.split('-');
  const date = new Date(Number(year), Number(month ? month - 1 : 0));
  return date.toLocaleDateString(locale, { year: 'numeric', month: 'short' });
}

export function readingTime(text = '') {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function debounce(fn, delay = 250) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}
