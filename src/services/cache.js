class Cache {
  KEYS = {
    CART_ID: 'CART_ID'
  }

  store(key, value) {
    localStorage.setItem(key, value);
  }

  retrieve(key) {
    return localStorage.getItem(key);
  }
}

export default new Cache();
