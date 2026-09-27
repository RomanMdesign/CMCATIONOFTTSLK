# Deploy Aether on Render

This guide gets the full platform running on [Render](https://render.com).

## Architecture on Render

| Service | Type | Root | Purpose |
|---------|------|------|--------|
| `aether-api` | Web Service | `backend` | API + Socket.io + WebRTC signaling |
| `aether-web` | Static Site | `frontend` | React SPA |
| `aether-db` | PostgreSQL | – | Production database |

Free tier is enough to try the app (cold starts apply).

## Option A – Blueprint (recommended)

1. Repo: https://github.com/RomanMdesign/CMCATIONOFTTSLK
2. Render Dashboard → **New** → **Blueprint** → connect this repository.
3. Render creates Postgres + API + static site from `render.yaml`.
4. After first API deploy, set on **aether-api → Environment**:
   - `CLIENT_URL` = `https://aether-web.onrender.com` (use your real frontend URL)
5. On **aether-web → Environment** (build-time):
   - `VITE_API_URL` = `https://aether-api.onrender.com`
   - `VITE_WS_URL` = `https://aether-api.onrender.com`
6. **Manual Deploy** the static site again so Vite embeds the API URL.
7. Optional: set `OPENAI_API_KEY` / Spotify keys on the API service.

## Option B – Manual

### PostgreSQL
New → PostgreSQL → free plan. Copy Internal Database URL.

### Backend Web Service
- Root Directory: `backend`
- Build: `npm install && npx prisma generate && npx prisma db push`
- Start: `node src/index.js`
- Health: `/api/health`
- Env: `NODE_ENV=production`, `DATABASE_URL`, `JWT_SECRET`, `REFRESH_SECRET`, `CLIENT_URL`

### Frontend Static Site
- Root Directory: `frontend`
- Build: `npm install && npm run build`
- Publish: `dist`
- Rewrite: `/*` → `/index.html`
- Build env: `VITE_API_URL`, `VITE_WS_URL` pointing at API HTTPS URL

## Seed (optional)

```bash
cd backend
DATABASE_URL="postgresql://..." npx prisma db seed
```

Demo: `admin@aether.app` / `password123`

## Notes

- WebSockets work on the same API HTTPS URL.
- Free services sleep; first request ~30–60s.
- WebRTC: add TURN for production NAT if needed.
- See main README for local development.
