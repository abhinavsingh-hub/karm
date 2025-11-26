import { createContext, useContext, useState, useEffect } from 'react';
import { storage } from '../utils/storage';
import { generateMockUsers } from '../utils/mockData';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage
  useEffect(() => {
    try {
      const savedAuth = storage.getAuth();
      const savedUser = storage.getUser();
      
      if (savedAuth && savedUser) {
        setUser(savedUser);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize mock data on first load
  useEffect(() => {
    try {
      if (!storage.get('users')) {
        const mockUsers = generateMockUsers();
        storage.set('users', mockUsers);
      }
    } catch (error) {
      console.error('Error initializing mock data:', error);
    }
  }, []);

  const signUp = async (userData) => {
    try {
      const users = storage.get('users') || [];
      const existingUser = users.find(u => u.email === userData.email);
      
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      const newUser = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        ...userData,
        createdAt: new Date().toISOString(),
        profilePicture: null,
        coverPhoto: null,
        connections: [],
        posts: [],
        campaigns: [],
        impact: {
          posts: 0,
          campaigns: 0,
          connections: 0,
          upvotes: 0
        }
      };

      users.push(newUser);
      storage.set('users', users);
      storage.setAuth({ userId: newUser.id, authenticatedAt: new Date().toISOString() });
      storage.setUser(newUser);

      setUser(newUser);
      setIsAuthenticated(true);

      return { success: true, user: newUser };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signIn = async (email, password) => {
    try {
      const users = storage.get('users') || [];
      const user = users.find(u => u.email === email);
      
      if (!user) {
        throw new Error('User not found');
      }

      // In a real app, verify password hash here
      // For now, just check if password is provided
      if (!password) {
        throw new Error('Password is required');
      }

      storage.setAuth({ userId: user.id, authenticatedAt: new Date().toISOString() });
      storage.setUser(user);

      setUser(user);
      setIsAuthenticated(true);

      return { success: true, user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signOut = () => {
    storage.clearAuth();
    storage.clearUser();
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateUser = (updates) => {
    const users = storage.get('users') || [];
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      const updatedUser = { ...users[userIndex], ...updates };
      users[userIndex] = updatedUser;
      storage.set('users', users);
      storage.setUser(updatedUser);
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

