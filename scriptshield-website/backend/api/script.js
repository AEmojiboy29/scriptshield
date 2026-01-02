// api/script.js
export default function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'GET') {
    const version = req.query.version || 'stable';
    
    const scripts = {
      stable: `-- ScriptShield Loader v2.0
-- Enterprise-grade protection

local ScriptShield = {
    Version = "2.0.1",
    SecurityLevel = "MAXIMUM",
    API = "https://api.scriptshield.com/v1"
}

-- Your protected code would be loaded here
print("🔒 ScriptShield Loader Initialized")
print("⚡ Security Level: " .. ScriptShield.SecurityLevel)

-- Export loader
getgenv().ScriptShield = ScriptShield
return ScriptShield`,
      
      beta: `-- ScriptShield Loader v2.1-beta
-- Beta version with experimental features

local ScriptShield = {
    Version = "2.1.0-beta",
    SecurityLevel = "EXTREME",
    Experimental = true,
    API = "https://beta-api.scriptshield.com/v1"
}

-- Beta features implementation
print("🧪 ScriptShield Beta Loader Initialized")
print("⚡ Running experimental security features")

getgenv().ScriptShield = ScriptShield
return ScriptShield`,
    };
    
    const script = scripts[version] || scripts.stable;
    
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('X-Script-Version', version);
    res.setHeader('X-Generated-At', new Date().toISOString());
    
    return res.status(200).send(script);
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}