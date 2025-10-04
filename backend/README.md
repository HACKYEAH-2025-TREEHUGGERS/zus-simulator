# Pension Calculator Backend

Express.js backend with clean architecture for complex pension calculations.

## 🎯 Features

- ✅ **Clean Architecture** - Separation of concerns (Controllers → Services → Data)
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Validation** - Input validation for all endpoints
- ✅ **Hot Reload** - Automatic restart on file changes (nodemon)
- ✅ **Database** - PostgreSQL with Drizzle ORM
- ✅ **Docker** - Containerized with Docker Compose

## 📁 Project Structure

```
src/
├── controllers/     # HTTP request handlers
├── services/        # Business logic (YOUR MATH GOES HERE!)
├── routes/          # API route definitions
├── middleware/      # Request processing
├── types/           # TypeScript types
├── utils/           # Helper functions
└── db/             # Database config & schemas
```

## 🚀 Getting Started

See root `/SETUP.md` for Docker setup.

## 📚 Documentation

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Detailed architecture guide
- **[API_TESTING.md](./API_TESTING.md)** - API endpoints and testing examples

## 🔧 Development

```bash
# Install dependencies
npm install

# Run in development mode (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build
npm start

# Database commands
npm run db:push      # Push schema to database
npm run db:generate  # Generate migrations
npm run db:studio    # Open Drizzle Studio
```

## 📊 API Endpoints

- `GET /api/health` - Health check
- `GET /api/pension/info` - Service information
- `POST /api/pension/calculate` - Basic pension calculation
- `POST /api/pension/detailed` - Detailed breakdown with projections
- `POST /api/pension/optimal-age` - Optimal retirement age

## 🧮 Where to Add Your Math Logic

All complex pension calculations go in:
**`src/services/pension.service.ts`**

This is where you implement ZUS-specific formulas, compound interest calculations, tax considerations, etc.

## 🎨 Adding New Features

1. Define types in `types/index.ts`
2. Implement logic in `services/*.service.ts`
3. Create controller in `controllers/*.controller.ts`
4. Add routes in `routes/*.routes.ts`
5. Add validation middleware if needed

See `ARCHITECTURE.md` for detailed examples.

## 🔒 Environment Variables

Required in `../.env`:
- `DATABASE_URL` - PostgreSQL connection string
- `PORT` - Server port (default: 3000)

## 📝 Example Request

```bash
curl -X POST http://localhost:3000/api/pension/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1980-05-15",
    "retirementAge": 65,
    "currentSalary": 120000,
    "yearsOfService": 20
  }'
```

## 🛠️ Tech Stack

- **Express** - Web framework
- **TypeScript** - Type safety
- **Drizzle ORM** - Database ORM
- **PostgreSQL** - Database
- **Nodemon** - Hot reload
- **Docker** - Containerization
