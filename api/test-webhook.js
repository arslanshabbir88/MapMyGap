export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('🧪 Test webhook received:', {
    method: req.method,
    headers: Object.keys(req.headers),
    body: req.body,
    timestamp: new Date().toISOString()
  });

  // Log all headers
  console.log('📋 Headers:', req.headers);
  
  // Log body
  console.log('📦 Body:', JSON.stringify(req.body, null, 2));

  res.status(200).json({ 
    success: true, 
    message: 'Test webhook received successfully',
    timestamp: new Date().toISOString(),
    receivedData: {
      headers: Object.keys(req.headers),
      bodyKeys: Object.keys(req.body || {}),
      method: req.method
    }
  });
}
