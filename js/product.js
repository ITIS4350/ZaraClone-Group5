// automatically generated from products.json 
(() => {
  const id = new URLSearchParams(window.location.search).get('id');
  const product = products.find(item => item.id === (id ?? products[0].id));
  if (!product) {
    document.getElementById('product-missing').hidden = false;
    document.title = 'Product not found | ZARA';
    return;
  }

  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
  const photo = document.getElementById('product-photo');
  const thumbnails = document.getElementById('product-thumbnails');
  const form = document.getElementById('product-form');
  const swatches = {
    'Mid Blue': '#4c6b88', Black: '#202020', White: '#ffffff', Ivory: '#f0ede3',
    Grey: '#888888', Beige: '#cbb999', 'Forest Green': '#414f40', 'Optic White': '#fafafa',
    Crimson: '#a70c24', 'Washed Black': '#414141', Blue: '#436b96',
    'Vintage Blue': '#697e94', 'Light Blue': '#a5c4dc', 'Deep Olive': '#60634c',
    'Ruby Red': '#9b1837', 'Classic Blue': '#4a709a'
  };
  let color = product.colors[0];

  function placeholder(text) {
    const element = document.createElement('span');
    element.className = 'product-placeholder';
    element.textContent = text;
    return element;
  }

  // no photo = text instead 
  function showImage(container, source, alt, fallback = 'No image available') {
    container.replaceChildren(placeholder(fallback));
    if (!source) {
      return;
    }
    const image = document.createElement('img');
    image.alt = alt;
    image.addEventListener('error', () => {
      image.replaceWith(placeholder(fallback));
      if (container.tagName === 'BUTTON') {
        container.disabled = true;
      }
    });
    image.src = source;
    container.replaceChildren(image);
  }

  function renderGallery() {
    showImage(photo, getProductImage(product, color), product.name + ' in ' + color);
    thumbnails.replaceChildren();
    const galleryImages = [getProductImage(product, color), ...(product.thumbnails || []).filter(Boolean)];
    galleryImages.forEach((source, index) => {
     // in the future more images would be nice for the other colours it woudl be easy to just recolor the image with a photo editor or somthing. 
      // the alt text is a bit long but it is better for accessibility and screen readers.
      const label = index === 0 ? 'main photo' : ['side view', 'back view', 'detail view'][index - 1] || 'additional photo ' + index;
      const alt = index === 0 ? product.name + ' in ' + color + ', ' + label : product.name + ', ' + label;
      // the slot is a button if there is a source image, otherwise it is just a div with text.
      // or basically no image it uniteractable but with a image it is a button that will show the image in the main photo area.
      const slot = document.createElement(source ? 'button' : 'div');
      slot.className = 'product-thumbnail';
      if (source) {
        slot.type = 'button';
        slot.setAttribute('aria-label', 'View ' + label);
        slot.addEventListener('click', () => showImage(photo, source, alt));
      }
      showImage(slot, source, alt, 'Image coming soon');
      thumbnails.append(slot);
    });
  }
  // the main photo is the first image in the product images array, and the other images are the rest of the images in the array.
  function addOption(container, name, value, index) {
    const label = document.createElement('label');
    label.className = 'product-option' + (name === 'color' ? ' product-color' : '');
    const input = document.createElement('input');
    input.type = 'radio';
    input.name = name;
    input.value = value;
    input.required = true;
    const visual = document.createElement('span');
    visual.className = 'product-option-visual';
    if (name === 'color') {
      input.checked = index === 0;
      label.title = value;
      visual.setAttribute('aria-hidden', 'true');
      visual.style.setProperty('--swatch-color', swatches[value] || '#888888');
    } else {
      visual.textContent = value;
    }
    label.append(input, visual);
    if (name === 'color') {
      const colorName = document.createElement('span');
      colorName.className = 'product-color-name';
      colorName.textContent = value;
      label.append(colorName);
    }
    container.append(label);
  }
  // basically just retrives all the infor the header are not preset for the details since diffrent items would need diffrent details 
  document.title = product.name + ' | ZARA';
  document.getElementById('product-title').textContent = product.name;
  document.getElementById('product-price').textContent = price.format(product.price);
  document.getElementById('product-description').textContent = product.description;
  document.getElementById('selected-color').textContent = color;
  product.colors.forEach((value, index) => addOption(document.getElementById('product-colors'), 'color', value, index));
  product.sizes.forEach((value, index) => addOption(document.getElementById('product-sizes'), 'size', value, index));
  product.details.forEach(detail => {
    const row = document.createElement('div');
    row.className = 'product-detail-row';
    const heading = document.createElement('dt');
    const text = document.createElement('dd');
    heading.textContent = detail.heading;
    text.textContent = detail.text;
    row.append(heading, text);
    document.getElementById('product-details').append(row);
  });

  form.addEventListener('change', event => {
    if (event.target.name === 'color') {
      color = event.target.value;
      document.getElementById('selected-color').textContent = color;
      renderGallery();
    }
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const selection = { productId: product.id, color, size: new FormData(form).get('size'), quantity: 1 };
    BagFeedback.add(product, selection, form.querySelector('[type="submit"]'));
  });
  // the recommended products are just the first 8 products that are not the current product.
  products.filter(item => item.id !== product.id).slice(0, 8).forEach(item => {
    const link = document.createElement('a');
    link.className = 'recommended-product';
    link.href = 'product.html?id=' + encodeURIComponent(item.id);
    const image = document.createElement('div');
    image.className = 'recommended-photo';
    showImage(image, getProductImage(item), item.name);
    const title = document.createElement('h3');
    title.textContent = item.name;
    const amount = document.createElement('p');
    amount.textContent = price.format(item.price);
    link.append(image, title, amount);
    document.getElementById('recommended-products').append(link);
  });
  renderGallery();
  document.getElementById('product-content').hidden = false;
  document.getElementById('product-recommendations').hidden = false;
})();
