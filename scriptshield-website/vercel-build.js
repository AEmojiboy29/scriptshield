// vercel-build.js
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting Vercel build...');

// Create production .env if it doesn't exist
const envPath = path.join(__dirname, '.env.production');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating production environment variables...');
  fs.writeFileSync(envPath, `
REACT_APP_API_URL=https://api.scriptshield.com/v1
REACT_APP_ENVIRONMENT=production
REACT_APP_VERSION=2.0.1
REACT_APP_WEBSOCKET_URL=wss://api.scriptshield.com/ws
  `.trim());
}

// Run build
try {
  console.log('📦 Installing dependencies...');
  execSync('npm install', { stdio: 'inherit' });
  
  console.log('🔨 Building project...');
  execSync('npm run build', { stdio: 'inherit' });
  
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error);
  process.exit(1);
}