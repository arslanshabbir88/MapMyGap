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

  module.exports = async function handler(req, res) {
    if (req.method !== 'GET') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
      console.log('Testing Vertex AI connection with Workload Identity Federation...');

      // Check required environment variables
      const requiredEnvVars = [
        'GCP_PROJECT_ID',
        'GCP_PROJECT_NUMBER', 
        'GCP_WORKLOAD_IDENTITY_POOL_ID',
        'GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID'
      ];

      const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
      if (missingVars.length > 0) {
        return res.status(500).json({ 
          error: 'Configuration error',
          details: `Missing required environment variables: ${missingVars.join(', ')}`,
          suggestion: 'Please configure these in your Vercel environment variables'
        });
      }

      console.log('✅ All required environment variables are configured');
      console.log('🔧 GCP Project ID:', process.env.GCP_PROJECT_ID);
      console.log('🔧 GCP Project Number:', process.env.GCP_PROJECT_NUMBER);
      console.log('🔧 Workload Identity Pool ID:', process.env.GCP_WORKLOAD_IDENTITY_POOL_ID);
      console.log('🔧 Workload Identity Provider ID:', process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID);

      // Initialize VertexAI with Workload Identity
      const vertex = await initializeVertexAI();
      
      // Test with a simple prompt
      let result;
      try {
        console.log('Testing with gemini-2.5-flash model...');
            const model = vertex.preview.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
          generation_config: {
            max_output_tokens: 100,
            temperature: 0.1
          }
        });
        result = await model.generateContent("Say 'Hello, this is a test' and nothing else.");
      } catch (modelError) {
        console.log('Primary model failed, trying fallback...', modelError.message);
        try {
          const fallbackModel = vertex.preview.getGenerativeModel({ 
            model: "gemini-1.5-pro",
            generation_config: {
              max_output_tokens: 100,
              temperature: 0.1
            }
          });
          result = await fallbackModel.generateContent("Say 'Hello, this is a test' and nothing else.");
          console.log('Fallback model successful');
        } catch (fallbackError) {
          console.log('Fallback model also failed:', fallbackError.message);
          throw fallbackError;
        }
      }
      
      const response = await result.response;
      const text = response.text();
      
      console.log('✅ Test successful, response:', text);

      res.status(200).json({
        success: true,
        message: 'Vertex AI connection test successful with Workload Identity Federation',
        response: text,
        authenticationMethod: 'Workload Identity Federation',
        gcpProjectId: process.env.GCP_PROJECT_ID,
        gcpLocation: process.env.GCP_LOCATION || 'us-central1',
        workloadIdentityConfigured: true
      });

    } catch (error) {
      console.error('❌ Error testing Vertex AI:', error);
      console.error('Error details:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: error.code,
        status: error.status
      });

      // Handle specific error types
      if (error.message && error.message.includes('STS token exchange failed')) {
        return res.status(401).json({ 
          error: 'Workload Identity Federation failed',
          details: 'Failed to exchange Vercel OIDC token for GCP access token',
          suggestion: 'Check your GCP Workload Identity configuration and Vercel OIDC setup'
        });
      }
      
      if (error.message && error.message.includes('No Vercel OIDC token available')) {
        return res.status(401).json({ 
          error: 'Vercel OIDC token not available',
          details: 'The Vercel OIDC token is required for Workload Identity Federation',
          suggestion: 'Ensure your Vercel project is properly configured with OIDC'
        });
      }
      
      if (error.message && error.message.includes('authentication') || error.message.includes('unauthorized') || error.message.includes('403')) {
        return res.status(401).json({ 
          error: 'Authentication failed',
          details: 'Failed to authenticate with Google Cloud using Workload Identity',
          suggestion: 'Check your GCP service account permissions and Workload Identity configuration'
        });
      }
      
      if (error.message && error.message.includes('quota')) {
        return res.status(429).json({ 
          error: 'Quota exceeded',
          details: 'You have exceeded your Vertex AI quota',
          suggestion: 'Check your usage limits in Google Cloud Console'
        });
      }
      
      if (error.message && error.message.includes('network') || error.message.includes('fetch')) {
        return res.status(503).json({ 
          error: 'Network error',
          details: 'Unable to connect to Google Cloud services',
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
  console.error('Failed to load Vertex AI package:', packageError);
  
  module.exports = async function handler(req, res) {
    return res.status(500).json({ 
      error: 'Package error',
      details: 'Failed to load Vertex AI package',
      suggestion: 'Please check your dependencies and try again'
    });
  };
}
