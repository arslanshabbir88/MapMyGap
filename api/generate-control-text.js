import { VertexAI } from '@google-cloud/vertexai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalDocument, targetControl, framework } = req.body;

    if (!originalDocument || !targetControl || !framework) {
      return res.status(400).json({ error: 'Missing required parameters: originalDocument, targetControl, or framework.' });
    }

    console.log('Starting AI generation with Service Account Key authentication:', {
      framework,
      targetControl: targetControl.substring(0, 100) + '...',
      documentLength: originalDocument.length
    });

    // CRITICAL: Use direct API calls instead of broken VertexAI SDK
    console.log('🚀 NUCLEAR OPTION: Using direct API calls to bypass broken VertexAI SDK');
    
    // Get the service account credentials from environment variable
    const serviceAccountKey = process.env.GCP_SERVICE_KEY;
    if (!serviceAccountKey) {
      throw new Error('No GCP service account key available for direct API calls');
    }
    
    // Parse the base64-encoded service account key
    let credentials;
    try {
      credentials = JSON.parse(
        Buffer.from(serviceAccountKey, "base64").toString()
      );
      console.log('🔑 DEBUG: Service account key parsed successfully, client_email:', credentials.client_email);
    } catch (error) {
      throw new Error(`Failed to parse service account key: ${error.message}`);
    }
    
    const projectId = process.env.GCP_PROJECT_ID;
    const location = process.env.GCP_LOCATION || 'us-central1';
    const model = 'gemini-2.5-flash-lite';
    
    // Direct Vertex AI API endpoint
    const apiUrl = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/${model}:generateContent`;
    
    console.log('🔗 DEBUG: Direct API URL:', apiUrl);
    
    const prompt = `You are a cybersecurity compliance expert specializing in creating COMPREHENSIVE implementation documents that achieve "covered" status.

Original Document Content:
${originalDocument.substring(0, 4000)}

Target Control to Implement:
${targetControl}

Framework: ${framework}

🎯 MISSION: Generate a COMPLETE implementation document that will instantly achieve "covered" status when analyzed.

📋 REQUIRED SECTIONS (Include ALL of these):

1. **POLICY STATEMENT** - Clear, authoritative policy language
2. **IMPLEMENTATION PROCEDURES** - Step-by-step operational procedures
3. **TECHNICAL SPECIFICATIONS** - System requirements, configurations, tools
4. **ROLES & RESPONSIBILITIES** - Who does what, when, and how
5. **MONITORING & EVIDENCE** - How compliance is tracked and documented
6. **INTEGRATION DETAILS** - How this control connects to other systems
7. **COMPLIANCE VERIFICATION** - How to verify the control is working

🔍 ANALYSIS REQUIREMENTS:
- Study the original document's writing style, tone, and format
- Match the organization's naming conventions and terminology
- Use the same document structure and formatting
- Include specific, measurable, and actionable content

💡 IMPLEMENTATION GUIDANCE:
- Provide REAL implementation details, not generic statements
- Include specific tools, systems, and configurations
- Add monitoring procedures and evidence collection
- Specify roles, responsibilities, and timelines
- Include integration with existing systems

📝 OUTPUT FORMAT:
Return a COMPLETE, ready-to-use document section that includes all required elements. The document should be comprehensive enough that when analyzed, it immediately achieves "covered" status.

Make it specific, professional, and implementation-ready. Include enough detail that an auditor would say "Yes, this is fully implemented."`;

    console.log('Sending prompt to Vertex AI with Service Account Key...');
    console.log('Prompt length:', prompt.length);

    // Add timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI generation timeout - taking too long')), 30000);
    });
    
    // CRITICAL: Use GoogleAuth for direct API authentication
    const { GoogleAuth } = await import('google-auth-library');
    
    try {
      // Get access token using service account credentials
      const auth = new GoogleAuth({
        credentials: credentials,
        scopes: ['https://www.googleapis.com/auth/cloud-platform']
      });
      
      const accessToken = await auth.getAccessToken();
      
      // Prepare request body with proper token limits
      const requestBody = {
        contents: [{
          role: "user",
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          maxOutputTokens: 8192,
          temperature: 0.0,  // Deterministic mode - eliminates randomness
          topP: 1.0,         // Use all available tokens
          topK: 1            // Always pick top choice
        },
        safetySettings: [
          {
            category: "HARM_CATEGORY_HARASSMENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_HATE_SPEECH",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          },
          {
            category: "HARM_CATEGORY_DANGEROUS_CONTENT",
            threshold: "BLOCK_MEDIUM_AND_ABOVE"
          }
        ]
      };
      
      // CRITICAL: Limit maxOutputTokens to Gemini 2.5 Flash-Lite maximum (exclusive range)
      const limitedRequestBody = {
        ...requestBody,
        generationConfig: {
          ...requestBody.generationConfig,
          maxOutputTokens: Math.min(requestBody.generationConfig.maxOutputTokens || 8192, 8192)
        }
      };
      
      console.log('🔧 DEBUG: Limited maxOutputTokens to:', limitedRequestBody.generationConfig.maxOutputTokens);
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
          'X-Goog-User-Project': projectId
        },
        body: JSON.stringify(limitedRequestBody)
      });
      
      console.log('📥 DEBUG: Direct API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ Direct API error ${response.status}:`, errorText);
        throw new Error(`Direct API error ${response.status}: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log('✅ Direct API call successful!');
      
      // Extract the generated text from Vertex AI response
      let generatedText;
      if (responseData.candidates && responseData.candidates[0] && responseData.candidates[0].content) {
        generatedText = responseData.candidates[0].content.parts[0].text;
        console.log('📝 AI response text extracted, length:', generatedText.length);
      } else {
        throw new Error('Direct API response missing generated content');
      }

      console.log('Successfully generated text with Service Account Key, length:', generatedText.length);

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
          details: 'The comprehensive control text generation is taking too long. Please try again.',
          suggestion: 'Try again with a shorter document or different control'
        });
      }
      
      // Handle authentication errors
      if (error.message && (error.message.includes('authentication') || error.message.includes('unauthorized') || error.message.includes('403'))) {
        return res.status(401).json({ 
          error: 'Service account authentication failed',
          details: 'Failed to authenticate with Google Cloud using service account key',
          suggestion: 'Check your GCP_SERVICE_KEY environment variable and service account permissions'
        });
      }
      
      // Handle Vertex AI service errors
      if (error.message && (error.message.includes('Vertex') || error.message.includes('AI') || error.message.includes('model') || error.message.includes('content'))) {
        return res.status(500).json({ 
          error: 'Vertex AI service error',
          details: 'There was an issue with the Vertex AI service. Please try again later.',
          suggestion: 'Check your GCP project configuration and try again.'
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
      
      // Generic error fallback
      res.status(500).json({ 
        error: 'Server error', 
        details: error.message || 'An unexpected error occurred',
        suggestion: 'Please try again later or contact support'
      });
    }
  } catch (error) {
    console.error('Error in /generate-control-text:', error);
    res.status(500).json({ 
      error: 'Server error', 
      details: error.message || 'An unexpected error occurred',
      suggestion: 'Please try again later or contact support'
    });
  }
}
