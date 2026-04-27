# Contributing to Shirofolio

Thank you for your interest in contributing to Shirofolio! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Submitting Changes](#submitting-changes)
- [Reporting Issues](#reporting-issues)

## 🤝 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to [hello@adrielzimbril.com](mailto:hello@adrielzimbril.com).

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm/yarn
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/shirofolio.git
   cd shirofolio
   ```
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Copy environment variables:
   ```bash
   cp .env.example .env.local
   ```
5. Configure your environment variables in `.env.local`
6. Start the development server:
   ```bash
   pnpm dev
   ```

## 🔄 Development Workflow

### Branching

- Create a new branch for your feature or bugfix:
  ```bash
  git checkout -b feature/your-feature-name
  # or
  git checkout -b fix/your-bugfix-name
  ```

### Making Changes

1. Follow the [Coding Standards](#coding-standards)
2. Make your changes
3. Test thoroughly
4. Commit with clear messages:
   ```bash
   git commit -m "feat: add new feature"
   # or
   git commit -m "fix: resolve issue with component"
   ```

### Commit Message Convention

We follow conventional commits:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

Example:

```
feat: add dark mode toggle to navigation

- Add theme toggle component
- Update localStorage persistence
- Add theme transition animations
```

## 📐 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Enable strict mode
- Avoid `any` types when possible
- Use proper type definitions

### Code Style

- Follow existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

### Components

- Use functional components with hooks
- Follow the existing component structure
- Reuse existing components before creating new ones
- Extract shared components when appropriate

### Internationalization (i18n)

- All new UI text must be added to translation files
- Add keys to all language files (`fr.json`, `en.json`, `zh-CN.json`)
- Use `useTranslations()` for client components
- Use `getTranslations()` for server components
- French is the source language

### Logging

- Use `logger` from `@/utils/logger` instead of `console`
- Use appropriate log levels: `logger.error()`, `logger.warn()`, `logger.info()`

### File Organization

- Follow the existing project structure
- Place files in appropriate directories
- Use descriptive file names

## ✅ Submitting Changes

### Pull Request Process

1. Update your branch with the latest main:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```
2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Create a Pull Request on GitHub
4. Fill in the PR template
5. Wait for review

### PR Requirements

- Clear description of changes
- Link to related issues
- Tests for new features (if applicable)
- Updated documentation (if needed)
- All checks passing

### Review Process

- Maintainers will review your PR
- Address any feedback
- Once approved, your PR will be merged

## 🐛 Reporting Issues

### Bug Reports

When reporting a bug, please include:

- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (OS, browser, Node version)
- Relevant code snippets

### Feature Requests

When suggesting a feature, please include:

- Clear description of the feature
- Use case or problem it solves
- Possible implementation approach
- Examples or references (if applicable)

## 📝 Documentation

- Keep documentation up to date
- Add comments for complex code
- Update README if changes affect user-facing features
- Document new components or modules

## 🧪 Testing

- Test your changes thoroughly
- Test on different browsers if UI changes
- Test responsive design if layout changes
- Verify i18n translations if text changes

## 💡 Tips

- Start with small, focused changes
- Ask questions if unsure
- Review existing code for patterns
- Be patient with the review process

## 📧 Contact

For questions or discussions:

- Email: [hello@adrielzimbril.com](mailto:hello@adrielzimbril.com)
- GitHub Issues: Use the issue tracker

---

Thank you for contributing to Shirofolio! 🚀
