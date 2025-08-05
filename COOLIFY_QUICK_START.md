# Coolify Quick Start Guide

## Prerequisites
- GitHub repository with your code
- Access to Coolify instance
- Domain name (optional)

## Step 1: Prepare Repository
```bash
# Ensure your repository has:
- package.json (with build/start scripts)
- next.config.ts (with output: 'standalone')
- Dockerfile (provided)
- .dockerignore (provided)
```

## Step 2: Coolify Setup
1. **Create Project**: Dashboard → Projects → Create Project
2. **Add Service**: Project → Add Service → Docker → From GitHub
3. **Connect GitHub**: Authorize and select your repository
4. **Configure Service**:
   - Name: `nextjs-app`
   - Branch: `main`
   - Port: `3000`

## Step 3: Environment Variables
```bash
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
DATABASE_URL="file:./dev.db" # or your production DB
NEXT_TELEMETRY_DISABLED=1
```

## Step 4: Deploy
1. **Manual Deploy**: Click "Deploy" in Coolify dashboard
2. **Auto-Deploy**: Enable webhook in service settings

## Step 5: Domain & SSL
1. **Add Domain**: Service → Domains → Add Domain
2. **SSL**: Automatically provisioned by Coolify

## Step 6: Health Check
- Path: `/api/health`
- Interval: 30s
- Timeout: 10s
- Retries: 3

## Common Commands
```bash
# Build and test locally
docker build -t nextjs-app .
docker run -p 3000:3000 nextjs-app

# Check logs in Coolify
# Dashboard → Service → Logs
```

## Troubleshooting
- **Build fails**: Check Dockerfile syntax and dependencies
- **App crashes**: Check environment variables and port configuration
- **Database issues**: Verify DATABASE_URL and database service status

## Support
- [Coolify Docs](https://coolify.io/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)