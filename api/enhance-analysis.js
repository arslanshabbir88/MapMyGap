import jwt from 'jsonwebtoken';

let accessToken = null;
let tokenExpiry = null;

// Get access token from service account key (same method as main API)
async function getAccessToken() {
  try {
    // Check if we have a valid token
    if (accessToken && Date.now() < tokenExpiry) {
      return accessToken;
    }

    const serviceKey = process.env.GCP_SERVICE_KEY;
    if (!serviceKey) {
      throw new Error('GCP_SERVICE_KEY environment variable not set');
    }

    // Parse the service account key JSON
    let credentials;
    try {
      // Handle base64 encoded service key
      let decodedKey = serviceKey;
      if (serviceKey.length > 1000 && /^[A-Za-z0-9+/=]+$/.test(serviceKey)) {
        decodedKey = Buffer.from(serviceKey, 'base64').toString('utf-8');
      }
      credentials = JSON.parse(decodedKey);
    } catch (parseError) {
      throw new Error(`Failed to parse GCP service key: ${parseError.message}`);
    }

    // Create JWT token
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600
    };

    const jwtToken = jwt.sign(payload, credentials.private_key, { 
      algorithm: 'RS256',
      header: { typ: 'JWT' }
    });

    // Exchange JWT for access token
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwtToken
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      throw new Error(`Token exchange failed: ${tokenResponse.status} ${errorText}`);
    }

    const tokenData = await tokenResponse.json();
    accessToken = tokenData.access_token;
    tokenExpiry = Date.now() + (tokenData.expires_in * 1000) - 60000; // 1 minute buffer

    console.log('✅ Access token obtained successfully for enhancement');
    return accessToken;
  } catch (error) {
    console.log('❌ Failed to get access token for enhancement:', error.message);
    throw error;
  }
}

// Call Vertex AI API for enhancement
async function enhanceAnalysisWithAI(analysisResults) {
  try {
    const accessToken = await getAccessToken();
    const projectId = process.env.GCP_PROJECT_ID;
    const location = process.env.GCP_LOCATION || 'us-central1';

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

    const prompt = `
You are a compliance implementation expert. Enhance the following compliance analysis with implementation guidance.

ANALYSIS RESULTS (gaps and partials only):
${JSON.stringify(analysisResults, null, 2)}

For each control, add these fields:
- implementationSteps: Array of 3-4 concise, actionable steps
- difficulty: "Easy", "Medium", or "Hard"
- businessImpact: "High", "Medium", or "Low"
- timeline: "Short-term" or "Long-term"
- resources: Brief resource description
- sequence: "Foundation", "Core", or "Advanced"

Keep responses concise. Return valid JSON only.
`;

    const requestBody = {
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        maxOutputTokens: 16384,
        temperature: 0.3,
        topP: 0.8,
        topK: 40
      }
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI API call failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      const enhancedText = result.candidates[0].content.parts[0].text;
      console.log('🔍 Enhanced AI response:', enhancedText.substring(0, 500));
      
      // Try to parse the JSON response
      try {
        // Clean the response - remove markdown code blocks if present
        let cleanedText = enhancedText.trim();
        if (cleanedText.startsWith('```json')) {
          cleanedText = cleanedText.replace(/^```json\s*/, '').replace(/\s*```$/, '');
        } else if (cleanedText.startsWith('```')) {
          cleanedText = cleanedText.replace(/^```\s*/, '').replace(/\s*```$/, '');
        }
        
        // Check if response appears truncated (doesn't end with proper JSON structure)
        if (!cleanedText.endsWith('}') && !cleanedText.endsWith(']')) {
          console.log('⚠️ Response appears truncated, attempting to fix...');
          // Try to find the last complete object/array and truncate there
          const lastCompleteBrace = cleanedText.lastIndexOf('}');
          const lastCompleteBracket = cleanedText.lastIndexOf(']');
          const lastComplete = Math.max(lastCompleteBrace, lastCompleteBracket);
          
          if (lastComplete > cleanedText.length * 0.8) { // Only if we have most of the response
            cleanedText = cleanedText.substring(0, lastComplete + 1);
            console.log('🔧 Truncated response to last complete structure');
          }
        }
        
        const enhancedResults = JSON.parse(cleanedText);
        console.log('✅ Successfully parsed enhanced results');
        return enhancedResults;
      } catch (parseError) {
        console.log('❌ Failed to parse enhanced results:', parseError.message);
        console.log('❌ Raw enhanced text length:', enhancedText.length);
        console.log('❌ Raw enhanced text preview:', enhancedText.substring(0, 500));
        // Return original results if parsing fails
        return analysisResults;
      }
    } else {
      console.log('❌ Unexpected response format from Vertex AI:', result);
      throw new Error('Unexpected response format from Vertex AI');
    }
  } catch (error) {
    console.log('❌ Enhancement API call failed:', error.message);
    // Return original results if enhancement fails
    return analysisResults;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { analysisResults } = req.body;

    if (!analysisResults) {
      return res.status(400).json({ error: 'analysisResults is required' });
    }

    console.log('🚀 Starting analysis enhancement...');
    
    const enhancedResults = await enhanceAnalysisWithAI(analysisResults);
    
    console.log('✅ Analysis enhancement completed');
    
    return res.status(200).json({
      success: true,
      results: enhancedResults
    });

  } catch (error) {
    console.log('❌ Enhancement error:', error.message);
    return res.status(500).json({ 
      error: 'Enhancement failed',
      message: error.message 
    });
  }
}
