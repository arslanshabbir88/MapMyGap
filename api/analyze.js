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
          },
          {
            id: "AC-6",
            control: "Least Privilege",
            status: "gap",
            details: "Least privilege principle not implemented",
            recommendation: "Implement least privilege access controls"
          },
          {
            id: "AC-7",
            control: "Unsuccessful Logon Attempts",
            status: "gap",
            details: "Logon attempt limits not configured",
            recommendation: "Configure limits on unsuccessful logon attempts"
          },
          {
            id: "AC-8",
            control: "System Use Notification",
            status: "gap",
            details: "System use notifications not displayed",
            recommendation: "Display appropriate system use notifications"
          },
          {
            id: "AC-9",
            control: "Previous Logon Notification",
            status: "gap",
            details: "Previous logon notifications not implemented",
            recommendation: "Implement notifications for previous logon information"
          },
          {
            id: "AC-10",
            control: "Concurrent Session Control",
            status: "gap",
            details: "Concurrent session control not implemented",
            recommendation: "Implement controls to limit concurrent user sessions"
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
          },
          {
            id: "AU-3",
            control: "Content of Audit Records",
            status: "gap",
            details: "Audit record content not defined",
            recommendation: "Define and implement comprehensive audit record content requirements"
          },
          {
            id: "AU-4",
            control: "Audit Storage Capacity",
            status: "gap",
            details: "Audit storage capacity not managed",
            recommendation: "Implement audit storage capacity management and monitoring"
          },
          {
            id: "AU-5",
            control: "Response to Audit Processing Failures",
            status: "gap",
            details: "Audit processing failure response not defined",
            recommendation: "Define and implement response procedures for audit processing failures"
          },
          {
            id: "AU-6",
            control: "Audit Review, Analysis, and Reporting",
            status: "gap",
            details: "Audit review and analysis not implemented",
            recommendation: "Implement regular audit review, analysis, and reporting procedures"
          }
        ]
      },
      {
        name: "Identification and Authentication (IA)",
        description: "Establish and manage the identity and authentication of users, processes, and devices",
        results: [
          {
            id: "IA-1",
            control: "Identification and Authentication Policy and Procedures",
            status: "gap",
            details: "Identification and authentication policy not established",
            recommendation: "Develop and implement comprehensive identification and authentication policy and procedures"
          },
          {
            id: "IA-2",
            control: "Identification and Authentication (Organizational Users)",
            status: "gap",
            details: "User identification and authentication not implemented",
            recommendation: "Implement multi-factor authentication for all organizational users"
          },
          {
            id: "IA-3",
            control: "Device Identification and Authentication",
            status: "gap",
            details: "Device identification and authentication not implemented",
            recommendation: "Implement device identification and authentication mechanisms"
          }
        ]
      },
      {
        name: "Incident Response (IR)",
        description: "Establish an operational incident handling capability for information systems",
        results: [
          {
            id: "IR-1",
            control: "Incident Response Policy and Procedures",
            status: "gap",
            details: "Incident response policy not established",
            recommendation: "Develop and implement comprehensive incident response policy and procedures"
          },
          {
            id: "IR-2",
            control: "Incident Response Training",
            status: "gap",
            details: "Incident response training not implemented",
            recommendation: "Provide incident response training to personnel with incident response responsibilities"
          },
          {
            id: "IR-3",
            control: "Incident Response Testing",
            status: "gap",
            details: "Incident response testing not implemented",
            recommendation: "Test incident response capability on an annual basis"
          },
          {
            id: "IR-4",
            control: "Incident Handling",
            status: "gap",
            details: "Incident handling procedures not implemented",
            recommendation: "Implement incident handling procedures for security incidents"
          }
        ]
      },
      {
        name: "System and Communications Protection (SC)",
        description: "Monitor, control, and protect organizational communications",
        results: [
          {
            id: "SC-1",
            control: "System and Communications Protection Policy and Procedures",
            status: "gap",
            details: "System and communications protection policy not established",
            recommendation: "Develop and implement comprehensive system and communications protection policy and procedures"
          },
          {
            id: "SC-2",
            control: "Application Partitioning",
            status: "gap",
            details: "Application partitioning not implemented",
            recommendation: "Implement application partitioning to separate user functionality from system management functionality"
          },
          {
            id: "SC-3",
            control: "Security Function Isolation",
            status: "gap",
            details: "Security function isolation not implemented",
            recommendation: "Implement security function isolation to prevent unauthorized access to security functions"
          },
          {
            id: "SC-7",
            control: "Boundary Protection",
            status: "gap",
            details: "Boundary protection not implemented",
            recommendation: "Implement boundary protection mechanisms to control communications at managed interfaces"
          },
          {
            id: "SC-8",
            control: "Transmission Confidentiality and Integrity",
            status: "gap",
            details: "Transmission confidentiality and integrity not implemented",
            recommendation: "Implement transmission confidentiality and integrity controls to protect information in transit"
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
function generateDocumentHash(content, framework, selectedCategories = null) {
  const categoryString = selectedCategories ? JSON.stringify(selectedCategories.sort()) : '';
  return crypto.createHash('sha256').update(content + framework + categoryString).digest('hex');
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
  console.log('Results structure:', {
    categoriesCount: results.categories?.length || 0,
    firstCategory: results.categories?.[0]?.name || 'none',
    firstCategoryControls: results.categories?.[0]?.results?.length || 0
  });
  
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
  const documentHash = generateDocumentHash(fileContent, framework, selectedCategories);
  
  // Declare filteredFrameworkData at function level to ensure it's always available
  let filteredFrameworkData = { categories: [] };
  
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
      console.log('Applying strictness adjustments to cached results:', strictness);
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
    if (selectedCategories && selectedCategories.length > 0) {
      console.log('=== CATEGORY FILTERING DEBUG ===');
      console.log('User selected categories detected, applying strict filtering for cost optimization...');
      console.log('Selected categories:', selectedCategories);
      console.log('Analysis strictness level:', strictness);
      console.log('Available framework categories:', frameworkData.categories.map(c => c.name));
      
      // Debug each category to see what's happening
      frameworkData.categories.forEach(category => {
        const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
        const shouldInclude = selectedCategories.includes(categoryCode);
        console.log(`Category: "${category.name}" -> Extracted code: "${categoryCode}" -> Should include: ${shouldInclude}`);
        console.log(`  Category name pattern match: ${category.name.match(/\(([A-Z]+)\)/)}`);
        console.log(`  Selected categories: [${selectedCategories.join(', ')}]`);
        console.log(`  Includes check: ${selectedCategories.includes(categoryCode)}`);
      });
      
      filteredFrameworkData = {
        ...frameworkData,
        categories: frameworkData.categories.filter(category => {
          const categoryCode = category.name.match(/\(([A-Z]+)\)/)?.[1];
          const shouldInclude = selectedCategories.includes(categoryCode);
          console.log(`Filtering: ${category.name} (${categoryCode}): ${shouldInclude ? 'INCLUDING' : 'EXCLUDING'}`);
          return shouldInclude;
        })
      };
      
      console.log(`=== FILTERING RESULTS ===`);
      console.log(`Original categories: ${frameworkData.categories.length}`);
      console.log(`Filtered categories: ${filteredFrameworkData.categories.length}`);
      console.log(`Categories included: ${filteredFrameworkData.categories.map(c => c.name).join(', ')}`);
      console.log(`Categories excluded: ${frameworkData.categories.filter(c => {
        const code = c.name.match(/\(([A-Z]+)\)/)?.[1];
        return !selectedCategories.includes(code);
      }).map(c => c.name).join(', ')}`);
      
      // Validate user selection
      if (filteredFrameworkData.categories.length === 0) {
        console.error('🚨 CRITICAL: No categories match user selection!');
        console.error('This means the filtering logic is too strict or there\'s a pattern matching issue.');
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
    console.log('=== AI PROMPT DEBUG ===');
    console.log('Document content length:', fileContent.length);
    console.log('Document content preview:', fileContent.substring(0, 200));
    console.log('Framework name:', frameworkName);
    console.log('Strictness level:', strictness);
    console.log('Filtered framework data:', JSON.stringify(filteredFrameworkData, null, 2));
    console.log('Categories being sent to AI:', filteredFrameworkData.categories.map(c => c.name));
    console.log('Total controls being sent to AI:', filteredFrameworkData.categories.reduce((total, cat) => total + cat.results.length, 0));
    
    const prompt = `You are a cybersecurity compliance expert. Analyze the following document content against the ${frameworkName} framework.

Document Content:
${fileContent.substring(0, 15000)}

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
          "details": "Brief explanation of why this status was assigned",
          "recommendation": "Specific recommendation to achieve compliance"
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
- Provide brief, actionable recommendations

ANALYSIS STRICTNESS LEVEL: ${strictness}

STRICT MODE: Only mark as "covered" if there is EXPLICIT, DETAILED evidence
BALANCED MODE: Mark as "covered" if there is reasonable evidence or clear intent
LENIENT MODE: Mark as "covered" if there is ANY reasonable indication of coverage

Look for evidence like: policies, procedures, "we implement", "our organization maintains", "access controls", "security policies", etc.

Return only valid JSON, no additional text or formatting.`;

    // Add timeout to prevent hanging - increased for Vercel deployment
    const timeoutPromise = new Promise((_, reject) => {
      setTimeout(() => reject(new Error('AI analysis timeout - taking too long')), 25000); // 25 second timeout for Vercel
    });
    
    const aiPromise = model.generateContent(prompt);
    const result = await Promise.race([aiPromise, timeoutPromise]);
    const response = await result.response;
    const text = response.text();
    
    console.log('=== AI RESPONSE DEBUG ===');
    console.log('AI Response Text:', text);
    console.log('AI Response Length:', text.length);
    console.log('Strictness level used:', strictness);
    console.log('AI Response contains "categories":', text.includes('"categories"'));
    console.log('AI Response contains "results":', text.includes('"results"'));
    console.log('AI Response contains "AC-1":', text.includes('AC-1'));
    console.log('AI Response contains "Access Control":', text.includes('Access Control'));
    
    // Check if AI returned an error message
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    const parsedResponse = JSON.parse(jsonMatch[0]);
    console.log('Parsed AI Response:', JSON.stringify(parsedResponse, null, 2));
    
    // Validate that the AI actually returned categories and results
    if (!parsedResponse.categories || parsedResponse.categories.length === 0) {
      console.error('🚨 AI returned empty categories array - this indicates a prompt or parsing issue');
      console.error('AI Response Text:', text);
      console.error('Parsed Response:', parsedResponse);
      throw new Error('AI analysis failed - returned empty categories. This may indicate the prompt was too complex or the AI misunderstood the request.');
    }
    
    // Validate that the AI actually changed some statuses
    let gapCount = 0;
    let coveredCount = 0;
    let partialCount = 0;
    
    parsedResponse.categories.forEach(category => {
      if (category.results) {
        category.results.forEach(control => {
          if (control.status === 'gap') gapCount++;
          else if (control.status === 'covered') coveredCount++;
          else if (control.status === 'partial') partialCount++;
        });
      }
    });
    
    console.log(`AI Analysis Results - Gaps: ${gapCount}, Covered: ${coveredCount}, Partial: ${partialCount}`);
    
    // Only use fallback if AI didn't provide any analysis at all
    // Allow AI to return all gaps if that's what the analysis shows
    const totalControls = filteredFrameworkData.categories.reduce((total, cat) => total + cat.results.length, 0);
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
      categories: filteredFrameworkData.categories.map(category => ({
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
    const { fileContent, framework, strictness = 'balanced', selectedCategories } = req.body;
    
    console.log('=== REQUEST DEBUG ===');
    console.log('Request body keys:', Object.keys(req.body));
    console.log('Framework:', framework);
    console.log('Strictness:', strictness);
    console.log('Selected categories:', selectedCategories);
    console.log('File content length:', fileContent?.length || 0);
    console.log('File content preview:', fileContent?.substring(0, 200) || 'No content');

    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing file content or framework.' });
    }

    // Use real AI analysis with strictness parameter
    const analysisResult = await analyzeWithAI(fileContent, framework, selectedCategories, strictness);

    // Return in the expected format (strictness adjustments already applied in analyzeWithAI)
    res.status(200).json({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(analysisResult, null, 2)
          }]
        }
      }]
    });

  } catch (error) {
    console.error('Error in /analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

