# Elementara: Multiplayer Cloud Edition

A turn-based card battler game with multiplayer support, cloud storage, and real-time battles.

## Architecture

### Frontend
- HTML5/CSS3/JavaScript
- REST API client (`api.js`)
- WebSocket client for real-time battles (`websocket.js`)

### Backend
- Node.js + Express
- PostgreSQL database
- JWT authentication
- WebSocket support for live battles

## Setup

### Prerequisites
- Node.js 18+
- PostgreSQL 12+
- Docker & Docker Compose (optional)

### Quick Start with Docker

```bash
cd server
docker-compose up
node migrate.js
```

### Manual Setup

1. **Install dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Create `.env` file**
   ```bash
   cp .env.example .env
   ```
   Update with your database credentials.

3. **Create database**
   ```bash
   createdb elementara
   ```

4. **Run migrations**
   ```bash
   npm run migrate
   ```

5. **Start server**
   ```bash
   npm run dev
   ```

6. **Start frontend**
   - Open `public/index.html` in a browser or serve with a local server

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/guest` - Guest login

### Player
- `GET /api/player/profile` - Get player info
- `GET /api/player/collection` - Get card collection
- `POST /api/player/collection/:cardId/upgrade` - Upgrade card

### Battles
- `POST /api/battles/create` - Create new battle
- `GET /api/battles/:battleId` - Get battle state
- `GET /api/battles/history` - Get battle history

### Campaign
- `GET /api/campaign/progress` - Get campaign progress
- `POST /api/campaign/stage/:stageKey/complete` - Complete a stage

### Leaderboard
- `GET /api/leaderboard` - Get top 100 players

## WebSocket Events

### Client → Server
- `join_battle` - Join a battle
- `battle_action` - Send a turn action

### Server → Client
- `connected` - WebSocket connected
- `disconnected` - WebSocket disconnected
- `action` - Receive opponent's action

## Database Schema

### users
- id (UUID)
- username, email
- password_hash
- gold, gems, xp, level
- created_at, updated_at

### collections
- id (UUID)
- user_id (FK)
- card_id
- level, xp

### battles
- id (UUID)
- player1_id, player2_id (FK)
- winner_id (FK)
- player1_card_id, player2_card_id
- status
- created_at, updated_at

### campaign_progress
- id (UUID)
- user_id (FK, unique)
- completed_stages (text[])
- unlocked_stages (text[])

## Next Steps

1. **Refactor frontend to use API**
   - Replace localStorage with API calls
   - Update state management to sync with server

2. **Implement multiplayer battles**
   - Matchmaking system
   - Player-vs-player battles via WebSocket
   - Real-time action synchronization

3. **Add advanced features**
   - Trading system
   - Guilds/clans
   - Tournaments
   - Daily quests

## Development

```bash
# Start both frontend and backend
# In one terminal:
cd server && npm run dev

# In another terminal:
python -m http.server 5000  # or any static server
```

Then visit `http://localhost:5000`

## License

Unlicense
