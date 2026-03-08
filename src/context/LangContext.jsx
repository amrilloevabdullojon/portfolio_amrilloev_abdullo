import { createContext, useContext, useState } from 'react';
import { translations } from '../i18n/translations';

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en');

  const switchLang = (l) => {
    setLang(l);
    localStorage.setItem('lang', l);
  };

  const t = translations[lang];

  return (
    <LangContext.Provider value={{ lang, switchLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
