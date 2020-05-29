export default {
  get: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (err) {
      throw Error('Cannot get value');
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (err) {
      throw Error('Cannot set value');
    }
  },

  clearStorage: () => {
    try {
      localStorage.clear();
    } catch (err) {
      throw Error('Cannot clear storage');
    }
  },
};
