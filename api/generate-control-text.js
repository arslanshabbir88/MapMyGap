import crypto from 'crypto';
import jwt from 'jsonwebtoken';

// Direct Vertex AI API integration for control text generation
let accessToken = null;
let tokenExpiry = 0;

// Get access token from service account key
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
      throw new Error(`Failed to parse service account key: ${parseError.message}`);
    }

    // Create JWT token using proper library
    const now = Math.floor(Date.now() / 1000);
    const payload = {
      iss: credentials.client_email,
      scope: 'https://www.googleapis.com/auth/cloud-platform',
      aud: 'https://oauth2.googleapis.com/token',
      exp: now + 3600, // 1 hour
      iat: now
    };

    // Sign JWT with private key
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

    console.log('✅ Access token obtained successfully for control text generation');
    return accessToken;
  } catch (error) {
    console.log('❌ Failed to get access token for control text generation:', error.message);
    throw error;
  }
}

// Direct call to Vertex AI API for control text generation
async function generateControlText(prompt, timeoutDuration) {
  try {
    const accessToken = await getAccessToken();
    const projectId = process.env.GCP_PROJECT_ID;
    const location = process.env.GCP_LOCATION || 'us-central1';

    const url = `https://${location}-aiplatform.googleapis.com/v1/projects/${projectId}/locations/${location}/publishers/google/models/gemini-2.5-flash:generateContent`;

    const requestBody = {
      contents: [{
        role: "user",
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        maxOutputTokens: 8192,
        temperature: 0.1, // Low temperature for consistent, focused output
        topP: 1.0,
        topK: 1
      }
    };

    // Add adaptive timeout wrapper based on document size
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error(`AI response timeout after ${timeoutDuration/1000} seconds`)), timeoutDuration);
    });

    const fetchPromise = fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody)
    });

    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI API call failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      return result.candidates[0].content.parts[0].text;
    } else {
      throw new Error('Unexpected response format from Vertex AI');
    }
  } catch (error) {
    console.log('❌ Vertex AI API call failed for control text generation:', error.message);
    throw error;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalDocument, targetControl, framework, userId } = req.body;

    if (!originalDocument || !targetControl || !framework) {
      return res.status(400).json({ error: 'Missing required parameters: originalDocument, targetControl, or framework.' });
    }

    // Check usage limits for control text generation
    if (userId) {
      try {
        const { createClient } = await import('@supabase/supabase-js');
        const supabase = createClient(
          process.env.SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        // Get user's subscription
        const { data: subscription, error: subError } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('user_id', userId)
          .single();

        if (subError || !subscription) {
          return res.status(400).json({ 
            error: 'TRIAL_LIMIT',
            message: 'Control text generation is not available on the Trial plan. Please upgrade to a paid plan to generate control text.',
            upgradeRequired: true
          });
        }

        // Get tier limits
        const tierLimits = {
          trial: { 
            control_text: 0,
            control_text_enabled: false
          },
          starter: { 
            control_text: 0,
            control_text_enabled: false
          },
          professional: { 
            control_text: -1, // unlimited
            control_text_enabled: true
          },
          enterprise: { 
            control_text: -1, // unlimited
            control_text_enabled: true
          }
        };

        const limits = tierLimits[subscription.plan_type?.toLowerCase()] || tierLimits.trial;

        // Check if control text generation is enabled for this plan
        if (!limits.control_text_enabled) {
          return res.status(400).json({ 
            error: 'PLAN_LIMIT',
            message: 'Control text generation is not available on your current plan. Please upgrade to Professional or Enterprise to generate control text.',
            upgradeRequired: true,
            currentPlan: subscription.plan_type?.toLowerCase() || 'trial'
          });
        }

        // Check if user has reached character limits
        if (limits.control_text !== -1 && subscription.control_text_used >= limits.control_text) {
          return res.status(400).json({ 
            error: 'CHARACTER_LIMIT',
            message: `You have reached your control text generation limit (${limits.control_text} characters). Please upgrade your plan for unlimited control text generation.`,
            upgradeRequired: true,
            limit: limits.control_text,
            used: subscription.control_text_used
          });
        }

      } catch (usageError) {
        console.error('❌ Error checking usage limits:', usageError);
        return res.status(400).json({ 
          error: 'USAGE_CHECK_FAILED',
          message: 'Unable to verify your plan limits. Please try again or contact support.',
          upgradeRequired: false
        });
      }
    } else {
      // No userId provided - assume Trial user
      return res.status(400).json({ 
        error: 'TRIAL_LIMIT',
        message: 'Control text generation is not available on the Trial plan. Please upgrade to a paid plan to generate control text.',
        upgradeRequired: true
      });
    }

    console.log('🚀 Starting control text generation for:', framework);
    console.log('📄 Document length:', originalDocument.length, 'characters');
    console.log('🎯 Target control:', targetControl.substring(0, 100) + '...');

    // Add adaptive timeout wrapper based on document size
    const getTimeoutDuration = (docLength) => {
      if (docLength < 3000) return 30000;      // Small docs: 30 seconds
      if (docLength < 5000) return 45000;      // Medium docs: 45 seconds
      return 55000;                            // Large docs: 55 seconds (safe under Vercel's 60s limit)
    };

    const timeoutDuration = getTimeoutDuration(originalDocument.length);
    console.log('⏱️ Using adaptive timeout:', timeoutDuration/1000, 'seconds for document size:', originalDocument.length, 'characters');

    // Create a concise prompt for generating control text
    const prompt = `Generate SPECIFIC, ACTIONABLE implementation text to make this control "covered":

DOCUMENT: ${originalDocument.substring(0, 4000)}
CONTROL: ${targetControl}
FRAMEWORK: ${framework}

Requirements:
- Specific technical details (tools, systems, configurations)
- Implementation procedures with measurable actions
- Monitoring and evidence collection
- Roles and responsibilities
- Integration with existing systems

Return ONLY the implementation text, ready to copy. Make it comprehensive enough for "covered" status.`;

    console.log('📤 Sending prompt to Gemini 2.5 Flash for control text generation...');
    console.log('📊 Prompt length:', prompt.length, 'characters');

    // Generate the control text
    const generatedText = await generateControlText(prompt, timeoutDuration);
    
    console.log('✅ Control text generation completed successfully');
    console.log('📊 Generated text length:', generatedText.length, 'characters');
    console.log('🔍 Generated text preview:', generatedText.substring(0, 200) + '...');

    // Return the generated control text
    return res.status(200).json({
      success: true,
      generatedText: generatedText,
      framework: framework,
      targetControl: targetControl.substring(0, 100) + '...',
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.log('❌ Control text generation failed:', error.message);
    return res.status(500).json({ 
      error: 'Control text generation failed', 
      details: error.message 
    });
  }
}
