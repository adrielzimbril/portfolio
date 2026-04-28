# 🛰️ Guide de Déploiement

Le projet est optimisé pour un déploiement sur **Vercel**, mais peut être hébergé sur n'importe quelle plateforme supportant Next.js.

## 🚀 Déploiement sur Vercel

1. **Poussez votre code** : Assurez-vous que votre dépôt est à jour sur GitHub, GitLab ou Bitbucket.
2. **Créez un nouveau projet** : Dans votre tableau de bord Vercel, cliquez sur "New Project" et importez votre dépôt.
3. **Configurez les variables d'environnement** : Ajoutez toutes les variables requises (voir [Installation & Configuration](setup.FR.md)).
4. **Déployez** : Cliquez sur "Deploy" et attendez la fin du build.

## ⚙️ Tâches Planifiées (Trigger.dev)

Pour les tâches en arrière-plan (comme les mises à jour de statistiques ou le nettoyage de la communauté) :

1. **Configurez Trigger.dev** : Créez un compte et un nouveau projet.
2. **Liez à Vercel** : Utilisez l'intégration Trigger.dev ou ajoutez manuellement le `TRIGGER_ACCESS_TOKEN` à vos variables d'environnement Vercel.
3. **Configurez les Webhooks** : Assurez-vous que `NEXT_TRIGGER_PUBLIC_APP_URL` est correctement défini sur votre URL de production.

## 🗄️ Migrations de Base de Données

N'oubliez pas de pousser votre schéma de base de données local vers votre instance Supabase de production :

```bash
pnpm db:push
```
