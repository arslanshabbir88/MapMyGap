import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

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
- For PCI DSS, focus on payment card data protection requirements
- For ISO 27001, focus on information security management system requirements
- For SOC 2, focus on the specific trust service criteria selected

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

export default async function handler(req, res) {
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
}
