## Overview

### MusicMate – Personalized Music Recommendations Web App

MusicMate is a smart music discovery web app that helps you find songs you’ll love — whether you describe your mood in words or dial in your own vibe with custom sliders.

> **Note:** A **Spotify Premium account** is required to access music recommendations via the Spotify API.

---

## Features

**Tech Stack:**

- **TypeScript** and **Next.js** (Full Stack)
- **Tailwind CSS** for modern styling
- **Zustand** for lightweight global state management
- **Groq API** for natural language interpretation powered by LLaMA 3.1
- **Spotify Web API** for track metadata and recommendations
- **Reccobeats API** for additional attribute based music recommendations
- **PostgreSQL** for user data storage
- **JWT** for user authentication and session management **NextAuth.js**

---

## How It Works

There are **two ways to get music recommendations** in MusicMate:

### 1. Natural Language Search (LLM-Powered)

Type what you’re feeling and MusicMate will understand your vibe:

- “Give me calm piano instrumentals for studying”
- “Find jazzy tracks that feel like a rainy night in New York”
- “Play some sad acoustic songs with the same vibe as Neil Young”

An LLM interprets your input and transforms it into structured queries to fetch relevant songs using the Spotify API.

### 2. Custom Attribute-Based Search _(In Progress)_

Use sliders to fine-tune your music search based on audio features:

- `acousticness` (0.0–1.0): How acoustic a track is
- `danceability` (0.0–1.0): How danceable the track is
- `energy` (0.0–1.0): Track’s intensity and activity
- `instrumentalness` (0.0–1.0): Likelihood of no vocals
- `key` (-1–11): Track key (C = 0, D = 2, etc.)
- `liveness` (0.0–1.0): Probability the track is live
- `loudness` (-60–2): Overall track volume in decibels
- `mode` (0 = minor, 1 = major): Modality of the song
- `speechiness` (0.0–1.0): Amount of spoken word content
- `tempo` (0–250): Beats per minute
- `valence` (0.0–1.0): Mood of the track (sad to happy)
- `popularity` (0–100): Track's popularity score

> This feature is currently under development.

---

## As a user I can:

- Register, log in and log out
- Search music using natural language
- View personalized recommendations
- Toggle between light and dark mode
- Play track using Spotify Web Player SDK

Try the app now:

🔗 [Hosted App](https://musicmate-kohl.vercel.app/)

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/musicmate.git
cd musicmate
```

### 2. Install packages and dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a .env file and add:

```
SPOTIFY_CLIENT_ID=spotify_client_id
SPOTIFY_CLIENT_SECRET=spotify_client_secret
SPOTIFY_REDIRECT_URI=redirection_uri

NEXTAUTH_URL=client_url
NEXTAUTH_SECRET=_next_auth_secret

LLM_API_URL=llm_url
LLM_MODEL=model
LLM_PROVIDER=llm_provider
LLM_TEMPERATURE=from_0_to_1
LLM_API_KEY=llm_api_key

```

### 4. Run app

```
npm run dev
```

The app should open in your browser on `http://localhost:3000/`

## Minimum Requirements

<ul>
    <li>Node.js version 18.20.7</li>
    <li>npm version 8.15.0</li>
</ul>

<br>
