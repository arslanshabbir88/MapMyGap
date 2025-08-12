try {
  const { GoogleGenerativeAI } = require('@google/generative-ai');

  // Check package version for debugging
  console.log('Google AI package version:', require('@google/generative-ai/package.json').version);

  // Initialize Google AI
  const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);

  module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    // Check if API key is available
    const apiKey = process.env.GOOGLE_AI_API_KEY || process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
    if (!apiKey) {
      console.error('Missing Google AI API key environment variable');
      return res.status(500).json({ 
        error: 'Configuration error',
        details: 'Google AI API key is not configured. Tried: GOOGLE_AI_API_KEY, GEMINI_API_KEY, GOOGLE_API_KEY',
        suggestion: 'Please check your Vercel environment variables'
      });
    }

    try {
      const { originalDocument, targetControl, framework } = req.body;

      if (!originalDocument || !targetControl || !framework) {
        return res.status(400).json({ error: 'Missing required parameters: originalDocument, targetControl, or framework.' });
      }

      console.log('Starting AI generation with:', {
        framework,
        targetControl: targetControl.substring(0, 100) + '...',
        documentLength: originalDocument.length
      });

      // Test the API key format
      console.log('API Key check:', {
        exists: !!apiKey,
        length: apiKey ? apiKey.length : 0,
        startsWithAIza: apiKey ? apiKey.startsWith('AIza') : false
      });

      const prompt = `You are a cybersecurity compliance expert. Your task is to generate policy text for a specific control that matches the style and tone of an existing document.

Original Document Content:
${originalDocument.substring(0, 4000)}

Target Control to Implement:
${targetControl}

Framework: ${framework}

Instructions:
1. Analyze the original document's writing style, tone, and format
2. Generate policy text for the target control that matches that style and tone
3. The text should be specific, actionable, and professional
4. Use similar language patterns, terminology, and structure as the original document
5. Make it sound like it was written by the same author/organization

Return only the generated policy text, no additional formatting or explanations.`;

      console.log('Sending prompt to Gemini API...');
      console.log('Prompt length:', prompt.length);

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('AI generation timeout - taking too long')), 15000); // 15 second timeout
      });
      
      let result;
      try {
        // Try with gemini-1.5-flash first
        console.log('Attempting with gemini-1.5-flash model...');
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const aiPromise = model.generateContent(prompt);
        result = await Promise.race([aiPromise, timeoutPromise]);
      } catch (modelError) {
        console.log('Primary model failed, trying fallback...', modelError.message);
        // Fallback to gemini-1.5-pro if the primary model fails
        try {
          const fallbackModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
          const aiPromise = fallbackModel.generateContent(prompt);
          result = await Promise.race([aiPromise, timeoutPromise]);
          console.log('Fallback model successful');
        } catch (fallbackError) {
          console.log('Fallback model also failed:', fallbackError.message);
          throw fallbackError; // Re-throw the error to be handled by the main catch block
        }
      }
      
      const response = await result.response;
      const generatedText = response.text();

      console.log('Successfully generated text, length:', generatedText.length);

      res.status(200).json({
        generatedText: generatedText
      });

    } catch (error) {
      console.error('Error in /generate-control-text:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        status: error.status
      });
      
      // Handle timeout errors specifically
      if (error.message && error.message.includes('timeout')) {
        return res.status(408).json({ 
          error: 'AI generation timed out',
          details: 'The AI analysis is taking too long. Please try again or review manually.',
          suggestion: 'Try again with a shorter document or different control'
        });
      }
      
      // Handle Google AI authentication errors
      if (error.message && (error.message.includes('API_KEY_INVALID') || error.message.includes('authentication') || error.message.includes('unauthorized') || error.message.includes('403'))) {
        return res.status(401).json({ 
          error: 'Authentication failed',
          details: 'Invalid or expired Google AI API key',
          suggestion: 'Please check your API key configuration in Vercel'
        });
      }
      
      // Handle Google AI quota/rate limit errors
      if (error.message && (error.message.includes('quota') || error.message.includes('rate limit') || error.message.includes('429') || error.message.includes('exceeded'))) {
        return res.status(429).json({ 
          error: 'API rate limit exceeded',
          details: 'You have exceeded your daily quota for the Google Gemini API. Please try again tomorrow or upgrade to a paid plan.',
          retryAfter: '24 hours',
          suggestion: 'Consider upgrading to a paid plan at https://aistudio.google.com/ for higher limits'
        });
      }
      
      // Handle Google AI service errors more broadly
      if (error.message && (
        error.message.includes('GoogleGenerativeAI') || 
        error.message.includes('Google') || 
        error.message.includes('Gemini') ||
        error.message.includes('generative') ||
        error.message.includes('AI') ||
        error.message.includes('model') ||
        error.message.includes('content')
      )) {
        return res.status(500).json({ 
          error: 'Google AI service error',
          details: 'There was an issue with the AI service. Please try again later.',
          suggestion: 'Check your API key and try again. If the problem persists, contact support.'
        });
      }
      
      // Handle network/connection errors
      if (error.message && (error.message.includes('network') || error.message.includes('connection') || error.message.includes('fetch') || error.message.includes('timeout') || error.message.includes('ENOTFOUND'))) {
        return res.status(503).json({ 
          error: 'Service temporarily unavailable',
          details: 'Unable to connect to the AI service. Please try again later.',
          suggestion: 'Check your internet connection and try again'
        });
      }
      
      // Handle content safety/filtering errors
      if (error.message && (error.message.includes('safety') || error.message.includes('filter') || error.message.includes('blocked') || error.message.includes('inappropriate'))) {
        return res.status(400).json({ 
          error: 'Content blocked',
          details: 'The generated content was blocked by content safety filters',
          suggestion: 'Try rephrasing your request or using different terminology'
        });
      }
      
      // Generic error fallback
      res.status(500).json({ 
        error: 'Server error', 
        details: error.message || 'An unexpected error occurred',
        suggestion: 'Please try again later or contact support'
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
