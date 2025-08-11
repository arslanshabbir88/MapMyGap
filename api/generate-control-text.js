import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
}
