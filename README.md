# Kompas Emerytalny - HackYeah 2025

## Project Description

In today's uncertain times, financial security and stability after retirement are among people's biggest concerns. Many Poles ask themselves the same questions:

- When will be the right moment to retire?
- How can I influence my pension?
- What will my future income look like?

Unfortunately, answering these questions today is far from simple. Existing tools are complex, data-heavy, and filled with specialist jargon, making them difficult for the average user to navigate. Predicting pension outcomes often requires expert knowledge or a time-consuming process of gathering detailed information.

**That's where Kompas Emerytalny comes in** — an intelligent, user-friendly application designed to simplify pension prediction and retirement planning for everyone.

### Our Solution

Kompas Emerytalny combines trusted public data, proven statistical models, and intelligent approximations to deliver quick, understandable pension estimates — without requiring dozens of inputs or financial expertise.

Our goal is to empower citizens with accessible insights into their financial future and help them make smarter decisions about employment, retirement timing, and savings.

### Key Features

- **Minimal input, maximum clarity** — users provide only a few basic details, and the app delivers a personalized pension forecast in seconds.
- **Smart approximations** — our algorithms use reliable demographic and economic statistics to calculate realistic scenarios.
- **Clear, intuitive design** — easy-to-read charts and visual explanations make complex calculations transparent and understandable.
- **Empowerment through simplicity** — designed for everyone, not just financial experts.
- **Integration potential** — the system can connect with official ZUS data sources to make even better predictions that would be highly personalized.

### Why It Matters

By helping users understand their future pension in a simple, engaging way, Kompas Emerytalny promotes financial awareness, proactive planning, and social stability, by pointing best way towards financial stability in the future. It aligns with Poland's digital transformation goals and supports ZUS's mission of educating and informing citizens about their retirement options.

### Our Vision

We envision a Poland where every working person — regardless of age or background — can plan their financial future with confidence.

**Kompas Emerytalny makes pension forecasting as easy as checking the weather** — clear, fast, and reliable.

---

## Docker Setup with PostgreSQL and Drizzle ORM

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
