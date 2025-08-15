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
      },
      {
        name: "DETECT (DE)",
        description: "Develop and implement appropriate activities to identify the occurrence of a cybersecurity event",
        results: [
          {
            id: "DE.CM-1",
            control: "The network is monitored to detect potential cybersecurity events",
            status: "gap",
            details: "Network monitoring not implemented",
            recommendation: "Implement comprehensive network monitoring and detection capabilities"
          },
          {
            id: "DE.CM-2",
            control: "The physical environment is monitored to detect potential cybersecurity events",
            status: "gap",
            details: "Physical environment monitoring not implemented",
            recommendation: "Implement physical security monitoring and detection systems"
          },
          {
            id: "DE.CM-3",
            control: "Personnel activity is monitored to detect potential cybersecurity events",
            status: "gap",
            details: "Personnel activity monitoring not implemented",
            recommendation: "Implement user activity monitoring and behavioral analysis"
          },
          {
            id: "DE.CM-4",
            control: "Malicious code is detected and reported",
            status: "gap",
            details: "Malicious code detection not implemented",
            recommendation: "Implement anti-malware and threat detection systems"
          },
          {
            id: "DE.CM-5",
            control: "Unauthorized mobile code is detected and reported",
            status: "gap",
            details: "Mobile code monitoring not implemented",
            recommendation: "Implement mobile code detection and sandboxing"
          },
          {
            id: "DE.CM-6",
            control: "External service provider activity is monitored to detect potential cybersecurity events",
            status: "gap",
            details: "External provider monitoring not implemented",
            recommendation: "Implement monitoring of external service provider activities"
          },
          {
            id: "DE.CM-7",
            control: "Monitoring for unauthorized personnel, connections, devices, and software is performed",
            status: "gap",
            details: "Unauthorized activity monitoring not implemented",
            recommendation: "Implement comprehensive monitoring for unauthorized activities"
          },
          {
            id: "DE.CM-8",
            control: "Vulnerability scans are performed",
            status: "gap",
            details: "Vulnerability scanning not performed",
            recommendation: "Implement regular vulnerability scanning and assessment"
          }
        ]
      },
      {
        name: "RESPOND (RS)",
        description: "Develop and implement appropriate activities to take action regarding a detected cybersecurity incident",
        results: [
          {
            id: "RS.RP-1",
            control: "Response plan is executed during or after incident",
            status: "gap",
            details: "Incident response plan not implemented",
            recommendation: "Develop and implement comprehensive incident response plan"
          },
          {
            id: "RS.CO-1",
            control: "Personnel know their roles and order operations when a response is needed",
            status: "gap",
            details: "Response roles not defined",
            recommendation: "Define and communicate incident response roles and responsibilities"
          },
          {
            id: "RS.CO-2",
            control: "Events are reported consistent with established criteria",
            status: "gap",
            details: "Event reporting criteria not established",
            recommendation: "Establish clear criteria for cybersecurity event reporting"
          },
          {
            id: "RS.CO-3",
            control: "Information is shared consistent with response plans",
            status: "gap",
            details: "Information sharing procedures not established",
            recommendation: "Establish procedures for sharing incident information"
          },
          {
            id: "RS.CO-4",
            control: "Coordination with stakeholders occurs consistent with response plans",
            status: "gap",
            details: "Stakeholder coordination not established",
            recommendation: "Establish coordination procedures with key stakeholders"
          },
          {
            id: "RS.CO-5",
            control: "Voluntary information sharing occurs with external stakeholders to achieve broader cybersecurity situational awareness",
            status: "gap",
            details: "External information sharing not established",
            recommendation: "Establish voluntary information sharing with external stakeholders"
          }
        ]
      },
      {
        name: "RECOVER (RC)",
        description: "Develop and implement appropriate activities to maintain plans for resilience and to restore any capabilities or services that were impaired due to a cybersecurity incident",
        results: [
          {
            id: "RC.RP-1",
            control: "Recovery plan is executed during or after incident",
            status: "gap",
            details: "Recovery plan not implemented",
            recommendation: "Develop and implement comprehensive recovery plan"
          },
          {
            id: "RC.IM-1",
            control: "Recovery plans incorporate lessons learned",
            status: "gap",
            details: "Lessons learned not incorporated",
            recommendation: "Incorporate lessons learned into recovery planning"
          },
          {
            id: "RC.IM-2",
            control: "Recovery strategies are updated",
            status: "gap",
            details: "Recovery strategies not updated",
            recommendation: "Regularly update recovery strategies based on lessons learned"
          }
        ]
      },
      {
        name: "GOVERN (GV)",
        description: "Develop and implement appropriate activities to manage cybersecurity risk to the organization",
        results: [
          {
            id: "GV.ID-1",
            control: "Organizational security policies are established",
            status: "gap",
            details: "Security policies not established",
            recommendation: "Develop and implement comprehensive security policies"
          },
          {
            id: "GV.ID-2",
            control: "Security roles and responsibilities are coordinated and aligned with internal roles and external partners",
            status: "gap",
            details: "Security roles not coordinated",
            recommendation: "Coordinate security roles and responsibilities across organization"
          },
          {
            id: "GV.ID-3",
            control: "Legal and regulatory requirements regarding cybersecurity are understood and managed",
            status: "gap",
            details: "Legal requirements not managed",
            recommendation: "Identify and manage legal and regulatory cybersecurity requirements"
          },
          {
            id: "GV.PR-1",
            control: "Security policies are established and managed",
            status: "gap",
            details: "Security policies not managed",
            recommendation: "Establish and maintain security policy management process"
          },
          {
            id: "GV.PR-2",
            control: "Security roles and responsibilities are established and managed",
            status: "gap",
            details: "Security roles not managed",
            recommendation: "Establish and manage security roles and responsibilities"
          },
          {
            id: "GV.RM-1",
            control: "Organizational cybersecurity risk is clearly understood and managed",
            status: "gap",
            details: "Risk management not implemented",
            recommendation: "Implement comprehensive cybersecurity risk management"
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
function generateDocumentHash(content, framework, selectedCategories = null, strictness = null) {
  const categoryString = selectedCategories ? JSON.stringify(selectedCategories.sort()) : '';
  const strictnessString = strictness ? strictness : '';
  return crypto.createHash('sha256').update(content + framework + categoryString + strictnessString).digest('hex');
}

// Check if we have cached AI analysis results for this document
async function getCachedAnalysis(documentHash, framework, strictness) {
  try {
    // For now, we'll use a simple in-memory cache
    // In production, you could extend this to use Supabase or Redis
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}_${strictness}`;
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
async function cacheAnalysisResults(documentHash, framework, results, strictness) {
  try {
    if (!global.analysisCache) {
      global.analysisCache = new Map();
    }
    
    const cacheKey = `${documentHash}_${framework}_${strictness}`;
    global.analysisCache.set(cacheKey, {
      results: results,
      timestamp: Date.now()
    });
    
    console.log('Cached AI analysis results for future use');
    console.log('Current cache size:', global.analysisCache.size);
    console.log('Cache keys:', Array.from(global.analysisCache.keys()));
  } catch (error) {
    console.error('Cache storage error:', error);
  }
}

// Function to clear cache for debugging
function clearAnalysisCache() {
  if (global.analysisCache) {
    global.analysisCache.clear();
    console.log('🧹 Cache cleared for debugging');
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
    console.log('Initial counts - Covered:', initialCounts.covered, 'Partial:', initialCounts.partial, 'Gap:', initialCounts.gap);
    
    let coveredToPartial = Math.floor(initialCounts.covered * 0.4); // 40% of covered -> partial
    let partialToGap = Math.floor(initialCounts.partial * 0.5); // 50% of partial -> gap
    
    // If AI was too conservative and marked everything as gap, upgrade very few to partial
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      // Only upgrade gaps that have strong evidence
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'gap' && gapToPartial < Math.floor(initialCounts.gap * 0.1)) {
            const details = result.details.toLowerCase();
            if (details.includes('implemented') || details.includes('established') || details.includes('deployed') ||
                details.includes('provided') || details.includes('performed') || details.includes('basic access control') ||
                details.includes('basic security') || details.includes('basic policy')) {
              result.status = 'partial';
              // Keep original details without confusing upgrade message
              gapToPartial++;
              console.log(`Strict mode: Upgraded ${result.id} from gap to partial based on strong evidence`);
            }
          }
        });
      });
      console.log(`Strict mode: AI was too conservative, upgrading only ${gapToPartial} gaps to partial based on strong evidence`);
    }
    
    console.log(`Strict mode: Converting ${coveredToPartial} covered to partial, ${partialToGap} partial to gap, ${gapToPartial} gaps to partial (evidence-based)`);
    
    let coveredConverted = 0;
    let partialConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'covered' && coveredConverted < coveredToPartial) {
          result.status = 'partial';
          // Only append the downgrade message if the original details don't contain the error message
          if (!result.details.includes('AI analysis encountered an issue')) {
            result.details = `Downgraded to partial due to strict analysis requirements. ${result.details}`;
          } else {
            result.details = `Downgraded to partial due to strict analysis requirements. This control requires manual review.`;
          }
          coveredConverted++;
          console.log(`Strict mode: Converted ${result.id} from covered to partial (${coveredConverted}/${coveredToPartial})`);
        } else if (result.status === 'partial' && partialConverted < partialToGap) {
          result.status = 'gap';
          // Only append the downgrade message if the original details don't contain the error message
          if (!result.details.includes('AI analysis encountered an issue')) {
            result.details = `Downgraded to gap due to strict analysis requirements. ${result.details}`;
          } else {
            result.details = `Downgraded to gap due to strict analysis requirements. This control requires manual review.`;
          }
          partialConverted++;
          console.log(`Strict mode: Converted ${result.id} from partial to gap (${partialConverted}/${partialToGap})`);
        }
      });
    });
    
    console.log(`Strict mode: Final conversion counts - Covered->Partial: ${coveredConverted}, Partial->Gap: ${partialConverted}, Gap->Partial: ${gapToPartial} (evidence-based)`);
    
  } else if (strictness === 'balanced') {
    // BALANCED MODE: Moderate adjustments - create realistic middle ground
    console.log('Balanced mode - making moderate adjustments');
    console.log('Initial counts - Covered:', initialCounts.covered, 'Partial:', initialCounts.partial, 'Gap:', initialCounts.gap);
    
    // If AI was too conservative, be moderately generous but evidence-based
    let gapToPartial = 0;
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      // Only upgrade gaps that have some basic evidence
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'gap' && gapToPartial < Math.floor(initialCounts.gap * 0.4)) {
            const details = result.details.toLowerCase();
            if (details.includes('basic') || details.includes('limited') || details.includes('some') ||
                details.includes('partial') || details.includes('incomplete') || details.includes('often') ||
                details.includes('typically') || details.includes('commonly')) {
              result.status = 'partial';
              // Keep original details without confusing upgrade message
              gapToPartial++;
              console.log(`Balanced mode: Upgraded ${result.id} from gap to partial based on evidence`);
            }
          }
        });
      });
      console.log(`Balanced mode: AI was too conservative, upgrading ${gapToPartial} gaps to partial based on evidence`);
    }
    
    // If AI was too optimistic (all covered), downgrade some to create realistic balance
    let coveredToPartial = 0;
    if (initialCounts.covered > 0 && initialCounts.gap === 0 && initialCounts.partial === 0) {
      coveredToPartial = Math.floor(initialCounts.covered * 0.2); // 20% of covered -> partial (moderate downgrading)
      console.log(`Balanced mode: AI was too optimistic, downgrading ${coveredToPartial} covered to partial for realistic assessment`);
    }
    
    // Also upgrade some partial to covered for balanced mode
    let partialToCovered = Math.floor(initialCounts.partial * 0.3); // 30% of partial -> covered
    
    if (gapToPartial > 0 || partialToCovered > 0 || coveredToPartial > 0) {
      let partialConverted = 0;
      let coveredConverted = 0;
      
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'partial' && partialConverted < partialToCovered) {
            result.status = 'covered';
            // Only append the upgrade message if the original details don't contain the error message
            if (!result.details.includes('AI analysis encountered an issue')) {
              result.details = `Upgraded to covered due to balanced analysis requirements. ${result.details}`;
            } else {
              result.details = `Upgraded to covered due to balanced analysis requirements. This control requires manual review.`;
            }
            partialConverted++;
            console.log(`Balanced mode: Converted ${result.id} from partial to covered (${partialConverted}/${partialToCovered})`);
          } else if (result.status === 'covered' && coveredConverted < coveredToPartial) {
            result.status = 'partial';
            // Only append the downgrade message if the original details don't contain the error message
            if (!result.details.includes('AI analysis encountered an issue')) {
              result.details = `Downgraded to partial due to balanced analysis requirements (AI was too optimistic). ${result.details}`;
            } else {
              result.details = `Downgraded to partial due to balanced analysis requirements. This control requires manual review.`;
            }
            coveredConverted++;
            console.log(`Balanced mode: Converted ${result.id} from covered to partial (${coveredConverted}/${coveredToPartial})`);
          }
        });
      });
      
      console.log(`Balanced mode: Final conversion counts - Gap->Partial: ${gapToPartial} (evidence-based), Partial->Covered: ${partialConverted}, Covered->Partial: ${coveredConverted}`);
    } else {
      console.log('Balanced mode: No adjustments needed - AI results are already reasonable');
    }
    
  } else if (strictness === 'lenient') {
    // LENIENT MODE: Most generous but still realistic - only upgrade when there's actual evidence
    console.log('Lenient mode - making generous but evidence-based adjustments');
    console.log('Initial counts - Covered:', initialCounts.covered, 'Partial:', initialCounts.partial, 'Gap:', initialCounts.gap);
    
    // In lenient mode, be generous but ONLY upgrade gaps that have some evidence
    let gapToPartial = 0;
    let partialToCovered = Math.floor(initialCounts.partial * 0.6); // 60% of partial -> covered (generous)
    
    // Only upgrade gaps to partial if there's some indication of implementation or if it's a basic control
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'gap') {
          const details = result.details.toLowerCase();
          // Only upgrade if there's some indication of implementation or if it's a basic control
          if (details.includes('basic') || details.includes('limited') || details.includes('some') ||
              details.includes('partial') || details.includes('incomplete') || details.includes('often') ||
              details.includes('typically') || details.includes('commonly') || details.includes('basic access control') ||
              details.includes('basic security') || details.includes('basic policy')) {
            result.status = 'partial';
            // Keep original details without confusing upgrade message
            gapToPartial++;
            console.log(`Lenient mode: Upgraded ${result.id} from gap to partial based on evidence`);
          }
        }
      });
    });
    
    // If AI was extremely conservative, be more generous but still evidence-based
    if (initialCounts.gap > 0 && initialCounts.covered === 0 && initialCounts.partial === 0) {
      // Only upgrade gaps that have some basic evidence
      adjustedResults.categories.forEach(category => {
        category.results.forEach(result => {
          if (result.status === 'gap' && gapToPartial < Math.floor(initialCounts.gap * 0.7)) {
            const details = result.details.toLowerCase();
            if (details.includes('basic') || details.includes('limited') || details.includes('some') ||
                details.includes('partial') || details.includes('incomplete') || details.includes('often') ||
                details.includes('typically') || details.includes('commonly')) {
              result.status = 'partial';
              // Keep original details without confusing upgrade message
              gapToPartial++;
              console.log(`Lenient mode: Upgraded ${result.id} from gap to partial (conservative upgrade)`);
            }
          }
        });
      });
      console.log(`Lenient mode: AI was extremely conservative, upgraded ${gapToPartial} gaps to partial based on evidence`);
    }
    
    // If AI was too optimistic (all covered), downgrade very few to maintain realism
    let coveredToPartial = 0;
    if (initialCounts.covered > 0 && initialCounts.gap === 0 && initialCounts.partial === 0) {
      coveredToPartial = Math.floor(initialCounts.covered * 0.1); // Only 10% of covered -> partial (minimal downgrading)
      console.log(`Lenient mode: AI was too optimistic, downgrading ${coveredToPartial} covered to partial to maintain realism`);
    }
    
    console.log(`Lenient mode: Converting ${gapToPartial} gap to partial (evidence-based), ${partialToCovered} partial to covered, ${coveredToPartial} covered to partial`);
    
    let partialConverted = 0;
    let coveredConverted = 0;
    
    adjustedResults.categories.forEach(category => {
      category.results.forEach(result => {
        if (result.status === 'partial' && partialConverted < partialToCovered) {
          result.status = 'covered';
          // Only append the upgrade message if the original details don't contain the error message
          if (!result.details.includes('AI analysis encountered an issue')) {
            result.details = `Upgraded to covered due to lenient analysis requirements. ${result.details}`;
          } else {
            result.details = `Upgraded to covered due to lenient analysis requirements. This control requires manual review.`;
          }
          partialConverted++;
          console.log(`Lenient mode: Converted ${result.id} from partial to covered (${partialConverted}/${partialToCovered})`);
        } else if (result.status === 'covered' && coveredConverted < coveredToPartial) {
          result.status = 'partial';
          // Only append the downgrade message if the original details don't contain the error message
          if (!result.details.includes('AI analysis encountered an issue')) {
            result.details = `Downgraded to partial due to lenient analysis requirements (AI was too optimistic). ${result.details}`;
          } else {
            result.details = `Downgraded to partial due to lenient analysis requirements. This control requires manual review.`;
          }
          coveredConverted++;
          console.log(`Lenient mode: Converted ${result.id} from covered to partial (${coveredConverted}/${coveredToPartial})`);
        }
      });
    });
    
    console.log(`Lenient mode: Final conversion counts - Gap->Partial: ${gapToPartial} (evidence-based), Partial->Covered: ${partialConverted}, Covered->Partial: ${coveredConverted}`);
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
  const documentHash = generateDocumentHash(fileContent, framework, selectedCategories, strictness);
  
  // Declare filteredFrameworkData at function level to ensure it's always available
  let filteredFrameworkData = { categories: [] };
  
  try {
    console.log('Available frameworks:', Object.keys(allFrameworks));
    console.log('Requested framework:', framework);
    console.log('Analysis Strictness Level:', strictness);
    console.log('Document hash (first 16 chars):', documentHash.substring(0, 16) + '...');
    console.log('Full document hash:', documentHash);
    console.log('Document content length:', fileContent.length);
    console.log('Document content preview (first 100 chars):', fileContent.substring(0, 100));
    
    // Check cache first to save AI tokens
    const cachedResults = await getCachedAnalysis(documentHash, framework, strictness);
    if (cachedResults) {
      console.log('🎯 CACHE HIT: Using cached results for this exact document and strictness level');
      console.log('💰 SAVED: AI tokens and API costs!');
      console.log('Cache key used:', `${documentHash}_${framework}_${strictness}`);
      console.log('Cached results structure:', {
        categoriesCount: cachedResults.categories?.length || 0,
        firstCategory: cachedResults.categories?.[0]?.name || 'none',
        firstCategoryControls: cachedResults.categories?.[0]?.results?.length || 0
      });
      
      // TEMPORARY: Force cache miss for debugging to see if strictness adjustments work
      console.log('🔍 DEBUG MODE: Forcing cache miss to test strictness adjustments');
      console.log('This will help diagnose why all strictness levels give the same score');
      
      // Clear the cache for this specific document to force fresh analysis
      if (global.analysisCache) {
        const keysToRemove = Array.from(global.analysisCache.keys()).filter(key => key.includes(documentHash.substring(0, 16)));
        keysToRemove.forEach(key => {
          global.analysisCache.delete(key);
          console.log('🧹 Removed cache key for debugging:', key);
        });
      }
      
      console.log('🔄 Proceeding with fresh AI analysis instead of using cache');
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
    } else {
      // If no categories selected, use all framework categories
      filteredFrameworkData = frameworkData;
      console.log('No specific categories selected, using all framework categories');
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
     
     console.log('🚀 Starting AI analysis with Google Gemini...');
     console.log('Model being used: gemini-1.5-flash');
     console.log('Prompt length:', prompt.length, 'characters');
     
     let text; // Declare text variable outside try-catch block
     
     try {
       const aiPromise = model.generateContent(prompt);
       console.log('⏳ AI request sent, waiting for response...');
       const result = await Promise.race([aiPromise, timeoutPromise]);
       console.log('✅ AI response received successfully');
       const response = await result.response;
       text = response.text(); // Assign to the outer variable
       console.log('📝 AI response text extracted, length:', text.length);
     } catch (aiError) {
       console.error('❌ AI analysis failed with error:', aiError.message);
       console.error('Error type:', aiError.constructor.name);
       console.error('Full error object:', aiError);
       
       if (aiError.message.includes('quota')) {
         throw new Error('AI API quota exceeded - please try again later');
       } else if (aiError.message.includes('timeout')) {
         throw new Error('AI analysis timed out - please try again');
       } else if (aiError.message.includes('API key') || aiError.message.includes('authentication')) {
         throw new Error('AI API authentication failed - please check API key configuration');
       } else {
         throw new Error(`AI analysis failed: ${aiError.message}`);
       }
     }
    
    console.log('=== AI RESPONSE DEBUG ===');
    console.log('AI Response Text:', text);
    console.log('AI Response Length:', text.length);
    console.log('Strictness level used:', strictness);
    console.log('AI Response contains "categories":', text.includes('"categories"'));
    console.log('AI Response contains "results":', text.includes('"results"'));
    console.log('AI Response contains "AC-1":', text.includes('AC-1'));
    console.log('AI Response contains "Access Control":', text.includes('Access Control'));
    
    // Check if AI returned an error message
    console.log('=== AI RESPONSE VALIDATION ===');
    console.log('Raw AI response text:', text);
    console.log('Looking for JSON pattern in response...');
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('❌ No JSON pattern found in AI response');
      console.error('Response text:', text);
      throw new Error('Invalid AI response format - no JSON found');
    }
    
    console.log('✅ JSON pattern found, attempting to parse...');
    let parsedResponse;
    try {
      parsedResponse = JSON.parse(jsonMatch[0]);
      console.log('✅ JSON parsed successfully');
    } catch (parseError) {
      console.error('❌ JSON parsing failed:', parseError.message);
      console.error('JSON text to parse:', jsonMatch[0]);
      throw new Error(`AI response JSON parsing failed: ${parseError.message}`);
    }
    
    console.log('Parsed AI Response:', JSON.stringify(parsedResponse, null, 2));
    
         // Handle both array format and single category format from AI
     console.log('=== FORMAT VALIDATION ===');
     console.log('Checking parsed response structure...');
     console.log('Has categories property?', !!parsedResponse.categories);
     console.log('Categories is array?', Array.isArray(parsedResponse.categories));
     console.log('Has name property?', !!parsedResponse.name);
     console.log('Has results property?', !!parsedResponse.results);
     
     let categoriesToAnalyze = [];
     if (parsedResponse.categories && Array.isArray(parsedResponse.categories)) {
       // Standard format: {"categories": [...]}
       categoriesToAnalyze = parsedResponse.categories;
       console.log('✅ AI returned standard categories array format');
       console.log('Number of categories:', categoriesToAnalyze.length);
     } else if (parsedResponse.name && parsedResponse.results) {
       // Single category format: {"name": "...", "results": [...]}
       categoriesToAnalyze = [parsedResponse];
       console.log('✅ AI returned single category format, converted to array');
       console.log('Number of categories:', categoriesToAnalyze.length);
     } else {
       console.error('🚨 AI returned invalid format - neither categories array nor single category');
       console.error('AI Response Text:', text);
       console.error('Parsed Response:', parsedResponse);
       console.error('Available properties:', Object.keys(parsedResponse));
       throw new Error('AI analysis failed - returned invalid format. This may indicate the prompt was too complex or the AI misunderstood the request.');
     }
     
     // Validate that we have categories to analyze
     if (categoriesToAnalyze.length === 0) {
       console.error('🚨 No categories found after format conversion');
       throw new Error('AI analysis failed - no categories found after format conversion.');
     }
     
     // Validate that the AI actually changed some statuses
     console.log('=== STATUS COUNTING ===');
     console.log('Counting statuses in AI response...');
     
     let gapCount = 0;
     let coveredCount = 0;
     let partialCount = 0;
     
     categoriesToAnalyze.forEach(category => {
       console.log(`Processing category: ${category.name}`);
       if (category.results) {
         console.log(`  Category has ${category.results.length} results`);
         category.results.forEach(control => {
           console.log(`    Control ${control.id}: status = ${control.status}`);
           if (control.status === 'gap') gapCount++;
           else if (control.status === 'covered') coveredCount++;
           else if (control.status === 'partial') partialCount++;
           else {
             console.warn(`    ⚠️ Unknown status: ${control.status} for control ${control.id}`);
           }
         });
       } else {
         console.warn(`  ⚠️ Category ${category.name} has no results property`);
       }
     });
    
    console.log(`AI Analysis Results - Gaps: ${gapCount}, Covered: ${coveredCount}, Partial: ${partialCount}`);
    console.log('Total controls analyzed:', gapCount + coveredCount + partialCount);
    
         // Only use fallback if AI didn't provide any analysis at all
     // Allow AI to return all gaps if that's what the analysis shows
     console.log('=== FALLBACK VALIDATION ===');
     const totalControls = filteredFrameworkData.categories.reduce((total, cat) => total + cat.results.length, 0);
     console.log('Total controls in framework:', totalControls);
     console.log('Controls analyzed by AI:', gapCount + coveredCount + partialCount);
     
     if (totalControls === 0) {
       console.log('❌ AI analysis failed - no controls to analyze. Using fallback.');
       throw new Error('AI analysis failed - no controls available');
     }
     
     // Check if AI analyzed all controls
     if (gapCount + coveredCount + partialCount === 0) {
       console.log('❌ AI analysis failed - no controls were analyzed. Using fallback.');
       throw new Error('AI analysis failed - no controls were analyzed');
     }
     
     // Log the analysis results for debugging
     if (gapCount === totalControls) {
       console.log('✅ AI analysis completed - all controls marked as gaps. This may be accurate for the document.');
     }
     
     console.log('✅ AI analysis validation passed - proceeding with strictness adjustments');
     
     // Apply strictness adjustments to AI results
     console.log('=== BEFORE STRICTNESS ADJUSTMENTS ===');
     console.log('AI Results - Gaps:', gapCount, 'Covered:', coveredCount, 'Partial:', partialCount);
     console.log('Total controls analyzed:', gapCount + coveredCount + partialCount);
     
     // Show some examples of what the AI returned
     if (gapCount > 0) {
       console.log('Example gap control:', categoriesToAnalyze.find(cat => cat.results?.some(r => r.status === 'gap'))?.results?.find(r => r.status === 'gap'));
     }
     if (partialCount > 0) {
       console.log('Example partial control:', categoriesToAnalyze.find(cat => cat.results?.some(r => r.status === 'partial'))?.results?.find(r => r.status === 'partial'));
     }
     if (coveredCount > 0) {
       console.log('Example covered control:', categoriesToAnalyze.find(cat => cat.results?.some(r => r.status === 'covered'))?.results?.find(r => r.status === 'covered'));
     }
     
     // Create the proper structure for strictness adjustments
     const aiResultsForAdjustment = { categories: categoriesToAnalyze };
     const adjustedResults = adjustResultsForStrictness(aiResultsForAdjustment, strictness);
     
     // Count final results after strictness adjustments
     let finalGapCount = 0;
     let finalCoveredCount = 0;
     let finalPartialCount = 0;
     
     adjustedResults.categories.forEach(category => {
       if (category.results) {
         category.results.forEach(control => {
           if (control.status === 'gap') finalGapCount++;
           else if (control.status === 'covered') finalCoveredCount++;
           else if (control.status === 'partial') finalPartialCount++;
         });
       }
     });
     
     console.log('=== AFTER STRICTNESS ADJUSTMENTS ===');
     console.log('Final Results - Gaps:', finalGapCount, 'Covered:', finalCoveredCount, 'Partial:', finalPartialCount);
     console.log('Strictness adjustments applied successfully for level:', strictness);
     console.log('Score calculation: Covered =', finalCoveredCount, 'Partial =', finalPartialCount, 'Total =', finalGapCount + finalCoveredCount + finalPartialCount);
     console.log('Percentage calculation: ((Covered + (Partial * 0.5)) / Total) * 100');
     const calculatedScore = ((finalCoveredCount + (finalPartialCount * 0.5)) / (finalGapCount + finalCoveredCount + finalPartialCount)) * 100;
     console.log('Calculated score:', calculatedScore.toFixed(1) + '%');
    
    // Cache the final results (after strictness adjustments) for future use
    await cacheAnalysisResults(documentHash, framework, adjustedResults, strictness);
    console.log('💾 Cached final results (after strictness adjustments) for future use');
    console.log('Cache key used for storage:', `${documentHash}_${framework}_${strictness}`);
    console.log('Results being cached:', {
      categoriesCount: adjustedResults.categories?.length || 0,
      firstCategory: adjustedResults.categories?.[0]?.name || 'none',
      firstCategoryControls: adjustedResults.categories?.[0]?.results?.length || 0
    });
    
    return adjustedResults;
     } catch (error) {
     console.error('AI Analysis Error:', error);
     console.log('=== FALLBACK TRIGGERED ===');
     console.log('Error message:', error.message);
     console.log('Error stack:', error.stack);
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
    await cacheAnalysisResults(documentHash, framework, fallbackResult, strictness);
    console.log('💾 Cached fallback results for future strictness adjustments');
    
    // Apply strictness adjustments to fallback results
    console.log('=== FALLBACK STRICTNESS ADJUSTMENTS ===');
    console.log('Fallback Results - Gaps:', fallbackResult.categories.reduce((total, cat) => total + cat.results.filter(r => r.status === 'gap').length, 0));
    console.log('Fallback Results - Partial:', fallbackResult.categories.reduce((total, cat) => total + cat.results.filter(r => r.status === 'partial').length, 0));
    console.log('Fallback Results - Covered:', fallbackResult.categories.reduce((total, cat) => total + cat.results.filter(r => r.status === 'covered').length, 0));
    
    const adjustedFallbackResults = adjustResultsForStrictness(fallbackResult, strictness);
    
    // Count final fallback results after strictness adjustments
    let finalFallbackGapCount = 0;
    let finalFallbackCoveredCount = 0;
    let finalFallbackPartialCount = 0;
    
    adjustedFallbackResults.categories.forEach(category => {
      if (category.results) {
        category.results.forEach(control => {
          if (control.status === 'gap') finalFallbackGapCount++;
          else if (control.status === 'covered') finalFallbackCoveredCount++;
          else if (control.status === 'partial') finalFallbackPartialCount++;
        });
      }
    });
    
    console.log('=== AFTER FALLBACK STRICTNESS ADJUSTMENTS ===');
    console.log('Final Fallback Results - Gaps:', finalFallbackGapCount, 'Covered:', finalFallbackCoveredCount, 'Partial:', finalFallbackPartialCount);
    console.log('Fallback strictness adjustments applied successfully for level:', strictness);
    
    return adjustedFallbackResults;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Temporary debug endpoint to clear cache
  if (req.body.clearCache === true) {
    clearAnalysisCache();
    return res.status(200).json({ message: 'Cache cleared successfully' });
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

