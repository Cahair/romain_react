# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site perso/pro **romain-kantzer.com** : Romain Kantzer vend de la création de sites web et de l'automatisation IA à des TPE et associations locales en Alsace (nom de boîte RK.ai, mais le nom public mis en avant est **Romain Kantzer** — ne jamais réintroduire « Kantzer.ai »). Une refonte est en cours (depuis juillet 2026) pour éliminer tout ce qui « sent l'IA générée » ; la page `/about` sert de référence du nouveau langage visuel.

## Commandes

```bash
npm run dev      # serveur de dev (localhost:3000)
npm run build    # build production
npm run start    # sert le build
npm run lint     # ESLint (eslint-config-next)
```

Pas de suite de tests. La vérification passe par `npm run build` + contrôle visuel en dev.

## Architecture

Next.js 16 (App Router) + React 19 + Tailwind CSS v4. Code majoritairement en `.jsx`/`.js`, quelques fichiers TS (`layout.tsx`, `sitemap.ts`, `robots.ts`). Alias `@/*` → `./src/*` (jsconfig.json).

### Metadata / SEO — pattern clé

Les `page.js` sont des **composants clients** (`"use client"`), donc la metadata SEO de chaque route vit dans un **`layout.js` par route** (ex. `src/app/services/web-dev/layout.js`) qui exporte `metadata` (title, description, `alternates.canonical`, OpenGraph) et rend `children` tel quel. Toute nouvelle page doit suivre ce pattern, être ajoutée à `src/app/sitemap.ts`, et localiser son contenu (voir i18n).

- Metadata globale + JSON-LD (Person + ProfessionalService) : `src/app/layout.tsx`.
- `/legal` et le blog (contenu factice) sont en `noindex` — le blog `src/app/blog/[slug]/page.tsx` est une maquette sans vraie source de données.
- SEO local : basé à **Rountzenheim (Bas-Rhin)** — « Haguenau » n'est valable que comme zone desservie (`areaServed`) et pour « IUT de Haguenau ».

### i18n maison (FR/EN/DE)

Pas de routing i18n. `src/components/LanguageProvider.jsx` fournit `useTranslation()` → `t("cle.imbriquee")` qui lit `src/translations/{fr,en,de}.json` (fallback vers `fr`, persistance dans localStorage). **Tout texte visible passe par `t()` et doit être ajouté dans les trois fichiers JSON.** `t()` peut retourner un tableau ou un objet (listes, FAQ). Le français est la langue de référence.

### Thème

Sombre par défaut ; clair via la classe `html.light` (script inline dans `layout.tsx` + `ThemeProvider`). Les couleurs sont des variables CSS dans `src/app/globals.css`, mappées en tokens Tailwind via `@theme` (pas de tailwind.config). **Toujours utiliser les tokens sémantiques** (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`, `text-muted-foreground`…) — jamais `bg-white/*` ou `bg-black/*` en dur, ça casse le thème clair.

### API routes (env vars requises en `.env.local`)

- `src/app/api/chat/route.js` — chatbot Gemini (`GEMINI_API_KEY`) ; le profil de Romain est en dur dans le system prompt : le tenir à jour si le contenu du site change.
- `src/app/api/contact/route.js` — formulaire de contact via Resend (`RESEND_API_KEY`, `CONTACT_EMAIL`).

### Composants

- **Primitives obligatoires** dans `src/components/ui/` : `Button` (rounded-md, variantes primary/ghost, tailles sm/md/lg, icône `ArrowRight` lucide uniquement), `Section` (`py-16 md:py-24`, `container mx-auto px-6`), `SectionTitle` + `Highlight` (font-display, échelle unique, highlight en couleur unie), `Card` (`bg-card border border-border rounded-2xl`). Tout nouveau composant passe par ces primitives.
- Sections partagées des pages services : `src/components/services/` (ServiceDeepDive, ServiceVisuals).
- Composants hérités **à ne pas imiter ni étendre** (chantier de suppression) : LogoTicker, ServicesBento, TechBento, MetricsCounter, StatsBar, ImpactCharts, `.glass`, `shiny-text`, footer stroke-text.

## Règles éditoriales et design (strictes, validées par Romain)

**Contenu :**
- Jamais de chiffres ronds inventés ni de métriques invérifiables (pas de « +300% », « x120 », « 85% »). En cas de doute sur un chiffre ou un nom de projet, demander le vrai détail plutôt qu'inventer.
- Vocabulaire banni : « sur-mesure », « performant », « maximiser votre ROI », « solutions innovantes », « propulsé par l'IA », « seamless », « élevez », « débloquez ».
- Écrire en « je », ton d'artisan qui parle à un client — pas de plaquette d'agence. Chaque affirmation doit être concrète et vérifiable.

**Design :**
- Pas de grille bento, pas de marquee de logos, pas de dégradés violet/bleu génériques, pas d'emoji dans les titres, pas d'uppercase/shadow néon sur les boutons, pas de gradient ni stroke sur les titres.

**Faits vérifiés (ne pas contredire) :**
- Seul projet livré : **Cercle d'Échecs de Bischwiller** (bischwiller-echecs.com, livré en 2025) — projet fondateur, à raconter en profondeur ; ne pas nommer WordPress/Elementor publiquement. Le Cercle d'Échecs de Sélestat est un **prospect**, jamais une réalisation.
- Contact public : contact@romain-kantzer.com ; LinkedIn : https://www.linkedin.com/in/romain-kantzer-9323b920a/ ; **pas de lien GitHub sur le site**.
