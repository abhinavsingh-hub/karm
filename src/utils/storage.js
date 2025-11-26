// localStorage utility functions for data persistence

export const storage = {
  // Auth storage
  setAuth: (authData) => {
    localStorage.setItem('karm_auth', JSON.stringify(authData));
  },

  getAuth: () => {
    const auth = localStorage.getItem('karm_auth');
    return auth ? JSON.parse(auth) : null;
  },

  clearAuth: () => {
    localStorage.removeItem('karm_auth');
  },

  // User data storage
  setUser: (user) => {
    localStorage.setItem('karm_user', JSON.stringify(user));
  },

  getUser: () => {
    const user = localStorage.getItem('karm_user');
    return user ? JSON.parse(user) : null;
  },

  clearUser: () => {
    localStorage.removeItem('karm_user');
  },

  // Generic storage helpers
  set: (key, value) => {
    localStorage.setItem(`karm_${key}`, JSON.stringify(value));
  },

  get: (key) => {
    const item = localStorage.getItem(`karm_${key}`);
    return item ? JSON.parse(item) : null;
  },

  remove: (key) => {
    localStorage.removeItem(`karm_${key}`);
  },

  // Clear all Karm data
  clearAll: () => {
    Object.keys(localStorage).forEach(key => {
      if (key.startsWith('karm_')) {
        localStorage.removeItem(key);
      }
    });
  }
};

