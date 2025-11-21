# Social Scheduler Backend API

This is the backend API for the Social Scheduler application, built with NestJS.

## 📚 API Documentation

The API documentation is available via Swagger UI.

1. **Start the server:**
   ```bash
   npm run start:dev
   ```

2. **Open Swagger UI:**
   [http://localhost:3001/api](http://localhost:3001/api)

## 🛠️ Tech Stack

- **Framework:** NestJS
- **Database:** PostgreSQL (via TypeORM)
- **Queue:** Redis (via BullMQ)
- **Documentation:** Swagger (OpenAPI)

## 🚀 Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   Copy `.env.example` to `.env` and configure your database and Redis credentials.

3. **Run the application:**
   ```bash
   # development
   npm run start:dev

   # production mode
   npm run start:prod
   ```

## 🧪 Testing

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```
