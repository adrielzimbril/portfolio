# Portfolio - Adriel Zimbril

## 🚀 À propos

Portfolio professionnel d'**Adriel Zimbril**, développeur Fullstack passionné et créatif. Ce portfolio présente mes compétences, projets et expertise dans le développement web moderne, avec une attention particulière portée à l'expérience utilisateur et aux performances.

## ✨ Fonctionnalités

### 🎨 Design & UX

- **Design moderne et responsive** adapté à tous les appareils
- **Mode sombre/clair** avec transition fluide
- **Animations fluides** pour une expérience utilisateur immersive
- **Interface intuitive** avec navigation claire et structurée
- **Optimisation des performances** avec Next.js et Turbopack

### 📱 Sections principales

1. **Accueil** - Présentation personnelle et mise en avant des projets, ressources, réflexions
2. **Projets** - Portfolio de réalisations avec détails techniques
3. **À propos** - Parcours professionnel et compétences
4. **Réflexions (Blog)** - Articles et réflexions sur le développement
5. **Ressources (Hub)** - Formations, e-books, vidéos, templates, code
6. **Challenges (Quests)** - Challenges créatifs avec inscription et soumission
7. **Conférences (Talks)** - Masterclasses et sessions en ligne
8. **Connexions** - Réseau et personnes rencontrées
9. **Contact** - Formulaire de contact et réseaux sociaux
10. **Livre d'Or (Community)** - Messages des visiteurs
11. **Statistiques** - Métriques et performance du site
12. **Changelog** - Historique des évolutions
13. **Newsletter** - Inscription à la newsletter
14. **Soumettre un projet** - Formulaire pour le ShiroSaaS Lab
15. **Outils (Toolbox)** - Stack et setup de développement
16. **Plan du site (Routes)** - Navigation complète
17. **RSS** - Flux RSS du site
18. **Légal** - Politique de confidentialité et CGU

### 🛠️ Stack technique

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend**: API Routes, Server Components
- **Base de données**: Supabase
- **Authentification**: Better Auth
- **Déploiement**: Vercel
- **CI/CD**: GitHub Actions
- **Tâches planifiées**: Trigger.dev
- **Autres outils**: Radix UI, React Hook Form, Zod, React Email, Motion, Lenis

## 🚀 Installation et démarrage

### Prérequis

- Node.js 18+
- pnpm (recommandé) ou npm/yarn
- Compte Supabase (pour les fonctionnalités backend)

### Instructions d'installation

```bash
# Cloner le dépôt
git clone [url-du-repo]

# Se déplacer dans le répertoire du projet
cd shirofolio

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement exemple
cp .env.example .env.local

# Configurer les variables d'environnement dans .env.local

# Lancer le serveur de développement
pnpm dev

# Pour le développement avec Trigger.dev (tâches planifiées)
pnpm run dev:all
```

## 🏗️ Structure du projet

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
│   │   ├── routes/        # Page Plan du site
│   │   ├── rss/           # Pages RSS
│   │   ├── stats/         # Page Statistiques
│   │   ├── submit/        # Page Soumettre projet
│   │   ├── talks/         # Page Conférences
│   │   ├── thoughts/      # Page Blog (réflexions)
│   │   └── toolbox/       # Page Outils/Setup
│   ├── api/               # Routes API
│   ├── landlord/          # Section admin (dashboard)
│   ├── image-proxy/       # Proxy d'images
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout racine
│   └── metadata.ts        # Métadonnées globales
├── components/            # Composants réutilisables
│   ├── aurthle/          # Composants Aurthle
│   ├── landlord/         # Composants admin
│   ├── shared/           # Composants partagés
│   └── ui/               # Composants d'interface utilisateur (Radix UI)
├── config/               # Configuration de l'application
├── content/              # Contenu statique (MDX, changelog, etc.)
├── data/                 # Données statiques (routes, config, etc.)
├── hooks/                # Hooks React personnalisés
├── integrations/         # Intégrations (Supabase, i18n, etc.)
├── lib/                  # Utilitaires et helpers
├── types/                # Définitions TypeScript
└── utils/                # Utilitaires divers
```

## 🎨 Personnalisation

### Variables d'environnement

**Variables obligatoires pour le développement:**

```env
# URL de l'application (obligatoire)
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Si vous utilisez Better Auth (recommandé):
BETTER_AUTH_SECRET=votre-secret-securise

# Si vous utilisez Supabase:
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

**Variables optionnelles (pour fonctionnalités avancées):**

```env
# GitHub (pour les stats GitHub)
NEXT_PRIVATE_GITHUB_TOKEN=votre-token-github
NEXT_PUBLIC_GITHUB_USERNAME=votre-username
NEXT_PUBLIC_GITHUB_REPO=votre-repo

# Email (Brevo ou Resend)
BREVO_API_KEY=votre-cle-brevo
RESEND_API_KEY=votre-cle-resend

# Stockage S3 (pour avatars, backups)
S3_ACCESS_KEY_ID=votre-cle-s3
S3_SECRET_ACCESS_KEY=votre-secret-s3
S3_ENDPOINT=votre-endpoint-s3
S3_REGION=votre-region-s3

# Analytics
NEXT_PUBLIC_GOOGLE_ANALYTICS_ID=votre-id-ga

# Tâches planifiées (Trigger.dev)
TRIGGER_ACCESS_TOKEN=votre-token-trigger
NEXT_TRIGGER_PUBLIC_APP_URL=votre-url-trigger
```

Pour une liste complète, voir le fichier `.env.example`.

### Commandes Supabase

```bash
# Appliquer les migrations locales à la base de données distante
pnpm db:push

# Générer les types TypeScript depuis la base de données liée
pnpm db:types

# Réinitialiser la base de données locale
pnpm db:reset

# Voir les différences entre migrations locales et base distante
pnpm db:diff
```

### Styles

Le projet utilise Tailwind CSS avec des couleurs personnalisées et des utilitaires. Les styles globaux se trouvent dans `src/app/globals.css`.

## 🌍 Traductions (next-intl)

Le projet utilise `next-intl` pour l'internationalisation.

- Les fichiers de traduction se trouvent dans `src/integrations/i18n/translations/`
- Langues supportées : `fr.json`, `en.json`, `zh-CN.json`
- Utilisez `useTranslations()` dans les composants client
- Utilisez `getTranslations()` dans les composants serveur

Pour ajouter une nouvelle clé de traduction :

1. Ajoutez la clé dans `fr.json` (source)
2. Traduisez dans `en.json` et `zh-CN.json`
3. Utilisez la clé dans votre composant

## 🌌 Rencontrons-nous dans l'espace (ou sur Terre) 🚀

Je suis toujours ravi de discuter de nouveaux projets, collaborations ou simplement échanger sur des idées créatives. Voici comment me contacter :

- **📧 Email**: [hello@adrielzimbril.com](mailto:hello@adrielzimbril.com)
- **🌐 Site**: [https://www.adrielzimbril.com](https://www.adrielzimbril.com)
- **🐦 Twitter**: [https://twitter.com/adrielzimbril](https://twitter.com/adrielzimbril)
- **💼 LinkedIn**: [https://www.linkedin.com/in/adrielzimbril](https://www.linkedin.com/in/adrielzimbril)
- **🐱‍💻 GitHub**: [https://github.com/adrielzimbril](https://github.com/adrielzimbril)

### 🐼 Fun Facts

- 🚀 Passionné par l'exploration spatiale et la technologie
- 🐼 Amoureux des pandas (et des animaux en général !)
- 🎨 Créatif dans l'âme, que ce soit en design ou en code
- ☕ Accro au café et aux défis techniques complexes

## 🛰️ Déploiement

Le projet est configuré pour être déployé sur Vercel. Pour déployer :

1. 🚀 Poussez votre code sur GitHub/GitLab
2. 🌌 Créez un nouveau projet sur Vercel
3. 🔗 Connectez votre dépôt
4. ⚙️ Configurez les variables d'environnement
5. 🚀 Décollez !

> 💡 Pour les tâches planifiées, assurez-vous d'avoir configuré Trigger.dev avec votre instance Vercel.

## 🌟 Rejoignez l'aventure

Si ce projet vous plaît, n'hésitez pas à :

- ⭐ Donner une étoile au projet
- 🐞 Signaler des bugs
- ✨ Proposer des améliorations
- 🚀 Partager avec d'autres passionnés

## 📄 Licence

Ce projet est sous licence MIT. N'hésitez pas à l'utiliser comme base pour votre propre portfolio ou projet.

---

**Développé avec ❤️ par Adriel Zimbril**  
_Product Designer & Développeur Fullstack_  
🚀 Explorateur de l'univers numérique | 🐼 Ami des pandas | 🎨 Créateur passionné
