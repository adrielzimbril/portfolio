# ✨ Features & Tech Stack

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

## 🎨 Design & UX Features

- **Modern and responsive design** adapted to all devices (Mobile, Tablet, Desktop)
- **Dark/light mode** with smooth transition and system preference detection
- **Fluid animations** powered by Motion and Lenis
- **Intuitive interface** with clear and structured navigation
- **Performance optimization** with Next.js 16 and Turbopack
- **Accessibility** ensured by Radix UI primitives

## 📱 Main Sections

1. **Home** - Personal presentation and showcase of projects, resources, reflections
2. **Projects** - Portfolio of achievements with technical details and case studies
3. **About** - Professional background, skills, and interactive fun facts
4. **Reflections (Blog)** - Articles and thoughts on development with MDX support
5. **Resources (Hub)** - Courses, e-books, videos, templates, and code snippets
6. **Challenges (Quests)** - Creative challenges with registration and submission system
7. **Conferences (Talks)** - Masterclasses, webinaires, and online sessions
8. **Connections** - Network and people met in the creative community
9. **Contact** - Contact form with automated notifications
10. **Guestbook (Community)** - Real-time visitor messages on an infinite canvas
11. **Statistics** - Site metrics, analytics, and GitHub contribution graphs
12. **Changelog** - Evolution history and release notes
13. **Newsletter** - Newsletter subscription system
14. **Submit a project** - Specialized form for ShiroSaaS Lab reviews
15. **Tools (Toolbox)** - Detailed development stack and hardware setup
16. **Site Map (Routes)** - Complete navigation overview
17. **RSS** - RSS feeds for blog and resources
18. **Legal** - Privacy policy and Terms of Use

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

> For a full breakdown of the file structure, please check the source code directly.
