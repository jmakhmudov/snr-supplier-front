# Use Node.js 18 on Alpine Linux as base image
FROM node:18-alpine AS base

# Install libc6-compat for compatibility
RUN apk add --no-cache libc6-compat

# Set working directory in the container
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Stage: Build the source code
FROM base AS builder
WORKDIR /app
COPY --from=base /app/node_modules ./node_modules
COPY . .

# Build the Next.js application
RUN \
  if [ -f yarn.lock ]; then yarn run build; \
  elif [ -f package-lock.json ]; then npm run build; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm run build; \
  else echo "Lockfile not found." && exit 1; \
  fi

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Add user and group for running the app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy public directory
COPY --from=builder /app/public ./public

# Set ownership and permissions for .next directory
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Copy built Next.js files
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Expose the port that the app will run on
EXPOSE 3000

# Switch to non-root user
USER nextjs

# Command to start the application (use next start if not using a custom server.js)
CMD ["npm", "run", "start"]
