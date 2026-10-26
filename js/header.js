// Shared header and navigation. Loads before Interactivity.js.
(() => {
  const placeholder = document.getElementById('site-header-placeholder');
  if (!placeholder) {
    return;
  }
// change the data labels on the other links once those are implemented to make them active again, for now they are all set to false so that the active page is highlighted correctly
// copied from the header in the landing page hence the comments still being included
  const template = document.createElement('template');
  template.innerHTML = `
<!-- Header / Navigation Bar -->
  <header class="site-header">

    <!-- Left Section: Menu & Brand Logo -->
    <div class="header-brand">
      <button id="menu-btn" class="menu-button" aria-label="Open Menu" aria-controls="mobile-menu" aria-expanded="false">
        <svg class="menu-icon" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
        </svg>
      </button>

      <a href="zara_landing_page.html" class="zara-logo">
        ZARA
      </a>
    </div>

    <!-- Center Section: Search Bar (Desktop) -->
    <div class="header-search">
      <div class="search-field">
        <input
          type="text"
          placeholder="Search" aria-label="Search"
          class="search-input"
        />
      </div>
    </div>

    <!-- Right Section: Links & Dark Mode Toggle -->
    <div class="header-actions">
      <div class="header-links">
        <a href="#" class="header-link">Settings</a>
        <a href="help/index.html" class="header-link">Help</a>
        <a href="bag_page.html" class="header-link">Bag</a>
      </div>

      <!-- Mobile Search Icon -->
      <button class="mobile-action" aria-label="Search">
        <i class="fa-solid fa-magnifying-glass"></i>
      </button>

      <!-- Mobile Bag Icon -->
      <a href="bag_page.html" class="mobile-action" aria-label="Shopping Bag">
        <i class="fa-solid fa-bag-shopping"></i>
      </a>

      <!-- Theme Switcher Switch -->
      <button
        id="theme-toggle"
        class="theme-toggle"
        aria-label="Toggle dark mode" aria-pressed="false"
      >
        <span class="theme-toggle-thumb">
          <i class="fa-regular fa-moon theme-icon-light"></i>
          <i class="fa-solid fa-moon theme-icon-dark"></i>
        </span>
      </button>
    </div>
  </header>

  <!-- Mobile Navigation Drawer Overlay -->
  <div id="mobile-menu" class="menu-overlay" aria-hidden="true" inert>
    <div class="menu-drawer" role="dialog" aria-modal="true" aria-label="Navigation menu">
      <div>
        <div class="menu-heading">
          <span class="zara-logo drawer-logo">ZARA</span>
          <button id="close-menu-btn" class="menu-close" aria-label="Close menu">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
        <nav class="menu-navigation">
          <a href="new_arrivals.html" class="menu-link">New</a>
          <a href="women.html" class="menu-link">Woman</a>
          <a href="women.html" class="menu-link" data-active="false">Man</a>
          <a href="women.html" class="menu-link" data-active="false">Kids</a>
          <a href="women.html" class="menu-link" data-active="false">Beauty</a>
          <a href="new_arrivals.html" class="menu-link" data-active="false">Collections</a>
        </nav>
      </div>

      <div class="menu-footer">
        <a href="#">Settings</a>
        <a href="help/index.html">Help &amp; Support</a>
        <a href="bag_page.html">Shopping Bag</a>
      </div>
    </div>
  </div>
  `;

  const currentPath = window.location.pathname.replace(/\/+$/, '') || '/';
  template.content.querySelectorAll('a[href]').forEach((link) => {
    const href = link.getAttribute('href');
    if (
      link.dataset.active === 'false' ||
      !href ||
      href.startsWith('#') ||
      href.startsWith('mailto:')
    ) {
      return;
    }

    const linkUrl = new URL(href, window.location.href);
    const linkPath = linkUrl.pathname.replace(/\/+$/, '') || '/';
    if (linkUrl.origin === window.location.origin && linkPath === currentPath) {
      link.setAttribute('aria-current', 'page');
    }
  });
  placeholder.replaceWith(template.content);
})();
