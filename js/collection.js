// Both listing pages share this renderer and the catalog in products.js.
(() => {
  const grid = document.getElementById('collection-grid');
  const template = document.getElementById('catalog-card-template');
  const sort = document.getElementById('collection-sort');
  const dialog = document.getElementById('quick-add');
  const form = document.getElementById('quick-add-form');
  const colorSelect = document.getElementById('quick-add-color');
  const sizeSelect = document.getElementById('quick-add-size');
  const message = document.getElementById('quick-add-message');
  const status = document.getElementById('collection-status');
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const collection = products.filter(product => product.collections?.includes(document.body.dataset.collection));
  let selectedProduct = null;
  let opener = null;
  let statusTimer;

  function createCard(product) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.id = 'product-' + product.id;
    card.dataset.product = product.id;
    const photo = card.querySelector('.catalog-photo');
    const name = card.querySelector('.catalog-name');
    // Both collection pages open the same reusable product page.
    photo.href = name.href = 'product.html?id=' + encodeURIComponent(product.id);
    photo.setAttribute('aria-label', 'View ' + product.name + ' details');
    name.textContent = product.name;
    card.querySelector('.catalog-color').textContent = product.colors[0];
    card.querySelector('.catalog-price').textContent = price.format(product.price);
    const badge = card.querySelector('.catalog-badge');
    badge.textContent = product.badge || '';
    badge.hidden = !product.badge;
    const image = card.querySelector('.catalog-image');
    const placeholder = card.querySelector('.catalog-placeholder');
    image.alt = product.name + ' in ' + product.colors[0].toLowerCase();
    image.addEventListener('load', () => {
      image.hidden = false;
      placeholder.hidden = true;
    });
    image.addEventListener('error', () => {
      image.hidden = true;
      placeholder.hidden = false;
    });
    const imagePath = getProductImage(product);
    if (imagePath) {
      image.src = imagePath;
    }
    const add = card.querySelector('.catalog-add');
    add.setAttribute('aria-label', 'Choose size and color for ' + product.name);
    add.setAttribute('aria-haspopup', 'dialog');
    add.addEventListener('click', () => openPicker(product, add));
    return card;
  }

  function renderCollection() {
    const sorted = [...collection];
    if (sort.value === 'price-low') {
      sorted.sort((a, b) => a.price - b.price);
    } else if (sort.value === 'price-high') {
      sorted.sort((a, b) => b.price - a.price);
    } else if (sort.value === 'name') {
      sorted.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      sorted.sort((a, b) => a.featuredOrder - b.featuredOrder);
    }
    grid.replaceChildren(...sorted.map(createCard));
    document.getElementById('collection-count').textContent = sorted.length + ' items';
  }

  function fillOptions(select, values, prompt) {
    select.replaceChildren();
    if (prompt) {
      const option = new Option(prompt, '');
      option.disabled = true;
      option.selected = true;
      select.add(option);
    }
    values.forEach(value => select.add(new Option(value, value)));
  }

  function openPicker(product, button) {
    selectedProduct = product;
    opener = button;
    document.getElementById('quick-add-title').textContent = product.name;
    document.getElementById('quick-add-price').textContent = price.format(product.price);
    fillOptions(colorSelect, product.colors);
    fillOptions(sizeSelect, product.sizes, 'Select a size');
    message.textContent = '';
    dialog.showModal();
    sizeSelect.focus();
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!selectedProduct || !form.reportValidity()) {
      return;
    }
    const selection = { productId: selectedProduct.id, color: colorSelect.value, size: sizeSelect.value, quantity: 1 };
    const existing = Cart.getItems().find(item => Cart.key(item) === Cart.key(selection));
    if (existing?.quantity >= 99) {
      message.textContent = 'This item has reached the maximum quantity of 99 in your bag.';
      return;
    }
    Cart.addItem(selection);
    if (!Cart.storageAvailable) {
      message.textContent = 'Your browser could not save the bag. Allow site storage before continuing.';
      return;
    }
    dialog.close();
    status.textContent = selectedProduct.name + ' added to your bag (' + selection.color + ', ' + selection.size + ').';
    clearTimeout(statusTimer);
    statusTimer = setTimeout(() => { status.textContent = ''; }, 5000);
  });
  dialog.querySelector('.quick-add-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
  dialog.addEventListener('click', event => {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });
  sort.addEventListener('change', renderCollection);
  renderCollection();
  // The card anchor exists only after the template is rendered.
  if (window.location.hash.startsWith('#product-')) {
    document.getElementById(window.location.hash.slice(1))?.scrollIntoView();
  }
})();
