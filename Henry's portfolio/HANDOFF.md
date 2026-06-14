# NextGen Sites — Session Handoff

**Last updated:** June 12, 2026  
**Purpose:** Context for the next chat window. Read this before making further changes.

---

## What this project is now

Henry's portfolio was refactored into a **client-facing summer job landing page** for **NextGen Sites** — a simple website service for **anyone who needs a site** (actors, artists, small businesses, freelancers, creators, and more). The goal is a short sales funnel:

**Hero → About → Templates → Portfolio → FAQ → Contact (quote only, no pricing on site)**

**Launch status:** Soft-launch ready — core funnel is complete. Before a full public push: deploy to Netlify/Vercel, test Web3Forms end-to-end, and update `og:url` / absolute `og:image` URLs to the live domain.

---

## User decisions (locked in for this work)

| Decision | Choice |
|----------|--------|
| Target audience | **Anyone** — actors, artists, small businesses, freelancers, creators, etc. |
| Messaging | **Artists** (not "homepages" — homepage wording removed site-wide June 11 session) |
| Templates approach | **New blank HTML files** in `templates/` with bracket placeholders — not repurposed live sample sites |
| Pricing on site | **None** — quote on contact only |
| Contact form | **Web3Forms** (`api.web3forms.com`) — not Netlify Forms |
| Contact email | **nextgensites@proton.me** (replaced henry.s.meves@gmail.com everywhere on site) |
| Hosting options | Free subdomains documented on `hosting.html`; **netlify.app** / **vercel.app** recommended for NextGen's own URL |
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
- All "homepage" / "personal homepage" audience copy (replaced with **artists**)

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
- **Branding:** NextGen Sites (nav logo text, hero, meta tags, footer © 2026 NextGen Sites)
- **Nav:** Home | About | Templates | Portfolio | FAQ | Contact
- **Hero:** "Websites for actors, artists, businesses & more" + CTAs "Get a Free Quote" and "See Templates"
- **About:** 2 short paragraphs + NextGen logo (`logonextgen.png`); audience includes actors, **artists**, shop owners, freelancers, students, creators
- **Templates section:** 4 cards with CSS mock previews + "Preview Template" links (Local Business, Service Pro, Simple Landing, Actor Portfolio)
- **Portfolio section:** "Our Work" — first client card for Kristin Shields (actor) with link to https://www.kristinshields.com/
- **FAQ:** **11 questions** (expanded June 11–12 session); hosting answer links to `hosting.html`
- **Contact:** Web3Forms — Name, Email, Template You Like, **Preferred Subdomain (optional)**, Tell me about your project

### Messaging (current — June 12)

| Area | Current messaging |
|------|-------------------|
| `<title>` / OG / Twitter | "Simple Websites for **Anyone**" |
| Meta description | Actors, **artists**, small businesses, creators, and more |
| Hero subtitle | "Websites for actors, **artists**, businesses & more" |
| Hero description | Actor, **artist showcasing your work**, small business, or anything else |
| About | Actors, **artists**, shop owners, freelancers, students, creators |
| Templates subtitle | Business, **artist portfolio**, or project |
| Simple Landing card | **Artists**, launches, or new projects |
| FAQ / Contact | Actor reel, **artist portfolio**, business, or anything else |
| Contact email | nextgensites@proton.me (FAQ, contact section, quick-contact FAB, mailto links) |

### Contact form — Web3Forms

| Piece | Detail |
|-------|--------|
| Provider | Web3Forms — `POST https://api.web3forms.com/submit` |
| `index.html` | `action` + `method="POST"` on `#contactForm` |
| Hidden fields | `access_key` (`7f8601f4-eb56-4fda-af87-fb70ed9a53d9`), `subject` (`New NextGen Sites quote request`) |
| Visible fields | Name, Email, Template You Like, **Preferred Subdomain (optional)**, Tell me about your project |
| Subdomain field | Text input with `datalist` of all 47 hosting options; hint links to `hosting.html` |
| `script.js` | `fetch` + `FormData` on submit; success/error toast via `showNotification()`; loading state on button |
| Bug fix | `validateForm()` must skip `type="hidden"` inputs — hidden Web3Forms fields sit outside `.form-group` and previously crashed validation on submit |

Submissions go to the inbox linked to the access key in the [Web3Forms dashboard](https://web3forms.com). **Confirm the key delivers to nextgensites@proton.me** before going live.

### FAQ (11 questions — current)

1. How long does it take to build a website?
2. What do I need to provide? (includes phone, email, font choice, etc.)
3. What can I change from the templates?
4. Do you build sites for artists?
5. How much does a website cost?
6. Do I need any technical skills?
7. Will my website work on phones?
8. Can you help with hosting and a custom domain? → links to **`hosting.html`**
9. What if I'm still gathering photos or content?
10. Can I change things later?
11. How do I get started?

### `hosting.html` (June 12 session — new page)

Standalone page listing free subdomain options for clients who don't want monthly hosting fees.

| Section | Contents |
|---------|----------|
| Featured | `netlify.app`, `vercel.app` (recommended — especially for NextGen's own site, e.g. `nextgensites.netlify.app`) |
| Full list | 45 InfinityFree-style domains from user screenshot (42web.io, rf.gd, great-site.net, etc.) |
| Navigation | Back to FAQ (`index.html#faq`); CTA to contact form |
| Styling | Inline page styles + shared `styles.css`; theme toggle reads `localStorage` theme |

FAQ answer #8 links here: "See the full list of available subdomains."

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

*Note: Business-oriented templates (local-business, service-pro) still use business placeholder copy.*

### Portfolio (actor template + first client)
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
- Added `.faq-answer a`, `.form-hint` (subdomain field hint + hosting link)
- Reuses `.projects-grid`, `.project-card` for portfolio client cards
- Dead section CSS removed in bulk

### `404.html`
- Title updated to NextGen Sites
- Meta description points back to NextGen Sites
- Button text: "Back to Home" (was "Go to Homepage")
- Random music embed removed (clean 404 page)

---

## File map

```
Henry's portfolio/
├── index.html          # Main landing page
├── hosting.html        # Free subdomain options (linked from FAQ)
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

**Do not deploy to public site:** `TechInspired_Activity_List.pdf`, `@sitioincreible.png` (not linked from site).

**Contact email:** nextgensites@proton.me  
**GitHub:** https://github.com/money170  
**OG URL in meta:** https://henrymeves.com *(update to live URL after deploy)*

---

## Client journey (current)

1. Land on hero — clear offer for anyone (actors, artists, businesses, etc.), no price
2. Read About — Henry + NextGen Sites trust
3. Browse Templates — open blank previews in new tab (including Actor Portfolio)
4. Portfolio — see real delivered work (Kristin Shields actor site)
5. FAQ — 11 answers; hosting question links to subdomain list
6. Contact — fill Web3Forms quote form (name, email, template, optional subdomain, project details)

---

## Pre-launch checklist (not done)

| Step | Notes |
|------|-------|
| Deploy | Netlify or Vercel recommended; no `netlify.toml` / `_redirects` yet |
| Test contact form | Submit from live URL; confirm email arrives at nextgensites@proton.me |
| Configure 404 | Host must serve `404.html` for missing routes |
| Update `og:url` | Still `henrymeves.com` — change to real live URL |
| Fix social preview images | `og:image` / `twitter:image` use relative paths — need absolute URLs on live domain |
| Rename image files (optional) | `ChatGPT Image May 1, 2025 at 04_30_50 PM.jpeg` has spaces — fragile on some hosts |
| Voice cleanup (optional) | FAQ mixes "I", "we", "us" — e.g. "email us @ nextgensites@proton.me" |

**Recommended URL for NextGen itself:** `nextgensites.netlify.app` or `nextgensites.vercel.app` (cleaner than InfinityFree domains like rf.gd for the business's own site).

---

## Phase 2 ideas (NOT done — user may want these next)

| Idea | Notes |
|------|-------|
| Deploy + launch prep | netlify.toml, absolute OG URLs, Web3Forms inbox verification |
| Remove loading screen | Faster first paint |
| Remove quick-contact FAB + back-to-top | Less UI chrome |
| Remove scroll progress bar | Cleaner header |
| Collapse FAQ into contact section | Even shorter page |
| `clients/joes-pizza/` folder per delivery | Copy a template per client |
| More template types | e.g. restaurant, events |
| Broaden business template placeholder copy | Match main site's "anyone" messaging in local-business / service-pro files |
| More portfolio entries | Add cards as new clients are delivered |
| Custom domain | e.g. nextgensites.com (~$10–15/yr) when actively pitching |
| Social links beyond GitHub | Instagram etc. for actor/artist/local business outreach |
| FAQ voice pass | Standardize on "I" (solo) or "we" (brand) |

---

## Known quirks / follow-ups

- Contact form uses Web3Forms — confirm `access_key` in `index.html` is linked to **nextgensites@proton.me** at [web3forms.com](https://web3forms.com).
- Web3Forms only accepts client-side/browser requests; server-side `curl`/backend POSTs are blocked unless on a Pro plan with IP allowlisting.
- User rule: **no access to `.env`** — env changes must be communicated to Henry.
- **No git commits** were made unless Henry asked separately.
- Old sample sites still exist on Netlify/GitHub from case studies (Brew & Bean, Pawsome Grooming, Bright Minds) but are **no longer linked** from this site.
- **Kristin Shields** (kristinshields.com) is the first live client linked from the Portfolio section.
- FAQ #6 says "email us @" — inconsistent with solo "I" voice elsewhere.

---

## How to duplicate a template for a client

1. Copy e.g. `templates/local-business.html` → `templates/clients/business-name.html` (or a `clients/` folder)
2. Edit CSS variables in `template-base.css` or add inline `:root` overrides
3. Replace all `[Bracket placeholders]` with real content
4. Swap placeholder images for real photos
5. Remove or replace the "Template by NextGen Sites" footer line
6. Deploy client site to their chosen subdomain (see `hosting.html` for options)

---

## Plan reference

Full implementation plan: `.cursor/plans/simplify_portfolio_site_e9c31821.plan.md`  
All plan to-dos were marked **completed** in the session that did the initial refactor.
