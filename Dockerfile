# ================================================================
# Dockerfile — Multi-stage build untuk Next.js Portfolio
#
# Stages:
#   deps      → Install node_modules
#   migration → Lightweight image khusus untuk prisma migrate
#   builder   → Compile Next.js (standalone output)
#   runner    → Production image yang ramping (~150MB)
# ================================================================

# ── Stage 1: Install semua dependencies ───────────────────────────
FROM node:20-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --frozen-lockfile

# ── Stage 2: Migration runner (lightweight) ───────────────────────
# Image khusus untuk menjalankan `prisma migrate deploy`.
# Digunakan oleh service `migrate` di docker-compose.yml.
FROM node:20-alpine AS migration
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY prisma ./prisma

CMD ["npx", "prisma", "migrate", "deploy"]

# ── Stage 3: Build Next.js app ────────────────────────────────────
FROM node:20-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client (diperlukan saat build)
RUN npx prisma generate

# Build Next.js dengan output standalone
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ── Stage 4: Production runner ────────────────────────────────────
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Buat non-root user untuk keamanan
RUN addgroup --system --gid 1001 nodejs \
 && adduser  --system --uid 1001 nextjs

# Salin Prisma client (runtime dependency)
COPY --from=builder /app/node_modules/.prisma    ./node_modules/.prisma
COPY --from=builder /app/node_modules/@prisma    ./node_modules/@prisma

# Salin Next.js standalone output + static files
COPY --from=builder /app/public                                    ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone    ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static        ./.next/static

# Pastikan uploads directory ada dan bisa ditulis oleh nextjs user
RUN mkdir -p ./public/uploads && chown -R nextjs:nodejs ./public

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
