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

1. **Accueil** - Présentation personnelle et mise en avant des projets
2. **Projets** - Portfolio de réalisations avec détails techniques
3. **À propos** - Parcours professionnel et compétences
4. **Blog** - Articles et réflexions sur le développement
5. **Contact** - Formulaire de contact et réseaux sociaux

### 🛠️ Stack technique

- **Frontend**: Next.js 14, React 18, TypeScript, Tailwind CSS
- **Backend**: API Routes, Server Components
- **Base de données**: Supabase
- **Authentification**: NextAuth.js
- **Déploiement**: Vercel
- **CI/CD**: GitHub Actions
- **Autres outils**: Radix UI, React Hook Form, Zod, React Email

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
cd adrielzimbril.com

# Installer les dépendances
pnpm install

# Copier le fichier d'environnement exemple
cp .env.local.example .env.local

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
│   │   ├── about/         # Page À propos
│   │   ├── contact/       # Page Contact
│   │   ├── projects/      # Page Projets
│   │   └── thoughts/      # Blog et articles
│   ├── api/               # Routes API
│   └── layout.tsx         # Layout racine
├── components/            # Composants réutilisables
│   ├── shiro/            # Composants personnalisés
│   ├── shared/           # Composants partagés
│   └── ui/               # Composants d'interface utilisateur
├── config/               # Configuration de l'application
├── content/              # Contenu statique (MDX, etc.)
├── lib/                  # Utilitaires et helpers
├── integrations/               # Logique métier
├── services/             # Services externes
├── types/                # Définitions TypeScript
└── utils/                # Utilitaires divers
```

## 🎨 Personnalisation

### Variables d'environnement

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

```env
# URL de l'application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### Commandes Supabase

```bash
# Générer les types TypeScript depuis la base de données liée
npx supabase gen types typescript --linked > src/integrations/supabase/types.ts

# Appliquer les migrations locales à la base de données distante
npx supabase db push

# Mettre à jour les migrations locales depuis la base de données distante
npx supabase db pull

# Authentification
NEXTAUTH_SECRET=your-nextauth-secret
NEXTAUTH_URL=http://localhost:3000

# Autres services
BREVO_API_KEY=your-brevo-api-key
AWS_ACCESS_KEY_ID=your-aws-access-key
AWS_SECRET_ACCESS_KEY=your-aws-secret-key
AWS_REGION=your-aws-region
AWS_BUCKET_NAME=your-bucket-name
```

### Styles

Le projet utilise Tailwind CSS avec des couleurs personnalisées et des utilitaires. Les styles globaux se trouvent dans `src/app/globals.css`.

## 🌍 Traductions (lobe-i18n)

Utilise `lobe-i18n` selon le type de contenu :

- `npx lobe-i18n`
  - Pour les fichiers de traduction (`fr/en/zh-CN`) et les données personnalisées (témoignages, contenus métier), selon la config.
- `npx lobe-i18n md`
  - Pour les contenus Markdown.

Sélection via config :

- `markdown` pour les contenus éditoriaux :
  - `.mdx` (blog et contenus de pages)
  - `.md` (tags et données de base de liaison)
- `json`/fichiers de langues pour la traduction UI.
- `json`/données personnelles pour les témoignages et autres datasets.

## 🌌 Rencontrons-nous dans l'espace (ou sur Terre) 🚀

Je suis toujours ravi de discuter de nouveaux projets, collaborations ou simplement échanger sur des idées créatives. Voici comment me contacter :

- **📧 Email**: [contact@adrielzimbril.com](mailto:contact@adrielzimbril.com)
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
