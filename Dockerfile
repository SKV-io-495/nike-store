# Stage 1: Dependency Installation
# (This stage is correct)
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm install

# Stage 2: Builder
# (This stage is correct)
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ARG DATABASE_URL
ENV DATABASE_URL=${DATABASE_URL}
RUN npm run db:generate
RUN npm run build

# Stage 3: Runner (FIXED)
# This is the final, lightweight image that will run in production.
FROM node:20-alpine AS runner
WORKDIR /app

# Set the environment to production
ENV NODE_ENV=production

# Create a non-root user
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# --- FIXES START HERE ---

# Copy package.json to install only production dependencies
COPY --from=builder /app/package.json ./package.json

# Install *only* production dependencies
RUN npm install --production

# Copy the built app from the 'builder' stage
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# Copy your custom file
COPY --from=builder --chown=nextjs:nodejs /app/homepage-product-ids.txt ./

# Set the user to the non-root user
USER nextjs

# Start the Next.js server using the script from package.json
CMD ["npm", "start"]

# --- FIXES END HERE ---