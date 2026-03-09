import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LangContext = createContext(null);
const VALID_LANGS = ['en', 'ru'];

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang');
    const initial = VALID_LANGS.includes(stored) ? stored : 'en';
    document.documentElement.lang = initial;
    return initial;
  });

  const switchLang = (l) => {
    if (!VALID_LANGS.includes(l)) return;
    setLang(l);
    localStorage.setItem('lang', l);
    document.documentElement.lang = l;
  };

  const t = translations[lang] || translations.en;

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LangProvider');
  return ctx;
}
