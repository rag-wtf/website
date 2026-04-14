# ---- Base Stage ----
FROM node:18-alpine AS base
RUN apk add --no-cache libc6-compat
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable && corepack prepare pnpm@latest --activate

# ---- Dependencies Stage ----
FROM base AS deps
WORKDIR /app

# Copy lockfile and package manifest for reproducible installs
COPY package.json pnpm-lock.yaml ./

# Install all dependencies (including optional native binaries for linux-musl-x64)
RUN pnpm install --frozen-lockfile

# ---- Builder Stage ----
FROM base AS builder
WORKDIR /app

# Copy installed node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the source
COPY . .

# Build the Next.js application (outputs static files to /app/out)
RUN pnpm run build

# ---- Run Stage ----
FROM nginx:alpine AS runner

# Copy exported static site into nginx html directory
COPY --from=builder /app/out /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
