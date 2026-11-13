(() => {
  const params = new URLSearchParams(window.location.search);
  const query = (params.get('q') || '').trim();
  const normalizedQuery = query.toLowerCase();
  const title = document.querySelector('#search-results-title');
  const queryLabel = document.querySelector('#search-results-query');
  const status = document.querySelector('#search-results-status');
  const grid = document.querySelector('#search-results-grid');

  document.title = query ? `Results for ${query} | ZARA` : 'Search Results | ZARA';
  queryLabel.textContent = query ? `Results for “${query}”` : 'Enter a search term to find products.';

  if (!query) {
    title.textContent = 'Search products';
    status.textContent = 'Use the search field above to find a product.';
    return;
  }

  const matches = products.filter(product =>
    product.name.toLowerCase().includes(normalizedQuery)
  );

  if (!matches.length) {
    status.textContent = `No matches for “${query}”. Try another search or browse New Arrivals.`;
    return;
  }

  status.textContent = `${matches.length} ${matches.length === 1 ? 'item' : 'items'} found`;
  const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  matches.forEach(product => {
    const card = document.createElement('article');
    card.className = 'search-result-card';
    const link = document.createElement('a');
    link.className = 'search-result-product';
    link.href = `product.html?id=${encodeURIComponent(product.id)}`;

    const imagePath = getProductImage(product);
    if (imagePath) {
      const image = document.createElement('img');
      image.src = imagePath;
      image.alt = product.name;
      image.loading = 'lazy';
      link.append(image);
    } else {
      const placeholder = document.createElement('span');
      placeholder.className = 'search-result-placeholder';
      placeholder.textContent = 'Image coming soon';
      link.append(placeholder);
    }

    const name = document.createElement('span');
    name.className = 'search-result-name';
    name.textContent = product.name;
    const price = document.createElement('span');
    price.className = 'search-result-price';
    price.textContent = currency.format(product.price);
    link.append(name, price);
    card.append(link);
    grid.append(card);
  });
})();
