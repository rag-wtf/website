# Coolify Deployment Guide

This guide provides step-by-step instructions to deploy the Next.js web application to Coolify from a GitHub repository.

## Prerequisites

Before you begin, ensure you have:

1. **GitHub Repository**: Your application code pushed to a GitHub repository
2. **Coolify Instance**: Access to a Coolify instance (self-hosted or Coolify Cloud)
3. **Docker Knowledge**: Basic understanding of Docker containers
4. **Domain Name** (Optional): Custom domain for your application
5. **Database** (Optional): External database if your app uses one

## Step 1: Prepare Your GitHub Repository

### 1.1 Ensure Repository Structure
Your repository should contain:
- `package.json` with build and start scripts
- `next.config.ts` or `next.config.js`
- `tsconfig.json` (for TypeScript projects)
- `prisma/schema.prisma` (if using Prisma)
- `Dockerfile` (we'll create this)

### 1.2 Verify Package.json Scripts
Ensure your `package.json` has the necessary scripts:

```json
{
  "scripts": {
    "dev": "nodemon --exec \"npx tsx server.ts\" --watch server.ts --watch src --ext ts,tsx,js,jsx 2>&1 | tee dev.log",
    "build": "next build",
    "start": "NODE_ENV=production tsx server.ts 2>&1 | tee server.log",
    "lint": "next lint"
  }
}
```

### 1.3 Create a Dockerfile
Create a `Dockerfile` in your project root:

```dockerfile
# Use official Node.js runtime as base image
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the application
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### 1.4 Create .dockerignore
Create a `.dockerignore` file:

```
Dockerfile
.dockerignore
node_modules
npm-debug.log
README.md
.env
.next
.git
.gitignore
*.md
.DS_Store
*.log
coverage
.vscode
.idea
```

### 1.5 Update Next.js Configuration
Ensure your `next.config.ts` supports standalone output:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  experimental: {
    // This is required for the standalone output
    serverComponentsExternalPackages: ['sharp'],
  },
  // Add any other configuration you need
};

export default nextConfig;
```

### 1.6 Commit and Push Changes
```bash
git add Dockerfile .dockerignore next.config.ts
git commit -m "Add Docker configuration for Coolify deployment"
git push origin main
```

## Step 2: Set Up Coolify

### 2.1 Access Coolify Dashboard
- Navigate to your Coolify instance URL
- Log in with your credentials

### 2.2 Create a New Project
1. Click on "Projects" in the sidebar
2. Click "Create Project"
3. Enter a project name (e.g., "Next.js Web App")
4. Click "Create Project"

### 2.3 Add a New Service
1. Inside your project, click "Add Service"
2. Select "Docker" as the service type
3. Choose "From GitHub Repository" as the source

## Step 3: Configure GitHub Integration

### 3.1 Connect GitHub Account
1. Click "Connect GitHub Account"
2. Authorize Coolify to access your GitHub repositories
3. Select the repository containing your application

### 3.2 Configure Repository Settings
- **Repository**: Select your repository from the dropdown
- **Branch**: Choose the branch to deploy (usually `main` or `master`)
- **Build Context**: Leave as `/` (root directory)
- **Dockerfile Path**: Ensure it points to `Dockerfile`

## Step 4: Configure Application Settings

### 4.1 Basic Configuration
- **Service Name**: Enter a name for your service (e.g., "nextjs-app")
- **Environment**: Choose `Production`

### 4.2 Port Configuration
- **Container Port**: Set to `3000` (matching your application's port)
- **Public Port**: Coolify will automatically assign a port or you can specify one

### 4.3 Build Arguments (if needed)
If you need specific build arguments, add them:
```
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
```

### 4.4 Environment Variables
Add necessary environment variables:

```bash
# Application
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0

# Database (if using Prisma)
DATABASE_URL="file:./dev.db" # or your production database URL

# Next.js specific
NEXT_TELEMETRY_DISABLED=1

# Any other environment variables your app needs
```

## Step 5: Configure Database (if applicable)

### 5.1 Add Database Service
1. In your project, click "Add Service"
2. Select "Database"
3. Choose your database type (e.g., PostgreSQL, MySQL, SQLite)

### 5.2 Configure Database Connection
1. Once the database is created, note the connection details
2. Update your application's environment variables with the database URL:
   ```
   DATABASE_URL="postgresql://username:password@hostname:port/database"
   ```

### 5.3 Run Database Migrations
Add a post-deployment script to run migrations:

```bash
# In your Coolify service configuration, add a post-deployment command:
npx prisma migrate deploy
npx prisma generate
```

## Step 6: Configure Domain and SSL

### 6.1 Set Up Custom Domain
1. Go to your service settings
2. Navigate to "Domains" tab
3. Click "Add Domain"
4. Enter your domain name (e.g., `app.yourdomain.com`)
5. Click "Add Domain"

### 6.2 Configure SSL
1. Coolify will automatically provision SSL certificates for your domain
2. Ensure "Force HTTPS" is enabled
3. Wait for the SSL certificate to be issued (usually takes a few minutes)

## Step 7: Configure Auto-Deploy

### 7.1 Set Up Webhook
1. In your service settings, navigate to "Auto-Deploy" tab
2. Enable "Auto-Deploy on Push"
3. Select the branch to watch (e.g., `main`)
4. Coolify will automatically set up a GitHub webhook

### 7.2 Test Auto-Deploy
1. Make a small change to your code
2. Commit and push to GitHub:
   ```bash
   echo "test deployment" >> test.txt
   git add test.txt
   git commit -m "Test auto-deploy"
   git push origin main
   ```
3. Check Coolify dashboard for deployment status

## Step 8: Configure Health Checks

### 8.1 Add Health Check Endpoint
Ensure your application has a health check endpoint. If not, add one:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
}
```

### 8.2 Configure Health Check in Coolify
1. In service settings, navigate to "Health Check" tab
2. Set:
   - **Path**: `/api/health`
   - **Interval**: `30` seconds
   - **Timeout**: `10` seconds
   - **Retries**: `3`
3. Enable health check

## Step 9: Configure Resource Limits

### 9.1 Set Resource Constraints
1. In service settings, navigate to "Resources" tab
2. Configure:
   - **Memory Limit**: `512MB` or `1GB` (based on your app's needs)
   - **CPU Limit**: `0.5` or `1` core
   - **Restart Policy**: `Unless Stopped`

### 9.2 Configure Scaling (Optional)
If you need multiple instances:
1. Enable "Auto-Scaling"
2. Set minimum and maximum instances
3. Configure CPU/Memory thresholds for scaling

## Step 10: Monitor and Troubleshoot

### 10.1 View Logs
1. In Coolify dashboard, navigate to your service
2. Click on "Logs" tab
3. View real-time logs or download log files

### 10.2 Monitor Metrics
1. Navigate to "Metrics" tab
2. Monitor CPU, memory, and network usage
3. Set up alerts if needed

### 10.3 Common Issues and Solutions

#### Build Failures
- **Issue**: Build process fails
- **Solution**: Check build logs, ensure all dependencies are in package.json, verify Dockerfile syntax

#### Port Conflicts
- **Issue**: Application fails to start due to port conflicts
- **Solution**: Ensure container port (3000) is correctly mapped and not in use

#### Environment Variables
- **Issue**: Application can't access environment variables
- **Solution**: Verify all required variables are set in Coolify configuration

#### Database Connection
- **Issue**: Application can't connect to database
- **Solution**: Verify DATABASE_URL, ensure database service is running, check network policies

## Step 11: Backup and Recovery

### 11.1 Configure Backups
1. Navigate to project settings
2. Enable "Automatic Backups"
3. Set backup frequency (daily, weekly)
4. Configure retention policy

### 11.2 Test Recovery
1. Test backup restoration process
2. Verify data integrity after restoration

## Step 12: Security Best Practices

### 12.1 Security Configuration
1. Enable "Read-only Filesystem" if applicable
2. Configure network policies to restrict access
3. Use secrets for sensitive environment variables

### 12.2 Update Management
1. Regularly update base Docker images
2. Monitor for security vulnerabilities in dependencies
3. Keep Coolify instance updated

## Deployment Checklist

- [ ] Repository prepared with Dockerfile and .dockerignore
- [ ] Next.js configured for standalone output
- [ ] GitHub repository connected to Coolify
- [ ] Service configured with correct ports and environment variables
- [ ] Database configured (if applicable)
- [ ] Domain and SSL configured
- [ ] Auto-deploy webhook set up and tested
- [ ] Health checks configured
- [ ] Resource limits set appropriately
- [ ] Monitoring and logging configured
- [ ] Backup strategy implemented
- [ ] Security measures in place

## Troubleshooting Quick Reference

| Issue | Symptom | Solution |
|-------|----------|----------|
| Build fails | Error during docker build | Check build logs, verify Dockerfile |
| App crashes | Container exits unexpectedly | Check application logs, verify environment variables |
| Port conflict | Service fails to start | Ensure port 3000 is available and correctly mapped |
| Database connection | App can't reach database | Verify DATABASE_URL, check database service status |
| SSL issues | HTTPS not working | Wait for certificate issuance, check domain configuration |

## Support Resources

- [Coolify Documentation](https://coolify.io/docs)
- [Next.js Deployment Docs](https://nextjs.org/docs/deployment)
- [Docker Documentation](https://docs.docker.com/)
- [GitHub Actions Docs](https://docs.github.com/en/actions)

---

This guide covers the complete deployment process for your Next.js application to Coolify. If you encounter any issues not covered here, please refer to the official documentation or community forums for additional support.