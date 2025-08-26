import { VertexAI } from '@google-cloud/vertexai';



  // Initialize VertexAI with service account key
  async function initializeVertexAI() {
    try {
      // Get the service account credentials from environment variable
      const serviceAccountKey = process.env.GCP_SERVICE_KEY;
      if (!serviceAccountKey) {
        throw new Error('No GCP service account key available');
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
      
      // Initialize VertexAI with service account credentials
      const vertex = new VertexAI({
        project: process.env.GCP_PROJECT_ID,
        location: process.env.GCP_LOCATION || 'us-central1',
        auth: {
          credentials: credentials
        }
      });

      return vertex;
    } catch (error) {
      console.error('❌ Failed to initialize VertexAI:', error);
      throw error;
    }
  }

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

      // Initialize VertexAI with Service Account Key
      const vertex = await initializeVertexAI();
      
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
      
      let result;
      try {
        // Try with gemini-2.5-flash-lite first
        console.log('Attempting with gemini-2.5-flash-lite model...');
        const model = vertex.preview.getGenerativeModel({
          model: "gemini-2.5-flash-lite",
          generation_config: {
            max_output_tokens: 8192,
            temperature: 0.1,
            top_p: 0.8,
            top_k: 40
          }
        });
        
        const aiPromise = model.generateContent(prompt);
        result = await Promise.race([aiPromise, timeoutPromise]);
      } catch (modelError) {
        console.log('Primary model failed, trying fallback...', modelError.message);
        // Fallback to gemini-1.5-pro if the primary model fails
        try {
          const fallbackModel = vertex.preview.getGenerativeModel({
            model: "gemini-1.5-pro",
            generation_config: {
              max_output_tokens: 8192,
              temperature: 0.1,
              top_p: 0.8,
              top_k: 40
            }
          });
          
          const aiPromise = fallbackModel.generateContent(prompt);
          result = await Promise.race([aiPromise, timeoutPromise]);
          console.log('Fallback model successful');
        } catch (fallbackError) {
          console.log('Fallback model also failed:', fallbackError.message);
          throw fallbackError;
        }
      }
      
      const response = await result.response;
      const generatedText = response.text();

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
  }
