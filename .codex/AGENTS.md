# Shirofolio - Agent Operating Guide

Ce fichier fixe les regles de travail pour intervenir proprement sur ce projet.
Objectif: respecter le style produit, la qualite des textes, et eviter toute casse d'encodage (accents/emojis).

## 1) Regles de base

- Langue par defaut: francais.
- Ton: premium, clair, humain, jamais generique.
- Ne pas casser l'existant: se baser sur les modules deja en place (`submit`, `thoughts`, `hub`, `resources`, `quests`, `talks`).
- Si une version existe deja dans le design system, la reutiliser avant d'inventer un nouveau composant.

## 2) Terminologie obligatoire

- `thoughts` = blog.
- `talks` = masterclasses/talks.
- `quests` = challenges (route/feature en anglais), mais dans le texte FR on peut afficher "challenge".
- Ne pas melanger les termes de facon incoherente dans une meme page.

## 3) Style de copywriting (important)

- Textes courts, impactants, orientes action.
- Qualite equivalente aux sections deja fortes du projet (`submit`, cards de `hub/resources`).
- Eviter les formulations plates et systematiques.
- Les emojis sont autorises et attendus dans ce projet, mais:
  - jamais en surcharge,
  - toujours thematiques (challenge, creation, design, feedback).

## 4) Donnees contenu (MDX first)

- Priorite au contenu MDX/frontmatter quand possible (pas de BDD si inutile).
- Pour `quests`, les sections editoriales comme `rewards` et `winners` doivent vivre dans le frontmatter.
- Garder des schemas stricts dans `content-collections.ts` pour eviter les regressions.

## 5) UX/Flow Quests

- Flux attendu:
  - page info du challenge,
  - page inscription (`/quests/[slug]/register`) avec fermeture a la deadline d'inscription,
  - page soumission (`/quests/[slug]/submit`) avec fermeture a la deadline de soumission/fin.
- Ne pas fusionner inscription + soumission sur la meme vue.
- Etats fermes: composants dedies, pas du inline spaghetti.

## 6) Mails (qualite + coherence)

- Utiliser les templates React Email existants (design reusable).
- Copy propre, ton humain, CTA clair.
- Pour les mails admin, utiliser un libelle admin explicite (pas un texte "contact user" inadapté).
- Inclure les liens utiles (ex: URL challenge) quand pertinent.

## 7) Encodage UTF-8 (critique)

Probleme connu: accents/emojis peuvent etre corrompus si ecriture non UTF-8.

Regles:
- Tous les fichiers texte en UTF-8.
- Si ecriture via PowerShell: toujours `-Encoding utf8`.
- Eviter les manipulations qui reserialisent en ANSI.
- Apres edition de fichiers i18n/email/UI, verifier visuellement les accents + emojis.

Checklist anti-corruption:
- Pas de caracteres type `Ã©`, `ðŸ`, `â€™` dans les textes finaux.
- Si corruption detectee:
  - restaurer la chaine correcte,
  - re-sauvegarder en UTF-8,
  - recontroler les fichiers FR/EN/ZH touches.

## 8) I18n

- Toute nouvelle cle doit etre ajoutee dans:
  - `fr.json`,
  - `en.json`,
  - `zh-CN.json` (minimum fallback propre).
- Eviter les hardcodes quand une cle i18n existe deja.
- Si hardcode volontaire (UX local), le justifier dans le PR/message.

## 9) Standards UI

- Reutiliser les patterns cartes/squircles/badges existants.
- Respecter la densite visuelle des pages `submit` et `resources`.
- Mobile et desktop obligatoires.
- Etats vides/fermes/erreurs: design propre (modal > toast quand c'est l'experience cible du module).

## 10) Qualite avant livraison

Avant de finir une tache:
- `pnpm exec tsc --noEmit`
- verifier la/les pages modifiees
- verifier texte/accents/emojis
- verifier routes et liens
- verifier que la structure des donnees suit le schema content/API

## 11) Journal de suivi (a tenir a jour)

Pour chaque modification significative, ajouter une entree concise ci-dessous:

- Date:
- Zone:
- Changement:
- Risque:
- Validation:

Exemple:
- Date: 2026-03-03
- Zone: quests details + content schema
- Changement: ajout `winners` en frontmatter MDX et rendu dynamique
- Risque: encodage FR sur labels
- Validation: `pnpm exec tsc --noEmit` + verification visuelle

