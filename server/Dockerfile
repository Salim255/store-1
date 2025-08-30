# Stage 1: Build the Nestjs application
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (for caching)
COPY package*.json .

# Install dependencies
RUN npm install 

# Copy the rest of the server code
COPY . .

# Build the NestJS app (compile TypeScript)
RUN npm run build

# Stage 2: Production image
FROM node:20-alpine

WORKDIR /app

# Copy only production dependencies
COPY package*.json .
RUN npm install --production

# Copy built files from previous stage
COPY --from=build /app/dist/ ./dist

# Expose port ( Railway sets Railway uses process.en.PORT)
ENV PORT=3000
EXPOSE $PORT

## Start the server
CMD ["node", "dist/src/main.js"]