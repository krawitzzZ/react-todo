class Storage {
  constructor() {
    this.storage = localStorage;
  }

  get(key) {
    return this.storage.getItem(key);
  }

  set(key, value) {
    this.storage.setItem(key, value);
  }

  remove(key) {
    arguments.forEach = [].forEach;
    arguments.forEach(item => this.storage.removeItem(item));
  }

  destroy() {
    this.storage.clear();
  }
}

const storageService = new Storage();
export default storageService;
