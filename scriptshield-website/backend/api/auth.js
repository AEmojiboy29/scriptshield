// api/auth.js
export default function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    const { apiKey } = req.body;
    
    // Mock authentication (in production, validate against database)
    if (apiKey && apiKey.startsWith('sk_')) {
      const token = 'mock_jwt_token_' + Math.random().toString(36).substr(2);
      
      return res.status(200).json({
        authenticated: true,
        token: token,
        user: {
          id: 'user_' + Date.now(),
          tier: apiKey.includes('live') ? 'premium' : 'basic',
          permissions: ['script:read', 'script:execute']
        },
        expires: Date.now() + 3600000 // 1 hour
      });
    }
    
    return res.status(401).json({ 
      authenticated: false, 
      error: 'Invalid API key' 
    });
  }
  
  res.status(405).json({ error: 'Method not allowed' });
}