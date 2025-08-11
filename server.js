const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const mammoth = require('mammoth');
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
- For NIST frameworks, focus on the specific control families and subcategories

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
app.post('/api/generate-control-text', async (req, res) => {
  try {
    const { fileContent, controlId, controlText, status, details } = req.body;

    if (!controlText || !status) {
      return res.status(400).json({ error: 'Missing required parameters.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
