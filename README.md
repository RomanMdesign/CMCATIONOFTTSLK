# Aether - Modern Community Communication Platform

**Aether** is a complete, production-ready real-time communication platform inspired by modern community apps. It features communities (servers), text/voice/video channels, direct messages, friends, AI assistant, music bot, roles & permissions, and more.

**Original branding, UI, and implementation.** No Discord assets, icons, or exact design copies.

Repository: [CMCATIONOFTTSLK](https://github.com/RomanMdesign/CMCATIONOFTTSLK)

## Features

### Core
- User registration, login, logout with secure JWT + password hashing (bcrypt)
- User profiles, avatars (upload), status (online/idle/offline/dnd), bio
- Friends system + friend requests
- Direct messages (1:1 and group)
- Real-time notifications
- Presence system
- Block / report users
- Global search (users, communities, channels, messages)

### Communities (Servers)
- Create / edit / delete / join / leave communities
- Public & private communities
- Community icons, banners, descriptions
- Member list with roles
- Roles & granular permissions (owner, admin, moderator, member)
- Invite links (expiring / permanent)
- Kick, ban, mute moderation tools
- Audit / moderation logs

### Text Channels
- Create / edit / delete channels
- Real-time messaging via WebSocket
- Message edit / delete
- Replies & threads
- Emoji reactions
- @mentions
- File attachments & image previews
- Message search
- Pinned messages
- Typing indicators
- Read receipts / unread indicators
- Timestamps

### Voice & Video (WebRTC)
- Join / leave voice channels
- Microphone mute / unmute
- Deafen
- Individual user volume control
- Voice activity detection (VAD)
- Push-to-talk (PTT)
- Speaking indicators
- Connection status & auto-reconnect
- Camera on/off
- Multi-participant video grid
- Screen sharing (+ audio when supported)
- Responsive layout
- Leave call

### AI Assistant
- Dedicated AI channels + optional in DMs
- Natural language understanding
- Conversation context / memory
- Summarize chats
- Music discovery & playlist generation
- Commands + free-form chat

### Music System
- Dedicated music bot / channel
- Commands: `!play`, `!pause`, `!resume`, `!skip`, `!stop`, `!queue`, `!nowplaying`, `!volume`, `!shuffle`, `!repeat`, `!remove`, `!clear`
- Natural language: "Play relaxing OPM", "Make me a study playlist", etc.
- Full player UI (artwork, progress, queue, controls)
- Music bot can join voice channels and stream authorized audio
- **Legal sources only** (Spotify Web API / YouTube Data API / free/public domain samples for demo). Requires API keys.

### UI/UX
- Distinctive dark cinematic theme (with light mode toggle)
- Responsive: desktop, tablet, mobile
- Smooth animations
- Keyboard shortcuts
- Accessible controls
- Loading / error / empty states

## Tech Stack

**Frontend:** React 18 + Vite, Zustand, Socket.io-client, Tailwind CSS, Lucide React, React Router, WebRTC

**Backend:** Node.js + Express, Socket.io, Prisma + SQLite/PostgreSQL, JWT + bcrypt, Multer, rate limiting, Zod, Helmet

**AI:** OpenAI-compatible / xAI Grok

**Music:** Spotify Web API or YouTube Data API (legal only)

## Quick Start

```bash
git clone https://github.com/RomanMdesign/CMCATIONOFTTSLK.git
cd CMCATIONOFTTSLK

# Backend
cd backend
cp .env.example .env
npm install
npx prisma migrate dev
npx prisma db seed
npm run dev

# Frontend (new terminal)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Open http://localhost:5173

Demo users (after seed): `admin@aether.app` / `password123`

## Environment

See `backend/.env.example` and `frontend/.env.example`.

## License

MIT
