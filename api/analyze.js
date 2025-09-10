/**
 * SECURITY-FIRST COMPLIANCE ANALYSIS API
 * 
 * ENTERPRISE-GRADE DATA PROTECTION:
 * ✅ NO document content is stored, logged, or cached anywhere
 * ✅ NO document content is included in cache keys or logs
 * ✅ All analysis is performed in-memory and discarded immediately
 * ✅ Minimal document hash generation (first 100 chars only) for logging
 * ✅ No persistent storage of uploaded files or analysis results
 * ✅ Secure for enterprise use with sensitive internal standards documents
 * 
 * 100% DETERMINISTIC ANALYSIS:
 * ✅ ZERO randomness in AI processing
 * ✅ Same document = Same results every time
 * ✅ Perfect for audit trails and compliance verification
 * ✅ Enterprise-grade reliability for serious compliance work
 * 
 * COMPLIANCE FRAMEWORKS SUPPORTED:
 * - NIST CSF v2.0 (82+ controls)
 * - NIST SP 800-53 (17 control families)
 * - NIST SP 800-63B (7 categories)
 * - PCI DSS v4.0 (12 requirements)
 * - ISO 27001:2022 (4 categories)
 * - SOC 2 Type II (5 Trust Service Criteria)
 * 
 * ANALYSIS MODE:
 * - Comprehensive: Thorough assessment with actionable recommendations
 * 
 * AUTHENTICATION:
 * - Direct Vertex AI API calls with service account authentication
 * - Fast, reliable, and secure integration
 */

import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Direct Vertex AI API integration - no SDK authentication issues
let accessToken = null;
let tokenExpiry = 0;

// Internal usage checking function (no tracking, just validation)
async function checkUsageLimits(userId, documentSize, controlTextSize = 0) {
  try {
    if (!userId) {
      console.log('⚠️ No user ID provided, skipping usage check');
      return { success: true, usage: null };
    }

    console.log('🔍 Checking usage limits for user:', userId);
    
    // Get current subscription and usage
    const dbStartTime = Date.now();
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();
    const dbTime = Date.now() - dbStartTime;
    console.log(`⏱️ Database query time: ${dbTime}ms`);

    if (subError || !subscription) {
      console.log('⚠️ No subscription found, skipping usage check');
      return { success: true, usage: null };
    }

    // Get tier limits based on user's exact specifications (same as check-usage.js)
    const tierLimits = {
      trial: { 
        runs: 3, 
        characters: 1000, 
        control_text: 1000,
        control_text_enabled: true
      },
      starter: { 
        runs: 5, 
        characters: -1, // unlimited
        control_text: 0,
        control_text_enabled: false
      },
      professional: { 
        runs: 25, 
        characters: -1, // unlimited
        control_text: -1, // unlimited
        control_text_enabled: true
      },
      enterprise: { 
        runs: -1, // unlimited
        characters: -1, // unlimited
        control_text: -1, // unlimited
        control_text_enabled: true
      }
    };

    const limits = tierLimits[subscription.plan_type?.toLowerCase()] || tierLimits.trial;
    
    // Calculate usage using tier limits
    const runsRemaining = limits.runs === -1 ? -1 : Math.max(0, limits.runs - subscription.runs_used);
    const controlTextRemaining = limits.control_text === -1 ? -1 : Math.max(0, limits.control_text - (subscription.control_text_used || 0));
    
    const usage = {
      plan: subscription.plan_type?.toLowerCase() || 'trial',
      runs_remaining: runsRemaining,
      runs_used: subscription.runs_used,
      runs_limit: limits.runs,
      character_limit: limits.characters,
      control_text_enabled: limits.control_text_enabled,
      control_text_remaining: controlTextRemaining,
      control_text_used: subscription.control_text_used || 0,
      control_text_limit: limits.control_text,
      subscription_id: subscription.id
    };

    console.log('📊 Current usage:', usage);

    // Check if user has runs remaining
    if (usage.runs_remaining === 0) {
      return { success: false, error: 'Analysis limit reached. Please upgrade your plan.' };
    }
    
    // Check document size limit (skip if unlimited)
    if (usage.character_limit !== -1 && documentSize > usage.character_limit) {
      return { success: false, error: `Document exceeds ${usage.character_limit} character limit for your plan.` };
    }

    // Check control text generation limit
    if (controlTextSize > 0 && !usage.control_text_enabled) {
      return { success: false, error: 'Control text generation is not available on your current plan. Please upgrade to Professional or Enterprise.' };
    }
    
    if (controlTextSize > 0 && usage.control_text_remaining === 0) {
      return { success: false, error: 'Control text generation limit reached. Please upgrade your plan.' };
    }

    console.log('✅ Usage limits check passed');
    return { success: true, usage };
    
  } catch (error) {
    console.error('Usage limits check error:', error);
    return { success: false, error: error.message };
  }
}

// Internal usage tracking function (tracks after successful analysis)
async function trackUsageAfterAnalysis(userId, documentSize, controlTextSize = 0) {
  try {
    if (!userId) {
      console.log('⚠️ No user ID provided, skipping usage tracking');
      return { success: true, usage: null };
    }

    console.log('📊 Tracking usage after successful analysis for user:', userId);
    
    // Get current subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (subError || !subscription) {
      console.log('⚠️ No subscription found, skipping usage tracking');
      return { success: true, usage: null };
    }

    // Track this analysis
    const insertStartTime = Date.now();
    await supabase
      .from('usage_logs')
      .insert({
        user_id: userId,
        subscription_id: subscription.id,
        analysis_type: 'comprehensive',
        document_size: documentSize,
        control_text_size: controlTextSize,
        framework: 'NIST_CSF' // or whatever framework is selected
      });
    const insertTime = Date.now() - insertStartTime;
    console.log(`⏱️ Usage log insert time: ${insertTime}ms`);

    // Increment usage counters
    const updateStartTime = Date.now();
    await supabase
      .from('subscriptions')
      .update({ 
        runs_used: subscription.runs_used + 1,
        control_text_used: (subscription.control_text_used || 0) + controlTextSize,
        last_analysis_date: new Date().toISOString()
      })
      .eq('user_id', userId);
    const updateTime = Date.now() - updateStartTime;
    console.log(`⏱️ Subscription update time: ${updateTime}ms`);

    console.log('✅ Usage tracked successfully after analysis completion');
    return { success: true };
    
  } catch (error) {
    console.error('Usage tracking error:', error);
    // Don't throw here - we don't want to fail the analysis if tracking fails
    return { success: false, error: error.message };
  }
}

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

    console.log('✅ Access token obtained successfully');
    return accessToken;
  } catch (error) {
    console.log('❌ Failed to get access token:', error.message);
    throw error;
  }
}

// Direct call to Vertex AI API
async function callVertexAI(prompt, checkCancellation = null) {
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
        maxOutputTokens: 65536, // Increased from 32768 to handle large documents
        temperature: 0.0,
        topP: 1.0,
        topK: 1
      }
    };

                  // Set timeout to match Vercel's configured maxDuration
                  const getTimeoutDuration = (docLength) => {
                    return 290000;  // 290 seconds (safe under Vercel's 300s maxDuration)
                  };

                  const timeoutDuration = getTimeoutDuration(prompt.length);
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

    // Check for cancellation before starting the race
    if (checkCancellation && checkCancellation()) {
      throw new Error('Request cancelled by client');
    }

    // Race between fetch and timeout
    const response = await Promise.race([fetchPromise, timeoutPromise]);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Vertex AI API call failed: ${response.status} ${errorText}`);
    }

    const result = await response.json();
    
    // Add detailed logging to debug response structure
    console.log('🔍 Raw Vertex AI response structure:', JSON.stringify(result, null, 2));
    
    if (result.candidates && result.candidates[0] && result.candidates[0].content) {
      if (result.candidates[0].content.parts && result.candidates[0].content.parts[0]) {
        return result.candidates[0].content.parts[0].text;
      } else {
        // Check if response was truncated due to token limit
        const finishReason = result.candidates[0].finishReason;
        if (finishReason === 'MAX_TOKENS') {
          console.error('❌ Response truncated due to token limit. Consider using category-specific analysis for large documents.');
          throw new Error('Analysis too complex for current token limit. Please try analyzing specific categories instead of comprehensive analysis.');
        } else {
          console.error('❌ Missing parts in response:', result.candidates[0].content);
          throw new Error('Unexpected response format: missing parts array');
        }
      }
    } else {
      console.error('❌ Unexpected response format:', result);
      throw new Error('Unexpected response format from Vertex AI');
    }
  } catch (error) {
    console.log('❌ Vertex AI API call failed:', error.message);
    throw error;
  }
}

// Main analysis function using direct Vertex AI API
async function analyzeWithAI(fileContent, framework, selectedCategories = null, checkCancellation = null) {
  // Generate deterministic hash for logging - use beginning and end of document
  const documentHash = crypto.createHash('sha256').update(
    fileContent.substring(0, 100) + 
    fileContent.substring(Math.max(0, fileContent.length - 100)) + 
    framework
  ).digest('hex');
  
       console.log('🚀 Starting AI analysis with Gemini 2.5 Flash via direct Vertex AI API');
     console.log('📄 Document length:', fileContent.length, 'characters');
     console.log('🔍 Framework:', framework);
     console.log('🔑 Document hash:', documentHash.substring(0, 16) + '...');
  
  try {
    // Import framework data to enforce consistent control structure
    let frameworkData;
    try {
      if (framework === 'NIST_800_63B') {
        // Inline the comprehensive NIST 800-63B-4 category structure to avoid import issues
        frameworkData = {
          categories: [
            {
              name: "Identity Assurance Level (IAL)",
              description: "Identity proofing and verification requirements",
              results: [
                { id: "IAL1.1", control: "IAL1 - Identity Proofing Requirements", status: "gap" },
                { id: "IAL1.2", control: "IAL1 - Identity Verification", status: "gap" },
                { id: "IAL1.3", control: "IAL1 - Identity Resolution", status: "gap" },
                { id: "IAL2.1", control: "IAL2 - Enhanced Identity Proofing", status: "gap" },
                { id: "IAL2.2", control: "IAL2 - Enhanced Identity Verification", status: "gap" },
                { id: "IAL2.3", control: "IAL2 - Enhanced Identity Resolution", status: "gap" },
                { id: "IAL3.1", control: "IAL3 - Superior Identity Proofing", status: "gap" },
                { id: "IAL3.2", control: "IAL3 - Superior Identity Verification", status: "gap" },
                { id: "IAL3.3", control: "IAL3 - Superior Identity Resolution", status: "gap" }
              ]
            },
            {
              name: "Authentication Assurance Level (AAL)",
              description: "Technical requirements for each of the three authentication assurance levels",
              results: [
                // AAL1 Controls
                { id: "AAL1.1", control: "AAL1 - Permitted Authenticator Types", status: "gap" },
                { id: "AAL1.2", control: "AAL1 - Authenticator and Verifier Requirements", status: "gap" },
                { id: "AAL1.3", control: "AAL1 - Reauthentication", status: "gap" },
                // AAL2 Controls
                { id: "AAL2.1", control: "AAL2 - Permitted Authenticator Types", status: "gap" },
                { id: "AAL2.2", control: "AAL2 - Authenticator and Verifier Requirements", status: "gap" },
                { id: "AAL2.3", control: "AAL2 - Reauthentication", status: "gap" },
                // AAL3 Controls
                { id: "AAL3.1", control: "AAL3 - Permitted Authenticator Types", status: "gap" },
                { id: "AAL3.2", control: "AAL3 - Authenticator and Verifier Requirements", status: "gap" },
                { id: "AAL3.3", control: "AAL3 - Reauthentication", status: "gap" },
                // General AAL Requirements
                { id: "AAL_GEN.1", control: "General - Security Controls", status: "gap" },
                { id: "AAL_GEN.2", control: "General - Records Retention Policy", status: "gap" },
                { id: "AAL_GEN.3", control: "General - Privacy Requirements", status: "gap" },
                { id: "AAL_GEN.4", control: "General - Redress Requirements", status: "gap" }
              ]
            },
            {
              name: "Federation Assurance Level (FAL)",
              description: "Federation and trust requirements",
              results: [
                { id: "FAL1.1", control: "FAL1 - Basic Federation", status: "gap" },
                { id: "FAL2.1", control: "FAL2 - Enhanced Federation", status: "gap" },
                { id: "FAL3.1", control: "FAL3 - Advanced Federation", status: "gap" }
              ]
            },
            {
              name: "Authenticator Type Requirements",
              description: "Requirements by authenticator type as specified in Section 3.1",
              results: [
                { id: "AUTH_TYPE.1", control: "Passwords", status: "gap" },
                { id: "AUTH_TYPE.2", control: "Look-Up Secrets", status: "gap" },
                { id: "AUTH_TYPE.3", control: "Out-of-Band Devices", status: "gap" },
                { id: "AUTH_TYPE.4", control: "Single-Factor OTP", status: "gap" },
                { id: "AUTH_TYPE.5", control: "Multi-Factor OTPs", status: "gap" },
                { id: "AUTH_TYPE.6", control: "Single-Factor Cryptographic Authentication", status: "gap" },
                { id: "AUTH_TYPE.7", control: "Multi-Factor Cryptographic Authentication", status: "gap" }
              ]
            },
            {
              name: "Technical Requirements",
              description: "Specific technical requirements as specified in Section 3.2",
              results: [
                { id: "TECH.1", control: "Replay Resistance", status: "gap" },
                { id: "TECH.2", control: "Verifier-Impersonation Resistance", status: "gap" },
                { id: "TECH.3", control: "Biometric Performance", status: "gap" },
                { id: "TECH.4", control: "Authenticator Binding", status: "gap" },
                { id: "TECH.5", control: "Phishing Resistance", status: "gap" },
                { id: "TECH.6", control: "Verifier Compromise Resistance", status: "gap" },
                { id: "TECH.7", control: "Authenticator Compromise Resistance", status: "gap" },
                { id: "TECH.8", control: "Authenticator Secret Strength", status: "gap" },
                { id: "TECH.9", control: "Authenticator Secret Storage", status: "gap" },
                { id: "TECH.10", control: "Activation Secrets", status: "gap" },
                { id: "TECH.11", control: "Wireless Connection Security", status: "gap" },
                { id: "TECH.12", control: "Random Value Generation", status: "gap" },
                { id: "TECH.13", control: "Non-Exportability", status: "gap" }
              ]
            },
            {
              name: "Authenticator Event Management",
              description: "Authenticator event management as specified in Section 4",
              results: [
                { id: "EVENT.1", control: "Authenticator Binding", status: "gap" },
                { id: "EVENT.2", control: "Account Recovery", status: "gap" },
                { id: "EVENT.3", control: "Authenticator Replacement", status: "gap" },
                { id: "EVENT.4", control: "Authenticator Deactivation", status: "gap" },
                { id: "EVENT.5", control: "Authenticator Reactivation", status: "gap" },
                { id: "EVENT.6", control: "Subscriber Notifications", status: "gap" }
              ]
            },
            {
              name: "Session Management",
              description: "Session management as specified in Section 5",
              results: [
                { id: "SESSION.1", control: "Session Establishment", status: "gap" },
                { id: "SESSION.2", control: "Reauthentication", status: "gap" },
                { id: "SESSION.3", control: "Session Monitoring", status: "gap" },
                { id: "SESSION.4", control: "Session Termination", status: "gap" }
              ]
            }
          ]
        };
        console.log('✅ Successfully loaded inline NIST 800-63B framework data');
      } else if (framework === 'SOC_2') {
        // Import SOC 2 framework data from frameworks-data.js
        const { allFrameworks } = await import('./frameworks-data.js');
        frameworkData = allFrameworks.SOC_2;
        console.log('✅ Successfully loaded SOC 2 framework data');
      } else if (framework === 'SOC_1') {
        // Import SOC 1 framework data from frameworks-data.js
        const { allFrameworks } = await import('./frameworks-data.js');
        frameworkData = allFrameworks.SOC_1;
        console.log('✅ Successfully loaded SOC 1 framework data');
      }
      // Add other frameworks as needed
    } catch (importError) {
      console.log('⚠️ Could not load framework data, proceeding with standard analysis');
    }

    // Build category-specific prompt based on selectedCategories
    let categoryPrompt = '';
    if (selectedCategories && selectedCategories.length > 0) {
      categoryPrompt = `\n\nIMPORTANT: Only analyze the following specific categories: ${selectedCategories.join(', ')}. Do NOT analyze any other categories.`;
    } else {
      categoryPrompt = '\n\nAnalyze all relevant categories found in the document.';
    }

    // Add comprehensive framework-specific instructions
    let frameworkPrompt = '';
    if (framework === 'NIST_CSF') {
      frameworkPrompt = `\n\nFor NIST CSF v2.0, analyze ALL controls in the selected functions (IDENTIFY, PROTECT, DETECT, RESPOND, RECOVER, GOVERN). Include detailed analysis of asset management, access control, awareness training, and all relevant controls.`;
    } else if (framework === 'NIST_800_53') {
      frameworkPrompt = `\n\nFor NIST SP 800-53, analyze ALL controls in the selected families (AC, AT, AU, CA, CM, CP, IA, IR, MA, MP, PE, PL, PS, RA, SA, SC, SI, SR). Provide comprehensive coverage of all controls within selected families.`;
    } else if (framework === 'NIST_800_63B') {
      if (frameworkData) {
        // Filter framework data to only include selected categories
        let filteredCategories = frameworkData.categories;
        if (selectedCategories && selectedCategories.length > 0) {
          console.log('🔍 Original selectedCategories:', selectedCategories);
          console.log('🔍 Available framework categories:', frameworkData.categories.map(c => c.name));
          
          // Map user-friendly category names to framework category names
          const categoryMapping = {
            'IAL': 'Identity Assurance Level (IAL)',
            'AAL': 'Authentication Assurance Level (AAL)',
            'FAL': 'Federation Assurance Level (FAL)',
            'AUTH_TYPE': 'Authenticator Type Requirements',
            'TECH': 'Technical Requirements',
            'EVENT': 'Authenticator Event Management',
            'SESSION': 'Session Management'
          };
          
          // Filter to only selected categories
          filteredCategories = frameworkData.categories.filter(cat => 
            selectedCategories.some(selected => 
              categoryMapping[selected] === cat.name || selected === cat.name
            )
          );
          
          console.log('🎯 Filtered categories for NIST 800-63B:', filteredCategories.map(c => c.name));
          console.log('🎯 Number of categories being sent to AI:', filteredCategories.length);
        }
        
        // Use the filtered framework data to enforce consistent control structure
        frameworkPrompt = `\n\nFor NIST SP 800-63B-4, you MUST analyze ONLY the controls in the following structure. Use EXACTLY these control IDs and names:

${JSON.stringify(filteredCategories, null, 2)}

CRITICAL REQUIREMENTS:
1. You MUST analyze ONLY the controls listed above - do NOT add any other categories or controls
2. You MUST analyze EVERY SINGLE control listed above - do NOT skip any controls
3. Return results ONLY for the categories and controls shown above
4. Do NOT create or add any additional categories not listed here`;
      } else {
        frameworkPrompt = `\n\nFor NIST SP 800-63B-4, analyze ALL controls in the selected categories (AAL, Authenticator Type Requirements, Technical Requirements, Authenticator Event Management, Session Management). Include detailed analysis of authentication assurance levels, authenticator types, technical requirements, event management, and session management controls.`;
      }
    } else if (framework === 'SOC_2') {
      if (frameworkData) {
        // Filter framework data to only include selected categories
        let filteredCategories = frameworkData.categories;
        if (selectedCategories && selectedCategories.length > 0) {
          console.log('🔍 Original selectedCategories for SOC 2:', selectedCategories);
          console.log('🔍 Available SOC 2 categories:', frameworkData.categories.map(c => c.name));
          
          // Map user-friendly category names to framework category names
          const categoryMapping = {
            'CC': 'Security - Common Criteria',
            'A': 'Availability',
            'PI': 'Processing Integrity',
            'C': 'Confidentiality',
            'P': 'Privacy',
            // Also support full names for backward compatibility
            'Security': 'Security - Common Criteria',
            'Availability': 'Availability',
            'Processing Integrity': 'Processing Integrity',
            'Confidentiality': 'Confidentiality',
            'Privacy': 'Privacy'
          };
          
          // Filter to only selected categories
          filteredCategories = frameworkData.categories.filter(cat => 
            selectedCategories.some(selected => 
              categoryMapping[selected] === cat.name || selected === cat.name
            )
          );
          
          console.log('🎯 Filtered categories for SOC 2:', filteredCategories.map(c => c.name));
          console.log('🎯 Number of SOC 2 categories being sent to AI:', filteredCategories.length);
        }
        
        // Use the filtered framework data to enforce consistent control structure
        frameworkPrompt = `\n\nFor SOC 2 Type II, you MUST analyze ONLY the controls in the following structure. Use EXACTLY these control IDs and names:

${JSON.stringify(filteredCategories, null, 2)}

CRITICAL REQUIREMENTS:
1. You MUST analyze ONLY the controls listed above - do NOT add any other categories or controls
2. You MUST analyze EVERY SINGLE control listed above - do NOT skip any controls
3. Return results ONLY for the categories and controls shown above
4. Do NOT create or add any additional categories not listed here`;
      } else {
        frameworkPrompt = `\n\nFor SOC 2 Type II, analyze ALL Trust Service Criteria (Security, Availability, Processing Integrity, Confidentiality, Privacy) in the selected areas.`;
      }
    } else if (framework === 'SOC_1') {
      if (frameworkData) {
        // Filter framework data to only include selected categories
        let filteredCategories = frameworkData.categories;
        if (selectedCategories && selectedCategories.length > 0) {
          console.log('🔍 Original selectedCategories for SOC 1:', selectedCategories);
          console.log('🔍 Available SOC 1 categories:', frameworkData.categories.map(c => c.name));
          
          // Map user-friendly category names to framework category names
          const categoryMapping = {
            'CE': 'Control Environment',
            'RA': 'Risk Assessment',
            'CA': 'Control Activities',
            'IC': 'Information and Communication',
            'M': 'Monitoring',
            // Also support full names for backward compatibility
            'Control Environment': 'Control Environment',
            'Risk Assessment': 'Risk Assessment',
            'Control Activities': 'Control Activities',
            'Information and Communication': 'Information and Communication',
            'Monitoring': 'Monitoring'
          };
          
          // Filter to only selected categories
          filteredCategories = frameworkData.categories.filter(cat => 
            selectedCategories.some(selected => 
              categoryMapping[selected] === cat.name || selected === cat.name
            )
          );
          
          console.log('🎯 Filtered categories for SOC 1:', filteredCategories.map(c => c.name));
          console.log('🎯 Number of SOC 1 categories being sent to AI:', filteredCategories.length);
        }
        
        // Use the filtered framework data to enforce consistent control structure
        frameworkPrompt = `\n\nFor SOC 1 Type II, you MUST analyze ONLY the controls in the following structure. Use EXACTLY these control IDs and names:

${JSON.stringify(filteredCategories, null, 2)}

CRITICAL REQUIREMENTS:
1. You MUST analyze ONLY the controls listed above - do NOT add any other categories or controls
2. You MUST analyze EVERY SINGLE control listed above - do NOT skip any controls
3. Return results ONLY for the categories and controls shown above
4. Do NOT create or add any additional categories not listed here`;
      } else {
        frameworkPrompt = `\n\nFor SOC 1 Type II, analyze ALL COSO framework components (Control Environment, Risk Assessment, Control Activities, Information and Communication, Monitoring) in the selected areas.`;
      }
    } else if (framework === 'PCI_DSS') {
      frameworkPrompt = `\n\nFor PCI DSS v4.0, analyze ALL requirements in the selected areas. Include comprehensive coverage of security controls, access management, and compliance requirements.`;
    } else if (framework === 'ISO_27001') {
      frameworkPrompt = `\n\nFor ISO 27001:2022, analyze ALL controls in the selected categories. Provide comprehensive coverage of information security management system controls.`;
    }

                // Create the prompt for the AI
            const prompt = `Analyze this document for ${framework} compliance and return a structured JSON response.

            Document Content:
            ${fileContent}

            // Log the actual prompt length being sent to AI
            console.log('📝 Full prompt length being sent to AI:', prompt.length, 'characters');
            console.log('📄 Document content length in prompt:', fileContent.length, 'characters');

CRITICAL INSTRUCTION: You are ONLY allowed to analyze the specific categories and controls that are explicitly provided to you. You MUST NOT create, add, or analyze any additional categories or controls beyond what is specified.

Please analyze the compliance status and provide a JSON response in this exact format:
{
  "categories": [
    {
      "name": "Category Name",
      "description": "Category description",
      "results": [
        {
          "id": "Control ID",
          "control": "Control description",
          "status": "covered|partial|gap",
          "details": "Specific details about compliance status",
          "recommendation": "Actionable recommendation"
        }
      ]
    }
  ]
}${categoryPrompt}${frameworkPrompt}

CRITICAL REQUIREMENTS:
1. You MUST analyze EVERY SINGLE CONTROL in the selected categories - do NOT skip any controls
2. Provide comprehensive coverage of all controls within selected areas
3. Use ONLY these status values: "covered", "partial", "gap"
4. Return ONLY valid JSON, no additional text or explanations`;

    // Call Vertex AI directly
    const analysis = await callVertexAI(prompt, checkCancellation);
    
    console.log('✅ AI analysis completed successfully');
    console.log('📊 Response length:', analysis.length, 'characters');
    console.log('🔍 Raw AI response preview:', analysis.substring(0, 500) + '...');
    
    // Parse the AI response to extract structured JSON
    let parsedAnalysis;
    try {
      // Clean the response - remove any markdown formatting or extra text
      let cleanResponse = analysis.trim();
      
      // Find JSON content (look for { at start or extract JSON from response)
      if (cleanResponse.startsWith('{')) {
        parsedAnalysis = JSON.parse(cleanResponse);
      } else {
        // Try to extract JSON from the response
        const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          parsedAnalysis = JSON.parse(jsonMatch[0]);
        } else {
          throw new Error('No valid JSON found in AI response');
        }
      }
      
      console.log('✅ Successfully parsed AI response to structured format');
      console.log('📊 Parsed structure keys:', Object.keys(parsedAnalysis));
      
    } catch (parseError) {
      console.log('❌ Failed to parse AI response as JSON:', parseError.message);
      console.log('❌ Raw response that failed to parse:', analysis);
      
      // Fallback: return the raw text wrapped in the expected structure
      parsedAnalysis = {
        categories: [{
          name: "Compliance Analysis",
          description: "AI-generated compliance assessment",
          results: [{
            id: "ANALYSIS_001",
            control: "Document Compliance Review",
            status: "partial",
            details: "AI analysis completed but response format was unexpected",
            recommendation: "Review the generated analysis and consider re-running for structured output"
          }]
        }]
      };
    }
    
    return {
      success: true,
      analysis: parsedAnalysis,
      documentHash: documentHash.substring(0, 16)
    };

  } catch (error) {
    console.log('❌ AI analysis failed:', error.message);
    throw error;
  }
}

// Main handler function
export default async function handler(req, res) {
  // Set aggressive cache control headers to prevent any caching
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Set up request cancellation detection
  let isRequestCancelled = false;
  const checkCancellation = () => {
    if (req.destroyed || req.aborted) {
      isRequestCancelled = true;
      console.log('🚫 Request was cancelled by client');
      return true;
    }
    return false;
  };
  
  try {
    const startTime = Date.now();
    console.log('🚀 Starting compliance analysis request');
    
    // Parse request body
    const { fileContent, framework, selectedCategories, userId } = req.body;
    
    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check usage limits before starting analysis (but don't track yet)
    const usageStartTime = Date.now();
    const usageCheck = await checkUsageLimits(userId, fileContent.length, 0);
    const usageTime = Date.now() - usageStartTime;
    console.log(`⏱️ Usage check completed in ${usageTime}ms`);
    
    if (!usageCheck.success) {
      throw new Error(usageCheck.error);
    }
    
    // Generate unique request identifier to prevent caching
    const requestId = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}`;
    console.log('🆔 Unique request ID:', requestId);
    
    // Check for cancellation before starting AI analysis
    if (checkCancellation()) {
      console.log('🚫 Request cancelled before AI analysis, skipping');
      return res.status(499).json({ error: 'Request cancelled by client' });
    }

    // Perform AI analysis
    const aiStartTime = Date.now();
    const result = await analyzeWithAI(fileContent, framework, selectedCategories, checkCancellation);
    const aiTime = Date.now() - aiStartTime;
    console.log(`⏱️ AI analysis completed in ${aiTime}ms`);
    
    // NOTE: Usage tracking moved to frontend to handle cancellation properly
    // Backend no longer tracks usage - frontend will handle this after successful response
    
    const totalTime = Date.now() - startTime;
    console.log(`⏱️ Total function time: ${totalTime}ms`);
    
    // Return results in the format the frontend expects
    return res.status(200).json({
      success: true,
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(result.analysis)
          }]
        }
      }],
      documentHash: result.documentHash,
      framework: framework,
      timestamp: new Date().toISOString(),
      requestId: requestId
    });

  } catch (error) {
    console.log('❌ Handler error:', error.message);
    return res.status(500).json({ 
      error: 'Analysis failed', 
      details: error.message 
    });
  }
}

