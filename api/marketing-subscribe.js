import { createClient } from '@supabase/supabase-js';

/**
 * Public endpoint: guest email + marketing consent (e.g. footer).
 * Stores rows in `marketing_leads` — your source of truth for opted-in addresses.
 *
 * Resend does not read Supabase automatically. For broadcasts, either:
 * - query `marketing_leads` / `user_marketing_consent` where opted_in and send via Resend API, or
 * - sync contacts into a Resend Audience using their API when users opt in.
 */

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

function sendJson(res, status, body) {
  res.setHeader('Content-Type', 'application/json');
  return res.status(status).end(JSON.stringify(body));
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed' });
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    console.error('marketing-subscribe: Supabase env missing');
    return sendJson(res, 500, { error: 'Service not configured' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : (req.body || {});
    const email = (body.email || '').trim().toLowerCase();
    const optedIn = body.opted_in === true;
    const source = typeof body.source === 'string' ? body.source.slice(0, 64) : 'footer';

    if (!optedIn) {
      return sendJson(res, 400, { error: 'Marketing consent is required' });
    }
    if (!email || !isValidEmail(email)) {
      return sendJson(res, 400, { error: 'Valid email is required' });
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const now = new Date().toISOString();

    const { error } = await supabase.from('marketing_leads').upsert(
      {
        email,
        opted_in: true,
        consent_at: now,
        source,
        updated_at: now,
      },
      { onConflict: 'email' }
    );

    if (error) {
      console.error('marketing_leads upsert:', error);
      return sendJson(res, 500, { error: 'Could not save subscription' });
    }

    return sendJson(res, 200, { success: true });
  } catch (err) {
    console.error('marketing-subscribe:', err);
    return sendJson(res, 500, { error: err.message || 'Failed' });
  }
}
