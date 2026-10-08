# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projet

Site perso/pro **romain-kantzer.com** : Romain Kantzer, développeur web, vend la création de **sites vitrines, sites e-commerce, applications web et applications mobiles** à des TPE et associations, en Alsace et à distance (nom de boîte RK.ai, mais le nom public mis en avant est **Romain Kantzer** — ne jamais réintroduire « Kantzer.ai »). Depuis la refonte de septembre 2026, le site est orienté **uniquement développement web** : plus aucune offre d'automatisation ni d'IA en façade.

Direction artistique (inspirée de studioloop.com.br) : studio éditorial, très grandes typos, sections qui alternent sombre et clair, libellés entre crochets `[ … ]`, listes numérotées `(01)`, animations lourdes (splash, rideau entre les pages, scroll horizontal, parallaxe, curseur). La palette historique (sombre #171717 + bleu #3b82f6) est conservée.

## Commandes

```bash
npm run dev      # serveur de dev (localhost:3000)
npm run build    # build production
npm run start    # sert le build
npm run lint     # ESLint (eslint-config-next)
npm run admin -- create <email>   # compte de l'espace admin (à lancer en SSH sur le serveur)
```

Pas de suite de tests. La vérification passe par `npm run build` + contrôle visuel (desktop et mobile, thèmes sombre et clair).

## Architecture

Next.js 16 (App Router) + React 19 + Tailwind CSS v4 + framer-motion 12 + Lenis (défilement amorti). Code majoritairement en `.jsx`/`.js`, quelques fichiers TS (`layout.tsx`, `sitemap.ts`, `robots.ts`, `icon.tsx`). Alias `@/*` → `./src/*`.

### Routes

- `/` accueil · `/services` catalogue · `/services/[slug]` une page par service · `/demarrer` parcours « Démarrer un projet » · `/about` · `/contact` · `/legal` · `not-found.js`.
- **Parcours de conversion** : tous les boutons « Démarrer un projet » (navigation, footer, hero, pages service, appel à l'action) mènent à `/demarrer` — six questions, une par écran, puis un récapitulatif modifiable (`src/components/onboarding/Onboarding.jsx`, étapes décrites dans `src/lib/onboarding.js`, libellés sous la clé `onboarding`). Depuis une page service, le type de projet est pré-sélectionné via `/demarrer?projet=<slug>`. `/contact` ne contient plus de formulaire : coordonnées, « Et ensuite ? » et un renvoi vers le parcours.
- Les slugs des services et leur metadata SEO sont dans `src/lib/services.js` (`SERVICE_SLUGS`, `SERVICE_META`). Pages générées statiquement (`generateStaticParams`, `dynamicParams = false`).
- `/services/web-dev` (ancienne page) redirige en 301 vers `/services` (`next.config.mjs`).
- `/designs` (page de travail) et `/blog/[slug]` (maquette sans données) sont en `noindex`, non liés, hors direction artistique.

### Metadata / SEO — pattern clé

Les `page.js` sont des **composants clients** (`"use client"`), donc la metadata SEO de chaque route vit dans un **`layout.js` par route** qui exporte `metadata` (title, description, `alternates.canonical`, OpenGraph) et rend `children`. Toute nouvelle page doit suivre ce pattern, être ajoutée à `src/app/sitemap.ts`, et localiser son contenu (voir i18n).

- Metadata globale + JSON-LD (Person + ProfessionalService avec catalogue des 4 services) : `src/app/layout.tsx`.
- Pages service : `src/app/services/[slug]/layout.js` (`generateMetadata` + JSON-LD Service, FAQPage et BreadcrumbList construits depuis `fr.json`).
- SEO local : basé à **Rountzenheim (Bas-Rhin)** — « Haguenau » n'est valable que comme zone desservie (`areaServed`) et pour « IUT de Haguenau ».
- Image de partage : `public/og-image.jpg` (1200×630).

### i18n maison (FR/EN/DE)

Pas de routing i18n. `src/components/LanguageProvider.jsx` fournit `useTranslation()` → `t("cle.imbriquee")` (chaîne, tableau ou objet) et `tl(key)` (toujours un tableau), lus dans `src/translations/{fr,en,de}.json` (fallback `fr`, persistance localStorage). **Tout texte visible passe par `t()` et doit être ajouté dans les trois fichiers JSON.** Le français est la langue de référence.

- Balisage des traductions : les mots entre `*astérisques*` sont mis en valeur (serif italique, couleur primaire), rendus par `Emphasis` ou `AnimatedTitle` (`src/lib/emphasis.js`).
- Une espace insécable ` ` garde des mots sur la même ligne (ex. `*de A à Z*`) : seuls les espaces ASCII séparent les mots animés.

### Thème et typographie

Sombre par défaut ; clair via la classe `html.light` (script inline dans `layout.tsx` + `ThemeProvider`). Couleurs = variables CSS de `src/app/globals.css`, mappées en tokens Tailwind via `@theme inline` (pas de tailwind.config). **Toujours utiliser les tokens sémantiques** (`bg-background`, `text-foreground`, `bg-card`, `border-border`, `text-primary`, `text-muted-foreground`…) — jamais de couleurs en dur.

- `Section tone="invert"` (classe `tone-invert`) inverse localement la palette : section claire en thème sombre, sombre en thème clair. C'est ce qui rythme les pages.
- Polices : Hanken Grotesk (`font-sans`, tout le texte) et Newsreader italique (`font-serif`, uniquement pour les mots mis en valeur).

### Animations (`src/components/motion/`)

- `SmoothScroll` : Lenis global (coupé si `prefers-reduced-motion`). Ajouter `data-lenis-prevent` sur une zone qui défile en interne.
- `Splash` : joué une fois par session (`sessionStorage` `rk-splash`), rendu côté serveur ; le script inline pose `html.splash-seen` pour l'ignorer.
- `TransitionProvider` : rideau entre les pages ; il intercepte les clics sur les liens internes (phase de capture). `data-no-transition` sur un lien pour l'exclure. `usePageReady()` indique quand lancer les animations d'entrée des heros (prop `play` d'`AnimatedTitle`).
- `Cursor` (souris uniquement ; `data-cursor="Libellé"` affiche une pastille), `AnimatedTitle` (mots révélés), `ScrollWords` (mots qui s'allument au scroll), `Reveal`, `Marquee` (sensible à la vitesse du scroll), `Magnetic`.
- Le `body` est en `overflow-x: clip` : ne jamais mettre `overflow: hidden` sur un ancêtre d'élément `sticky` (ProcessScroller, ServiceStack, ProcessList).
- Toute nouvelle animation respecte `prefers-reduced-motion`. Un élément déclenché « à l'entrée dans l'écran » ne doit pas être entièrement caché sous un masque : mettre `whileInView` sur le conteneur et animer les enfants par variants.

### API routes (env vars requises en `.env.local`)

- `src/app/api/chat/route.js` — assistant Gemini (`GEMINI_API_KEY`) ; le profil de Romain et ses services sont en dur dans le prompt système : le tenir à jour si le contenu du site change.
- **Mode du formulaire** : `CONTACT_MODE` (`src/lib/contact.js`) vaut `api` par défaut — `/demarrer` envoie la demande directement par la route ci-dessous. `NEXT_PUBLIC_CONTACT_MODE=mailto` revient à l'ouverture de la messagerie du visiteur.
- `src/app/api/contact/route.js` — envoi des demandes de `/demarrer` (toutes les réponses du parcours, libellés en français dans le mail). Destinataire fixe : **contact@romain-kantzer.com** (`CONTACT_RECIPIENT` dans `src/lib/contact.js`, qui porte aussi la validation partagée avec la page). Envoi par SMTP (`SMTP_HOST`/`SMTP_USER`/`SMTP_PASS`, sinon l'ancien Gmail `EMAIL_USER`/`EMAIL_PASS`), puis Resend en secours (`RESEND_API_KEY` + `RESEND_FROM` sur un domaine vérifié) — voir `.env.local.example`. Pot de miel `website`, limite de 5 envois par IP et par 10 min. Si l'envoi échoue, la page propose un mailto pré-rempli pour ne perdre aucune demande.

### Mesure d'audience (Umami)

- Umami Cloud, sans cookie donc **sans bandeau de consentement** : ne jamais ajouter d'outil à cookies (Google Analytics, pixel…) sans prévoir un bandeau CNIL.
- Script chargé dans `layout.tsx` seulement si `NEXT_PUBLIC_UMAMI_WEBSITE_ID` est défini au build ; limité aux domaines de production, `/admin` exclu (`src/lib/analytics.js`).
- Événements via `track()` : `demarrer-etape` (premier passage sur chaque écran de `/demarrer`) et `demarrer-envoi` (mode, type de projet, budget). **Aucune donnée personnelle** dans les événements. Mention correspondante dans `/legal`.

### Espace admin (`/admin`) — bac à sable d'automatisation des réseaux sociaux

Outil interne : privé, `noindex`, **hors i18n et hors direction artistique** (textes en français en dur, mais tokens et primitives `ui/` quand même). Pas de splash, de rideau ni de chatbot sur `/admin` (exclusions dans `layout.tsx`, `TransitionProvider`, `Chatbot`).

- **Comptes** : uniquement en ligne de commande sur le serveur (SSH) — `npm run admin -- create|password|revoke|delete <email>` ou `npm run admin -- list` (`scripts/admin-user.mjs`). Aucune inscription depuis le site.
- **Données** : fichiers JSON dans `data/` (ou `ADMIN_DATA_DIR`), ignoré par Git — `admin-users.json` (hachage scrypt), `actualites.json`, `medias/`, `session-secret`. Code partagé site/CLI en `.mjs` (`src/lib/admin/files.mjs`, `users.mjs`).
- **Session** : cookie `rk_admin` signé HMAC (`src/lib/admin/session.js`). `requireSession()` en tête de **chaque page et de chaque action serveur** (le layout du groupe `(espace)` ne suffit pas). Toutes les mutations passent par `src/app/admin/actions.js`.
- **Actualités** : titre, texte, date, catégorie, photo JPEG (seul format accepté par l'API Instagram). Les photos sont servies publiquement par `/medias/<nom aléatoire>.jpg` pour qu'Instagram puisse les récupérer.
- **Workflow** : « Générer une proposition » envoie l'actualité en POST à `AUTOMATION_WEBHOOK_URL` (n8n/Make, `Authorization: Bearer AUTOMATION_WEBHOOK_SECRET`) et attend `{ "caption": "…" }` (`src/lib/admin/automation.js`). La légende devient un brouillon modifiable, puis « validée ». La publication sur Instagram n'est pas encore branchée.

### Composants

- **Primitives obligatoires** dans `src/components/ui/` : `Button` (pilule, variantes primary/ghost/inverse, tailles sm/md/lg, texte qui roule au survol, icônes lucide `ArrowRight`/`ArrowUpRight`), `Section` (+ export `container`, prop `tone`), `SectionTitle` / `Highlight` / `Emphasis` (échelle unique `titleScales`), `Label` / `LabelRule` (libellés entre crochets), `RollText`, `Spark`, `Card`, `Logo` (logo vectorisé, `currentColor` ; `tagline` ajoute « RK.ai », à réserver aux grandes tailles). Tout nouveau composant passe par ces primitives.
- Sections réutilisables : `src/components/sections/` (ServicesList, FeaturedProject, ProcessScroller, ProcessList, Faq, ContactCta, PageHero) ; spécifiques : `src/components/home/`, `src/components/services/`.
- Visuels : `src/components/visuals/Mockups.jsx` — maquettes animées des 4 services, codées en HTML/CSS avec les tokens (unités `cqw`). **Pas de vidéo ni d'image générée par IA** : les vidéos de `public/` ne sont plus utilisées.

## Règles éditoriales et design (strictes, validées par Romain)

**Contenu :**
- Jamais de chiffres ronds inventés ni de métriques invérifiables (pas de « +300% », « x120 », « 85% », pas de délais ni de prix inventés). En cas de doute sur un chiffre ou un nom de projet, demander le vrai détail plutôt qu'inventer.
- Vocabulaire banni : « sur-mesure », « performant », « maximiser votre ROI », « solutions innovantes », « propulsé par l'IA », « seamless », « élevez », « débloquez ».
- Écrire en « je », ton d'artisan qui parle à un client — pas de plaquette d'agence. Chaque affirmation doit être concrète et vérifiable.

**Design :**
- Pas de grille bento, pas de marquee de logos (les bandeaux de texte des services sont autorisés), pas de dégradés violet/bleu génériques, pas d'emoji dans les titres, pas d'uppercase/shadow néon sur les boutons, pas de gradient ni stroke sur les titres. Seule mise en valeur d'un mot : serif italique en couleur unie.

**Faits vérifiés (ne pas contredire) :**
- Seul projet livré : **Cercle d'Échecs de Bischwiller** (bischwiller-echecs.com, livré en 2025) — projet fondateur ; ne pas nommer WordPress/Elementor publiquement. Le Cercle d'Échecs de Sélestat est un **prospect**, jamais une réalisation.
- Contact public : contact@romain-kantzer.com ; LinkedIn : https://www.linkedin.com/in/romain-kantzer-9323b920a/ ; **pas de lien GitHub sur le site**.

**À faire confirmer par Romain (affirmé sur le site lors de la refonte, non vérifié) :**
- Applications mobiles développées avec React Native / Expo.
- E-commerce : Shopify ou boutique Next.js + Stripe selon le besoin.
- Fourchettes de budget du formulaire de contact (reprises de l'ancien formulaire + « Je ne sais pas encore »).
