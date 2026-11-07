// checkout stuff
(() => {
  const content = document.getElementById('checkout-content');
  const items = document.getElementById('checkout-items');
  const button = document.getElementById('confirm-purchase');
  const buttonLabel = document.getElementById('purchase-label');
  const spinner = document.getElementById('purchase-spinner');
  const status = document.getElementById('purchase-status');
  const success = document.getElementById('purchase-success');
  /* format for money */ 
  const money = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount / 100);
  let total = 0;
  let timer;
  let processing = false;
  let confirming = false;

  // form validation
  const fields = [...document.querySelectorAll('.checkout-fields input')];
  const checkedFields = new Set();
  const correctedFields = new Set();


  /* It's better not to think about naming shcemes in other countries
     so no numbers in city or state*/ 
  // no field for apartment number 
  const requiredMessages = {
    'full-name': 'Enter your full name.',
    address: 'Enter your street address.',
    city: 'Enter your city.',
    state: 'Enter your state.',
    zip: 'Enter a 5-digit ZIP code.',
    'card-name': 'Enter the name shown on your card.',
    'card-number': 'Enter a 16-digit card number.',
    expiration: 'Enter the expiration date as MM / YY.',
    'security-code': 'Enter the 3- or 4-digit security code on your card.'
  };
  const digitLimits = { zip: 5, 'card-number': 16, expiration: 4, 'security-code': 4 };

  
  function filterNumberInput(field) {
    const limit = digitLimits[field.name];
    if (!limit) return;
    const original = field.value;
    const position = field.selectionStart ?? original.length;
    // (/\D/g, '') removes all non-digit characters 
    const digitsBeforeCursor = original.slice(0, position).replace(/\D/g, '').length;
    const digits = original.replace(/\D/g, '').slice(0, limit);
    const formatted = field.name === 'expiration' && digits.length > 2
      ? digits.slice(0, 2) + ' / ' + digits.slice(2)
      : digits;
    // formats values after the user types them, and moves the cursor to the right place after formatting
    if (original !== formatted) {
      field.value = formatted;
      const cursor = Math.min(digitsBeforeCursor, digits.length);
      const offset = field.name === 'expiration' && cursor > 2 ? 3 : 0;
      field.setSelectionRange(cursor + offset, cursor + offset);
    }
  }

  function fieldError(field) {
    const value = field.value.trim();
    if (!value) return requiredMessages[field.name];
    // so no just puncuation in the name. 
    if (field.name === 'card-name' && !/\p{L}/u.test(value)) {return 'Enter a name containing at least one letter.';}
    if (field.name === 'zip' && !/^\d{5}$/.test(value)) return requiredMessages.zip;
    if (field.name === 'card-number' && !/^\d{16}$/.test(value)) return requiredMessages['card-number'];
    if (field.name === 'security-code' && !/^\d{3,4}$/.test(value)) return requiredMessages['security-code'];
    if (field.name === 'expiration') {
      const date = value.match(/^(\d{2}) \/ (\d{2})$/);
      if (!date) return requiredMessages.expiration;
      const month = Number(date[1]);
      const year = 2000 + Number(date[2]);
      if (month < 1 || month > 12) return 'Enter a month from 01 to 12.';
      const today = new Date();
      if (year < today.getFullYear() || (year === today.getFullYear() && month < today.getMonth() + 1)) {
        return "Enter an expiration date that hasn't passed.";
      }
    }
    return '';
  }

  function validateField(field) {
    checkedFields.add(field);
    const error = fieldError(field);
    if (error) correctedFields.add(field);
    field.classList.toggle('is-invalid', Boolean(error));
    field.classList.toggle('is-valid', !error);
    field.setAttribute('aria-invalid', String(Boolean(error)));
    document.getElementById(field.id + '-message').textContent = error
      || (correctedFields.has(field) ? 'Problem resolved :)' : 'good');
    return !error;
  }

  function resetValidation() {
    checkedFields.clear();
    correctedFields.clear();
    fields.forEach(field => {
      field.classList.remove('is-invalid', 'is-valid');
      field.removeAttribute('aria-invalid');
      document.getElementById(field.id + '-message').textContent = '';
    });
  }

  fields.forEach(field => {
    field.addEventListener('input', () => {
      if (field.name === 'state') {
        field.value = field.value.replace(/[^a-zA-Z ]/g, '');
      }
      // some cities have hyphens or other special characters so i will allow them but not numbers, normally a dictionary oe exluding @#$ and others is better but for now this is good enough
      if (field.name === 'city') {
        field.value = field.value.replace(/[0-9]/g, '');
      }
      /* initally no special charcter, but i couldnt type my own name 
         so typical special characters are allowed, as well as other languages */ 
      if (field.name === 'card-name') {
        field.value = field.value.replace(/[^\p{L}\p{M} '\u2019.-]/gu, '');
      }
      filterNumberInput(field);
      if (checkedFields.has(field)) validateField(field);
    });
    field.addEventListener('blur', () => {
      if (document.querySelector('input[name="payment"]:checked').value === 'card') validateField(field);
    });
  });

  function updateTotals() {
    const selections = Cart.getItems();
    const count = selections.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = selections.reduce((sum, item) => {
      const product = products.find(product => product.id === item.productId);
      return sum + Math.round(product.price * 100) * item.quantity;
    }, 0);
    /* remember to use cents for values here*/
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
    resetValidation();
  }));

  content.addEventListener('submit', event => {
    event.preventDefault();
    if (processing || !Cart.getItems().length) return;
    if (document.querySelector('input[name="payment"]:checked').value === 'card') {
      let firstInvalid;
      fields.forEach(field => {
        filterNumberInput(field);
        if (!validateField(field) && !firstInvalid) firstInvalid = field;
      });
      if (firstInvalid) {
        firstInvalid.focus({ preventScroll: true });
        firstInvalid.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'center'
        });
        return;
      }
    }
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
        resetValidation();
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
