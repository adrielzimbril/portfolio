# AGENTS Guidance - Shirofolio

This file contains durable instructions for Codex in this repo.
Keep it short, specific, and updated whenever user feedback corrects an assumption.

## Core Workflow

- When user corrects a coding/content assumption, update this file in the same task.
- Prefer existing project patterns over creating new patterns.
- Keep changes focused and reviewable.

## Build / Validation

- Type check: `pnpm exec tsc --noEmit`
- Lint (if needed): `pnpm lint`
- For content/i18n/email edits, always validate rendered text (accents + emojis).

## Project Conventions

- Naming:
  - `thoughts` = blog
  - `talks` = masterclasses/talks
  - `quests` = challenges (route in EN, FR copy can say "challenge")
- Quests flow:
  - info page
  - register page (`/quests/[slug]/register`)
  - submit page (`/quests/[slug]/submit`)
  - respect registration/submission deadlines
- MDX-first for editorial quest data (`rewards`, `winners`) unless backend is explicitly required.

## UI / Components

- Reuse design-system and existing modules (`submit`, `resources`, `talks`, `quests`).
- If a UI block is needed in multiple places, extract a shared component.
- For quest participants stats, use shared component style (avatars + count + breakdown), reusable in cards and inner header.

## Copy / Content

- Default writing language: French.
- Tone: concise, premium, human, action-oriented.
- Emojis are part of the brand style; keep them intentional and thematic.
- Admin mail labels/text must stay admin-oriented and professional.

## i18n Rules

- Any new key used in UI/mail must exist in:
  - `fr.json`
  - `en.json`
  - `zh-CN.json`
- If FR source text is corrected, EN/ZH must be translated from that FR source intent.

## Encoding Safety (Critical)

- Save text files as UTF-8.
- In PowerShell writes, use `-Encoding utf8`.
- Never leave mojibake sequences in final files (examples: `Ã©`, `ðŸ`, `â€™`).

## Skills / Repeatable Procedures

Use repo skills/process docs for repeatable workflows (release, review routine, docs updates).
When a workflow becomes recurrent, encode it as durable guidance here.
