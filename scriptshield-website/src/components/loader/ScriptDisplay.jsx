import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import {
  FileCode, Copy, Download, Check, AlertCircle,
  Shield, Code, Zap, Settings, Eye
} from 'lucide-react';

const ScriptDisplay = ({ script, scriptName = "ScriptShield Loader" }) => {
  const [copied, setCopied] = useState(false);
  const [obfuscationLevel, setObfuscationLevel] = useState('maximum');
  const [showWatermark, setShowWatermark] = useState(true);

  const obfuscationLevels = [
    { id: 'minimum', name: 'Minimum', description: 'Basic protection for speed' },
    { id: 'standard', name: 'Standard', description: 'Balanced protection and performance' },
    { id: 'maximum', name: 'Maximum', description: 'Maximum security (recommended)' },
    { id: 'extreme', name: 'Extreme', description: 'Highest security, slower execution' },
  ];

  const loaderScript = script || `-- ${scriptName} v2.0
-- Military-grade protection layer

local ScriptShield = {
    Version = "2.0.1",
    API = "https://api.scriptshield.com/v2",
    SecurityLevel = "${obfuscationLevel.toUpperCase()}",
    Encryption = "AES-256-GCM",
    Features = {
        "AntiDebug",
        "MemoryProtection",
        "StringEncryption",
        "IntegrityChecks"
    }
}

-- Environment validation
function ScriptShield:validateEnvironment()
    if not getgenv() then
        return false, "Environment check failed"
    end
    
    -- Check for debugging
    local debugSuccess, debugResult = pcall(function()
        debug.sethook(nil, "cr")
    end)
    
    if not debugSuccess then
        return false, "Debugger detected"
    end
    
    -- Validate execution context
    if not issecure and issecurecontext then
        return false, "Insecure execution context"
    end
    
    return true, "Environment secure"
end

-- Secure HTTP request
function ScriptShield:secureRequest(url, options)
    options = options or {}
    
    local headers = {
        ["Authorization"] = "Bearer " .. (options.apiKey or ""),
        ["X-Client-ID"] = self:generateClientId(),
        ["X-Security-Level"] = self.SecurityLevel,
        ["X-Timestamp"] = tostring(os.time())
    }
    
    -- Add additional headers
    for key, value in pairs(options.headers or {}) do
        headers[key] = value
    end
    
    local success, response = pcall(function()
        return game:HttpGet(url, true, headers)
    end)
    
    if success and response then
        -- Verify response signature
        if self:verifySignature(response, options.expectedHash) then
            return response
        else
            warn("[ScriptShield] Response signature invalid")
        end
    end
    
    return nil
end

-- Main loader function
function ScriptShield:Load(apiKey, scriptId)
    -- Validate environment first
    local envValid, envMsg = self:validateEnvironment()
    
    if not envValid then
        warn("[ScriptShield] Security violation: " .. envMsg)
        return nil
    end
    
    -- Construct API endpoint
    local endpoint = self.API .. "/scripts/" .. scriptId
    
    -- Fetch protected script
    local scriptContent = self:secureRequest(endpoint, {
        apiKey = apiKey,
        expectedHash = scriptId
    })
    
    if scriptContent then
        -- Decompress if needed
        if scriptContent:find("^!compressed!") then
            scriptContent = self:decompress(scriptContent:sub(13))
        end
        
        -- Load and execute
        local scriptFunc, err = loadstring(scriptContent)
        
        if scriptFunc then
            -- Execute in protected environment
            local result = self:protectedExecute(scriptFunc)
            print("✅ Script loaded successfully")
            return result
        else
            warn("[ScriptShield] Compilation error: " .. tostring(err))
        end
    end
    
    return nil
end

-- Initialize protection
function ScriptShield:initialize()
    print("🔒 Initializing ScriptShield v" .. self.Version)
    print("⚡ Security Level: " .. self.SecurityLevel)
    print("🛡️ Features: " .. table.concat(self.Features, ", "))
    
    -- Setup protection hooks
    self:setupHooks()
    self:enableProtection()
    
    return self
end

-- Export
getgenv().ScriptShield = ScriptShield:initialize()

-- Auto-update check
task.spawn(function()
    ScriptShield:checkForUpdates()
end)

return ScriptShield`;

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadScript = () => {
    const element = document.createElement('a');
    const filename = `${scriptName.toLowerCase().replace(/\s+/g, '_')}_${obfuscationLevel}.lua`;
    const file = new Blob([loaderScript], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="glass-card overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-gradient-to-br from-primary to-secondary rounded-lg">
              <FileCode className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{scriptName}</h2>
              <div className="flex items-center space-x-2 mt-1">
                <span className="text-sm text-text-secondary">v2.0.1</span>
                <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                  Obfuscated
                </span>
                <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">
                  {obfuscationLevel.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <CopyToClipboard text={loaderScript} onCopy={handleCopy}>
              <button className="btn-secondary flex items-center space-x-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied!' : 'Copy Code'}</span>
              </button>
            </CopyToClipboard>
            
            <button onClick={downloadScript} className="btn-primary flex items-center space-x-2">
              <Download className="w-4 h-4" />
              <span>Download .lua</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Bar */}
      <div className="px-6 py-4 bg-background-secondary/50 border-b border-white/10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm text-text-secondary">Obfuscation:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {obfuscationLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setObfuscationLevel(level.id)}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-all ${
                    obfuscationLevel === level.id
                      ? 'bg-primary text-white'
                      : 'bg-background-tertiary text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {level.name}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Eye className="w-4 h-4 text-text-secondary" />
              <label className="text-sm text-text-secondary">Watermark:</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={showWatermark}
                  onChange={(e) => setShowWatermark(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-9 h-5 bg-background-tertiary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <button className="text-sm text-primary hover:text-primary-dark flex items-center space-x-1">
              <Settings className="w-4 h-4" />
              <span>More Options</span>
            </button>
          </div>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative">
        <SyntaxHighlighter
          language="lua"
          style={atomOneDark}
          customStyle={{
            margin: 0,
            padding: '2rem',
            background: '#0f172a',
            fontSize: '14px',
            minHeight: '400px',
            maxHeight: '600px',
            overflow: 'auto'
          }}
          showLineNumbers
          wrapLines
        >
          {loaderScript}
        </SyntaxHighlighter>
        
        {/* Watermark */}
        {showWatermark && (
          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 rounded-lg backdrop-blur-sm">
            <span className="text-sm text-text-secondary font-mono">scriptshield.com</span>
          </div>
        )}
        
        {/* Security Badge */}
        <div className="absolute top-4 left-4 flex items-center space-x-2">
          <div className="px-2 py-1 bg-status-success/20 rounded-lg backdrop-blur-sm">
            <span className="text-xs text-status-success font-medium">Secure</span>
          </div>
          <div className="px-2 py-1 bg-primary/20 rounded-lg backdrop-blur-sm">
            <span className="text-xs text-primary font-medium">{obfuscationLevel.toUpperCase()}</span>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="px-6 py-4 bg-background-secondary/50 border-t border-white/10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {loaderScript.split('\n').length} lines
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Zap className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                {loaderScript.length.toLocaleString()} chars
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 text-text-secondary" />
              <span className="text-sm text-text-secondary">
                Protected: {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
          
          <div className="text-sm text-text-secondary">
            Last updated: {new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptDisplay;