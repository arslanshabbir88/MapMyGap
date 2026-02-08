import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// Who receives the form submissions (you)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'admin@mapmygap.com';
// Sender must be a verified domain in Resend (e.g. noreply@mapmygap.com or onboarding@resend.dev for testing)
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'MapMyGap Contact <onboarding@resend.dev>');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, type, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
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

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject,
      text,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send message' });
    }

    res.status(200).json({ success: true, id: data?.id });
  } catch (err) {
    console.error('Send contact error:', err);
    res.status(500).json({ error: err.message || 'Failed to send message' });
  }
}
