// A local checkout flow. Input validation/formatting will be added separately.
(() => {
  const content = document.getElementById('checkout-content');
  const items = document.getElementById('checkout-items');
  const button = document.getElementById('confirm-purchase');
  const buttonLabel = document.getElementById('purchase-label');
  const spinner = document.getElementById('purchase-spinner');
  const status = document.getElementById('purchase-status');
  const success = document.getElementById('purchase-success');
  const money = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
  let total = 0;
  let timer;
  let processing = false;
  let confirming = false;

  function updateTotals() {
    const selections = Cart.getItems();
    const count = selections.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = selections.reduce((sum, item) => {
      const product = products.find(product => product.id === item.productId);
      return sum + Math.round(product.price * 100) * item.quantity;
    }, 0);
    const standard = subtotal > 15000 ? 0 : 595;
    const shipping = document.querySelector('input[name="shipping"]:checked').value === 'express' ? 1000 : standard;
    const tax = Math.round(subtotal * 0.08);
    total = subtotal + shipping + tax;
    document.getElementById('standard-price').textContent = standard ? money(standard) : 'Free';
    document.getElementById('checkout-count').textContent = count;
    document.getElementById('checkout-subtotal').textContent = money(subtotal);
    document.getElementById('checkout-shipping').textContent = shipping ? money(shipping) : 'Free';
    document.getElementById('checkout-tax').textContent = money(tax);
    document.getElementById('checkout-total').textContent = money(total);
    if (!processing) buttonLabel.textContent = money(total) + ' — Confirm Purchase';
  }

  function renderCheckout() {
    const selections = Cart.getItems();
    content.hidden = selections.length === 0;
    document.getElementById('empty-checkout').hidden = selections.length !== 0;
    button.disabled = selections.length === 0;
    items.replaceChildren();
    for (const selection of selections) {
      const product = products.find(product => product.id === selection.productId);
      const row = document.createElement('article');
      row.className = 'checkout-item';
      const photo = document.createElement('div');
      photo.className = 'checkout-item-photo';
      photo.textContent = 'No image available';
      const path = getProductImage(product, selection.color);
      if (path) {
        const image = document.createElement('img');
        image.alt = product.name + ' in ' + selection.color;
        image.addEventListener('load', () => photo.replaceChildren(image));
        image.src = path;
      }
      const details = document.createElement('div');
      const name = document.createElement('h3');
      name.textContent = product.name;
      const options = document.createElement('p');
      options.textContent = selection.color + ' · Size ' + selection.size + ' · Qty ' + selection.quantity;
      const price = document.createElement('strong');
      price.textContent = money(Math.round(product.price * 100) * selection.quantity);
      details.append(name, options, price);
      row.append(photo, details);
      items.append(row);
    }
    updateTotals();
  }

  document.querySelectorAll('input[name="shipping"]').forEach(input => input.addEventListener('change', updateTotals));
  document.querySelectorAll('input[name="payment"]').forEach(input => input.addEventListener('change', () => {
    document.getElementById('card-details').hidden = input.value !== 'card';
  }));

  button.addEventListener('click', () => {
    if (processing || !Cart.getItems().length) return;
    processing = true;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    spinner.hidden = false;
    buttonLabel.textContent = 'Processing…';
    status.textContent = 'Processing your purchase…';
    // Prevent selection changes during the brief simulated purchase.
    // should never fail but better to have even if it is all "fake"
    content.querySelectorAll('input').forEach(input => input.disabled = true);
    timer = setTimeout(() => {
      try {
        // Simulate a successful purchase. just a random order number !
        document.getElementById('order-number').textContent = Math.floor(1000 + Math.random() * 9000);
        confirming = true;
        Cart.clear();
        confirming = false;
        document.querySelectorAll('.checkout-fields input').forEach(input => input.value = '');
        success.showModal();
        status.textContent = '';
      } catch {
        status.textContent = 'Your purchase could not be completed. Please try again.';
      } finally {
        confirming = false;
        processing = false;
        spinner.hidden = true;
        button.removeAttribute('aria-busy');
        content.querySelectorAll('input').forEach(input => input.disabled = false);
        renderCheckout();
      }
    }, 700);
  });
  document.getElementById('close-success').addEventListener('click', () => success.close());
  success.addEventListener('close', () => document.querySelector('#empty-checkout a').focus());
  window.addEventListener('cartchange', () => {
    if (confirming) return;
    if (processing) {
      clearTimeout(timer);
      processing = false;
      spinner.hidden = true;
      button.removeAttribute('aria-busy');
      content.querySelectorAll('input').forEach(input => input.disabled = false);
      status.textContent = 'Your bag changed. Review your order before continuing.';
    }
    renderCheckout();
  });
  window.addEventListener('pageshow', renderCheckout);
  renderCheckout();
})();
