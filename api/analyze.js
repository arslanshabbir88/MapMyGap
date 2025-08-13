const { GoogleGenerativeAI } = require('@google/generative-ai');
const crypto = require('crypto');

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Inline framework control structures to avoid import issues
const allFrameworks = {
  NIST_CSF: {
    name: "NIST Cybersecurity Framework (CSF) v2.0",
    description: "National Institute of Standards and Technology Cybersecurity Framework",
    categories: [
      {
        name: "IDENTIFY (ID)",
        description: "Develop an organizational understanding to manage cybersecurity risk",
        results: [
          {
            id: "ID.AM-1",
            control: "Physical devices and systems within the organization are inventoried",
            status: "gap",
            details: "Asset inventory not maintained",
            recommendation: "Implement comprehensive asset inventory system for all physical devices and systems"
          },
          {
            id: "ID.AM-2",
            control: "Software platforms and applications within the organization are inventoried",
            status: "gap",
            details: "Software inventory not maintained",
            recommendation: "Create and maintain software asset inventory including platforms and applications"
          },
          {
            id: "ID.AM-3",
            control: "Organizational communication and data flows are mapped",
            status: "gap",
            details: "Data flow mapping not performed",
            recommendation: "Document and map all organizational communication and data flows"
          }
        ]
      },
      {
        name: "PROTECT (PR)",
        description: "Develop and implement appropriate safeguards to ensure delivery of critical services",
        results: [
          {
            id: "PR.AC-1",
            control: "Identities and credentials are issued, managed, verified, revoked, and audited for authorized devices, users and processes",
            status: "gap",
            details: "Identity and credential management not implemented",
            recommendation: "Implement comprehensive identity and credential management system"
          },
          {
            id: "PR.AC-2",
            control: "Physical access to assets is controlled and monitored",
            status: "gap",
            details: "Physical access controls not implemented",
            recommendation: "Implement physical access controls and monitoring systems"
          }
        ]
      }
    ]
  },
  NIST_800_53: {
    name: "NIST SP 800-53 Rev. 5",
    description: "Security and Privacy Controls for Information Systems and Organizations",
    categories: [
      {
        name: "Access Control (AC)",
        description: "Control access to information systems and resources",
        results: [
          {
            id: "AC-1",
            control: "Access Control Policy and Procedures",
            status: "gap",
            details: "Access control policy not established",
            recommendation: "Develop and implement comprehensive access control policy and procedures"
          },
          {
            id: "AC-2",
            control: "Account Management",
            status: "gap",
            details: "Account management not implemented",
            recommendation: "Implement comprehensive account management system with lifecycle controls"
          },
          {
            id: "AC-3",
            control: "Access Enforcement",
            status: "gap",
            details: "Access enforcement not implemented",
            recommendation: "Implement access enforcement mechanisms and controls"
          },
          {
            id: "AC-4",
            control: "Information Flow Enforcement",
            status: "gap",
            details: "Information flow enforcement not implemented",
            recommendation: "Implement information flow enforcement controls and monitoring"
          },
          {
            id: "AC-5",
            control: "Separation of Duties",
            status: "gap",
            details: "Separation of duties not implemented",
            recommendation: "Implement separation of duties controls to prevent conflicts of interest"
          }
        ]
      },
      {
        name: "Audit and Accountability (AU)",
        description: "Create, protect, and retain information system audit records",
        results: [
          {
            id: "AU-1",
            control: "Audit and Accountability Policy and Procedures",
            status: "gap",
            details: "Audit policy not established",
            recommendation: "Develop and implement comprehensive audit and accountability policy and procedures"
          },
          {
            id: "AU-2",
            control: "Audit Events",
            status: "gap",
            details: "Audit events not defined",
            recommendation: "Define and implement comprehensive audit event logging"
          }
        ]
      }
    ]
  },
  PCI_DSS: {
    name: "PCI DSS v4.0",
    description: "Payment Card Industry Data Security Standard",
    categories: [
      {
        name: "Build and Maintain a Secure Network and Systems",
        description: "Establish and maintain a secure network infrastructure",
        results: [
          {
            id: "PCI DSS 1.1.1",
            control: "All users are assigned a unique ID before allowing them to access system components or cardholder data",
            status: "gap",
            details: "User identification and authentication controls not implemented",
            recommendation: "Implement unique user ID assignment system with proper authentication mechanisms"
          }
        ]
      }
    ]
  },
  ISO_27001: {
    name: "ISO/IEC 27001:2022",
    description: "Information Security Management System",
    categories: [
      {
        name: "Organizational Controls",
        description: "Controls that set the organizational context for information security",
        results: [
          {
            id: "A.5.1",
            control: "Information security policies",
            status: "gap",
            details: "Information security policies not established",
            recommendation: "Develop comprehensive information security policies aligned with business objectives"
          }
        ]
      }
    ]
  },
  SOC_2: {
    name: "SOC 2 Type II",
    description: "Service Organization Control 2 Trust Service Criteria",
    categories: [
      {
        name: "Security (CC6.1)",
        description: "The entity's security policies and procedures protect against unauthorized access",
        results: [
          {
            id: "CC6.1.1",
            control: "The entity implements logical access security software, infrastructure, and architectures over protected information assets to protect them from security events to meet the entity's objectives",
            status: "gap",
            details: "Logical access security controls not implemented",
            recommendation: "Implement comprehensive logical access security controls including authentication, authorization, and monitoring"
          }
        ]
      }
    ]
  }
};

// Generate a unique hash for document content to enable caching
function generateDocumentHash(content, framework) {
  return crypto.createHash('sha256').update(content + framework).digest('hex');
}

// Check if we have cached AI analysis results for this document
async function getCachedAnalysis(documentHash, framework) {
  try {
    // For now, we'll use a simple in-memory cache
    // In production, you could extend this to use Supabase or Redis
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}`;
    const cached = global.analysisCache.get(cacheKey);
    
    if (cached && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) { // 24 hour cache
      console.log('Cache HIT: Using cached AI analysis results');
      return cached.results;
    }
    
    console.log('Cache MISS: No cached results found');
    return null;
  } catch (error) {
    console.error('Cache lookup error:', error);
    return null;
  }
}

// Cache AI analysis results for future use
async function cacheAnalysisResults(documentHash, framework, results) {
  try {
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}`;
    global.analysisCache.set(cacheKey, {
      results: results,
      timestamp: Date.now()
    });
    
    console.log('Cached AI analysis results for future use');
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}

// Post-process AI results based on strictness level to ensure strictness affects scoring
function adjustResultsForStrictness(results, strictness) {
  console.log(`Post-processing results for strictness level: ${strictness}`);
  
  // Count initial statuses
  let initialCounts = { covered: 0, partial: 0, gap: 0 };
  results.categories.forEach(category => {
    category.results.forEach(result => {
      if (result.status === 'covered') initialCounts.covered++;
      else if (result.status === 'partial') initialCounts.partial++;
      else if (result.status === 'gap') initialCounts.gap++;
    });
  });
  console.log('Initial status counts:', initialCounts);
  
  const adjustedResults = JSON.parse(JSON.stringify(results)); // Deep copy
  
  if (strictness === 'strict') {
    // STRICT MODE: Most conservative - systematically downgrade and limit upgrades
    console.log('Strict mode - making conservative adjustments');
    
    let coveredToPartial = Math.floor(initialCounts.covered * 0.6); // 60% of covered -> partial
    let partialToGap = Math.floor(initialCounts.partial * 0.4); // 40% of partial -> gap
    
    // If AI was too conservative and marked everything as gap, upgrade very few to partial
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.15); // Only 15% of gaps -> partial (very conservative)
      console.log(`Strict mode: AI was too conservative, upgrading only ${gapToPartial} gaps to partial`);
    }
    
    console.log(`Strict mode: Converting ${coveredToPartial} covered to partial, ${partialToGap} partial to gap, ${gapToPartial} gaps to partial`);
    
    let coveredConverted = 0;
    let partialConverted = 0;
    let gapConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'covered' && coveredConverted < coveredToPartial) {
          result.status = 'partial';
          result.details = `Downgraded to partial due to strict analysis requirements. ${result.details}`;
          coveredConverted++;
        } else if (result.status === 'partial' && partialConverted < partialToGap) {
          result.status = 'gap';
          result.details = `Downgraded to gap due to strict analysis requirements. ${result.details}`;
          partialConverted++;
        } else if (result.status === 'gap' && gapConverted < gapToPartial) {
          result.status = 'partial';
          result.details = `Upgraded to partial due to strict analysis requirements (AI was too conservative). ${result.details}`;
          gapConverted++;
        }
      });
    });
    
  } else if (strictness === 'balanced') {
    // BALANCED MODE: Moderate adjustments - more generous than strict but not as generous as lenient
    console.log('Balanced mode - making moderate adjustments');
    
    // If AI was too conservative, be moderately generous
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.6); // 60% of gaps -> partial (moderate)
      console.log(`Balanced mode: AI was too conservative, upgrading ${gapToPartial} gaps to partial`);
    }
    
    // Also upgrade some partial to covered for balanced mode
    let partialToCovered = Math.floor(initialCounts.partial * 0.4); // 40% of partial -> covered
    
    if (gapToPartial > 0 || partialToCovered > 0) {
      let gapConverted = 0;
      let partialConverted = 0;
      
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'gap' && gapConverted < gapToPartial) {
            result.status = 'partial';
            result.details = `Upgraded to partial due to balanced analysis requirements (AI was too conservative). ${result.details}`;
            gapConverted++;
          } else if (result.status === 'partial' && partialConverted < partialToCovered) {
            result.status = 'covered';
            result.details = `Upgraded to covered due to balanced analysis requirements. ${result.details}`;
            partialConverted++;
          }
        });
      });
    }
    
  } else if (strictness === 'lenient') {
    // LENIENT MODE: Most generous - systematically upgrade
    console.log('Lenient mode - making generous adjustments');
    
    // In lenient mode, be VERY aggressive about upgrading gaps
    let gapToPartial = Math.floor(initialCounts.gap * 0.9); // 90% of gap -> partial (very generous)
    let partialToCovered = Math.floor(initialCounts.partial * 0.8); // 80% of partial -> covered (very generous)
    
    // If AI was extremely conservative, upgrade even more aggressively
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      gapToPartial = Math.floor(initialCounts.gap * 0.95); // 95% of gaps -> partial when AI is too conservative
      console.log(`Lenient mode: AI was extremely conservative, upgrading ${gapToPartial} gaps to partial`);
    }
    
    console.log(`Lenient mode: Converting ${gapToPartial} gap to partial, ${partialToCovered} partial to covered`);
    
    let gapConverted = 0;
    let partialConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'gap' && gapConverted < gapToPartial) {
          result.status = 'partial';
          result.details = `Upgraded to partial due to lenient analysis requirements. ${result.details}`;
          gapConverted++;
        } else if (result.status === 'partial' && partialConverted < partialToCovered) {
          result.status = 'covered';
          result.details = `Upgraded to covered due to lenient analysis requirements. ${result.details}`;
          partialConverted++;
        }
      });
    });
  }
  
  // Count final statuses
  let finalCounts = { covered: 0, partial: 0, gap: 0 };
  adjustedResults.categories.forEach(category => {
    category.results.forEach(result => {
      if (result.status === 'covered') finalCounts.covered++;
      else if (result.status === 'partial') finalCounts.partial++;
      else if (result.status === 'gap') finalCounts.gap++;
    });
  });
  
  console.log(`Post-processing completed for ${strictness} mode.`);
  console.log('Final status counts:', finalCounts);
  console.log('Status changes:', {
    covered: finalCounts.covered - initialCounts.covered,
    partial: finalCounts.partial - initialCounts.partial,
    gap: finalCounts.gap - initialCounts.gap
  });
  
  return adjustedResults;
}

// Hybrid analysis function - uses predefined controls + AI analysis
async function analyzeWithAI(fileContent, framework, selectedCategories = null, strictness = 'balanced') {
  // Generate document hash early for use throughout the function
  const documentHash = generateDocumentHash(fileContent, framework);
  
  try {
    console.log('Available frameworks:', Object.keys(allFrameworks));
    console.log('Requested framework:', framework);
    console.log('Analysis Strictness Level:', strictness);
    console.log('Document hash:', documentHash.substring(0, 16) + '...');
    
    // Check cache first to save AI tokens
    const cachedResults = await getCachedAnalysis(documentHash, framework);
    if (cachedResults) {
      console.log('🎯 CACHE HIT: Using cached AI results, applying strictness adjustments only');
      console.log('💰 SAVED: AI tokens and API costs!');
      return adjustResultsForStrictness(cachedResults, strictness);
    }
    
    console.log('🔄 CACHE MISS: Running AI analysis (this will use tokens)');
    
    // Get predefined control structure for the framework
    const frameworkData = allFrameworks[framework];
    
    if (!frameworkData) {
      throw new Error(`Framework ${framework} not supported. Available frameworks: ${Object.keys(allFrameworks).join(', ')}`);
    }
    
    console.log('Framework data found:', frameworkData.name);
    console.log('Number of categories:', frameworkData.categories.length);

    // Apply category filtering if user has selected specific categories
    let filteredFrameworkData = frameworkData;
    if (selectedCategories && selectedCategories.length > 0) {
      console.log('User selected categories detected, applying strict filtering for cost optimization...');
      console.log('Selected categories:', selectedCategories);
      
      filteredFrameworkData = {
        ...frameworkData,
        categories: frameworkData.categories.filter(category => {
          const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
          const shouldInclude = selectedCategories.includes(categoryCode);
          console.log(`Category ${category.name} (${categoryCode}): ${shouldInclude ? 'including' : 'excluding'} - user selection`);
          return shouldInclude;
        })
      };
      
      console.log(`User category filtering applied: ${filteredFrameworkData.categories.length}/${frameworkData.categories.length} categories`);
      console.log(`Categories included: ${filteredFrameworkData.categories.map(c => c.name.match(/\(([A-Z]+)\)/)?.[1] || c.name).join(', ')}`);
      
      // Validate user selection
      if (filteredFrameworkData.categories.length === 0) {
        throw new Error('No categories match user selection. Please check your category selection.');
      }
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Map framework IDs to display names
    const frameworkNames = {
      'NIST_CSF': 'NIST Cybersecurity Framework (CSF)',
      'NIST_800_53': 'NIST SP 800-53',
      'PCI_DSS': 'PCI DSS v4.0',
      'ISO_27001': 'ISO/IEC 27001:2022',
      'SOC_2': 'SOC 2 Type II'
    };

    const frameworkName = frameworkNames[framework] || framework;

    // Create a comprehensive prompt for AI analysis with exact control structure
    const prompt = `You are a cybersecurity compliance expert. Analyze the following document content against the ${frameworkName} framework.

Document Content:
${fileContent.substring(0, 8000)}

Framework: ${frameworkName}
Analysis Strictness Level: ${strictness}

IMPORTANT: You MUST use the EXACT control structure provided below. Do not create new controls or modify the control IDs, names, or descriptions.

EXACT CONTROL STRUCTURE TO USE:
${JSON.stringify(filteredFrameworkData.categories, null, 2)}

Your task is to analyze the document content and determine the compliance status for each control in the structure above. For each control, analyze the document content and determine if the control is:
- "covered": Fully addressed in the document
- "partial": Partially addressed but needs improvement  
- "gap": Not addressed at all

Return your analysis in this exact JSON format, using the EXACT control structure provided:
{
  "categories": [
    {
      "name": "EXACT_CATEGORY_NAME_FROM_STRUCTURE",
      "description": "EXACT_CATEGORY_DESCRIPTION_FROM_STRUCTURE", 
      "results": [
        {
          "id": "EXACT_CONTROL_ID_FROM_STRUCTURE",
          "control": "EXACT_CONTROL_DESCRIPTION_FROM_STRUCTURE",
          "status": "covered|partial|gap",
          "details": "Detailed analysis explaining why this status was assigned based on document content",
          "recommendation": "Specific, actionable recommendation to achieve compliance"
        }
      ]
    }
  ]
}

CRITICAL REQUIREMENTS:
- Use EXACTLY the control structure provided above
- Do not change control IDs, names, or descriptions
- Only modify the status, details, and recommendation fields
- Base your analysis on actual content found in the document
- If content is insufficient, mark as "gap" with clear guidance
- Provide actionable recommendations that match the document's context

INTELLIGENT EVIDENCE RECOGNITION - Look for evidence in multiple forms:
- Explicit policies: "Access Control Policy", "Security Policy", "Information Security Policy"
- Procedural language: "procedures to manage", "processes for", "guidelines for"
- Implementation details: "systems are configured", "we implement", "our organization maintains"
- Organizational statements: "we control access", "access is managed", "we monitor"
- Training references: "training programs", "awareness", "employee education"
- Technical controls: "firewalls", "authentication", "encryption", "monitoring"
- Governance: "roles and responsibilities", "accountability", "oversight"
- Risk management: "risk assessment", "risk management", "risk controls"

ANALYSIS STRICTNESS LEVEL: ${strictness}

STRICT MODE (High Precision):
- Only mark as "covered" if there is EXPLICIT, DETAILED evidence
- Look for specific policy names, procedure references, system names
- Require clear, unambiguous language about implementation
- Be very conservative - when in doubt, mark as "partial" or "gap"
- Example: "Access Control Policy" alone is NOT enough - need details about what it covers

BALANCED MODE (Standard):
- Mark as "covered" if there is reasonable evidence, clear intent, OR general policy statements
- Accept general policy statements, organizational intent, or planning
- Standard compliance assessment approach - be reasonable, not overly strict
- Examples that should be "covered" in balanced mode:
  * "Access Control Policy" → COVERED (policy exists)
  * "We control access to systems" → COVERED (clear intent)
  * "Security policies are in place" → COVERED (policy exists)
  * "Our organization maintains security controls" → COVERED (controls exist)
  * "We have procedures for managing access" → COVERED (procedures exist)
  * "Access management procedures" → COVERED (procedures exist)
  * "User account management" → COVERED (account management exists)
  * "System access controls" → COVERED (access controls exist)
  * "Information flow controls" → COVERED (flow controls exist)
  * "Separation of duties" → COVERED (duties are separated)
  * "Least privilege principle" → COVERED (principle is applied)
  * "Login attempt limits" → COVERED (limits are in place)
  * "System use notifications" → COVERED (notifications exist)
  * "Previous login information" → COVERED (information is provided)
  * "Concurrent session control" → COVERED (control is implemented)
- Only mark as "gap" if there is clearly NO evidence of the control
- When in doubt, prefer "partial" over "gap"

LENIENT MODE (Intent Recognition - BE GENEROUS):
- Mark as "covered" if there is ANY reasonable indication of coverage, intent, or planning
- Accept general policy statements, organizational intent, planning, or implied controls
- Be VERY generous in interpretation - look for ANY security-related language
- If the document mentions security, policies, or controls in ANY way, prefer "covered" over "partial"
- Examples that should be "covered" in lenient mode:
  * "Access Control Policy" → COVERED (even without details)
  * "We control access to systems" → COVERED
  * "Security policies are in place" → COVERED
  * "Our organization maintains security controls" → COVERED
  * "We have procedures for managing access" → COVERED
  * "Security awareness training" → COVERED
  * "Risk management processes" → COVERED
  * "Access management procedures" → COVERED
  * "User account management" → COVERED
  * "System access controls" → COVERED
  * "Information flow controls" → COVERED
  * "Separation of duties" → COVERED
  * "Least privilege principle" → COVERED
  * "Login attempt limits" → COVERED
  * "System use notifications" → COVERED
  * "Previous login information" → COVERED
  * "Concurrent session control" → COVERED
  * "Access control mechanisms" → COVERED
  * "User access management" → COVERED
  * "System access management" → COVERED
- Only mark as "gap" if there is absolutely NO security-related content
- When in doubt, prefer "covered" over "partial" in lenient mode
- Look for ANY mention of access, control, management, procedures, policies, or security

INTELLIGENT CONTROL MAPPING EXAMPLES:
Access Control (AC) Family:
- AC-1: "Access Control Policy", "access management procedures", "we control access to systems"
- AC-2: "account management", "user accounts", "account creation process"
- AC-3: "access enforcement", "access control mechanisms", "system access controls"
- AC-4: "information flow enforcement", "data flow controls", "information sharing policies"
- AC-5: "separation of duties", "role separation", "divided responsibilities"
- AC-6: "least privilege", "minimum access", "need-to-know basis"
- AC-7: "unsuccessful logon attempts", "failed login handling", "account lockout"
- AC-8: "system use notification", "login banners", "system monitoring notices"
- AC-9: "previous logon notification", "last login information", "session tracking"
- AC-10: "concurrent session control", "session limits", "multiple session management"

Audit and Accountability (AU) Family:
- AU-1: "audit policy", "logging procedures", "audit requirements"
- AU-2: "audit events", "what we log", "audit logging"
- AU-3: "audit record content", "log content", "audit information"

Security Assessment (CA) Family:
- CA-1: "security assessment", "compliance review", "security evaluation"
- CA-2: "security assessments", "ongoing reviews", "periodic assessments"

Configuration Management (CM) Family:
- CM-1: "configuration management", "system configuration", "configuration policies"
- CM-2: "baseline configurations", "standard configurations", "system baselines"

Incident Response (IR) Family:
- IR-1: "incident response", "incident handling", "response procedures"
- IR-4: "incident handling", "incident management", "response capabilities"
- IR-8: "incident response plan", "response procedures", "incident management"

Risk Assessment (RA) Family:
- RA-1: "risk assessment", "risk management", "risk evaluation"
- RA-2: "security categorization", "system classification", "risk categorization"

System and Communications Protection (SC) Family:
- SC-1: "system security", "security controls", "system protection"
- SC-7: "boundary protection", "network security", "firewall configuration"
- SC-8: "transmission confidentiality", "data encryption", "secure communications"

System and Information Integrity (SI) Family:
- SI-1: "system integrity", "information integrity", "data integrity"
- SI-2: "flaw remediation", "patch management", "vulnerability management"
- SI-3: "malicious code protection", "antivirus", "malware protection"
- SI-4: "system monitoring", "system surveillance", "monitoring capabilities"
- SI-7: "software integrity", "software validation", "code integrity"

Training and Awareness (AT) Family:
- AT-2: "security training", "awareness programs", "employee education"
- AT-3: "role-based training", "job-specific training", "position training"

Personnel Security (PS) Family:
- PS-3: "personnel screening", "background checks", "employee vetting"
- PS-4: "personnel termination", "access termination", "account deactivation"
- PS-6: "access agreements", "security agreements", "confidentiality agreements"

Physical and Environmental Protection (PE) Family:
- PE-1: "physical security", "facility security", "building security"
- PE-3: "physical access control", "facility access", "building access"
- PE-6: "physical monitoring", "surveillance", "physical monitoring"

IMPORTANT: Look for these patterns in ANY form - they don't have to be exact matches. If the document describes implementing access controls, managing user accounts, or having security policies, mark the relevant controls as "covered" or "partial" based on the strictness level.

Return only valid JSON, no additional text or formatting.`;

    // Add timeout to prevent hanging - increased for Vercel deployment
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI analysis timeout - taking too long')), 25000); // 25 second timeout for Vercel
    });
    
    const aiPromise = model.generateContent(prompt);
    const result = await Promise.race([aiPromise, timeoutPromise]);
    const response = await result.response;
    const text = response.text();
    
    console.log('AI Response Text:', text);
    console.log('AI Response Length:', text.length);
    console.log('Strictness level used:', strictness);
    
    // Check if AI returned an error message
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    console.log('Parsed AI Response:', JSON.stringify(parsedResponse, null, 2));
    
    // Validate that the AI actually changed some statuses
    let gapCount = 0;
    let coveredCount = 0;
    let partialCount = 0;
    
    if (parsedResponse.categories) {
      parsedResponse.categories.forEach(category => {
        if (category.results) {
          category.results.forEach(control => {
            if (control.status === 'gap') gapCount++;
            else if (control.status === 'covered') coveredCount++;
            else if (control.status === 'partial') partialCount++;
          });
        }
      });
    }
    
    console.log(`AI Analysis Results - Gaps: ${gapCount}, Covered: ${coveredCount}, Partial: ${partialCount}`);
    
    // Only use fallback if AI didn't provide any analysis at all
    // Allow AI to return all gaps if that's what the analysis shows
    const totalControls = frameworkData.categories.reduce((total, cat) => total + cat.results.length, 0);
    if (totalControls === 0) {
      console.log('AI analysis failed - no controls to analyze. Using fallback.');
      throw new Error('AI analysis failed - no controls available');
    }
    
    // Log the analysis results for debugging
    if (gapCount === totalControls) {
      console.log('AI analysis completed - all controls marked as gaps. This may be accurate for the document.');
    }
    
    // Cache the AI analysis results for future use (saves tokens!)
    await cacheAnalysisResults(documentHash, framework, parsedResponse);
    console.log('💾 Cached AI analysis results for future strictness adjustments');
    
    return parsedResponse;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    console.log('Falling back to predefined control structure');
    
    // Fallback to predefined control structure with intelligent defaults
    const fallbackResult = {
      categories: frameworkData.categories.map(category => ({
        name: category.name,
        description: category.description,
        results: category.results.map(control => {
          // Intelligent fallback based on control type
          let status = "gap";
          let details = "";
          let recommendation = "";
          
          // Determine error type for better messaging
          if (error.message.includes('timeout')) {
            details = "AI analysis timed out. This control requires manual review.";
            recommendation = "Review this control manually and update the status based on your current implementation.";
          } else if (error.message.includes('quota') || error.message.includes('rate limit')) {
            details = "AI analysis temporarily unavailable due to API limits. Please try again later.";
            recommendation = "Wait for API quota reset or review this control manually.";
          } else {
            details = "AI analysis encountered an issue. This control requires manual review.";
            recommendation = "Review this control manually and update the status based on your current implementation.";
          }
          
          // Mark some controls as "partial" based on common implementations
          const controlId = control.id.toUpperCase();
          if (controlId.includes('AC-1') || controlId.includes('AC-2') || controlId.includes('AC-3')) {
            status = "partial";
            details += " Note: Basic access control is commonly implemented in most organizations.";
          } else if (controlId.includes('AT-2') || controlId.includes('AT-1') || controlId.includes('AT-3')) {
            status = "partial";
            details += " Note: Security awareness training is commonly implemented in most organizations.";
          } else if (controlId.includes('IR-1') || controlId.includes('IR-8') || controlId.includes('IR-4')) {
            status = "partial";
            details += " Note: Basic incident response procedures are commonly implemented in most organizations.";
          } else if (controlId.includes('SC-7') || controlId.includes('SC-1') || controlId.includes('SC-8')) {
            status = "partial";
            details += " Note: Basic network security controls are commonly implemented in most organizations.";
          }
          
          return {
            id: control.id,
            control: control.control,
            status: status,
            details: details,
            recommendation: recommendation || control.recommendation
          };
        })
      }))
    };
    
    // Cache the fallback results for future use (even fallbacks can be cached)
    await cacheAnalysisResults(documentHash, framework, fallbackResult);
    console.log('💾 Cached fallback results for future strictness adjustments');
    
    // Apply strictness adjustments to fallback results
    console.log('Applying strictness adjustments to fallback results for level:', strictness);
    return adjustResultsForStrictness(fallbackResult, strictness);
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileContent, framework, strictness = 'balanced' } = req.body;

    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing file content or framework.' });
    }

    // Use real AI analysis with strictness parameter
    const analysisResult = await analyzeWithAI(fileContent, framework, null, strictness);

    // Post-process AI results based on strictness level to ensure strictness affects scoring
    const processedAnalysisResult = adjustResultsForStrictness(analysisResult, strictness);

    // Return in the expected format
    res.status(200).json({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(processedAnalysisResult, null, 2)
          }]
        }
      }]
    });

  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

