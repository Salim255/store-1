# Stage1: Build Angular app
FROM node:18-apline AS build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json .
RUN npm install

# Copy all source code
COPY . .

# Build angular app in production mode
RUN npm run build -- --output-path=dist --configuration=production

# Stage 2: Serve app using Nginx
FROM nginx:alpine

# Copy built files from Stage 1
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start NNginx
CMD ["nginx", "-g", "daemon off;"]

