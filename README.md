# PropTek

Mobile-first cleanup marketplace built with Next.js (App Router), Tailwind CSS, and shadcn/ui.

## Design system

- **Category:** Commerce / marketplace / consumer (Gallery Marketplace)
- **Palette:** Airbnb-inspired (`#FF385C` primary)
- **Typography:** Cinzel (display) + Josefin Sans (body)
- **Shell:** Marketing top nav + iOS-style bottom tab bar for signed-in roles

## Role-based access

- Landing CTAs send you to login with a role intent (`?role=poster` or `?role=team`).
- Login / register create a local session and redirect to that role’s home.
- `/poster/*` is poster-only; `/team/*` is team-only. Cross-role visits go to `/denied`.
- Profile requires a signed-in session. Sign out clears access.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts on the Landing page.

## Demo roles

- **Job poster:** Landing → Post a Job → log in → `/poster/home`
- **Cleanup team:** Landing → Find Cleanup Jobs → log in → `/team/home`

Use the floating **States** control to preview Loading / Empty / Error / Plan limit / Permission denied on each screen.

## Deploy

Root `vercel.json` is configured for Next.js on Vercel.
