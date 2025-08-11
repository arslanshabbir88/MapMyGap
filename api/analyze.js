import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

// Import framework control structures
import { allFrameworks } from '../src/frameworks/compliance-frameworks.js';

// Hybrid analysis function - uses predefined controls + AI analysis
async function analyzeWithAI(fileContent, framework) {
  try {
    // Get predefined control structure for the framework
    const frameworkData = allFrameworks[framework];
    
    if (!frameworkData) {
      throw new Error(`Framework ${framework} not supported`);
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

    // Create a comprehensive prompt for AI analysis
    const prompt = `You are a cybersecurity compliance expert. Analyze the following document content against the ${frameworkName} framework.

Document Content:
${fileContent.substring(0, 8000)}

Framework: ${frameworkName}
Available Control Categories: ${frameworkData.categories.map(cat => cat.name).join(', ')}

Your task is to analyze the document content and determine the compliance status for each control. For each control, analyze the document content and determine if the control is:
- "covered": Fully addressed in the document
- "partial": Partially addressed but needs improvement  
- "gap": Not addressed at all

Return your analysis in this exact JSON format:
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
          "details": "Detailed analysis explaining why this status was assigned based on document content",
          "recommendation": "Specific, actionable recommendation to achieve compliance"
        }
      ]
    }
  ]
}

Guidelines:
- Base your analysis on actual content found in the document
- Be specific about what content supports your assessment
- If content is insufficient, mark as "gap" with clear guidance
- Provide actionable recommendations that match the document's context
- Focus on the specific requirements of ${frameworkName}

Return only valid JSON, no additional text or formatting.`;

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
