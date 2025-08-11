import formidable from 'formidable';
import fs from 'fs';
import mammoth from 'mammoth';
import pdf from 'pdf-parse';
import xlsx from 'xlsx';

async function readTxt(filePath) {
  return fs.promises.readFile(filePath, 'utf8');
}

async function readDocx(filePath) {
  const { value } = await mammoth.extractRawText({ path: filePath });
  return value || '';
}

async function readPdf(filePath) {
  const data = await pdf(fs.readFileSync(filePath));
  return data.text || '';
}

async function readXlsx(filePath) {
  const wb = xlsx.readFile(filePath);
  let out = [];
  wb.SheetNames.forEach((name) => {
    const ws = wb.Sheets[name];
    const csv = xlsx.utils.sheet_to_csv(ws);
    out.push(`# ${name}\n${csv}`);
  });
  return out.join('\n\n');
}

function getExt(filename) {
  return (filename?.split('.').pop() || '').toLowerCase();
}

async function analyzeWithAIOrFallback(fileContent, framework) {
  // Same data as in api/analyze.js
  const frameworkOptions = [
    { id: 'NIST_CSF', name: 'NIST Cybersecurity Framework (CSF) v2.0' },
    { id: 'NIST_800_53', name: 'NIST SP 800-53 Rev. 5' },
  ];

  const frameworkSourceData = {
    NIST_CSF: {
      categories: [
        { name: 'Govern (GV)', description: 'Establish and monitor the organization\'s cybersecurity risk management strategy, expectations, and policy.', results: [ { id: 'GV.RM-01', control: 'An organizational risk management strategy is established.'}, { id: 'GV.SC-04', control: 'Cybersecurity is integrated into the organization\'s enterprise risk management portfolio.'}, ]},
        { name: 'Identify (ID)', description: 'Understand the current assets, risks, and responsibilities.', results: [ { id: 'ID.AM-1', control: 'Physical devices and systems within the organization are inventoried.'}, { id: 'ID.RA-1', control: 'Asset vulnerabilities are identified and documented.'}, { id: 'ID.RA-5', control: 'Threats, both internal and external, are identified and documented.'}, ]},
        { name: 'Protect (PR)', description: 'Implement safeguards to ensure delivery of critical services.', results: [ { id: 'PR.AC-4', control: 'Access permissions and authorizations are managed, incorporating the principles of least privilege and separation of duties.'}, { id: 'PR.AC-5', control: 'Identity and access are verified for all users, devices, and other assets.'}, { id: 'PR.DS-2', control: 'Data-in-transit is protected.'}, ]},
        { name: 'Detect (DE)', description: 'Discover and analyze cybersecurity events.', results: [ { id: 'DE.CM-1', control: 'Networks and systems are monitored to detect potential cybersecurity events.'}, { id: 'DE.AE-2', control: 'The impact of events is analyzed.'}, ]},
        { name: 'Respond (RS)', description: 'Take action regarding a detected cybersecurity incident.', results: [ { id: 'RS.RP-1', control: 'A response plan is executed.'}, { id: 'RS.CO-2', control: 'Incidents are reported to appropriate internal and external stakeholders.'}, ]},
        { name: 'Recover (RC)', description: 'Restore assets and operations affected by a cybersecurity incident.', results: [ { id: 'RC.RP-1', control: 'A recovery plan is executed.'}, { id: 'RC.IM-2', control: 'Recovery plans incorporate lessons learned.'}, ]},
      ]
    },
    NIST_800_53: {
      categories: [
        { name: 'Access Control (AC)', description: 'Limit system access to authorized users, processes acting on behalf of users, or devices.', results: [ { id: 'AC-1', control: 'Access Control Policy and Procedures'}, { id: 'AC-2', control: 'Account Management'}, { id: 'AC-3', control: 'Access Enforcement'}, { id: 'AC-4', control: 'Information Flow Enforcement'} ]},
        { name: 'Awareness and Training (AT)', description: 'Ensure that managers and users of organizational systems are made aware of the security risks.', results: [ { id: 'AT-1', control: 'Awareness and Training Policy and Procedures'}, { id: 'AT-2', control: 'Security Awareness Training'} ]},
        { name: 'Configuration Management (CM)', description: 'Establish and maintain baseline configurations and inventories of organizational systems.', results: [ { id: 'CM-1', control: 'Configuration Management Policy and Procedures'}, { id: 'CM-2', control: 'Baseline Configuration'}, { id: 'CM-8', control: 'System Component Inventory'} ]},
        { name: 'Contingency Planning (CP)', description: 'Establish, maintain, and effectively implement a contingency plan for the system.', results: [ { id: 'CP-1', control: 'Contingency Planning Policy and Procedures'}, { id: 'CP-2', control: 'Contingency Plan'} ]},
        { name: 'Identification and Authentication (IA)', description: 'Identify and authenticate organizational users (or processes acting on behalf of users).', results: [ { id: 'IA-1', control: 'Identification and Authentication Policy and Procedures'}, { id: 'IA-2', control: 'Identification and Authentication (Organizational Users)'} ]},
        { name: 'Incident Response (IR)', description: 'Establish an operational incident handling capability for organizational systems.', results: [ { id: 'IR-1', control: 'Incident Response Policy and Procedures'}, { id: 'IR-8', control: 'Incident Response Plan'} ]},
        { name: 'Risk Assessment (RA)', description: 'Periodically assess the risk to organizational operations, assets, and individuals.', results: [ { id: 'RA-1', control: 'Risk Assessment Policy and Procedures'}, { id: 'RA-3', control: 'Risk Assessment'} ]},
        { name: 'System and Information Integrity (SI)', description: 'Protect the integrity of information and systems.', results: [ { id: 'SI-1', control: 'System and Information Integrity Policy and Procedures'}, { id: 'SI-2', control: 'Flaw Remediation'}, { id: 'SI-4', control: 'Information System Monitoring'} ]},
      ]
    },
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    // Fallback analysis (same structure as in api/analyze.js)
    const analyzedCategories = frameworkSourceData[framework].categories.map(category => ({
      ...category,
      results: category.results.map(result => {
        const hasRelevantContent = fileContent.toLowerCase().includes(result.control.toLowerCase().split(' ').slice(0, 3).join(' '));
        const hasPartialContent = fileContent.toLowerCase().includes(result.control.toLowerCase().split(' ').slice(0, 2).join(' '));
        let status, details, recommendation;
        if (hasRelevantContent) {
          status = 'covered';
          details = 'This control appears to be adequately addressed in your document.';
          recommendation = 'Continue maintaining current practices for this control.';
        } else if (hasPartialContent) {
          status = 'partial';
          details = 'This control is partially addressed but may need additional coverage.';
          recommendation = 'Consider expanding your documentation to fully cover this control requirement.';
        } else {
          status = 'gap';
          details = 'This control is not addressed in your current document.';
          recommendation = 'Develop and implement policies and procedures to address this control requirement.';
        }
        return { ...result, status, details, recommendation };
      })
    }));
    return { candidates: [{ content: { parts: [{ text: JSON.stringify(analyzedCategories, null, 2) }] } }] };
  }

  const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('AI API request timed out')), 12000));

  const prompt = `
    You are a professional cybersecurity compliance analyst. Your task is to perform a gap analysis.
    Here is the organization's internal standards document:
    --- DOCUMENT START ---
    ${fileContent.substring(0, 100000)} 
    --- DOCUMENT END ---
    Here is a set of controls from the ${frameworkOptions.find(f => f.id === framework).name} in JSON format. 
    For each control, analyze the provided document to determine if it is "covered", "partial", or a "gap".
    You MUST return a JSON object. This JSON object should be an array of categories, exactly matching the structure of the input JSON, but with the 'status', 'details', and 'recommendation' fields filled in for every single control.
    Here is the JSON structure you need to analyze and complete:
    ${JSON.stringify(frameworkSourceData[framework].categories, null, 2)}
    Return ONLY the completed JSON object.
  `;

  const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

  const response = await Promise.race([
    fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
    timeoutPromise,
  ]);

  if (!response.ok) {
    throw new Error('AI request failed');
  }
  return await response.json();
}

export default async function handler(req, res) {
  // Configure formidable to write to /tmp in Vercel
  const form = formidable({ multiples: false, keepExtensions: true, uploadDir: '/tmp' });

  try {
    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => (err ? reject(err) : resolve({ fields, files })));
    });

    const frameworkRaw = fields.framework;
    const framework = Array.isArray(frameworkRaw) ? frameworkRaw[0] : frameworkRaw;

    const file = files.file;
    const uploaded = Array.isArray(file) ? file[0] : file;
    if (!uploaded || !uploaded.filepath) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const ext = getExt(uploaded.originalFilename || uploaded.newFilename || uploaded.filepath);
    let extractedText = '';
    if (ext === 'txt') extractedText = await readTxt(uploaded.filepath);
    else if (ext === 'docx') extractedText = await readDocx(uploaded.filepath);
    else if (ext === 'pdf') extractedText = await readPdf(uploaded.filepath);
    else if (ext === 'xlsx' || ext === 'xls') extractedText = await readXlsx(uploaded.filepath);
    else return res.status(400).json({ error: 'Unsupported file type' });

    let analysisJson;
    try {
      analysisJson = await analyzeWithAIOrFallback(extractedText, framework);
    } catch (e) {
      // If AI fails, produce fallback here
      analysisJson = await analyzeWithAIOrFallback(extractedText, framework);
    }

    return res.status(200).json({ ...analysisJson, extractedText });
  } catch (e) {
    console.error('upload-analyze error:', e);
    return res.status(500).json({ error: 'Server error' });
  } finally {
    // Best-effort cleanup
    // Formidable stores in /tmp; Vercel will clean automatically, but we can unlink if needed
  }
}
