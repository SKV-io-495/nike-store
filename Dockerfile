# Stage 1: Dependency Installation
# This stage installs all the necessary npm packages.
FROM node:20-alpine AS deps
WORKDIR /app

# Copy package.json and lock files
COPY package.json package-lock.json* ./
# Install dependencies
RUN npm install

# Stage 2: Builder
# This stage builds the Next.js application.
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependencies from the 'deps' stage
COPY --from=deps /app/node_modules ./node_modules
# Copy the rest of the application code
COPY . .

# Set the DATABASE_URL build argument (we'll handle the real one at runtime)
# This is needed for Drizzle to generate the schema during the build.
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}

# Generate the Drizzle schema and build the app
RUN npm run db:generate
RUN npm run build

# Stage 3: Runner
# This is the final, lightweight image that will run in production.
FROM node:20-alpine AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the standalone Next.js server output from the builder stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Set the user to the non-root user
USER nextjs

# Start the Next.js server
CMD ["node", "server.js"]
