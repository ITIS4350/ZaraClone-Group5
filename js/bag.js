// Prototype bag. Prices are in dollars; tax is a demo estimate matching Figma.
const bagItems = document.getElementById('bag-items');
const checkoutButton = document.getElementById('continue-shipping');
const bagStatus = document.getElementById('bag-status');
/*there is a way to mkae this more inclusive, but for this case only usd */ 
const formatPrice = (amount) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);

const itemTemplate = document.getElementById('bag-item-template');

function createBagItem(product, selection) {
  const card = itemTemplate.content.firstElementChild.cloneNode(true);
  card.dataset.product = product.id;
  card.dataset.color = selection.color;
  card.dataset.size = selection.size;
  card.dataset.price = product.price;
  card.dataset.quantity = selection.quantity;
  card.setAttribute('aria-label', product.name);
  // Size belongs to the product, not its position in the list.
  card.style.setProperty('--card-height', (product.imageHeight + 2) + 'px');
  card.querySelector('.product-name').textContent = product.name;
  card.querySelector('.product-color').textContent = 'Color: ' + selection.color;
  card.querySelector('.product-size').textContent = 'Size: ' + selection.size;
  card.querySelector('.quantity-control').setAttribute('aria-label', 'Quantity for ' + product.name);
  card.querySelector('.quantity').setAttribute('aria-label', product.name + ' quantity');
  card.querySelector('[data-action="decrease"]').setAttribute('aria-label', 'Decrease ' + product.name + ' quantity');
  card.querySelector('[data-action="increase"]').setAttribute('aria-label', 'Increase ' + product.name + ' quantity');
  card.querySelector('[data-action="remove"]').setAttribute('aria-label', 'Remove ' + product.name);

  const image = card.querySelector('.product-image');
  const placeholder = card.querySelector('.product-image-placeholder');
  image.alt = product.name + ' in ' + selection.color.toLowerCase();
  image.height = Math.round(product.imageHeight);
  image.addEventListener('load', () => {
    image.hidden = false;
    placeholder.hidden = true;
  });
  image.addEventListener('error', () => {
    image.hidden = true;
    placeholder.hidden = false;
  });
  const imagePath = getProductImage(product, selection.color);
  if (imagePath) {
    image.src = imagePath;
  }

  return card;
}

function renderBag() {
  const selections = Cart.getItems();
  bagItems.replaceChildren();
  for (const selection of selections) {
    const product = products.find((product) => product.id === selection.productId);
    if (product) {
      bagItems.append(createBagItem(product, selection));
    }
  }
  document.getElementById('cart-storage-notice').hidden = Cart.storageAvailable;
  return updateBag();
}

function updateBag() {
  const cards = [...bagItems.querySelectorAll('.bag-item')];
  const count = cards.reduce((sum, card) => sum + Number(card.dataset.quantity), 0);
  const subtotalCents = cards.reduce((sum, card) => sum + Math.round(Number(card.dataset.price) * 100) * Number(card.dataset.quantity), 0);
  const subtotal = subtotalCents / 100;
  // Prototype estimate: calculate in cents so decimal product prices remain accurate.
  const tax = Math.round(subtotalCents * 0.08) / 100;
  const total = subtotal + tax;
  document.querySelectorAll('[data-item-count]').forEach((element) => element.textContent = count);
  document.querySelectorAll('[data-subtotal]').forEach((element) => element.textContent = formatPrice(subtotal));
  document.getElementById('item-word').textContent = count === 1 ? 'Item' : 'Items';
  document.getElementById('summary-item-word').textContent = count === 1 ? 'item' : 'items';
  document.getElementById('tax-total').textContent = formatPrice(tax);
  document.getElementById('order-total').textContent = formatPrice(total);
  document.getElementById('checkout-total').textContent = formatPrice(total);
  document.getElementById('shipping-cost').textContent = subtotal > 150 ? 'Free' : count ? 'At checkout' : '—';
  document.getElementById('empty-bag').hidden = count !== 0;
  checkoutButton.disabled = count === 0;
  cards.forEach((card) => {
    const quantity = Number(card.dataset.quantity);
    card.querySelector('.quantity').textContent = quantity;
    card.querySelector('[data-action="decrease"]').disabled = quantity === 1;
    card.querySelector('[data-action="increase"]').disabled = quantity >= 99;
    card.querySelector('.product-price').textContent = formatPrice(Number(card.dataset.price) * quantity);
  });
  return `${count} ${count === 1 ? 'item' : 'items'} in your bag. Total ${formatPrice(total)}${subtotal > 0 && subtotal <= 150 ? ', before shipping' : ''}.`;
}

function selectionFromCard(card) {
  return { productId: card.dataset.product, color: card.dataset.color, size: card.dataset.size };
}

function focusSelection(selection, action) {
  const card = [...bagItems.querySelectorAll('.bag-item')].find((card) =>
    Cart.key(selectionFromCard(card)) === Cart.key(selection));
  if (card) {
    let button = card.querySelector('[data-action="' + action + '"]');
    if (button.disabled) {
      button = card.querySelector('[data-action="' + (action === 'decrease' ? 'increase' : 'decrease') + '"]');
    }
    button.focus();
  } else {
    document.querySelector('#empty-bag a').focus();
  }
}

bagItems.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) {
    return;
  }
  const card = button.closest('.bag-item');
  const selection = selectionFromCard(card);
  const name = card.querySelector('h2').textContent;
  if (button.dataset.action === 'remove') {
    const nextCard = card.nextElementSibling || card.previousElementSibling;
    const nextSelection = nextCard ? selectionFromCard(nextCard) : selection;
    Cart.removeItem(selection);
    bagStatus.textContent = name + ' removed. ' + updateBag();
    focusSelection(nextSelection, 'remove');
  } else {
    const change = button.dataset.action === 'increase' ? 1 : -1;
    const quantity = Math.max(1, Math.min(99, Number(card.dataset.quantity) + change));
    Cart.setQuantity(selection, quantity);
    bagStatus.textContent = name + ' quantity ' + quantity + '. ' + updateBag();
    focusSelection(selection, button.dataset.action);
  }
});
checkoutButton.addEventListener('click', () => {
  window.location.href = 'checkout.html';
});
window.addEventListener('cartchange', () => {
  // Keep keyboard focus when a change arrives from another tab or page code.
  const activeButton = document.activeElement?.closest('button[data-action]');
  const activeCard = activeButton?.closest('.bag-item');
  const selection = activeCard ? selectionFromCard(activeCard) : null;
  renderBag();
  if (selection) {
    const remaining = [...bagItems.querySelectorAll('.bag-item')];
    const exists = remaining.some((card) => Cart.key(selectionFromCard(card)) === Cart.key(selection));
    focusSelection(exists || !remaining.length ? selection : selectionFromCard(remaining[0]), activeButton.dataset.action);
  }
});
window.addEventListener('pageshow', renderBag);
renderBag();
