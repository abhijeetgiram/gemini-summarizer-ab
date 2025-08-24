# Gemini Summarizer App
## gemini-summarizer-ab

## Getting Started

#### Create Next.js app
`npx create-next-app@latest gemini-summarizer-ab`

### Run the development server
`npm run dev`
http://localhost:3000/summarizer

### Create api key from Google AI Studio
https://aistudio.google.com/apikey

Model Version: gemini-1.5-flash-latest

## Why Next.js?
- If not Next.js then need another backend (Express, Node, etc.) just to call Gemini API securely.
- Next.js call Gemini API on the server (inside API route), so your API key is not visible to users.
- API keys (Gemini key) never touch client browser. In Next.js API route, key stays server-side.
- No need to host two apps: frontend (React) + backend (Node/Express).

## Vercel
Perfect for Next.js / React + serverless API

## Why not used Node?
- Vercel - Need to structure them as serverless functions, not a full Express server.
- Render - Free plan sleeps after 15 minutes of inactivity and cold start requires ~30s sometimes.
- Railway - Need $5 for free credit.
- Heroku - Heroku ended their free tier in Nov 2022.
- AWS EC2 - Free for 12 months.

## Advantages
- SEO-friendly.
- Server-Side Rendering (SSR) helps search engines index pages.
- File-based routing. Created app/summarizer/page.js and automatic /summarizer route gets created.
- Image optimization (next/image) → automatic responsive, lazy-loaded, compressed images.

## Miscellaneous
- MENA countries prefer Next.js for its SEO and scalability.

## Rate Limits (Requests per Time)
- Model Version: gemini-1.5-flash-latest
- This is the largest free context window available in any major LLM right now

### Context Window (Token Thresholds)
- Input (prompt) tokens: up to 1,048,576 tokens (≈1M tokens) (=750k words)
- Output (response) tokens: up to 8,192 tokens (~8k tokens) (~6k words)

### For the free tier of Gemini 1.5 Flash via the API, the rate limits are:
- 1,000 requests per minute (RPM)
- No daily request cap (RPD)
- 250,000 tokens per minute (TPM)

### What is token?
- A token is the basic unit of text that AI models read and process.
- 1 token ≈ ¾ of an English word (on average). So 100 tokens ≈ 75 words.
- A token is just a chunk of text (word or part of a word) the AI reads.
- Your prompt + the model’s answer are both counted in tokens.
- Common words often map to 1 token.
- Rare or long words may be split into multiple tokens.
- Spaces and punctuation count too.

### How text gets split into tokens
Examples (English):

`"ChatGPT is smart."`
- might become: ["Chat", "G", "PT", " is", " smart", "."]
- 6 tokens

`"I love India"`
- ["I", " love", " India"]
- 3 tokens
