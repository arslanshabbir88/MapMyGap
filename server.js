const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
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

// Real AI analysis function
async function analyzeWithAI(fileContent, framework) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a cybersecurity compliance expert. Analyze the following document content against the ${framework} framework.

Document Content:
${fileContent.substring(0, 8000)} // Limit content to avoid token limits

Please provide a comprehensive compliance analysis in the following JSON format:
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
          "details": "Detailed analysis of compliance status",
          "recommendation": "Specific recommendation to achieve compliance"
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

Return only valid JSON, no additional text.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid AI response format');
    }
    
    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('AI Analysis Error:', error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
}

// Real API endpoint for AI analysis
app.post('/analyze', async (req, res) => {
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
});

// File upload endpoint with real AI analysis
app.post('/upload-analyze', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded.' });
    }

    const { framework } = req.body;
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
        // For now, use a placeholder. We'll implement real DOCX parsing next
        extractedText = `[DOCX Document: ${fileName}] This is a placeholder. Real DOCX parsing will be implemented next.`;
        break;
      case '.pdf':
        // For now, use a placeholder. We'll implement real PDF parsing next
        extractedText = `[PDF Document: ${fileName}] This is a placeholder. Real PDF parsing will be implemented next.`;
        break;
      case '.xlsx':
      case '.xls':
        // For now, use a placeholder. We'll implement real Excel parsing next
        extractedText = `[Excel Document: ${fileName}] This is a placeholder. Real Excel parsing will be implemented next.`;
        break;
      default:
        return res.status(400).json({ error: 'Unsupported file type.' });
    }

    // Use real AI analysis on extracted text
    const analysisResult = await analyzeWithAI(extractedText, framework);

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
app.post('/generate-control-text', async (req, res) => {
  try {
    const { fileContent, controlId, controlText, status, details } = req.body;

    if (!controlText || !status) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a cybersecurity compliance expert. Generate a comprehensive policy text for the following control:

Control ID: ${controlId}
Control: ${controlText}
Current Status: ${status}
Gap Details: ${details}

Please generate a detailed, professional policy text that:
1. Addresses the specific control requirement
2. Is written in clear, actionable language
3. Includes implementation guidance
4. Follows industry best practices
5. Is suitable for organizational policy documents

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
