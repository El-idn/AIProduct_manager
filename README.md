# ProdPilot AI

An AI-powered product management workspace portfolio demo. Built with Next.js, shadcn/ui, and Groq (free tier) via Vercel AI SDK.

## Features

- **Landing page** — Marketing site with features, pricing, and CTAs
- **Mock auth** — Login/signup with onboarding flow (demo credentials)
- **Dashboard** — KPI widgets, charts, RICE prioritization, AI recommendations
- **AI PRD Generator** — Streaming PRD generation with editable sections
- **AI Copilot** — Conversational chat with workspace context
- **Analytics** — Revenue, engagement, retention, funnel, anomaly alerts

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Demo Login

Any email/password works. Pre-filled: `demo@prodpilot.ai` / `demo123`

### Live AI (Optional)

Get a free API key from [console.groq.com](https://console.groq.com), then:

```bash
cp .env.local.example .env.local
# Add GROQ_API_KEY
```

Without a key, the app runs in **demo mode** with simulated streaming responses.

## Tech Stack

- Next.js 15 (App Router) + TypeScript
- Tailwind CSS + shadcn/ui (dark theme)
- Framer Motion, Recharts, Zustand
- Vercel AI SDK + Groq (`llama-3.3-70b-versatile`)
- React Hook Form + Zod

## Deploy to Vercel

1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Add `GROQ_API_KEY` environment variable (optional)

## Project Structure

```
app/
  (dashboard)/     # Authenticated app shell
  (auth)/          # Login, signup, onboarding
  api/ai/          # Groq streaming endpoints
components/        # UI, layout, charts, editor
lib/               # Store, mock data, AI prompts
```

## Architecture Decisions

- **Frontend-first demo** — No real backend; Zustand + localStorage for persistence
- **Cookie session** — Middleware guards dashboard routes
- **Groq free tier** — Real streaming AI without OpenAI costs; mock fallback when no key
- **Rate limiting** — In-memory 10 req/min per IP on AI routes

## License

Portfolio demo — MIT
