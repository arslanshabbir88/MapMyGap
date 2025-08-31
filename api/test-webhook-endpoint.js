export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  res.status(200).json({ 
    message: 'Webhook endpoint is accessible',
    timestamp: new Date().toISOString(),
    method: req.method,
    url: req.url
  });
}
