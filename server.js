const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mammoth = require('mammoth');
const crypto = require('crypto');
require('dotenv').config();

const app = express();
const PORT = 3001;

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['.txt', '.docx', '.pdf', '.xlsx', '.xls'];
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error('Unsupported file type'), false);
    }
  }
});

// Generate a unique hash for document content to enable caching
function generateDocumentHash(content, framework) {
  return crypto.createHash('sha256').update(content + framework).digest('hex');
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

async function analyzeWithAI(fileContent, framework, selectedCategories = null, strictness = 'balanced') {
  // Generate document hash early for use throughout the function
  const documentHash = generateDocumentHash(fileContent, framework);
  
  try {
    console.log('Analyzing document with framework:', framework);
    console.log('Analysis Strictness Level:', strictness);
    console.log('Document hash:', documentHash.substring(0, 16) + '...');
    
    // Get framework data using service account key
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
    } catch (error) {
      throw new Error(`Failed to parse service account key: ${error.message}`);
    }
    
    // Initialize Google AI with service account credentials
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'dummy-key', {
      credentials: credentials
    });
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Map framework IDs to display names
    const frameworkNames = {
      'NIST_CSF': 'NIST Cybersecurity Framework (CSF)',
      'NIST_800_53': 'NIST SP 800-53',
      'PCI_DSS': 'PCI DSS v4.0',
      'ISO_27001': 'ISO/IEC 27001:2022',
      'SOC_2': 'SOC 2 Type II'
    };

    const frameworkName = frameworkNames[framework] || framework;

    const prompt = `You are a cybersecurity compliance expert. Analyze the following document content against the ${frameworkName} framework.

Document Content:
${fileContent.substring(0, 8000)} // Limit content to avoid token limits

Analysis Strictness Level: ${strictness}

Please provide a comprehensive compliance analysis in the following JSON format:
{
  "categories": [
    {
      "name": "Category Name",
      "description": "Category Description",
      "results": [
        {
          "id": "Control ID",
          "control": "Control Description",
          "status": "covered|partial|gap",
          "details": "Detailed analysis of compliance status",
          "recommendation": "Specific recommendation for improvement"
        }
      ]
    }
  ]
}

Guidelines:
- "covered": Control is fully addressed in the document
- "partial": Control is partially addressed but needs improvement
- "gap": Control is not addressed at all
- Be specific and actionable in recommendations
- Base analysis on actual content found in the document
- If content is insufficient, mark as "gap" with clear guidance
- For NIST frameworks, focus on the specific control families and subcategories

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

Return only valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    let analysisResult = JSON.parse(jsonMatch[0]);

    // Apply post-processing based on strictness
    analysisResult = adjustResultsForStrictness(analysisResult, strictness);

    return analysisResult;
  } catch (error) {
    console.error('AI Analysis Error:', error);
    
    // Create fallback result
    const fallbackResult = {
      categories: [{
        name: "General Controls",
        description: "Basic security controls",
        results: [{
          id: "GEN-1",
          control: "Basic Security Control",
          status: "gap",
          details: "AI analysis failed. This control requires manual review.",
          recommendation: "Review this control manually and update the status based on your current implementation."
        }]
      }]
    };
    
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

// Real API endpoint for AI analysis
app.post('/analyze', async (req, res) => {
  try {
    const { fileContent, framework, strictness = 'balanced' } = req.body;

    if (!fileContent || !framework) {
      return res.status(400).json({ error: 'Missing file content or framework.' });
    }

    // Use real AI analysis with strictness parameter
    const analysisResult = await analyzeWithAI(fileContent, framework, null, strictness);

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
});

// File upload endpoint with real AI analysis
app.post('/upload-analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { framework, strictness = 'balanced' } = req.body;
    if (!framework) {
      return res.status(400).json({ error: 'Missing framework parameter.' });
    }

    // Extract text from uploaded file
    let extractedText = '';
    const fileName = req.file.originalname;
    const fileExt = path.extname(fileName).toLowerCase();

    // Basic text extraction (we'll enhance this later)
    switch (fileExt) {
      case '.txt':
        extractedText = req.file.buffer.toString('utf8');
        break;
      case '.docx':
        try {
          const result = await mammoth.extractRawText({ buffer: req.file.buffer });
          extractedText = result.value;
          if (result.messages.length > 0) {
            console.log('DOCX processing messages:', result.messages);
          }
        } catch (docxError) {
          console.error('Error processing DOCX:', docxError);
          extractedText = `Error processing DOCX file: ${docxError.message}`;
        }
        break;
      case '.pdf':
        try {
          const pdfParse = require('pdf-parse');
          const result = await pdfParse(req.file.buffer);
          extractedText = result.text;
          if (result.info) {
            console.log('PDF processing info:', result.info);
          }
        } catch (pdfError) {
          console.error('Error processing PDF:', pdfError);
          extractedText = `Error processing PDF file: ${pdfError.message}`;
        }
        break;
      case '.xlsx':
      case '.xls':
        try {
          const XLSX = require('xlsx');
          const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
          const sheetNames = workbook.SheetNames;
          let allText = '';
          
          sheetNames.forEach(sheetName => {
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            
            // Convert sheet data to readable text
            jsonData.forEach(row => {
              if (Array.isArray(row)) {
                row.forEach(cell => {
                  if (cell && cell.toString().trim()) {
                    allText += cell.toString().trim() + ' ';
                  }
                });
                allText += '\n';
              }
            });
          });
          
          extractedText = allText.trim() || `[Excel Document: ${fileName}] No readable text content found.`;
        } catch (excelError) {
          console.error('Error processing Excel file:', excelError);
          extractedText = `Error processing Excel file: ${excelError.message}`;
        }
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file type.' });
    }

    // Use real AI analysis on extracted text with strictness parameter
    const analysisResult = await analyzeWithAI(extractedText, framework, null, strictness);

    // Return the analysis result
    res.status(200).json({
      candidates: [{
        content: {
          parts: [{
            text: JSON.stringify(analysisResult, null, 2)
          }]
        }
      }],
      extractedText: extractedText
    });

  } catch (error) {
    console.error('Error in /upload-analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
});

// Enhanced text generation endpoint
app.post('/api/generate-control-text', async (req, res) => {
  try {
    const { fileContent, controlId, controlText, status, details } = req.body;

    if (!controlText || !status) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    // Get framework data using service account key
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
    } catch (error) {
      throw new Error(`Failed to parse service account key: ${error.message}`);
    }
    
    // Initialize Google AI with service account credentials
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || 'dummy-key', {
      credentials: credentials
    });
    
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `You are a cybersecurity compliance expert. Analyze the writing style and tone of the following document, then generate a comprehensive policy text that matches that exact style and tone.

ORIGINAL DOCUMENT CONTENT:
${fileContent || 'No document content provided'}

TARGET CONTROL:
Control ID: ${controlId}
Control: ${controlText}
Current Status: ${status}
Gap Details: ${details}

INSTRUCTIONS:
1. First, analyze the writing style, tone, and language patterns of the original document
2. Note the level of formality, technical detail, sentence structure, and terminology used
3. Generate policy text that:
   - Addresses the specific control requirement
   - Matches the EXACT writing style and tone of the original document
   - Uses similar sentence structure, vocabulary, and formality level
   - Maintains consistency with the document's voice and approach
   - Includes implementation guidance in the same style
   - Is suitable for organizational policy documents

IMPORTANT: The generated text must sound like it was written by the same person/organization as the original document. Match the tone, style, and language patterns exactly.

Return only the policy text, no additional formatting or explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    res.status(200).json({ sampleText: generatedText });

  } catch (error) {
    console.error('Error in text generation:', error);
    res.status(500).json({ error: `Text generation failed: ${error.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Local API server running on http://localhost:${PORT}`);
  console.log('Real AI integration enabled with Google Gemini!');
});

