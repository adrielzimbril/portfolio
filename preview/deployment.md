# 🛰️ Deployment Guide

The project is optimized for deployment on **Vercel**, but can be hosted on any platform that supports Next.js.

## 🚀 Deploying to Vercel

1. **Push your code**: Ensure your repository is up to date on GitHub, GitLab, or Bitbucket.
2. **Create a new project**: In your Vercel dashboard, click "New Project" and import your repository.
3. **Configure Environment Variables**: Add all required variables (see [Setup & Configuration](setup.md)).
4. **Deploy**: Click "Deploy" and wait for the build to complete.

## ⚙️ Scheduled Tasks (Trigger.dev)

For background jobs and scheduled tasks (like analytics updates or community cleanups):

1. **Setup Trigger.dev**: Create an account and a new project.
2. **Link to Vercel**: Use the Trigger.dev integration or manually add the `TRIGGER_ACCESS_TOKEN` to your Vercel environment variables.
3. **Configure Webhooks**: Ensure the `NEXT_TRIGGER_PUBLIC_APP_URL` is correctly set to your production URL.

## 🗄️ Database Migrations

Don't forget to push your local database schema to your production Supabase instance:

```bash
pnpm db:push
```
