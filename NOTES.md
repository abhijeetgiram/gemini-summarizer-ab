# gemini-summarizer-ab

## Why Next.js?
- If not Next.js then need another backend (Express, Node, etc.) just to call Gemini API securely.
- Next.js call Gemini API on the server (inside API route), so your API key is not visible to users.
- API keys (Gemini key) never touch client browser. In Next.js API route, key stays server-side.
- No need to host two apps: frontend (React) + backend (Node/Express).

## Vercel
Perfect for Next.js / React + serverless API

## Why not used Node?
Vercel - Need to structure them as serverless functions, not a full Express server.
Render - Free plan sleeps after 15 minutes of inactivity and cold start requires ~30s sometimes.
Railway - Need $5 for free credit.
Heroku - Heroku ended their free tier in Nov 2022.
AWS EC2 - Free for 12 months.

## Advantages
- SEO-friendly.
- Server-Side Rendering (SSR) helps search engines index pages.
- File-based routing. Created app/summarizer/page.js and automatic /summarizer route gets created.
- Image optimization (next/image) → automatic responsive, lazy-loaded, compressed images.

## Miscellaneous
- MENA countries prefer Next.js for its SEO and scalability.