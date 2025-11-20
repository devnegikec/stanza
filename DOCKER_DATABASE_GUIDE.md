# Docker Database Connection Guide 🐳

## What You've Already Done ✅

You successfully started Docker with:
```bash
docker-compose up -d
```

This created 3 containers:
- **PostgreSQL** (Database) - Port 5432
- **Redis** (Queue system) - Port 6379  
- **pgAdmin** (Database GUI) - Port 5050

## How the Connection Works

### Simple Explanation 🎯

Think of Docker containers like separate computers running on your machine. When you start them with `docker-compose`, they:

1. **Run the database inside a container** (isolated environment)
2. **Expose ports to your local machine** (5432 for PostgreSQL)
3. **Your backend app connects through `localhost:5432`**

It's like the database is running on your computer, even though it's in a container!

### Visual Flow

```
Your Backend App (localhost:3001)
        ↓
    Connects to
        ↓
localhost:5432 (mapped from Docker container)
        ↓
PostgreSQL Container (social-scheduler-db)
```

## Verify Your Setup

### 1. Check Docker Containers are Running

```bash
docker ps
```

You should see 3 containers with status "Up" and "(healthy)":
- social-scheduler-db
- social-scheduler-redis
- social-scheduler-pgadmin

### 2. Check Database is Accessible

```bash
docker exec social-scheduler-db psql -U postgres -d social_scheduler -c 'SELECT version();'
```

This connects to PostgreSQL and shows the version.

### 3. View Database Tables (after backend starts)

```bash
docker exec social-scheduler-db psql -U postgres -d social_scheduler -c '\dt'
```

Should show `users` and `posts` tables once backend connects.

## Environment Variables Explained

The backend needs these settings (in `backend/.env`):

```bash
# Where is the database?
DB_HOST=localhost          # Because Docker maps container to localhost
DB_PORT=5432              # PostgreSQL default port
DB_USERNAME=postgres      # From docker-compose.yml
DB_PASSWORD=postgres      # From docker-compose.yml
DB_NAME=social_scheduler  # From docker-compose.yml

# Where is Redis?
REDIS_HOST=localhost
REDIS_PORT=6379

# Backend settings
PORT=3001                 # Your backend API port
```

**Important:** These credentials match what's in `docker-compose.yml`!

## Starting Your Backend

The backend will automatically:
1. Read the `.env` file
2. Connect to `localhost:5432`
3. Create database tables (users, posts)
4. Connect to Redis for the queue

Run:
```bash
cd backend
npm run start:dev
```

Look for this message:
```
🚀 Backend is running on: http://localhost:3001
```

## Testing the Connection

Once backend is running:

```bash
# Test backend is alive
curl http://localhost:3001

# Test posts API
curl http://localhost:3001/posts?userId=demo
```

## Using pgAdmin (Database GUI)

Want to see your database visually?

1. Open http://localhost:5050
2. Login:
   - Email: `admin@admin.com`
   - Password: `admin`

3. Add server:
   - Click "Add New Server"
   - **General tab:**
     - Name: `Social Scheduler`
   - **Connection tab:**
     - Host: `social-scheduler-db` (container name!)
     - Port: `5432`
     - Database: `social_scheduler`
     - Username: `postgres`
     - Password: `postgres`

**Note:** Use container name `social-scheduler-db` NOT `localhost` because pgAdmin runs inside Docker too!

## Common Issues & Solutions

### "Connection refused" or "Can't connect"

**Problem:** Docker isn't running or containers are stopped

**Solution:**
```bash
# Start Docker Desktop (if on Mac/Windows)
# Then restart containers:
docker-compose up -d
```

### "ECONNREFUSED localhost:5432"

**Problem:** Backend is trying to connect before database is ready

**Solution:**
```bash
# Check database health
docker ps

# Wait for "healthy" status, then restart backend
```

### "Password authentication failed"

**Problem:** Wrong credentials in .env file

**Solution:**
```bash
# Check docker-compose.yml for correct credentials
# Make sure backend/.env matches:
DB_USERNAME=postgres
DB_PASSWORD=postgres
```

## Stopping Your Databases

When you're done working:

```bash
# Stop containers (keeps data)
docker-compose stop

# Stop and remove containers (keeps data in volumes)
docker-compose down

# Remove everything including data (⚠️ DANGER!)
docker-compose down -v
```

## Next Steps

Your database is ready! The backend should:
1. Connect automatically when it starts
2. Create tables (`users`, `posts`)
3. Be ready to save your social media posts

Try scheduling a post from the frontend at http://localhost:3000/editor and it will be saved to PostgreSQL! 🎉
