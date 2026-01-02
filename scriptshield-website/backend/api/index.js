// backend/api/index.js
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Authentication middleware
const authenticate = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];
  
  if (!apiKey) {
    return res.status(401).json({ error: 'API key required' });
  }
  
  // Validate API key (in production, check against database)
  if (!apiKey.startsWith('sk_')) {
    return res.status(401).json({ error: 'Invalid API key' });
  }
  
  next();
};

// Routes
app.get('/api/status/system', (req, res) => {
  res.json({
    online: true,
    uptime: '99.99%',
    activeUsers: 1427,
    threatsBlocked: 12456,
    responseTime: '24ms'
  });
});

app.post('/api/auth/verify-key', authenticate, (req, res) => {
  res.json({
    authenticated: true,
    user: {
      id: 'user_123',
      name: 'Demo User',
      tier: 'premium',
      whitelisted: true
    }
  });
});

app.get('/api/loader/script/:version', authenticate, (req, res) => {
  const { version } = req.params;
  
  const scripts = {
    'stable': `-- ScriptShield Loader v2.0
local ScriptShield = {
    Version = "2.0.1",
    SecurityLevel = "MAXIMUM"
}
-- ... rest of loader script ...`,
    
    'beta': `-- ScriptShield Loader v2.1-beta
local ScriptShield = {
    Version = "2.1.0-beta",
    SecurityLevel = "MAXIMUM",
    Experimental = true
}
-- ... beta features ...`,
  };
  
  const script = scripts[version] || scripts.stable;
  
  res.setHeader('Content-Type', 'text/plain');
  res.send(script);
});

app.get('/api/analytics/usage', authenticate, (req, res) => {
  // Generate mock usage data
  const usage = [];
  for (let i = 1; i <= 30; i++) {
    usage.push({
      date: `2024-01-${i.toString().padStart(2, '0')}`,
      requests: Math.floor(Math.random() * 1000) + 500,
      scripts: Math.floor(Math.random() * 500) + 200,
      threats: Math.floor(Math.random() * 50)
    });
  }
  
  res.json(usage);
});

app.post('/api/loader/track-usage', authenticate, (req, res) => {
  const { scriptId, userId, timestamp } = req.body;
  
  // Log usage (in production, save to database)
  console.log(`Script loaded: ${scriptId} by ${userId} at ${timestamp}`);
  
  res.json({ success: true, tracked: true });
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
});