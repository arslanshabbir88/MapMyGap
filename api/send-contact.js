import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

// Who receives the form submissions (you)
const TO_EMAIL = process.env.CONTACT_TO_EMAIL || 'admin@mapmygap.com';
// Sender must be a verified domain in Resend (e.g. noreply@mapmygap.com or onboarding@resend.dev for testing)
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL || 'MapMyGap Contact <onboarding@resend.dev>';

function sendJson(res, status, body) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).end(JSON.stringify(body));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

async function handleMarketingNewsletter(res, body) {
  const email = (body.email || '').trim().toLowerCase();
  const optedIn = body.opted_in === true;
  const source = typeof body.source === 'string' ? body.source.slice(0, 64) : 'footer';

  if (!optedIn) {
    return sendJson(res, 400, { error: 'Marketing consent is required' });
  }
  if (!email || !isValidEmail(email)) {
    return sendJson(res, 400, { error: 'Valid email is required' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('send-contact: Supabase env missing (marketing newsletter)');
    return sendJson(res, 500, { error: 'Service not configured' });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);
  const now = new Date().toISOString();
  const { error } = await supabase.from('marketing_leads').upsert(
    {
      email,
      opted_in: true,
      consent_at: now,
      updated_at: now,
      source,
    },
    { onConflict: 'email' }
  );

  if (error) {
    console.error('marketing_leads upsert:', error);
    return sendJson(res, 500, { error: 'Could not save subscription' });
  }

  return sendJson(res, 200, { success: true });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});

    if (body.intent === 'marketing_newsletter') {
      return handleMarketingNewsletter(res, body);
    }

    const { name, email, type, message } = body;

    if (!name || !email || !message) {
      return sendJson(res, 400, { error: 'Name, email, and message are required' });
    }

    const subjectLabel = type === 'sales' ? 'Sales' : type === 'support' ? 'Support' : 'General';
    const subject = `[MapMyGap ${subjectLabel}] ${name} - ${email}`;

    const text = [
      `Type: ${type === 'sales' ? 'Sales' : type === 'support' ? 'Support' : 'General inquiry'}`,
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
