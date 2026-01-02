// src/pages/Loader.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Key, Shield, Copy, Download, Check, AlertCircle, 
  Server, Users, Clock, Eye, Lock, Cpu, FileCode,
  Fingerprint, Zap, ShieldCheck, Brain
} from 'lucide-react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const Loader = () => {
  const [apiKey, setApiKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [systemStatus, setSystemStatus] = useState({
    online: true,
    uptime: '99.99%',
    activeUsers: 1427,
    threatsBlocked: 12456,
    responseTime: '24ms'
  });

  const protectionLayers = [
    { id: 1, name: 'Environment Protection', icon: Shield, status: true },
    { id: 2, name: 'Anti-Debug', icon: Cpu, status: true },
    { id: 3, name: 'Anti-Tamper', icon: Lock, status: true },
    { id: 4, name: 'Memory Protection', icon: Brain, status: true },
    { id: 5, name: 'Anti-Hook', icon: Zap, status: true },
    { id: 6, name: 'Call Protection', icon: Eye, status: true },
    { id: 7, name: 'String Encryption', icon: FileCode, status: true },
    { id: 8, name: 'Integrity Hash', icon: Fingerprint, status: true },
    { id: 9, name: 'Runtime Protection', icon: ShieldCheck, status: true },
    { id: 10, name: 'Encryption Layer', icon: Lock, status: true },
  ];

  const loaderScript = `-- ScriptShield Loader v2.0
-- Military-grade protection layer

local ScriptShield = {
    Version = "2.0.1",
    API = "https://api.scriptshield.com/v2",
    SecurityLevel = "MAXIMUM"
}

-- Environment validation
local function validateEnvironment()
    if not getgenv() then
        return false, "Environment check failed"
    end
    
    -- Anti-debug checks
    local debugResult = pcall(function()
        debug.sethook(nil, "cr")
    end)
    
    if not debugResult then
        return false, "Debugger detected"
    end
    
    return true, "Environment secure"
end

-- Main loader function
function ScriptShield:Load(apiKey, scriptId)
    local envValid, envMsg = validateEnvironment()
    
    if not envValid then
        warn("[ScriptShield] Security violation: " .. envMsg)
        return nil
    end
    
    -- Secure HTTP request with encryption
    local success, response = pcall(function()
        return game:HttpGet(self.API .. "/load", true, {
            ["Authorization"] = "Bearer " .. apiKey,
            ["X-Script-ID"] = scriptId,
            ["X-Client-ID"] = generateClientId()
        })
    end)
    
    if success and response then
        -- Verify response integrity
        if verifyIntegrity(response) then
            local scriptFunc, err = loadstring(response)
            
            if scriptFunc then
                -- Execute with protected environment
                return protectedExecute(scriptFunc)
            else
                warn("[ScriptShield] Compilation error: " .. err)
            end
        else
            warn("[ScriptShield] Integrity check failed")
        end
    end
    
    return nil
end

-- Initialize
getgenv().ScriptShield = ScriptShield
print("✅ ScriptShield Loader initialized")
print("🔒 Security level: " .. ScriptShield.SecurityLevel)

-- Export
return ScriptShield`;

  const handleAuth = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsAuthenticated(true);
      setLoading(false);
    }, 1500);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = () => {
    const element = document.createElement('a');
    const file = new Blob([loaderScript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'scriptshield_loader.lua';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
            Enterprise Script Loader
          </span>
        </h1>
        <p className="text-xl text-text-secondary max-w-3xl mx-auto">
          Secure, authenticated script delivery with 10 layers of military-grade protection
        </p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Auth & Status */}
        <div className="space-y-8">
          {/* Authentication Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6"
          >
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
                    Your API key is encrypted and never stored on our servers
                  </p>
                </div>
              </>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-16 h-16 bg-status-success/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-status-success" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authenticated!</h3>
                <p className="text-text-secondary">
                  Access granted to premium features
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Status Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <Server className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">System Status</h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-background-secondary/50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${systemStatus.online ? 'bg-status-success animate-pulse' : 'bg-status-danger'}`} />
                  <span className="font-medium">Status</span>
                </div>
                <span className={systemStatus.online ? 'text-status-success' : 'text-status-danger'}>
                  {systemStatus.online ? 'Online' : 'Offline'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Clock className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">Uptime</span>
                  </div>
                  <span className="text-xl font-bold">{systemStatus.uptime}</span>
                </div>

                <div className="p-3 bg-background-secondary/50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-4 h-4 text-text-secondary" />
                    <span className="text-sm text-text-secondary">Active Users</span>
                  </div>
                  <span className="text-xl font-bold">{systemStatus.activeUsers.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-background-secondary/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-1">
                  <Shield className="w-4 h-4 text-text-secondary" />
                  <span className="text-sm text-text-secondary">Threats Blocked (24h)</span>
                </div>
                <span className="text-xl font-bold text-status-success">
                  {systemStatus.threatsBlocked.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Center Column - Script Display */}
        <div className="lg:col-span-2 space-y-8">
          {/* Script Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card overflow-hidden"
          >
            <div className="p-6 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <FileCode className="w-6 h-6 text-primary" />
                  <div>
                    <h2 className="text-xl font-semibold">ScriptShield Loader</h2>
                    <div className="flex items-center space-x-2 text-sm text-text-secondary">
                      <span>Version 2.0.1</span>
                      <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                        Obfuscated
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <CopyToClipboard text={loaderScript} onCopy={handleCopy}>
                    <button className="btn-secondary flex items-center space-x-2">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </CopyToClipboard>
                  <button onClick={downloadScript} className="btn-primary flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="relative">
              <SyntaxHighlighter
                language="lua"
                style={atomOneDark}
                customStyle={{
                  margin: 0,
                  padding: '2rem',
                  background: '#0f172a',
                  fontSize: '14px',
                  borderRadius: '0 0 12px 12px'
                }}
                showLineNumbers
              >
                {loaderScript}
              </SyntaxHighlighter>
              
              {/* Watermark */}
              <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 rounded-lg backdrop-blur-sm">
                <span className="text-sm text-text-secondary font-mono">scriptshield.com</span>
              </div>
            </div>
          </motion.div>

          {/* Protection Layers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="glass-card p-6"
          >
            <div className="flex items-center space-x-3 mb-6">
              <ShieldCheck className="w-6 h-6 text-primary" />
              <h2 className="text-xl font-semibold">Active Protection Layers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {protectionLayers.map((layer) => (
                <div key={layer.id} className="protection-layer">
                  <div className={`p-2 rounded-lg ${layer.status ? 'bg-status-success/20' : 'bg-status-danger/20'}`}>
                    <layer.icon className={`w-5 h-5 ${layer.status ? 'text-status-success' : 'text-status-danger'}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{layer.name}</h3>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className={`w-2 h-2 rounded-full ${layer.status ? 'bg-status-success' : 'bg-status-danger'}`} />
                      <span className="text-sm text-text-secondary">
                        {layer.status ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  {layer.status && (
                    <Check className="w-5 h-5 text-status-success" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Usage Instructions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="glass-card p-6"
          >
            <h2 className="text-xl font-semibold mb-6">Integration Guide</h2>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Step 1: Install Loader</h3>
                <p className="text-text-secondary">
                  Copy the loader script above and integrate it into your application's initialization sequence.
                </p>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Step 2: Initialize</h3>
                <div className="bg-background-secondary rounded-lg p-4 font-mono text-sm">
                  <span className="text-primary">local</span> ScriptShield = require<span className="text-secondary">(</span><span className="text-status-success">"scriptshield_loader"</span><span className="text-secondary">)</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Step 3: Load Protected Script</h3>
                <div className="bg-background-secondary rounded-lg p-4 font-mono text-sm">
                  <span className="text-primary">local</span> secureScript = ScriptShield<span className="text-secondary">:</span>Load<span className="text-secondary">(</span>
                  <br />
                  <span className="text-text-secondary ml-4">"</span><span className="text-status-success">your-api-key-here</span><span className="text-text-secondary">",</span>
                  <br />
                  <span className="text-text-secondary ml-4">"</span><span className="text-status-success">script-id</span><span className="text-text-secondary">"</span>
                  <br />
                  <span className="text-secondary">)</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Loader;