import { createContext, useContext, useState, useMemo, useCallback } from 'react';
import en from './en';
import id from './id';

const dictionaries = { en, id };
const I18nContext = createContext(null);

function getNested(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

export function I18nProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('portfolio:lang') || 'en');

  const changeLang = useCallback((next) => {
    setLang(next);
    localStorage.setItem('portfolio:lang', next);
  }, []);

  const t = useCallback(
    (key) => {
      const dict = dictionaries[lang] || dictionaries.en;
      return getNested(dict, key) ?? getNested(dictionaries.en, key) ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, setLang: changeLang, t }), [lang, changeLang, t]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslation() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useTranslation must be used within I18nProvider');
  return ctx;
}
