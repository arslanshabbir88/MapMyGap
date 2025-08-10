// Use the 'require' syntax for Node.js compatibility on Vercel.
const multer = require('multer');
const pdf = require('pdf-parse');
const mammoth = require('mammoth');
const fetch = require('node-fetch');

// Configure multer for memory storage.
const upload = multer({ storage: multer.memoryStorage() });

// Vercel needs this config to correctly handle file uploads.
export const config = {
  api: {
    bodyParser: false,
  },
};

// This is the main serverless function.
export default async function handler(req, res) {
  // Use a Promise to handle the multer middleware.
  await new Promise((resolve, reject) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });

  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    let fileContent = '';
    const { buffer, mimetype } = req.file;

    // Process the file based on its type.
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
    const frameworkOptions = JSON.parse(req.body.frameworkOptions);
    const frameworkSourceData = JSON.parse(req.body.frameworkSourceData);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'API key not configured on server.' });
    }

    // Construct the prompt for the Gemini API.
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
