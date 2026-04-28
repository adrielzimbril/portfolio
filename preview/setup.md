# 🚀 Installation & Setup

## 📋 Prerequisites

- **Node.js**: version 18 or higher
- **Package Manager**: pnpm (highly recommended) or npm/yarn
- **Supabase Account**: required for backend features (community, quests, etc.)
- **Trigger.dev Account**: optional, for background tasks

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

The project uses a strict validation system for environment variables. On startup, the application checks for required variables and logs warnings/errors if any are missing or invalid.

### Required variables (Quick Start):
Copy `.env.example` to `.env.local` and fill in at least these values to get started:

```env
# Application URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Authentication Provider (Options: "supabase" or "betterauth")
AUTH_PROVIDER="supabase"

# Supabase (Database & Auth)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### Environment Validation
The validation logic is located in **`src/config/validate-environment-variables.ts`**. It uses **Zod** to ensure:
- **Type Safety**: Variables are validated against a schema (URLs, strings, enums).
- **Default Values**: Many variables have sensible defaults (e.g., `PORT: 3000`, `NODE_ENV: production`).
- **Logging**: In development, the `logger` will notify you of any missing optional variables.

> 💡 **Tip**: Refer to the extensive comments in **`.env.example`** for a full list of all available variables and how to obtain their values.

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
