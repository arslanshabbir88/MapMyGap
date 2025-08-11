const { GoogleGenerativeAI } = require('@google/generative-ai');

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { originalDocument, targetControl, framework } = req.body;

    if (!originalDocument || !targetControl || !framework) {
      return res.status(400).json({ error: 'Missing required parameters: originalDocument, targetControl, or framework.' });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `You are a cybersecurity compliance expert. Your task is to generate policy text for a specific control that matches the style and tone of an existing document.

Original Document Content:
${originalDocument.substring(0, 4000)}

Target Control to Implement:
${targetControl}

Framework: ${framework}

Instructions:
1. Analyze the original document's writing style, tone, and format
2. Generate policy text for the target control that matches that style and tone
3. The text should be specific, actionable, and professional
4. Use similar language patterns, terminology, and structure as the original document
5. Make it sound like it was written by the same author/organization

Return only the generated policy text, no additional formatting or explanations.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const generatedText = response.text();

    res.status(200).json({
      generatedText: generatedText
    });

  } catch (error) {
    console.error('Error in /generate-control-text:', error);
    res.status(500).json({ error: `Server error: ${error.message}` });
  }
};
