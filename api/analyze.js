// Use the 'require' syntax for Node.js compatibility on Vercel.
const multer = require('multer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fetch = require('node-fetch');

// Configure multer for memory storage.
const upload = multer({ storage: multer.memoryStorage() });

// Helper function to run multer middleware.
const runMiddleware = (req, res, fn) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

// This is the main serverless function, exported using module.exports.
const handler = async (req, res) => {
  // --- Framework data is now stored on the backend ---
  const frameworkOptions = [
    { id: 'NIST_CSF', name: 'NIST Cybersecurity Framework (CSF) v2.0' },
    { id: 'NIST_800_53', name: 'NIST SP 800-53 Rev. 5' },
  ];
  
  const frameworkSourceData = {
    NIST_CSF: {
        categories: [
            { name: 'Govern (GV)', description: 'Establish and monitor the organization’s cybersecurity risk management strategy, expectations, and policy.', results: [ { id: 'GV.RM-01', control: 'An organizational risk management strategy is established.'}, { id: 'GV.SC-04', control: 'Cybersecurity is integrated into the organization’s enterprise risk management portfolio.'}, ]},
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

  try {
    await runMiddleware(req, res, upload.single('file'));

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    let fileContent = '';
    const { buffer, mimetype } = req.file;

    if (mimetype === 'application/pdf') {
      const data = await pdf(buffer);
      fileContent = data.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      const { value } = await mammoth.extractRawText({ buffer });
      fileContent = value;
    } else if (mimetype === 'text/plain') {
      fileContent = buffer.toString('utf8');
    } else {
      return res.status(400).json({ error: 'Unsupported file type.' });
    }

    const { framework } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server.' });
    }

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

    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      throw new Error(errorData?.error?.message || 'API request failed');
    }

    const result = await geminiResponse.json();
    
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in /api/analyze:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Vercel needs this config to correctly handle file uploads.
module.exports.config = {
  api: {
    bodyParser: false,
  },
};
