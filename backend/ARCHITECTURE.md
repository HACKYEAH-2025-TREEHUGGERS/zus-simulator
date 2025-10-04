# Backend Architecture Guide

This Express backend follows a clean, modular architecture optimized for complex business logic like pension calculations.

## 📁 Project Structure

```
backend/src/
├── controllers/        # Handle HTTP requests and responses
│   ├── pension.controller.ts
│   └── index.ts
├── services/          # Business logic and calculations
│   ├── pension.service.ts
│   └── index.ts
├── routes/            # API route definitions
│   ├── pension.routes.ts
│   ├── health.routes.ts
│   └── index.ts
├── middleware/        # Request processing middleware
│   ├── errorHandler.ts
│   ├── asyncHandler.ts
│   ├── validation.ts
│   └── index.ts
├── types/            # TypeScript type definitions
│   └── index.ts
├── utils/            # Utility functions and helpers
│   └── errors.ts
├── db/               # Database schemas and connections
│   ├── schema.ts
│   └── index.ts
└── index.ts          # Application entry point
```

## 🏗️ Architecture Layers

### 1. **Routes** (`routes/`)
- Define API endpoints
- Apply middleware (validation, authentication)
- Route requests to controllers

### 2. **Controllers** (`controllers/`)
- Handle HTTP request/response
- Input validation (basic)
- Call services for business logic
- Format responses
- **Keep controllers thin!**

### 3. **Services** (`services/`)
- **All business logic goes here**
- Complex calculations
- Data processing
- Interaction with multiple data sources
- Reusable across different controllers

### 4. **Middleware** (`middleware/`)
- Request validation
- Error handling
- Authentication/authorization
- Logging

### 5. **Types** (`types/`)
- TypeScript interfaces
- Type definitions
- Shared types across the application

## 🚀 Available Endpoints

### Pension Calculation APIs

```
GET  /api/pension/info              - Get service information
POST /api/pension/calculate         - Calculate basic pension
POST /api/pension/detailed          - Get detailed breakdown with projections
POST /api/pension/optimal-age       - Calculate optimal retirement age
GET  /api/health                    - Health check with DB status
```

## 📝 Example Request

### Calculate Basic Pension

```bash
curl -X POST http://localhost:3000/api/pension/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1980-05-15",
    "retirementAge": 65,
    "currentSalary": 120000,
    "yearsOfService": 20,
    "contributionRate": 0.196,
    "additionalContributions": 50000,
    "expectedReturnRate": 0.05
  }'
```

### Response Format

```json
{
  "success": true,
  "data": {
    "monthlyPension": 8500.50,
    "yearlyPension": 102006,
    "totalAccumulated": 1530000,
    "replacementRate": 85.00,
    "calculatedAt": "2025-10-04T...",
    "assumptions": {
      "retirementAge": 65,
      "contributionRate": 0.196,
      "expectedReturnRate": 0.05
    }
  },
  "message": "Pension calculated successfully"
}
```

## 🔧 How to Add New Features

### Adding a New Calculation Method

1. **Add types** in `types/index.ts`:
```typescript
export interface NewCalculationInput {
  // your fields
}
```

2. **Add method to service** in `services/pension.service.ts`:
```typescript
calculateNewMethod(input: NewCalculationInput) {
  // your complex logic here
  return result;
}
```

3. **Add controller method** in `controllers/pension.controller.ts`:
```typescript
async newMethod(req: Request, res: Response) {
  const input = req.body;
  const result = pensionService.calculateNewMethod(input);
  res.json({ success: true, data: result });
}
```

4. **Add route** in `routes/pension.routes.ts`:
```typescript
router.post('/new-method', 
  validateInput,
  asyncHandler(pensionController.newMethod.bind(pensionController))
);
```

## 🛡️ Error Handling

All errors are automatically caught and formatted:

```typescript
throw new ValidationError('Invalid input');
throw new NotFoundError('Resource not found');
throw new AppError(400, 'Custom error message');
```

## 🎯 Best Practices

1. **Keep controllers thin** - Move logic to services
2. **Services should be pure** - Avoid side effects when possible
3. **Use types everywhere** - Type safety prevents bugs
4. **Validate inputs** - Use middleware for validation
5. **Handle errors properly** - Use error classes
6. **Document complex logic** - Add comments for math formulas

## 🧮 Pension Service Details

The `PensionService` contains:
- Basic pension calculations
- Year-by-year projections
- Scenario analysis (optimistic/pessimistic)
- Optimal retirement age calculations

**This is where you implement your complex mathematical formulas for ZUS calculations!**

## 📊 Adding More Services

To add a new service (e.g., for tax calculations):

1. Create `services/tax.service.ts`
2. Create `controllers/tax.controller.ts`
3. Create `routes/tax.routes.ts`
4. Register routes in `routes/index.ts`

The architecture scales easily for complex applications!
