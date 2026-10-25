// Persist the user's theme choice across pages; default to light mode.
(() => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const htmlElement = document.documentElement;
  const storageKey = 'zara-theme-v1';

  function getSavedTheme() {
    try {
      return window.localStorage.getItem(storageKey);
    } catch {
      return null;
    }
  }

  function setTheme(isDark) {
    htmlElement.classList.toggle('dark', isDark);
    if (isDark) {
      htmlElement.setAttribute('data-theme', 'dark');
    } else {
      htmlElement.removeAttribute('data-theme');
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-pressed', String(isDark));
    }
    if (themeIcon) {
      themeIcon.className = isDark ? 'fa-solid fa-moon' : 'fa-regular fa-moon';
    }
  }

  setTheme(getSavedTheme() === 'dark');
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = !htmlElement.classList.contains('dark');
      setTheme(isDark);
      try {
        window.localStorage.setItem(storageKey, isDark ? 'dark' : 'light');
      } catch {
        // Keep the selected theme for this page when storage is unavailable.
      }
    });
  }
})();
