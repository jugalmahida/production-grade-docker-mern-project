# Stage 1: Build & Dependencies
FROM node:22-alpine AS builder

# Enable pnpm via Node's native corepack
RUN corepack enable pnpm

WORKDIR /app

# Copy package.json AND pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install ALL dependencies strictly from the lockfile
RUN pnpm install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Stage 2: Production Runner
FROM node:22-alpine

# Enable pnpm here as well
RUN corepack enable pnpm

# Install PM2 globally
RUN npm install -g pm2

WORKDIR /app

# Copy package files again
COPY package.json pnpm-lock.yaml ./

# Install ONLY production dependencies to keep the image lean
RUN pnpm install --prod --frozen-lockfile

# Copy the app source (or the /dist folder if compiled TypeScript in Stage 1)
# and the ecosystem file from the builder stage
COPY --from=builder /app/src ./src
COPY --from=builder /app/ecosystem.config.cjs ./

# Change ownership of the app directory to the unprivileged 'node' user
RUN chown -R node:node /app && chmod -R 755 /app

# Switch to the non-root user for security
USER node

# Expose the port of Express app
EXPOSE 8001

# Use pm2-runtime to keep the container alive in the foreground
CMD ["pm2-runtime", "start","ecosystem.config.cjs"]