This is the ORIGO frontend + API (Next.js) project.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The app includes in-repo API routes for submissions, appointment availability, and email notifications.

## System Overview

- Single repo deployed on Vercel
- Supabase as the database (submissions)
- API routes live in `src/app/api/*`
- Landing page uses image assets in `public/landing-hero/` (hero + CEO)

### API Routes

- `GET /api/appointments/availability?days=60` -> returns available slots
- `POST /api/submissions` -> saves a full submission (quiz + appointment)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Notes

Anti-spam plan:
- Add a hidden honeypot field in the lead/contact form and reject if filled.
- Enforce a minimum submit time threshold (e.g., 3–5 seconds).
- Add simple IP-based rate limiting in `/api/submissions`.
- Consider reCAPTCHA/hCaptcha if spam increases.

## Current Setup

Environment variables (Vercel):
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `RESEND_API_KEY`
- `EMAIL_FROM`
- `EMAIL_TO`
- `EMAIL_CC` (optional)
- `EMAIL_BCC` (optional)

Supabase tables:
- `submissions`

## Next Steps

- Add reCAPTCHA/hCaptcha if spam increases.
- Build a simple admin view for submissions.
- Set up a custom domain and add basic analytics.
- Verify a Resend domain to email any recipient.
- Add Slack/LINE notifications for new submissions.
- Add CSV export or Google Sheets sync for submissions.
- Add CRM webhook integrations (e.g., HubSpot/Zoho).
- Add conversion analytics from quiz to booking.
