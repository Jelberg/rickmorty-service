# Stage 1: Build
FROM node:16-alpine AS builder

WORKDIR /usr/src/app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Run
FROM node:16-alpine

WORKDIR /usr/src/app

# Install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the build output
COPY --from=builder /usr/src/app/dist ./dist
COPY .env .env

EXPOSE 3000

# Start the application
CMD ["node", "dist/main"]
