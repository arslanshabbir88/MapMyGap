export default async function handler(req, res) {
  try {
    const { fileContent, controlId, controlText, status, details } = req.body || {};
    if (!fileContent || !controlId || !controlText) {
      return res.status(400).json({ error: 'Missing required fields.' });
    }

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    const apiKey = process.env.GEMINI_API_KEY;

    const buildFallback = () => {
      const styleExcerpt = fileContent.slice(0, 1200).replace(/\s+/g, ' ').trim();
      return (
`Policy Control: ${controlId} — ${controlText}

Purpose
- Establish clear expectations and procedures to address this requirement.

Scope
- Applies to all relevant systems, personnel, and third-party relationships within the organization.

Standard
- The organization documents and maintains procedures to satisfy: ${controlText}.
- Responsibilities are assigned for implementation, monitoring, and review.
- Evidence is produced to demonstrate adherence (e.g., records, approvals, logs).

Procedures
1) Plan: Define objectives, owners, and frequency of activities related to ${controlId}.
2) Implement: Execute daily/operational tasks to meet the standard.
3) Monitor: Track effectiveness using metrics and periodic reviews.
4) Remediate: Address findings and document corrective actions.

Style alignment (based on your document excerpt)
"${styleExcerpt}"

Notes
- Tailor phrasing to match your internal terminology and approval workflow.
- Replace placeholders with specific systems, teams, and tools.
`);
    };

    if (!apiKey) {
      return res.status(200).json({ sampleText: buildFallback() });
    }

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('AI API request timed out')), 8000));

    const prompt = `You are a compliance writer. Draft concise sample control text that aligns with the customer's writing style.
- Organization-provided document (style reference; do NOT summarize, only infer tone/structure):\n\n${fileContent.slice(0, 4000)}
- Control: ${controlId} — ${controlText}
- Current status: ${status || 'gap'}
- Observed details: ${details || 'N/A'}

Requirements:
- Output practical, reusable policy/control text (not a list of tips).
- 140–220 words. Keep neutral, professional tone consistent with the provided style.
- Include Purpose, Scope, Standard, and Procedures sections.
- Avoid markdown fences. Output plain text only.`;

    const payload = { contents: [{ role: 'user', parts: [{ text: prompt }] }] };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;

    try {
      const resp = await Promise.race([
        fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }),
        timeoutPromise,
      ]);
      if (!resp.ok) {
        const errData = await resp.json().catch(() => ({}));
        throw new Error(errData?.error?.message || 'AI request failed');
      }
      const json = await resp.json();
      const text = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      const cleaned = text.replace(/^```[a-z]*\n?/gi, '').replace(/```$/g, '').trim();
      if (!cleaned) throw new Error('Empty AI response');
      return res.status(200).json({ sampleText: cleaned });
    } catch (err) {
      // Fallback
      return res.status(200).json({ sampleText: buildFallback(), note: 'AI unavailable, used fallback' });
    }
  } catch (e) {
    console.error('Error in /api/generate-control-text:', e);
    return res.status(500).json({ error: e.message || 'Server error' });
  }
}
