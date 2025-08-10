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

// This is the main serverless function.
const handler = async (req, res) => {
  console.log("Function execution started.");
  try {
    await runMiddleware(req, res, upload.single('file'));
    console.log("Multer middleware finished.");

    if (!req.file) {
      console.log("Error: No file uploaded.");
      return res.status(400).json({ error: 'No file uploaded.' });
    }
    console.log(`File received: ${req.file.originalname}, type: ${req.file.mimetype}`);

    let fileContent = '';
    const { buffer, mimetype } = req.file;

    if (mimetype === 'application/pdf') {
      console.log("Parsing PDF...");
      const data = await pdf(buffer);
      fileContent = data.text;
    } else if (mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      console.log("Parsing DOCX...");
      const { value } = await mammoth.extractRawText({ buffer });
      fileContent = value;
    } else if (mimetype === 'text/plain') {
      console.log("Parsing TXT...");
      fileContent = buffer.toString('utf8');
    } else {
      console.log(`Error: Unsupported file type: ${mimetype}`);
      return res.status(400).json({ error: 'Unsupported file type.' });
    }
    console.log("File parsed successfully.");

    const { framework } = req.body;
    const frameworkOptions = JSON.parse(req.body.frameworkOptions);
    const frameworkSourceData = JSON.parse(req.body.frameworkSourceData);

    const apiKey = process.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
      console.log("Error: API key not configured on server.");
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

    console.log("Calling Gemini API...");
    let chatHistory = [{ role: "user", parts: [{ text: prompt }] }];
    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
    
    const geminiResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    console.log(`Gemini API response status: ${geminiResponse.status}`);
    if (!geminiResponse.ok) {
      const errorData = await geminiResponse.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData?.error?.message || 'API request failed');
    }

    const result = await geminiResponse.json();
    console.log("Successfully received response from Gemini API.");
    
    res.status(200).json(result);

  } catch (error) {
    console.error('Error in handler:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};

// Vercel needs this config to correctly handle file uploads.
const config = {
  api: {
    bodyParser: false,
  },
};

// Export both the handler and the config using CommonJS syntax.
module.exports = handler;
module.exports.config = config;
