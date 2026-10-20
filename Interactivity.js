// Dark mode toggle functionality
const themeToggleBtn = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;

// Check system preference or stored theme
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  htmlElement.classList.add('dark');
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener('click', () => {
    htmlElement.classList.toggle('dark');
  });
}

// Mobile Menu Drawer functionality
const menuBtn = document.getElementById('menu-btn');
const closeMenuBtn = document.getElementById('close-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

if (mobileMenu) {
  const menuContainer = mobileMenu.querySelector('div');

  function openMenu() {
    mobileMenu.classList.remove('hidden');
    setTimeout(() => {
      mobileMenu.classList.remove('opacity-0');
      if (menuContainer) {
        menuContainer.classList.remove('-translate-x-full');
      }
    }, 10);
  }

  function closeMenu() {
    mobileMenu.classList.add('opacity-0');
    if (menuContainer) {
      menuContainer.classList.add('-translate-x-full');
    }
    setTimeout(() => {
      mobileMenu.classList.add('hidden');
    }, 300);
  }

  if (menuBtn) {
    menuBtn.addEventListener('click', openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }

  mobileMenu.addEventListener('click', (e) => {
    if (e.target === mobileMenu) closeMenu();
  });
}
