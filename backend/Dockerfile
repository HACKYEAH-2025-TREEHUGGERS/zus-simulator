# Build stage
FROM node:23-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM node:23-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install production dependencies only
RUN npm ci --only=production

# Copy built application from builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/drizzle.config.ts ./

# Copy fonts for PDF generation with Polish character support
COPY --from=builder /app/assets ./assets

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
