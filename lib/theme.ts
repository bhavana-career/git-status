export const THEME_STORAGE_KEY = 'healthguard-theme';
export type ThemeMode = 'light' | 'dark';

export const themeScript = `
(() => {
  try {
    const storageKey = '${THEME_STORAGE_KEY}';
    const savedTheme = window.localStorage.getItem(storageKey);
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme === 'light' || savedTheme === 'dark' ? savedTheme : systemTheme;
    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.dataset.theme = theme;
  } catch {}
})();
`;
