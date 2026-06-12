# NextGen Sites — Session Handoff

**Last updated:** June 10, 2026  
**Purpose:** Context for the next chat window. Read this before making further changes.

---

## What this project is now

Henry's portfolio was refactored into a **client-facing summer job landing page** for **NextGen Sites** — a simple website service for **anyone who needs a site** (actors, small businesses, personal homepages, freelancers, creators, and more). The goal is a short sales funnel:

**Hero → About → Templates → Portfolio → FAQ → Contact (quote only, no pricing on site)**

---

## User decisions (locked in for this work)

| Decision | Choice |
|----------|--------|
| Target audience | **Anyone** — actors, small businesses, personal homepages, freelancers, creators, etc. (not limited to local businesses) |
| Templates approach | **New blank HTML files** in `templates/` with bracket placeholders — not repurposed live sample sites |
| Pricing on site | **None** — quote on contact only |
| Contact form | **Web3Forms** (`api.web3forms.com`) — not Netlify Forms |
| Removed per user request | Case studies, translation/i18n, skills, services/packages, tech stack showcase |

---

## What was removed

### From `index.html`
- Language toggle + Spanish translation UI
- Sale popup (had $7 starter pricing)
- Skills section (`#skills`)
- Services / pricing packages section (`#services`)
- Useful Projects section
- Performance Metrics section
- Case Studies section (`#case-studies`)
- Cookie consent banner
- All `data-translate` attributes

### From `script.js` (~800 lines removed)
- Sale popup logic
- Full i18n system (`translations` object, `translatePage()`, language menu)
- Performance metrics calculators
- Service card animations and package button handlers
- Skill item hover effects
- Experience counter / hero stat counters
- Cookie consent logic

### From `styles.css` (~1,200 lines removed)
- `.skills`, `.services`, `.case-studies`, `.useful-projects`, `.performance-metrics`
- `.language-*`, `.sale-popup`, service card styles

---

## What was added / changed

### Main site (`index.html`)
- **Branding:** NextGen Sites (nav logo text, hero, meta tags, footer © 2026)
- **Nav:** Home | About | Templates | Portfolio | FAQ | Contact
- **Hero:** "Websites for actors, businesses, homepages & more" + CTAs "Get a Free Quote" and "See Templates"
- **About:** 2 short paragraphs + NextGen logo (`logonextgen.png`); stats row removed; audience includes actors, shop owners, freelancers, students, creators
- **Templates section:** 4 cards with CSS mock previews + "Preview Template" links (Local Business, Service Pro, Simple Landing, Actor Portfolio)
- **Portfolio section:** "Our Work" — first client card for Kristin Shields (actor) with link to https://www.kristinshields.com/
- **FAQ:** 5 questions, no package/pricing language; "project" wording instead of business-only language
- **Contact:** Web3Forms with fields — Name, Email, Template You Like, Tell me about your project

### Messaging (June 10 session — audience broadening)
Copy was updated site-wide from "local businesses only" to a broader **for anyone** positioning:

| Area | Current messaging |
|------|-------------------|
| `<title>` / OG / Twitter | "Simple Websites for **Anyone**" (all aligned) |
| Meta description | Actors, small businesses, personal homepages, creators, and more |
| Hero subtitle | "Websites for actors, businesses, homepages & more" |
| Hero description | Actor, small business, personal homepage, or anything else |
| About | Anyone who needs to get online; lists actors, shop owners, freelancers, students, creators |
| Templates subtitle | Business, portfolio, homepage, or project |
| Service Pro card | Groomers, tutors, trades, freelancers (actors have dedicated template) |
| Actor Portfolio card | Bio, resume, headshots, media reel, gallery, representation |
| Simple Landing card | Personal homepages, launches, new projects |
| FAQ / Contact | "Project" instead of "business" where appropriate |
| Form label | "Name or Project" (was "Business Name"; field later removed — see Web3Forms session below) |

### Contact form — Web3Forms (June 10 session)
Replaced Netlify Forms with [Web3Forms](https://web3forms.com):

| Piece | Detail |
|-------|--------|
| Provider | Web3Forms — `POST https://api.web3forms.com/submit` |
| `index.html` | `action` + `method="POST"` on `#contactForm`; removed `netlify` attribute |
| Hidden fields | `access_key` (`7f8601f4-eb56-4fda-af87-fb70ed9a53d9`), `subject` (`New NextGen Sites quote request`) |
| Visible fields | Name, Email, Template You Like, Tell me about your project |
| `script.js` | `fetch` + `FormData` on submit; success/error toast via `showNotification()`; loading state on button |
| Bug fix | `validateForm()` must skip `type="hidden"` inputs — hidden Web3Forms fields sit outside `.form-group` and previously crashed validation on submit (button appeared dead) |

Submissions are delivered to the email linked to the access key in the Web3Forms dashboard. The access key is public in HTML (normal for Web3Forms client-side use).

### Blank templates (`templates/`)
| File | Use case |
|------|----------|
| `local-business.html` | Café, shop, salon — home, services, about, contact |
| `service-pro.html` | Groomers, tutors, trades — services/pricing placeholders, testimonials |
| `simple-landing.html` | One-page coming-soon / email capture |
| `actor-portfolio.html` | Actors/performers — bio, resume, media, headshots, gallery, representation (modeled on kristinshields.com structure) |
| `template-base.css` | Shared styles; **customize via CSS variables at top:** `--brand-color`, `--accent-color`, `--font-heading` |

Template conventions:
- Bracket placeholders: `[Your Business Name]`, `[Your City]`, `[Your Name]`, etc.
- Gray dashed `.placeholder-image` blocks labeled "Your photo here"
- Footer line: "Template by NextGen Sites — your version won't say this"
- No JavaScript; mobile-responsive

*Note: Business-oriented templates (local-business, service-pro) still use business placeholder copy. Actor template uses performer-focused placeholders.*

### Portfolio (June 10 session — actor template + first client)
- **Reference site:** [kristinshields.com](https://www.kristinshields.com/) — live actor site built by NextGen Sites
- **Portfolio card:** Kristin Shields — Actor; tags: Actor Website, Resume & Media, Gallery, Mobile-friendly
- **Template link:** Actor Portfolio (`templates/actor-portfolio.html`)

### `script.js` (~401 lines) — kept
- Loading screen fade-out
- Theme toggle (light/dark)
- Mobile nav + smooth scroll
- FAQ accordion
- Contact form validation + Web3Forms `fetch` submit + success/error notifications
- Template card entrance animations
- Hero subtitle typing effect
- Quick contact FAB + back-to-top
- Scroll progress bar
- Parallax on hero floating elements

### `styles.css`
- Added `.templates`, `.templates-grid`, `.template-card`, `.template-preview*` styles
- Added `.portfolio`, `.portfolio-mock*`, `.template-preview--actor` styles
- Reuses `.projects-grid`, `.project-card` for portfolio client cards
- Dead section CSS removed in bulk

### `404.html`
- Title updated to NextGen Sites
- Meta description points back to NextGen Sites (not old portfolio wording)

---

## File map

```
Henry's portfolio/
├── index.html          # Main landing page
├── styles.css          # Site styles
├── script.js           # Site JS
├── 404.html
├── HANDOFF.md          # This file
├── Baner.png           # Top banner image
├── logonextgen.png     # About section logo
├── ChatGPT Image...jpeg # Favicon / nav / hero photo
└── templates/
    ├── template-base.css
    ├── local-business.html
    ├── service-pro.html
    ├── simple-landing.html
    └── actor-portfolio.html
```

**Contact email:** nextgensites@proton.me  
**GitHub:** https://github.com/money170  
**OG URL in meta:** https://henrymeves.com

---

## Client journey (current)

1. Land on hero — clear offer for anyone (actors, businesses, homepages, etc.), no price
2. Read About — Henry + NextGen Sites trust
3. Browse Templates — open blank previews in new tab (including Actor Portfolio)
4. Portfolio — see real delivered work (Kristin Shields actor site)
5. FAQ — 5 quick answers
6. Contact — fill Web3Forms quote form (name, email, template preference, project details)

---

## Phase 2 ideas (NOT done — user may want these next)

| Idea | Notes |
|------|-------|
| Remove loading screen | Faster first paint |
| Remove quick-contact FAB + back-to-top | Less UI chrome |
| Remove scroll progress bar | Cleaner header |
| Collapse FAQ into contact section | Even shorter page |
| `clients/joes-pizza/` folder per delivery | Copy a template per client |
| More template types | e.g. restaurant, events |
| Broaden business template placeholder copy | Match main site's "anyone" messaging in local-business / service-pro files |
| More portfolio entries | Add cards as new clients are delivered |

---

## Known quirks / follow-ups

- Contact form uses Web3Forms — confirm `access_key` in `index.html` is linked to the correct inbox at [web3forms.com](https://web3forms.com). To rotate the key, update the hidden `access_key` input (no `.env` on this static site).
- Web3Forms only accepts client-side/browser requests; server-side `curl`/backend POSTs are blocked unless on a Pro plan with IP allowlisting.
- User rule: **no access to `.env`** — env changes must be communicated to Henry.
- **No git commits** were made unless Henry asked separately.
- Old sample sites still exist on Netlify/GitHub from case studies (Brew & Bean, Pawsome Grooming, Bright Minds) but are **no longer linked** from this site.
- **Kristin Shields** (kristinshields.com) is the first live client linked from the Portfolio section.

---

## How to duplicate a template for a client

1. Copy e.g. `templates/local-business.html` → `templates/clients/business-name.html` (or a `clients/` folder)
2. Edit CSS variables in `template-base.css` or add inline `:root` overrides
3. Replace all `[Bracket placeholders]` with real content
4. Swap placeholder images for real photos
5. Remove or replace the "Template by NextGen Sites" footer line

---

## Plan reference

Full implementation plan: `.cursor/plans/simplify_portfolio_site_e9c31821.plan.md`  
All plan to-dos were marked **completed** in the session that did this work.
