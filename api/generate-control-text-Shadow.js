try {
  const { VertexAI } = require('@google-cloud/vertexai');
  const { getVercelOidcToken } = require('@vercel/functions/oidc');

  // CRITICAL: Debug function to inspect Vercel OIDC headers
  function inspectVercelOidcHeaders(req) {
    console.log('🔍 DEBUG: Inspecting Vercel OIDC headers...');
    
    // Check for x-vercel-oidc-token header
    const oidcTokenHeader = req.headers['x-vercel-oidc-token'];
    if (oidcTokenHeader) {
      console.log('✅ x-vercel-oidc-token header found!');
      console.log('🔑 Header length:', oidcTokenHeader.length);
      console.log('🔑 Header preview (first 100 chars):', oidcTokenHeader.substring(0, 100));
      return oidcTokenHeader;
    } else {
      console.log('❌ x-vercel-oidc-token header NOT found');
      console.log('🔍 Available headers:', Object.keys(req.headers));
    }
    
    return null;
  }

  // CRITICAL: Implement explicit STS token exchange for Workload Identity Federation
  async function getGcpAccessToken(vercelOidcToken) {
    const stsUrl = "https://sts.googleapis.com/v1/token";
    
    const requestParams = {
      grant_type: "urn:ietf:params:oauth:grant-type:token-exchange",
      audience: `//iam.googleapis.com/projects/${process.env.GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${process.env.GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
      scope: "https://www.googleapis.com/auth/cloud-platform",
      subject_token_type: "urn:ietf:params:oauth:token-type:jwt",
      requested_token_type: "urn:ietf:params:oauth:token-type:access_token",
      subject_token: vercelOidcToken,
    };
    
    console.log('🔑 DEBUG: STS Request Parameters:');
    console.log('🔑 DEBUG: audience:', requestParams.audience);
    console.log('🔑 DEBUG: scope:', requestParams.scope);
    
    try {
      const resp = await fetch(stsUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(requestParams),
      });

      if (!resp.ok) {
        const errorText = await resp.text();
        console.error('❌ STS token exchange failed:', resp.status, errorText);
        throw new Error(`STS token exchange failed: ${resp.status} - ${errorText}`);
      }

      const tokenData = await resp.json();
      console.log('✅ STS token exchange successful');
      console.log('🔑 Access token length:', tokenData.access_token?.length || 0);
      
      return tokenData.access_token;
    } catch (error) {
      console.error('❌ Error in STS token exchange:', error);
      throw error;
    }
  }

  // Initialize VertexAI with Workload Identity
  async function initializeVertexAI() {
    try {
      // Get OIDC token from Vercel
      const vercelOidcToken = getVercelOidcToken();
      if (!vercelOidcToken) {
        throw new Error('No Vercel OIDC token available');
      }

      // Exchange for GCP access token
      const gcpAccessToken = await getGcpAccessToken(vercelOidcToken);
      
      // Initialize VertexAI with the access token
      const vertex = new VertexAI({
        project: process.env.GCP_PROJECT_ID,
        location: process.env.GCP_LOCATION || 'us-central1',
        auth: {
          accessToken: gcpAccessToken
        }
      });

      return vertex;
    } catch (error) {
      console.error('❌ Failed to initialize VertexAI:', error);
      throw error;
    }
  }

  module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      const { originalDocument, targetControl, framework } = req.body;

      if (!originalDocument || !targetControl || !framework) {
        return res.status(400).json({ error: 'Missing required parameters: originalDocument, targetControl, or framework.' });
      }

      console.log('Starting AI generation with Workload Identity Federation:', {
        framework,
        targetControl: targetControl.substring(0, 100) + '...',
        documentLength: originalDocument.length
      });

      // Initialize VertexAI with Workload Identity
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

      console.log('Sending prompt to Vertex AI with Workload Identity...');
      console.log('Prompt length:', prompt.length);

      // Add timeout to prevent hanging
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('AI generation timeout - taking too long')), 30000);
      });
      
      let result;
      try {
        // Try with gemini-1.5-flash first
        console.log('Attempting with gemini-1.5-flash model...');
        const model = vertex.preview.getGenerativeModel({
          model: "gemini-1.5-flash",
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

      console.log('Successfully generated text with Workload Identity, length:', generatedText.length);

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
      
      // Handle Workload Identity authentication errors
      if (error.message && (error.message.includes('authentication') || error.message.includes('unauthorized') || error.message.includes('403') || error.message.includes('STS token exchange failed'))) {
        return res.status(401).json({ 
          error: 'Workload Identity authentication failed',
          details: 'Failed to authenticate with Google Cloud using Workload Identity Federation',
          suggestion: 'Check your GCP Workload Identity configuration and Vercel OIDC setup'
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
  };

} catch (packageError) {
  console.error('Failed to load Vertex AI package:', packageError);
  
  module.exports = async function handler(req, res) {
    return res.status(500).json({ 
      error: 'Package error',
      details: 'Failed to load Vertex AI package',
      suggestion: 'Please check your dependencies and try again'
    });
  };
}
