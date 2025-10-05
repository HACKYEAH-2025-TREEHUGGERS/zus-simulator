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
docker exec -ti hack-backend npm run db:push
docker exec -ti hack-backend npm run db:seed
```

## Frontend

Run

```
npm install
npm run dev
```