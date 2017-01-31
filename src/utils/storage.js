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
}

const storageService = new Storage();
export default storageService;
