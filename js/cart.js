// Load products.js before this file on any shopping page.
const Cart = (() => {
  // now starts the shopping flow empty instead following the figma demo.
  const storageKey = 'zara-cart-v2';
  let memoryItems = [];
  let storageAvailable = true;

  function key(item) {
    return JSON.stringify([item.productId, item.color, item.size]);
  }

  function validItem(item) {
    const product = products.find((product) => product.id === item?.productId);
    return product && product.colors.includes(item.color) && product.sizes.includes(item.size)
      && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= 99;
  }

  function normalize(items) {
    const entries = new Map();
    for (const item of Array.isArray(items) ? items : []) {
      if (!validItem(item)) {
        continue;
      }
      const previous = entries.get(key(item));
      entries.set(key(item), {
        productId: item.productId, color: item.color, size: item.size,
        quantity: Math.min(99, item.quantity + (previous?.quantity || 0))
      });
    }
    return [...entries.values()];
  }

  function save(items) {
    memoryItems = normalize(items);
    try {
      localStorage.setItem(storageKey, JSON.stringify(memoryItems));
      storageAvailable = true;
    } catch {
      storageAvailable = false;
    }
  }

  function load() {
    if (!storageAvailable) {
      return memoryItems;
    }
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === null) {
        // New visitors begin with an empty bag.
        save([]);
      } else {
        try {
          memoryItems = normalize(JSON.parse(saved));
        } catch {
          // Invalid saved data must not crash the page or restore removed items.
          save([]);
        }
      }
    } catch {
      storageAvailable = false;
    }
    return memoryItems;
  }

  function commit(items) {
    save(items);
    window.dispatchEvent(new Event('cartchange'));
  }

  window.addEventListener('storage', (event) => {
    if (event.key === storageKey || event.key === null) {
      window.dispatchEvent(new Event('cartchange'));
    }
  });

  return {
    key,
    get storageAvailable() { return storageAvailable; },
    getItems() { return load().map((item) => ({ ...item })); },
    addItem(item) {
      const selection = { ...item, quantity: item.quantity ?? 1 };
      if (!validItem(selection)) {
        throw new Error('Choose a valid product, color, size, and quantity (1–99).');
      }
      commit([...load(), selection]);
    },
    setQuantity(selection, quantity) {
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 99) {
        throw new Error('Quantity must be a whole number from 1 to 99.');
      }
      commit(load().map((item) => key(item) === key(selection) ? { ...item, quantity } : item));
    },
    removeItem(selection) {
      commit(load().filter((item) => key(item) !== key(selection)));
    },
    clear() { commit([]); }
  };
})();
