// Authentication utilities
const TOKEN_KEY = 'scriptshield_token';
const API_KEY = 'scriptshield_api_key';
const USER_DATA = 'scriptshield_user_data';

export const auth = {
  // Token management
  setToken(token) {
    try {
      localStorage.setItem(TOKEN_KEY, token);
      return true;
    } catch (error) {
      console.error('Failed to save token:', error);
      return false;
    }
  },

  getToken() {
    return localStorage.getItem(TOKEN_KEY);
  },

  removeToken() {
    localStorage.removeItem(TOKEN_KEY);
  },

  // API Key management
  setApiKey(apiKey) {
    try {
      // Encrypt API key before storing (in production, use proper encryption)
      const encrypted = btoa(apiKey);
      localStorage.setItem(API_KEY, encrypted);
      return true;
    } catch (error) {
      console.error('Failed to save API key:', error);
      return false;
    }
  },

  getApiKey() {
    try {
      const encrypted = localStorage.getItem(API_KEY);
      if (!encrypted) return null;
      return atob(encrypted);
    } catch (error) {
      console.error('Failed to retrieve API key:', error);
      return null;
    }
  },

  removeApiKey() {
    localStorage.removeItem(API_KEY);
  },

  // User data
  setUserData(data) {
    try {
      localStorage.setItem(USER_DATA, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Failed to save user data:', error);
      return false;
    }
  },

  getUserData() {
    try {
      const data = localStorage.getItem(USER_DATA);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Failed to retrieve user data:', error);
      return null;
    }
  },

  removeUserData() {
    localStorage.removeItem(USER_DATA);
  },

  // HWID generation
  generateHWID() {
    const components = [
      navigator.userAgent,
      navigator.platform,
      screen.width + 'x' + screen.height,
      navigator.language,
      new Date().getTimezoneOffset(),
    ];
    
    // Create a hash from components
    const combined = components.join('|');
    let hash = 0;
    
    for (let i = 0; i < combined.length; i++) {
      const char = combined.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    
    return Math.abs(hash).toString(16).padStart(8, '0').toUpperCase();
  },

  // Session validation
  validateSession() {
    const token = this.getToken();
    if (!token) return false;

    try {
      // Decode JWT token (in production, verify signature)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      
      if (payload.exp && payload.exp < now) {
        this.clearAuth();
        return false;
      }
      
      return true;
    } catch (error) {
      console.error('Token validation failed:', error);
      this.clearAuth();
      return false;
    }
  },

  // Clear all auth data
  clearAuth() {
    this.removeToken();
    this.removeApiKey();
    this.removeUserData();
  },

  // Check if user is authenticated
  isAuthenticated() {
    return this.validateSession() && this.getApiKey() !== null;
  },

  // Get auth headers for API requests
  getAuthHeaders() {
    const token = this.getToken();
    const apiKey = this.getApiKey();
    
    const headers = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    if (apiKey) {
      headers['X-API-Key'] = apiKey;
    }
    
    return headers;
  },

  // Rate limiting check
  checkRateLimit(endpoint) {
    const key = `rate_limit_${endpoint}`;
    const now = Date.now();
    const windowMs = 60000; // 1 minute
    const maxRequests = 10;
    
    const requests = JSON.parse(localStorage.getItem(key) || '[]');
    
    // Clean old requests
    const validRequests = requests.filter(time => now - time < windowMs);
    
    if (validRequests.length >= maxRequests) {
      return false;
    }
    
    validRequests.push(now);
    localStorage.setItem(key, JSON.stringify(validRequests.slice(-maxRequests)));
    return true;
  },

  // Security utilities
  sanitizeInput(input) {
    if (typeof input !== 'string') return input;
    
    // Basic XSS prevention
    return input
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  },

  validateApiKeyFormat(apiKey) {
    if (!apiKey || typeof apiKey !== 'string') return false;
    
    // Basic format validation
    const patterns = [
      /^sk_live_[a-zA-Z0-9]{24}$/,
      /^sk_test_[a-zA-Z0-9]{24}$/,
      /^sk_dev_[a-zA-Z0-9]{24}$/,
    ];
    
    return patterns.some(pattern => pattern.test(apiKey));
  },

  // Logout function
  logout() {
    this.clearAuth();
    // Clear any session-related data
    window.location.href = '/';
  },
};

export default auth;