// Preserve system theme detection and the page's manual toggle.
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
htmlElement.classList.toggle('dark', window.matchMedia('(prefers-color-scheme: dark)').matches);

function updateThemeToggle() {
  themeToggleBtn?.setAttribute('aria-pressed', String(htmlElement.classList.contains('dark')));
}
updateThemeToggle();
themeToggleBtn?.addEventListener('click', () => {
  htmlElement.classList.toggle('dark');
  updateThemeToggle();
});


const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenu) {
  function setMenuOpen(isOpen) {
    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenu.inert = !isOpen;
    document.body.classList.toggle('menu-open', isOpen);
    menuBtn?.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) {
      mobileMenu.setAttribute('aria-hidden', 'false');
      closeMenuBtn?.focus();
    } else {
      menuBtn?.focus();
      mobileMenu.setAttribute('aria-hidden', 'true');
    }
  }
  menuBtn?.addEventListener('click', () => setMenuOpen(true));
  closeMenuBtn?.addEventListener('click', () => setMenuOpen(false));
  mobileMenu.addEventListener('click', (event) => {
    if (event.target === mobileMenu) {
      setMenuOpen(false);
    }
  });
  document.addEventListener('keydown', (event) => {
    if (!mobileMenu.classList.contains('is-open')) {
      return;
    }
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
    if (event.key === 'Tab') {
      const controls = mobileMenu.querySelectorAll('a[href], button');
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });
}
