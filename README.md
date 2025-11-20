# Social Scheduler for Tech Founders

A beautiful, distraction-free social media scheduling platform targeting tech founders and leaders. Built with Next.js, NestJS, PostgreSQL, and Redis.

## 🚀 Features

- **Zen-Mode Editor**: Distraction-free WYSIWYG editor with visual character counter
- **Thread Management**: Automatic thread splitting for X (Twitter) and LinkedIn
- **Real-Time Preview**: Mobile preview of posts on both platforms
- **Smart Scheduling**: Redis-powered queue system with drag-and-drop calendar
- **OAuth Integration**: Seamless login with X and LinkedIn

## 🛠️ Tech Stack

### Frontend
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Shadcn UI
- NextAuth

### Backend
- NestJS
- TypeScript
- PostgreSQL
- Redis + BullMQ
- TypeORM

## 📦 Getting Started

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd Stanza
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   ```

3. **Start infrastructure (PostgreSQL & Redis)**
   ```bash
   docker-compose up -d
   ```

4. **Install and start the backend**
   ```bash
   cd backend
   npm install
   npm run start:dev
   ```

5. **Install and start the frontend**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001
   - pgAdmin: http://localhost:5050 (admin@admin.com / admin)

## 🔑 OAuth Setup

### X (Twitter)
1. Go to https://developer.twitter.com/
2. Create a new app
3. Get your Client ID and Client Secret
4. Add callback URL: `http://localhost:3000/api/auth/callback/twitter`

### LinkedIn
1. Go to https://www.linkedin.com/developers/apps
2. Create a new app
3. Get your Client ID and Client Secret
4. Add callback URL: `http://localhost:3000/api/auth/callback/linkedin`

## 📚 Project Structure

```
Stanza/
├── frontend/          # Next.js application
├── backend/           # NestJS application
├── docker-compose.yml # Infrastructure setup
└── README.md
```

## 🧪 Development

### Running Tests

**Backend:**
```bash
cd backend
npm run test
```

**Frontend:**
```bash
cd frontend
npm run test
```

### Database Management

Access pgAdmin at http://localhost:5050:
- Email: admin@admin.com
- Password: admin

## 📝 License

MIT

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
## 

frontend/ - Next.js app with all UI components
backend/ - NestJS API with PostgreSQL & Redis
docker-compose.yml - Infrastructure setup