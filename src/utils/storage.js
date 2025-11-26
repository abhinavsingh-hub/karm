// localStorage utility functions for data persistence

// Safe localStorage wrapper that handles errors gracefully
const safeLocalStorage = {
  getItem: (key) => {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      console.error('localStorage getItem error:', e);
      return null;
    }
  },
  setItem: (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch (e) {
      console.error('localStorage setItem error:', e);
    }
  },
  removeItem: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (e) {
      console.error('localStorage removeItem error:', e);
    }
  }
};

export const storage = {
  // Auth storage
  setAuth: (authData) => {
    safeLocalStorage.setItem('karm_auth', JSON.stringify(authData));
  },

  getAuth: () => {
    const auth = safeLocalStorage.getItem('karm_auth');
    if (!auth) return null;
    try {
      return JSON.parse(auth);
    } catch (e) {
      console.error('Error parsing auth:', e);
      return null;
    }
  },

  clearAuth: () => {
    safeLocalStorage.removeItem('karm_auth');
  },

  // User data storage
  setUser: (user) => {
    safeLocalStorage.setItem('karm_user', JSON.stringify(user));
  },

  getUser: () => {
    const user = safeLocalStorage.getItem('karm_user');
    if (!user) return null;
    try {
      return JSON.parse(user);
    } catch (e) {
      console.error('Error parsing user:', e);
      return null;
    }
  },

  clearUser: () => {
    safeLocalStorage.removeItem('karm_user');
  },

  // Generic storage helpers
  set: (key, value) => {
    safeLocalStorage.setItem(`karm_${key}`, JSON.stringify(value));
  },

  get: (key) => {
    const item = safeLocalStorage.getItem(`karm_${key}`);
    if (!item) return null;
    try {
      return JSON.parse(item);
    } catch (e) {
      console.error(`Error parsing ${key}:`, e);
      return null;
    }
  },

  remove: (key) => {
    safeLocalStorage.removeItem(`karm_${key}`);
  },

  // Clear all Karm data
  clearAll: () => {
    try {
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('karm_')) {
          safeLocalStorage.removeItem(key);
        }
      });
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
  }
};

