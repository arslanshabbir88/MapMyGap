try {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      // Check if API key is available
      const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ 
          error: 'Configuration error',
          details: 'Google AI API key environment variable is not set. Tried: GOOGLE_AI_API_KEY, GEMINI_API_KEY, GOOGLE_API_KEY',
          suggestion: 'Please check your Vercel environment variables'
        });
      }

      // Check API key format
      if (!apiKey.startsWith('AIza')) {
        return res.status(500).json({ 
          error: 'Configuration error',
          details: 'GOOGLE_AI_API_KEY does not appear to be in the correct format',
          suggestion: 'Google AI API keys typically start with "AIza"'
        });
      }

      console.log('Testing Google AI connection...');
      console.log('API Key length:', apiKey.length);
      console.log('API Key starts with:', apiKey.substring(0, 10) + '...');

      // Initialize Google AI
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // Test with a simple prompt
      let result;
      try {
        console.log('Testing with gemini-1.5-flash model...');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        result = await model.generateContent("Say 'Hello, this is a test' and nothing else.");
      } catch (modelError) {
        console.log('Primary model failed, trying fallback...', modelError.message);
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
          result = await fallbackModel.generateContent("Say 'Hello, this is a test' and nothing else.");
          console.log('Fallback model successful');
        } catch (fallbackError) {
          console.log('Fallback model also failed:', fallbackError.message);
          throw fallbackError;
        }
      }
      
      const response = await result.response;
      const text = response.text();
      
      console.log('Test successful, response:', text);

      res.status(200).json({
        success: true,
        message: 'Google AI connection test successful',
        response: text,
        apiKeyConfigured: true,
        apiKeyLength: apiKey.length,
        apiKeyFormat: 'Valid'
      });

    } catch (error) {
      console.error('Error testing Google AI:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        status: error.status
      });

      // Handle specific error types
      if (error.message && error.message.includes('API_KEY_INVALID')) {
        return res.status(401).json({ 
          error: 'Invalid API key',
          details: 'The Google AI API key is invalid or expired',
          suggestion: 'Please check your API key in the Google AI Studio'
        });
      }
      
      if (error.message && error.message.includes('quota')) {
        return res.status(429).json({ 
          error: 'Quota exceeded',
          details: 'You have exceeded your Google AI API quota',
          suggestion: 'Check your usage limits in Google AI Studio'
        });
      }
      
      if (error.message && error.message.includes('network') || error.message.includes('fetch')) {
        return res.status(503).json({ 
          error: 'Network error',
          details: 'Unable to connect to Google AI service',
          suggestion: 'Check your internet connection and try again'
        });
      }

      res.status(500).json({ 
        error: 'Test failed', 
        details: error.message || 'An unexpected error occurred',
        errorType: error.name,
        suggestion: 'Check the server logs for more details'
      });
    }
  };

} catch (packageError) {
  console.error('Failed to load Google AI package:', packageError);
  
  module.exports = async function handler(req, res) {
    return res.status(500).json({ 
      error: 'Package error',
      details: 'Failed to load Google AI package',
      suggestion: 'Please check your dependencies and try again'
    });
  };
}
