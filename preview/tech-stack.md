# 🛠️ Tech Stack & Structure

## 🛠️ Technology Stack

### Core
- **Framework**: Next.js 16 (App Router)
- **Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4

### Backend & Services
- **Database**: Supabase
- **Authentication**: Better Auth
- **Scheduled Tasks**: Trigger.dev
- **Email**: Brevo / Resend / React Email

### UI & UX
- **Components**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Scrolling**: Lenis
- **Forms**: React Hook Form + Zod
- **Content**: Content Collections (MDX)
- **Internationalization**: next-intl

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
│   ├── api/               # API routes for backend logic
│   ├── landlord/          # Admin section (dashboard)
│   ├── image-proxy/       # Image proxy service
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout
│   └── metadata.ts        # Global SEO metadata
├── components/            # Reusable React components
│   ├── aurthle/          # Specialized components
│   ├── landlord/         # Admin-specific components
│   ├── shared/           # Cross-page shared components
│   └── ui/               # Core UI primitives (Radix UI)
├── config/               # Application configuration files
├── content/              # Static MDX content (Blog, Projects, etc.)
├── data/                 # Static data and local configuration
├── hooks/                # Custom React hooks
├── integrations/         # External service integrations (Supabase, i18n)
├── lib/                  # Library configurations and helpers
├── types/                # Global TypeScript definitions
└── utils/                # General utility functions
```

## 🎨 Styles

The project uses **Tailwind CSS 4** with a customized design system.
- Global styles are located in `src/app/globals.css`.
- Custom design tokens (colors, animations, fonts) are defined using CSS variables and Tailwind's modern `@theme` directive.
