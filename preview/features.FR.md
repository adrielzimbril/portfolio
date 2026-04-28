# ✨ Fonctionnalités & Stack Technique

## 🛠️ Stack Technologique

### Core
- **Framework**: Next.js 16 (App Router)
- **Bibliothèque**: React 19
- **Langage**: TypeScript
- **Stylisation**: Tailwind CSS 4

### Backend & Services
- **Base de données**: Supabase
- **Authentification**: Better Auth
- **Tâches planifiées**: Trigger.dev
- **Email**: Brevo / Resend / React Email

### UI & UX
- **Composants**: Radix UI
- **Animations**: Motion (Framer Motion)
- **Défilement**: Lenis
- **Formulaires**: React Hook Form + Zod
- **Contenu**: Content Collections (MDX)
- **Internationalisation**: next-intl

## 🎨 Design & Fonctionnalités UX

- **Design moderne et responsive** adapté à tous les appareils (Mobile, Tablette, Bureau)
- **Mode sombre/clair** avec transition fluide et détection des préférences système
- **Animations fluides** propulsées par Motion et Lenis
- **Interface intuitive** avec une navigation claire et structurée
- **Optimisation des performances** avec Next.js 16 et Turbopack
- **Accessibilité** assurée par les primitives Radix UI

## 📱 Sections Principales

1. **Accueil** - Présentation personnelle et vitrine des projets, ressources, réflexions
2. **Projets** - Portfolio de réalisations avec détails techniques et études de cas
3. **À propos** - Parcours professionnel, compétences et anecdotes interactives
4. **Réflexions (Blog)** - Articles et pensées sur le développement avec support MDX
5. **Ressources (Hub)** - Formations, e-books, vidéos, templates et extraits de code
6. **Challenges (Quests)** - Défis créatifs avec système d'inscription et de soumission
7. **Conférences (Talks)** - Masterclasses, webinaires et sessions en ligne
8. **Connexions** - Réseau et personnes rencontrées dans la communauté créative
9. **Contact** - Formulaire de contact avec notifications automatisées
10. **Livre d'or (Community)** - Messages des visiteurs en temps réel sur un canevas infini
11. **Statistiques** - Métriques du site, analyses et graphiques de contribution GitHub
12. **Changelog** - Historique des évolutions et notes de version
13. **Newsletter** - Système d'abonnement à la newsletter
14. **Soumettre un projet** - Formulaire spécialisé pour les revues ShiroSaaS Lab
15. **Outils (Toolbox)** - Stack de développement détaillée et configuration matérielle
16. **Plan du site (Routes)** - Vue d'ensemble complète de la navigation
17. **RSS** - Flux RSS pour le blog et les ressources
18. **Légal** - Politique de confidentialité et conditions d'utilisation

## 🏗️ Structure du Projet

```
src/
├── app/                    # Routes de l'application (App Router)
│   ├── (base)/            # Layout de base avec navigation
│   │   ├── (home)/        # Page d'accueil
│   │   ├── about/         # Page À propos
│   │   ├── changelog/     # Page Changelog
│   │   ├── community/     # Page Livre d'Or
│   │   ├── connections/   # Page Connexions
│   │   ├── contact/       # Page Contact
│   │   ├── hub/           # Page Ressources
│   │   ├── legal/         # Pages légales (privacy, terms)
│   │   ├── newsletter/    # Page Newsletter
│   │   ├── projects/      # Page Projets
│   │   ├── quests/        # Page Challenges
│   │   ├── routes/        # Plan du site
│   │   ├── rss/           # Pages RSS
│   │   ├── stats/         # Page Statistiques
│   │   ├── submit/        # Page Soumettre projet
│   │   ├── talks/         # Page Conférences
│   │   ├── thoughts/      # Page Blog (réflexions)
│   │   └── toolbox/       # Page Outils/Setup
│   ├── api/               # Routes API pour la logique backend
│   ├── landlord/          # Section admin (dashboard)
│   ├── image-proxy/       # Service de proxy d'images
│   ├── globals.css        # Styles globaux et imports Tailwind
│   ├── layout.tsx         # Layout racine
│   └── metadata.ts        # Métadonnées SEO globales
├── components/            # Composants React réutilisables
│   ├── aurthle/          # Composants spécialisés
│   ├── landlord/         # Composants spécifiques à l'admin
│   ├── shared/           # Composants partagés entre les pages
│   └── ui/               # Primitives UI de base (Radix UI)
├── config/               # Fichiers de configuration de l'application
├── content/              # Contenu MDX statique (Blog, Projets, etc.)
├── data/                 # Données statiques et configuration locale
├── hooks/                # Hooks React personnalisés
├── integrations/         # Intégrations de services externes (Supabase, i18n)
├── lib/                  # Configurations de bibliothèques et helpers
├── types/                # Définitions TypeScript globales
└── utils/                # Fonctions utilitaires générales
```

## 🎨 Styles

Le projet utilise **Tailwind CSS 4** avec un système de design personnalisé.
- Les styles globaux se trouvent dans `src/app/globals.css`.
- Les jetons de design personnalisés (couleurs, animations, polices) sont définis à l'aide de variables CSS et de la directive moderne `@theme` de Tailwind.

> Pour une décomposition complète de la structure des fichiers, veuillez consulter directement le code source.
