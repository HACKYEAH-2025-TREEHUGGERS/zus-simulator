# Hack Project - Docker Setup with PostgreSQL and Drizzle ORM

This project uses Docker Compose to run a Node.js/Express backend with PostgreSQL database, configured with Drizzle ORM.

## Prerequisites

- Docker and Docker Compose installed
- Node.js 23+ (for local development)

## Getting Started

### 1. Environment Configuration

First, update the `.env` file with your desired database password:

```bash
POSTGRES_PASSWORD=your_secure_password_here
```

### 2. Install Dependencies (Local Development)

```bash
cd backend
npm install
```

### 3. Start the Services

```bash
# From the project root
docker compose up -d
```

This will start:
- PostgreSQL database on port 5432
- Node.js backend on port 3000

### 4. Run Database Migrations

After starting the services, generate and push the database schema:

```bash
cd backend
npm run db:push
```

Or to generate migration files:

```bash
npm run db:generate
npm run db:migrate
```

## Available Scripts

### Backend (in `backend/` directory)

- `npm run dev` - Start development server with ts-node
- `npm run build` - Build the TypeScript project
- `npm start` - Start production server
- `npm run db:generate` - Generate Drizzle migrations
- `npm run db:migrate` - Run Drizzle migrations
- `npm run db:push` - Push schema changes to database
- `npm run db:studio` - Open Drizzle Studio (database GUI)

## API Endpoints

- `GET /` - Hello world endpoint
- `GET /health` - Health check with database connection test
- `GET /api/users` - Get all users
- `POST /api/users` - Create a new user (requires JSON body with `name` and `email`)

## Database Schema

The project includes an example `users` table with the following fields:
- `id` (serial, primary key)
- `name` (text, not null)
- `email` (text, not null, unique)
- `created_at` (timestamp, default now)

You can modify or extend the schema in `backend/src/db/schema.ts`.

## Docker Commands

```bash
# Start services
docker compose up -d

# Stop services
docker compose down

# View logs
docker compose logs -f

# Rebuild services
docker compose up -d --build

# Stop and remove volumes (deletes database data)
docker compose down -v
```

## Connecting to PostgreSQL

From your host machine:
```bash
psql -h localhost -U postgres -d hackdb
```

Password: (as set in `.env`)

## Drizzle Studio

To open Drizzle Studio (visual database manager):

```bash
cd backend
npm run db:studio
```

This will open a web interface at `http://localhost:4983` (or another available port).

## Troubleshooting

### Database connection issues

If the backend can't connect to the database:
1. Ensure PostgreSQL is healthy: `docker compose ps`
2. Check logs: `docker compose logs postgres`
3. Verify `.env` file has correct credentials

### Port conflicts

If ports 3000 or 5432 are already in use, you can change them in `.env`:
```bash
BACKEND_PORT=3001
POSTGRES_PORT=5433
```

Then restart: `docker compose down && docker compose up -d`
