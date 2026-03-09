import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

function applyTheme(next) {
  document.documentElement.classList.toggle('light', next === 'light');
  document.documentElement.classList.toggle('dark', next === 'dark');
  localStorage.setItem('theme', next);
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const stored = localStorage.getItem('theme') || 'dark';
    applyTheme(stored);
    return stored;
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  // toggleTheme accepts optional (x, y) click coordinates for clip-path reveal
  const toggleTheme = (x, y) => {
    const next = theme === 'dark' ? 'light' : 'dark';

    if (!document.startViewTransition || x == null || y == null) {
      setTheme(next);
      return;
    }

    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    const root = document.documentElement;
    root.style.setProperty('--theme-x', `${x}px`);
    root.style.setProperty('--theme-y', `${y}px`);
    root.style.setProperty('--theme-radius', `${Math.ceil(radius)}px`);

    document.startViewTransition(() => {
      applyTheme(next);
      setTheme(next);
    });
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider');
  return ctx;
}
