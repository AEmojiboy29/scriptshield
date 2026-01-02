import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Key, Shield, AlertCircle, Check, RefreshCw, Fingerprint } from 'lucide-react';

const AuthPanel = ({ onAuthSuccess, loading, setLoading }) => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hwid, setHwid] = useState('');

  const generateHWID = () => {
    // Generate a mock HWID
    const chars = '0123456789ABCDEF';
    let hwid = '';
    for (let i = 0; i < 32; i++) {
      hwid += chars[Math.floor(Math.random() * chars.length)];
    }
    setHwid(hwid);
    return hwid;
  };

  const handleAuth = () => {
    if (!apiKey.trim()) return;
    
    setLoading(true);
    const generatedHWID = generateHWID();
    
    // Simulate API authentication
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
      
      // Call parent callback
      if (onAuthSuccess) {
        onAuthSuccess({
          apiKey: apiKey,
          hwid: generatedHWID,
          timestamp: new Date().toISOString()
        });
      }
    }, 1500);
  };

  const handleReset = () => {
    setApiKey('');
    setIsAuthenticated(false);
    setHwid('');
    setLoading(false);
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Key className="w-6 h-6 text-primary" />
        <h2 className="text-xl font-semibold">Authentication</h2>
      </div>

      {!isAuthenticated ? (
        <>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key..."
                className="input-field"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-text-secondary mb-2">
                HWID Verification
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={hwid || 'Click Authenticate to generate HWID'}
                  readOnly
                  className="input-field flex-1 font-mono text-sm"
                />
                <button
                  onClick={generateHWID}
                  className="p-3 bg-background-secondary rounded-lg hover:bg-background-tertiary transition-colors"
                >
                  <Fingerprint className="w-4 h-4" />
                </button>
              </div>
            </div>

            <button
              onClick={handleAuth}
              disabled={loading || !apiKey}
              className="btn-primary w-full flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <Shield className="w-4 h-4" />
                  <span>Authenticate & Load</span>
                </>
              )}
            </button>
          </div>
          
          <div className="mt-6 p-4 bg-background-secondary/50 rounded-lg">
            <p className="text-sm text-text-secondary">
              <AlertCircle className="w-4 h-4 inline mr-2" />
              Your API key and HWID are encrypted end-to-end
            </p>
          </div>
        </>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-4"
        >
          <div className="w-16 h-16 bg-status-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-status-success" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Authentication Successful!</h3>
          <p className="text-text-secondary mb-6">
            Premium features unlocked
          </p>
          
          <div className="space-y-3 text-left bg-background-secondary/50 p-4 rounded-lg">
            <div className="flex justify-between">
              <span className="text-text-secondary">API Key:</span>
              <span className="font-mono text-sm">{apiKey.substring(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">HWID:</span>
              <span className="font-mono text-sm">{hwid.substring(0, 8)}...</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-secondary">Status:</span>
              <span className="text-status-success">Active</span>
            </div>
          </div>
          
          <button
            onClick={handleReset}
            className="mt-6 btn-secondary w-full flex items-center justify-center space-x-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Reset Authentication</span>
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default AuthPanel;