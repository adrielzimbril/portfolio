# 🚀 Installation & Setup

## 📋 Prerequisites

- **Node.js**: version 18 or higher
- **Package Manager**: pnpm (highly recommended) or npm/yarn
- **Supabase Account**: required for backend features (community, quests, etc.)

## 🛠️ Installation Instructions

```bash
# Clone the repository
git clone [repo-url]

# Navigate to the project directory
cd shirofolio

# Install dependencies
pnpm install

# Copy the environment example file
cp .env.example .env.local

# Start the development server
pnpm dev

# For development with Trigger.dev (scheduled tasks)
pnpm run dev:all
```

## ⚙️ Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values.

### Required variables:
```env
# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Better Auth (Authentication)
BETTER_AUTH_SECRET=your-secure-secret

# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Optional variables:
- **GitHub**: `NEXT_PRIVATE_GITHUB_TOKEN`, `NEXT_PUBLIC_GITHUB_USERNAME`
- **Email**: `BREVO_API_KEY`, `RESEND_API_KEY`
- **S3 Storage**: `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- **Analytics**: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- **Trigger.dev**: `TRIGGER_ACCESS_TOKEN`, `NEXT_TRIGGER_PUBLIC_APP_URL`

## 🗄️ Supabase Commands

The project includes several scripts to manage the database schema and types.

```bash
# Push local migrations to remote database
pnpm db:push

# Generate TypeScript types from the database schema
pnpm db:types

# Reset local database (Docker required for local env)
pnpm db:reset

# Compare local migrations with remote state
pnpm db:diff
```
