---
name: shirofolio-workflow
description: Apply Shirofolio conventions for quests/talks/thoughts, premium FR-first copy, reusable UI patterns, i18n parity, and UTF-8-safe delivery.
---

1. Reuse existing modules and styles before creating new patterns (`submit`, `resources`, `talks`, `quests`).
2. Respect naming conventions:
   - thoughts = blog
   - talks = masterclasses
   - quests = challenges
3. Keep quests flow split across dedicated pages:
   - details `/quests/[slug]`
   - registration `/quests/[slug]/register`
   - submission `/quests/[slug]/submit`
4. Enforce date gates:
   - registration closed state
   - submission closed state
   - no submission after deadline
5. For reusable UX feedback, prefer shared modal components over toasts.
6. Keep copy quality high:
   - French first, clean, premium tone
   - emoji-friendly where thematic
7. For any new translation key, update all locales:
   - `src/integrations/i18n/translations/fr.json`
   - `src/integrations/i18n/translations/en.json`
   - `src/integrations/i18n/translations/zh-CN.json`
8. Use `useTranslations()` for client components and `getTranslations()` for server components (next-intl).
9. Prefer MDX for editorial challenge data (winners, rewards, participants showcase) unless backend requirement is explicit.
10. Validate output before closing:

- `pnpm exec tsc --noEmit`
- `pnpm lint` if relevant

11. Ensure UTF-8 integrity and remove mojibake artifacts.
