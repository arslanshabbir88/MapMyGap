const { GoogleGenerativeAI } = require('@google/generative-ai');

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

// Hybrid analysis function - uses predefined controls + AI analysis
async function analyzeWithAI(fileContent, framework) {
  try {
    console.log('Available frameworks:', Object.keys(allFrameworks));
    console.log('Requested framework:', framework);
    
    // Get predefined control structure for the framework
    const frameworkData = allFrameworks[framework];
    
    if (!frameworkData) {
      throw new Error(`Framework ${framework} not supported. Available frameworks: ${Object.keys(allFrameworks).join(', ')}`);
    }
    
    console.log('Framework data found:', frameworkData.name);
    console.log('Number of categories:', frameworkData.categories.length);

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

IMPORTANT: You MUST use the EXACT control structure provided below. Do not create new controls or modify the control IDs, names, or descriptions.

EXACT CONTROL STRUCTURE TO USE:
${JSON.stringify(frameworkData.categories, null, 2)}

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

Return only valid JSON, no additional text or formatting.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    console.log('AI Response Text:', text);
    
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
    
    // If AI didn't change any statuses, use fallback
    if (gapCount === frameworkData.categories.reduce((total, cat) => total + cat.results.length, 0)) {
      console.log('AI did not change any statuses, using fallback');
      throw new Error('AI analysis did not provide meaningful status updates');
    }
    
    return parsedResponse;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    console.log('Falling back to predefined control structure');
    
    // Fallback to predefined control structure with default "gap" status
    const fallbackResult = {
      categories: frameworkData.categories.map(category => ({
        name: category.name,
        description: category.description,
        results: category.results.map(control => ({
          id: control.id,
          control: control.control,
          status: "gap",
          details: "AI analysis failed. Default status assigned. Please review manually.",
          recommendation: control.recommendation
        }))
      }))
    };
    
    return fallbackResult;
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { fileContent, framework } = req.body;

    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing file content or framework.' });
    }

    // Use real AI analysis
    const analysisResult = await analyzeWithAI(fileContent, framework);

    // Return in the expected format
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
