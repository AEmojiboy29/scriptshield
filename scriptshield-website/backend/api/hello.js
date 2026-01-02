// api/hello.js
export default function handler(req, res) {
  res.status(200).json({ 
    message: 'ScriptShield API is running',
    version: '2.0.1',
    status: 'online'
  });
}