//searhc bar
(() => {
  const input = document.querySelector('header .search-input');
  if (!input) {
    return;
  }
  const panel = input.closest('.header-search, .header-center');
  const field = input.parentElement;
  const header = input.closest('header');
  const toggle = header.querySelector('button[aria-label="Search"]');
  // Resolve from this script so links also work from pages inside help/.
  const productUrl = new URL('../product.html', document.currentScript.src);
  panel.classList.add('product-search-panel');
  panel.id = 'product-search-panel';
  field.classList.add('product-search-field');
  input.type = 'search';
  input.autocomplete = 'off';
  input.spellcheck = false;
  input.setAttribute('aria-label', 'Search products');
  input.setAttribute('aria-controls', 'product-search-results');

  const results = document.createElement('div');
  results.id = 'product-search-results';
  results.className = 'product-search-results';
  results.hidden = true;
  const status = document.createElement('p');
  status.className = 'product-search-status';
  status.setAttribute('role', 'status');
  const list = document.createElement('ul');
  list.setAttribute('aria-label', 'Matching products');
  results.append(status, list);
  field.append(results);

  function hideResults() {
    results.hidden = true;
    status.textContent = '';
  }

  function renderResults() {
    const query = input.value.trim().toLowerCase();
    list.replaceChildren();
    if (!query) {
      hideResults();
      return;
    }
    const matches = products.filter(product => product.name.toLowerCase().startsWith(query));
    results.hidden = false;
    status.textContent = matches.length
      ? matches.length + (matches.length === 1 ? ' product found' : ' products found')
      : 'No products found.';
    matches.forEach(product => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      const url = new URL(productUrl);
      url.searchParams.set('id', product.id);
      link.href = url.href;
      link.textContent = product.name;
      item.append(link);
      list.append(item);
    });
  }

  function closeSearch() {
    hideResults();
    panel.classList.remove('search-is-open');
    toggle?.setAttribute('aria-expanded', 'false');
  }

  input.addEventListener('input', renderResults);
  input.addEventListener('focus', renderResults);
  if (toggle) {
    toggle.setAttribute('aria-controls', panel.id);
    toggle.setAttribute('aria-expanded', 'false');
    toggle.addEventListener('click', () => {
      if (panel.classList.contains('search-is-open')) {
        closeSearch();
      } else {
        panel.classList.add('search-is-open');
        toggle.setAttribute('aria-expanded', 'true');
        input.focus();
      }
    });
  }

  panel.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (panel.classList.contains('search-is-open') && getComputedStyle(toggle).display !== 'none') {
        toggle.focus();
        closeSearch();
      } else {
        input.focus();
        hideResults();
      }
      event.preventDefault();
      return;
    }
    if ((event.key === 'ArrowDown' || event.key === 'ArrowUp') && !results.hidden) {
      const links = [...list.querySelectorAll('a')];
      const index = links.indexOf(document.activeElement);
      const next = event.key === 'ArrowDown' ? index + 1 : index - 1;
      if (links.length) {
        event.preventDefault();
        if (next < 0) {
          input.focus();
        } else {
          links[Math.min(next, links.length - 1)].focus();
        }
      }
    }
  });
  document.addEventListener('click', event => {
    if (!panel.contains(event.target) && !toggle?.contains(event.target)) {
      closeSearch();
    }
  });
  document.addEventListener('focusin', event => {
    if (!panel.contains(event.target) && event.target !== toggle) {
      closeSearch();
    }
  });
})();
