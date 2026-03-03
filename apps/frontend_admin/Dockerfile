# Stage 1: Build the React application
FROM node:22-alpine AS builder

# Enable corepack to use the native pnpm version specified in your project
RUN corepack enable pnpm

# Set the working directory inside the container
WORKDIR /app

# Copy only package files first to leverage Docker layer caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies deterministically using frozen-lockfile
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the application for production
RUN pnpm run build

# Stage 2: Serve the application with Caddy
FROM caddy:2.7-alpine

# Copy the custom Caddy configuration
COPY Caddyfile /etc/caddy/Caddyfile

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /srv

# Expose the port Caddy will listen on
EXPOSE 80

# Run Caddy in the foreground
CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]