import { Resend } from 'resend';

// Who receives the form submissions (you)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'admin@mapmygap.com';
// Sender must be a verified domain in Resend (e.g. noreply@mapmygap.com or onboarding@resend.dev for testing)
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'MapMyGap Contact <onboarding@resend.dev>';

function sendJson(res, status, body) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).end(JSON.stringify(body));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const { name, email, type, message } = body;

    if (!name || !email || !message) {
      return sendJson(res, 400, { error: 'Name, email, and message are required' });
    }

    const subject = type === 'sales'
      ? `[MapMyGap Sales] ${name} - ${email}`
      : `[MapMyGap Support] ${name} - ${email}`;

    const text = [
      `Type: ${type === 'sales' ? 'Contact Sales' : 'Email Support'}`,
      `Name: ${name}`,
      `Email: ${email}`,
      '',
      'Message:',
      message,
    ].join('\n');

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error('RESEND_API_KEY is not set');
      return sendJson(res, 500, { error: 'Email service is not configured. Please try again later.' });
    }
    const resend = new Resend(apiKey);
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return sendJson(res, 500, { error: error.message || 'Failed to send message' });
    }

    return sendJson(res, 200, { success: true, id: data?.id });
  } catch (err) {
    console.error('Send contact error:', err);
    return sendJson(res, 500, { error: err.message || 'Failed to send message' });
  }
}
