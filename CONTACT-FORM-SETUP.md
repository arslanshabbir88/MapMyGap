# Contact Form (Email Support / Contact Sales)

The contact form sends submissions to you via **Resend**. Users fill out the form; you receive an email at `admin@mapmygap.com` (or the address you set).

## How it works

1. User clicks **Email Support** or **Contact Sales** (or “Contact us” / “Contact Security Team”).
2. A modal opens with fields: **Name**, **Email**, **Regarding** (Support / Sales), **Message**.
3. On submit, the app calls `POST /api/send-contact` with the form data.
4. The API uses Resend to send one email to you with the submission details.

## Vercel environment variables

Add these in your Vercel project (Settings → Environment Variables):

| Variable | Description |
|----------|-------------|
| `RESEND_API_KEY` | **Required.** Create an API key at [resend.com](https://resend.com) → API Keys. |
| `CONTACT_TO_EMAIL` | Optional. Where to receive form emails. Default: `admin@mapmygap.com`. |
| `CONTACT_FROM_EMAIL` | Optional. Sender address. Must be a [verified domain](https://resend.com/docs/dashboard/domains/introduction) in Resend (e.g. `MapMyGap Contact <noreply@mapmygap.com>`). If unset, uses `onboarding@resend.dev` (Resend’s test sender). |

## Resend setup

1. Sign up at [resend.com](https://resend.com).
2. Create an **API key** and set it as `RESEND_API_KEY` in Vercel.
3. For production, add and verify your domain in Resend, then set `CONTACT_FROM_EMAIL` to an address on that domain (e.g. `noreply@mapmygap.com`).

Until `CONTACT_FROM_EMAIL` is set, emails are sent from `onboarding@resend.dev` (Resend’s default); delivery can still work, but using your own domain is better for deliverability and branding.
