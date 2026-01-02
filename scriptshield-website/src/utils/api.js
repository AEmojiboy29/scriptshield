// src/utils/api.js - Complete version for Vercel
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';
const IS_PRODUCTION = process.env.NODE_ENV === 'production';

class ApiError extends Error {
  constructor(message, status, code) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.timestamp = new Date().toISOString();
  }
}

// Request interceptor
const interceptRequest = async (url, options = {}) => {
  const token = localStorage.getItem('scriptshield_token');
  const apiKey = localStorage.getItem('scriptshield_api_key');
  
  const headers = {
    'Content-Type': 'application/json',
    'X-Client-Version': '2.0.1',
    'X-Platform': 'web',
    'X-Request-ID': generateRequestId(),
  };
  
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  
  if (apiKey) {
    headers['X-API-Key'] = apiKey;
  }
  
  // Add custom headers
  if (options.headers) {
    Object.assign(headers, options.headers);
  }
  
  return {
    ...options,
    headers,
  };
};

// Response interceptor
const interceptResponse = async (response) => {
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({
      error: 'Request failed',
      code: 'REQUEST_FAILED'
    }));
    
    throw new ApiError(
      errorData.message || `HTTP ${response.status}`,
      response.status,
      errorData.code || 'UNKNOWN_ERROR'
    );
  }
  
  const data = await response.json();
  
  // Check for API-level errors
  if (data.error && data.error !== false) {
    throw new ApiError(
      data.message || 'API error',
      response.status,
      data.code || 'API_ERROR'
    );
  }
  
  return data;
};

// Rate limiting utility
const rateLimiter = {
  requests: {},
  
  check(key, limit = 10, windowMs = 60000) {
    const now = Date.now();
    
    if (!this.requests[key]) {
      this.requests[key] = [];
    }
    
    // Clean old requests
    this.requests[key] = this.requests[key].filter(time => now - time < windowMs);
    
    if (this.requests[key].length >= limit) {
      throw new ApiError(
        'Rate limit exceeded',
        429,
        'RATE_LIMIT_EXCEEDED'
      );
    }
    
    this.requests[key].push(now);
    return true;
  },
};

// Generate unique request ID
const generateRequestId = () => {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Cache system
const cache = {
  storage: new Map(),
  ttl: 5 * 60 * 1000, // 5 minutes
  
  get(key) {
    const item = this.storage.get(key);
    if (!item) return null;
    
    if (Date.now() > item.expiry) {
      this.storage.delete(key);
      return null;
    }
    
    return item.data;
  },
  
  set(key, data, ttl = this.ttl) {
    this.storage.set(key, {
      data,
      expiry: Date.now() + ttl
    });
  },
  
  clear() {
    this.storage.clear();
  }
};

// Authentication API
export const authApi = {
  verifyApiKey: async (apiKey, hwid = null) => {
    const cacheKey = `auth_verify_${apiKey}_${hwid}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      rateLimiter.check(`auth_verify_${apiKey}`, 5, 60000);
      
      const requestOptions = await interceptRequest(`${API_BASE_URL}/auth`, {
        method: 'POST',
        body: JSON.stringify({ apiKey, hwid }),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      const data = await interceptResponse(response);
      
      cache.set(cacheKey, data, 30000); // Cache for 30 seconds
      return data;
    } catch (error) {
      console.error('Auth verification failed:', error);
      throw error;
    }
  },

  generateToken: async (apiKey, hwid) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/auth/token`, {
        method: 'POST',
        body: JSON.stringify({ apiKey, hwid }),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Token generation failed:', error);
      throw error;
    }
  },

  checkWhitelist: async (apiKey, ip) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/auth/whitelist`, {
        method: 'POST',
        body: JSON.stringify({ apiKey, ip }),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Whitelist check failed:', error);
      throw error;
    }
  },

  refreshToken: async (refreshToken) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        body: JSON.stringify({ refreshToken }),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Token refresh failed:', error);
      throw error;
    }
  },
};

// Loader API
export const loaderApi = {
  getScript: async (version = 'stable', options = {}) => {
    const cacheKey = `script_${version}_${JSON.stringify(options)}`;
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      rateLimiter.check(`script_get_${version}`, 20, 60000);
      
      const params = new URLSearchParams();
      params.append('version', version);
      if (options.obfuscation) params.append('obfuscation', options.obfuscation);
      if (options.format) params.append('format', options.format);
      
      const requestOptions = await interceptRequest(`${API_BASE_URL}/script?${params}`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      const data = await interceptResponse(response);
      
      cache.set(cacheKey, data, 60000); // Cache for 1 minute
      return data;
    } catch (error) {
      console.error('Script fetch failed:', error);
      throw error;
    }
  },

  getChecksum: async (version) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/script/checksum/${version}`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Checksum fetch failed:', error);
      throw error;
    }
  },

  trackUsage: async (usageData) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/script/track`, {
        method: 'POST',
        body: JSON.stringify(usageData),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Usage tracking failed:', error);
      throw error;
    }
  },

  getVersions: async () => {
    const cacheKey = 'script_versions';
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/script/versions`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      const data = await interceptResponse(response);
      
      cache.set(cacheKey, data, 300000); // Cache for 5 minutes
      return data;
    } catch (error) {
      console.error('Version fetch failed:', error);
      throw error;
    }
  },
};

// Status API
export const statusApi = {
  getSystemStatus: async () => {
    const cacheKey = 'system_status';
    const cached = cache.get(cacheKey);
    if (cached) return cached;
    
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/status`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      const data = await interceptResponse(response);
      
      cache.set(cacheKey, data, 30000); // Cache for 30 seconds
      return data;
    } catch (error) {
      console.error('Status fetch failed:', error);
      
      // Return fallback status
      return {
        online: false,
        uptime: '0%',
        activeUsers: 0,
        threatsBlocked: 0,
        responseTime: '999ms',
        timestamp: new Date().toISOString(),
        isFallback: true
      };
    }
  },

  getStats: async (period = '24h') => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/status/stats?period=${period}`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Stats fetch failed:', error);
      throw error;
    }
  },

  getProtectionStatus: async () => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/status/protection`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Protection status fetch failed:', error);
      throw error;
    }
  },

  ping: async () => {
    try {
      const startTime = Date.now();
      const response = await fetch(`${API_BASE_URL}/status/ping`);
      const endTime = Date.now();
      
      return {
        success: response.ok,
        latency: endTime - startTime,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        success: false,
        latency: 9999,
        timestamp: new Date().toISOString(),
        error: error.message
      };
    }
  },
};

// User API
export const userApi = {
  getDashboard: async () => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/dashboard`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Dashboard fetch failed:', error);
      throw error;
    }
  },

  getApiKeys: async () => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/keys`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('API keys fetch failed:', error);
      throw error;
    }
  },

  generateApiKey: async (name, permissions = []) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/keys/generate`, {
        method: 'POST',
        body: JSON.stringify({ name, permissions }),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('API key generation failed:', error);
      throw error;
    }
  },

  revokeApiKey: async (keyId) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/keys/${keyId}`, {
        method: 'DELETE',
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('API key revocation failed:', error);
      throw error;
    }
  },

  getLogs: async (page = 1, limit = 50, filters = {}) => {
    try {
      const params = new URLSearchParams();
      params.append('page', page);
      params.append('limit', limit);
      if (filters.type) params.append('type', filters.type);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/logs?${params}`);
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Logs fetch failed:', error);
      throw error;
    }
  },

  updateSettings: async (settings) => {
    try {
      const requestOptions = await interceptRequest(`${API_BASE_URL}/user/settings`, {
        method: 'PUT',
        body: JSON.stringify(settings),
      });
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Settings update failed:', error);
      throw error;
    }
  },
};

// Analytics API
export const analyticsApi = {
  getUsage: async (period = '30d', granularity = 'day') => {
    try {
      const requestOptions = await interceptRequest(
        `${API_BASE_URL}/analytics/usage?period=${period}&granularity=${granularity}`
      );
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Usage analytics fetch failed:', error);
      throw error;
    }
  },

  getThreats: async (period = '7d') => {
    try {
      const requestOptions = await interceptRequest(
        `${API_BASE_URL}/analytics/threats?period=${period}`
      );
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Threat analytics fetch failed:', error);
      throw error;
    }
  },

  getUptime: async (period = '30d') => {
    try {
      const requestOptions = await interceptRequest(
        `${API_BASE_URL}/analytics/uptime?period=${period}`
      );
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Uptime analytics fetch failed:', error);
      throw error;
    }
  },

  getTopUsers: async (limit = 10, period = '7d') => {
    try {
      const requestOptions = await interceptRequest(
        `${API_BASE_URL}/analytics/top-users?limit=${limit}&period=${period}`
      );
      
      const response = await fetch(requestOptions.url, requestOptions);
      return await interceptResponse(response);
    } catch (error) {
      console.error('Top users fetch failed:', error);
      throw error;
    }
  },
};

// WebSocket connection
export const createWebSocket = (token) => {
  if (!token) throw new Error('Token required for WebSocket connection');
  
  const wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
  const wsBaseUrl = IS_PRODUCTION 
    ? 'wss://api.scriptshield.com/ws'
    : `${wsProtocol}//${window.location.host}/ws`;
  
  return new WebSocket(`${wsBaseUrl}?token=${token}`);
};

// Utility functions
export const apiUtils = {
  clearCache: () => {
    cache.clear();
    rateLimiter.requests = {};
  },
  
  setAuthToken: (token) => {
    localStorage.setItem('scriptshield_token', token);
  },
  
  setApiKey: (apiKey) => {
    localStorage.setItem('scriptshield_api_key', apiKey);
  },
  
  clearAuth: () => {
    localStorage.removeItem('scriptshield_token');
    localStorage.removeItem('scriptshield_api_key');
    this.clearCache();
  },
  
  getRequestId: () => generateRequestId(),
  
  // Health check
  healthCheck: async () => {
    try {
      const results = await Promise.allSettled([
        statusApi.ping(),
        authApi.verifyApiKey('test').catch(() => ({ status: 'auth_failed' })),
      ]);
      
      return {
        api: results[0].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        auth: results[1].status === 'fulfilled' ? 'healthy' : 'unhealthy',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      return {
        api: 'unhealthy',
        auth: 'unhealthy',
        error: error.message,
        timestamp: new Date().toISOString()
      };
    }
  },
};

// Export everything
export default {
  authApi,
  loaderApi,
  statusApi,
  userApi,
  analyticsApi,
  createWebSocket,
  apiUtils,
  ApiError,
};