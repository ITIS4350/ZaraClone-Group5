// Home page hero and product carousels.
(() => {
  const hero = document.querySelector('.hero');
  const heroImages = [...document.querySelectorAll('[data-carousel-image]')];
  const indicators = document.querySelector('.carousel-indicators');
  const productCarousel = document.querySelector('.home-product-carousel');

  if (hero && heroImages.length && indicators) {
    let activeIndex = 0;
    const dots = heroImages.map((image, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'carousel-dot';
      dot.setAttribute('aria-label', `Show featured image ${index + 1}`);
      dot.addEventListener('click', () => showHeroImage(index));
      indicators.append(dot);
      return dot;
    });

    function showHeroImage(index) {
      activeIndex = (index + heroImages.length) % heroImages.length;
      heroImages.forEach((image, imageIndex) => {
        image.hidden = imageIndex !== activeIndex;
        dots[imageIndex].classList.toggle('is-active', imageIndex === activeIndex);
        dots[imageIndex].setAttribute('aria-pressed', String(imageIndex === activeIndex));
      });
    }

    document.querySelector('.carousel-previous')?.addEventListener('click', () => showHeroImage(activeIndex - 1));
    document.querySelector('.carousel-next')?.addEventListener('click', () => showHeroImage(activeIndex + 1));
    hero.tabIndex = 0;
    hero.addEventListener('keydown', event => {
      if (window.matchMedia('(max-width: 767px)').matches || heroImages.length < 2) return;
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        showHeroImage(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
      }
    });
    showHeroImage(0);
  }

  if (productCarousel && Array.isArray(products)) {
    const currency = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });
    const featured = products
      .filter(product => product.collections?.includes('new-arrivals'))
      .sort((a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity))
      .slice(0, 8);

    featured.forEach(product => {
      const card = document.createElement('article');
      card.className = 'home-product-card';
      const link = document.createElement('a');
      link.href = `product.html?id=${encodeURIComponent(product.id)}`;
      link.setAttribute('aria-label', `View ${product.name}`);
      const image = document.createElement('img');
      image.src = getProductImage(product);
      image.alt = `${product.name} in ${product.colors[0].toLowerCase()}`;
      const name = document.createElement('p');
      name.className = 'home-product-name';
      name.textContent = product.name;
      const price = document.createElement('p');
      price.className = 'home-product-price';
      price.textContent = currency.format(product.price);
      link.append(image, name, price);
      card.append(link);
      productCarousel.append(card);
    });

    const scrollProducts = direction => productCarousel.scrollBy({
      left: direction * productCarousel.clientWidth * 0.8,
      behavior: 'smooth'
    });
    document.querySelector('.home-product-previous')?.addEventListener('click', () => scrollProducts(-1));
    document.querySelector('.home-product-next')?.addEventListener('click', () => scrollProducts(1));
    productCarousel.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        event.preventDefault();
        scrollProducts(event.key === 'ArrowRight' ? 1 : -1);
      }
    });
  }
})();
