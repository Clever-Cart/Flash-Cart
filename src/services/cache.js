class Cache {
  KEYS = {
    CART_ID: 'CART_ID'
  }

  store(key, value) {
    localStorage.setItem(key, 'LQ7lrMxGTPpHFEV4JHmZ');
  }

  retrieve(key) {
    return localStorage.getItem(key);
  }
}

export default new Cache();
