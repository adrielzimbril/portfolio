# Portfolio - Adriel Zimbril

## 🚀 About

Professional portfolio of **Adriel Zimbril**, passionate and creative Fullstack Developer. This portfolio showcases my skills, projects, and expertise in modern web development, with a particular focus on user experience and performance.

## ✨ Features

### 🎨 Design & UX

- **Modern and responsive design** adapted to all devices
- **Dark/light mode** with smooth transition
- **Fluid animations** for an immersive user experience
- **Intuitive interface** with clear and structured navigation
- **Performance optimization** with Next.js and Turbopack

### 📱 Main Sections

1. **Home** - Personal presentation and showcase of projects, resources, reflections
2. **Projects** - Portfolio of achievements with technical details
3. **About** - Professional background and skills
4. **Reflections (Blog)** - Articles and thoughts on development
5. **Resources (Hub)** - Courses, e-books, videos, templates, code
6. **Challenges (Quests)** - Creative challenges with registration and submission
7. **Conferences (Talks)** - Masterclasses and online sessions
8. **Connections** - Network and people met
9. **Contact** - Contact form and social networks
10. **Guestbook (Community)** - Visitor messages
11. **Statistics** - Site metrics and performance
12. **Changelog** - Evolution history
13. **Newsletter** - Newsletter subscription
14. **Submit a project** - Form for ShiroSaaS Lab
15. **Tools (Toolbox)** - Development stack and setup
16. **Site Map (Routes)** - Complete navigation
17. **RSS** - Site RSS feeds
18. **Legal** - Privacy policy and Terms of Use

### 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: API Routes, Server Components
- **Database**: Supabase
- **Authentication**: Better Auth
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions
- **Scheduled Tasks**: Trigger.dev
- **Other tools**: Radix UI, React Hook Form, Zod, React Email, Motion, Lenis

## 🚀 Installation and Setup

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Supabase account (for backend features)

### Installation Instructions

```bash
# Clone the repository
git clone [repo-url]

# Navigate to the project directory
cd shirofolio

# Install dependencies
pnpm install

# Copy the environment example file
cp .env.example .env.local

# Configure environment variables in .env.local

# Start the development server
pnpm dev

# For development with Trigger.dev (scheduled tasks)
pnpm run dev:all
```

## 🏗️ Project Structure

```
src/
├── app/                    # Application routes (App Router)
│   ├── (base)/            # Base layout with navigation
│   │   ├── (home)/        # Home page
│   │   ├── about/         # About page
│   │   ├── changelog/     # Changelog page
│   │   ├── community/     # Guestbook page
│   │   ├── connections/   # Connections page
│   │   ├── contact/       # Contact page
│   │   ├── hub/           # Resources page
│   │   ├── legal/         # Legal pages (privacy, terms)
│   │   ├── newsletter/    # Newsletter page
│   │   ├── projects/      # Projects page
│   │   ├── quests/        # Challenges page
│   │   ├── routes/        # Site map page
│   │   ├── rss/           # RSS pages
│   │   ├── stats/         # Statistics page
│   │   ├── submit/        # Submit project page
│   │   ├── talks/         # Conferences page
│   │   ├── thoughts/      # Blog page (reflections)
│   │   └── toolbox/       # Tools/Setup page
│   ├── api/               # API routes
│   ├── landlord/          # Admin section (dashboard)
│   ├── image-proxy/       # Image proxy
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── metadata.ts        # Global metadata
├── components/            # Reusable components
│   ├── aurthle/          # Aurthle components
│   ├── landlord/         # Admin components
│   ├── shared/           # Shared components
│   └── ui/               # UI components (Radix UI)
├── config/               # Application configuration
├── content/              # Static content (MDX, changelog, etc.)
├── data/                 # Static data (routes, config, etc.)
├── hooks/                # Custom React hooks
├── integrations/         # Integrations (Supabase, i18n, etc.)
├── lib/                  # Utilities and helpers
├── types/                # TypeScript definitions
└── utils/                # Various utilities
```

## 🎨 Customization

### Environment Variables

**Required variables for development:**

```env
# Application URL (required)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# If using Better Auth (recommended):
BETTER_AUTH_SECRET=your-secure-secret

# If using Supabase:
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

**Optional variables (for advanced features):**

```env
# GitHub (for GitHub stats)
NEXT_PRIVATE_GITHUB_TOKEN=your-github-token
NEXT_PUBLIC_GITHUB_USERNAME=your-username
NEXT_PUBLIC_GITHUB_REPO=your-repo

# Email (Brevo or Resend)
BREVO_API_KEY=your-brevo-key
RESEND_API_KEY=your-resend-key

# S3 Storage (for avatars, backups)
S3_ACCESS_KEY_ID=your-s3-key
S3_SECRET_ACCESS_KEY=your-s3-secret
S3_ENDPOINT=your-s3-endpoint
S3_REGION=your-s3-region

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=your-ga-id

# Scheduled tasks (Trigger.dev)
TRIGGER_ACCESS_TOKEN=your-trigger-token
NEXT_TRIGGER_PUBLIC_APP_URL=your-trigger-url
```

For a complete list, see the `.env.example` file.

### Supabase Commands

```bash
# Apply local migrations to remote database
pnpm db:push

# Generate TypeScript types from linked database
pnpm db:types

# Reset local database
pnpm db:reset

# View differences between local migrations and remote database
pnpm db:diff
```

### Styles

The project uses Tailwind CSS with custom colors and utilities. Global styles are in `src/app/globals.css`.

## 🌍 Translations (next-intl)

The project uses `next-intl` for internationalization.

- Translation files are in `src/integrations/i18n/translations/`
- Supported languages: `fr.json`, `en.json`, `zh-CN.json`
- Use `useTranslations()` in client components
- Use `getTranslations()` in server components

To add a new translation key:

1. Add the key in `fr.json` (source)
2. Translate in `en.json` and `zh-CN.json`
3. Use the key in your component

## 🌌 Let's meet in space (or on Earth) 🚀

I'm always happy to discuss new projects, collaborations, or simply exchange creative ideas. Here's how to contact me:

- **📧 Email**: [contact@adrielzimbril.com](mailto:contact@adrielzimbril.com)
- **🌐 Website**: [https://www.adrielzimbril.com](https://www.adrielzimbril.com)
- **🐦 Twitter**: [https://twitter.com/adrielzimbril](https://twitter.com/adrielzimbril)
- **💼 LinkedIn**: [https://www.linkedin.com/in/adrielzimbril](https://www.linkedin.com/in/adrielzimbril)
- **🐱‍💻 GitHub**: [https://github.com/adrielzimbril](https://github.com/adrielzimbril)

### 🐼 Fun Facts

- 🚀 Passionate about space exploration and technology
- 🐼 Love pandas (and animals in general!)
- 🎨 Creative at heart, whether in design or code
- ☕ Addicted to coffee and complex technical challenges

## 🛰️ Deployment

The project is configured to be deployed on Vercel. To deploy:

1. 🚀 Push your code to GitHub/GitLab
2. 🌌 Create a new project on Vercel
3. 🔗 Connect your repository
4. ⚙️ Configure environment variables
5. 🚀 Blast off!

> 💡 For scheduled tasks, make sure to configure Trigger.dev with your Vercel instance.

## 🌟 Join the Adventure

If you like this project, feel free to:

- ⭐ Star the project
- 🐞 Report bugs
- ✨ Suggest improvements
- 🚀 Share with other enthusiasts

## 📄 License

This project is under the MIT license. Feel free to use it as a base for your own portfolio or project.

---

**Developed with ❤️ by Adriel Zimbril**  
_Product Designer & Fullstack Developer_  
🚀 Digital Universe Explorer | 🐼 Panda Friend | 🎨 Passionate Creator
