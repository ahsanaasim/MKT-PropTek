# PropTek

Mobile-first cleanup marketplace built with Next.js (App Router), Tailwind CSS, and shadcn/ui.

## Design system

- **Category:** Commerce / marketplace / consumer (Gallery Marketplace)
- **Palette:** Airbnb-inspired (`#FF385C` primary)
- **Typography:** Cinzel (display) + Josefin Sans (body)
- **Shell:** Marketing top nav + iOS-style bottom tab bar for signed-in roles

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app starts on the Landing page.

## Demo roles

- **Job poster:** log in from Landing → Post a Job (any password) → `/poster/home`
- **Cleanup team:** log in from Landing → Find Cleanup Jobs → `/team/home`

Use the floating **States** control to preview Loading / Empty / Error / Plan limit / Permission denied on each screen.

## Deploy

Root `vercel.json` is configured for Next.js on Vercel.
