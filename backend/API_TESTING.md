# Pension Calculator API - Quick Test Guide

## Test the API

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

### 2. Get API Info
```bash
curl http://localhost:3000/
```

### 3. Get Pension Service Info
```bash
curl http://localhost:3000/api/pension/info
```

### 4. Calculate Basic Pension
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

### 5. Get Detailed Breakdown with Year-by-Year Projections
```bash
curl -X POST http://localhost:3000/api/pension/detailed \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1985-03-20",
    "retirementAge": 67,
    "currentSalary": 100000,
    "yearsOfService": 15,
    "contributionRate": 0.196
  }'
```

### 6. Calculate Optimal Retirement Age
```bash
curl -X POST http://localhost:3000/api/pension/optimal-age \
  -H "Content-Type: application/json" \
  -d '{
    "birthDate": "1990-07-10",
    "retirementAge": 65,
    "currentSalary": 80000,
    "yearsOfService": 10
  }'
```

## Response Examples

### Basic Calculation Response
```json
{
  "success": true,
  "data": {
    "monthlyPension": 8500.50,
    "yearlyPension": 102006.00,
    "totalAccumulated": 1530000.00,
    "replacementRate": 85.00,
    "calculatedAt": "2025-10-04T10:30:00.000Z",
    "assumptions": {
      "retirementAge": 65,
      "contributionRate": 0.196,
      "expectedReturnRate": 0.05
    }
  },
  "message": "Pension calculated successfully"
}
```

### Detailed Breakdown Response
```json
{
  "success": true,
  "data": {
    "basic": { /* basic calculation */ },
    "yearByYearProjection": [
      {
        "year": 2026,
        "age": 41,
        "contributions": 19600,
        "accumulated": 20580.00,
        "projectedPension": 85.75
      },
      // ... more years
    ],
    "scenarios": {
      "optimistic": { /* with higher returns */ },
      "pessimistic": { /* with lower returns */ }
    }
  },
  "message": "Detailed pension breakdown calculated successfully"
}
```

## Field Descriptions

### Required Fields
- `birthDate` (string): ISO date format (e.g., "1980-05-15")
- `retirementAge` (number): Target retirement age (50-80)
- `currentSalary` (number): Current annual salary
- `yearsOfService` (number): Years already worked (0+)

### Optional Fields
- `contributionRate` (number): Pension contribution rate (default: 0.196 = 19.6%)
- `additionalContributions` (number): One-time additional contributions (default: 0)
- `expectedReturnRate` (number): Expected annual return rate (default: 0.05 = 5%)

## Error Responses

### Validation Error
```json
{
  "success": false,
  "error": "retirementAge must be between 50 and 80"
}
```

### Missing Fields
```json
{
  "success": false,
  "error": "Valid birthDate is required (ISO date string); currentSalary must be greater than 0"
}
```

## Using with JavaScript/TypeScript

```typescript
// Example function to call the API
async function calculatePension(data) {
  const response = await fetch('http://localhost:3000/api/pension/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  return await response.json();
}

// Usage
const result = await calculatePension({
  birthDate: "1980-05-15",
  retirementAge: 65,
  currentSalary: 120000,
  yearsOfService: 20,
});

console.log(result.data.monthlyPension);
```

## Notes

- All monetary values are in the same currency (no conversion)
- Calculations are based on simplified models - adjust formulas in `services/pension.service.ts` for your needs
- The API includes CORS headers for frontend integration
