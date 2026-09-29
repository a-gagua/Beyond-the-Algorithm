# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — practitioners.** Staff at Dutch public-sector inspection authorities: domain inspectors, data scientists, and the team leads above them, in organisations that are building or governing AI systems for risk-based inspection. They arrive deciding whether to host a session, and they are the people the game is designed for.

**Primary — academic readers.** Examiners, fellow researchers, and anyone citing or assessing the work. Confirmed as roughly equal in weight to the practitioner audience: the site has to work as an invitation and as a research record at the same time, in the same pages, without separate versions.

**Secondary — prospective game designers.** People who want to build a serious game of their own rather than play this one. Routed to the TU Delft Gamelab rather than to Ana.

## Product Purpose

Beyond the Algorithm is a physical tabletop research game about how Responsible AI trade-offs actually get made inside public-sector organisations. Two teams — Domain and Tech — build an AI model for risk-based inspections across a run of eight sprints, then put their choices on a public record.

It is the third piece of a PhD project at TU Delft (Faculty of Technology, Policy and Management), following a review of empirical work on why Responsible AI efforts succeed or fail, and a year-long ethnographic study inside a Dutch inspection organisation.

The site succeeds when a practitioner is willing to email about hosting a session, **and** an academic reader finds a record rigorous enough to cite. Both, not one at the expense of the other.

## Positioning

The earlier fieldwork can show what one team, in one place, actually did. It cannot show what a different team would have done facing the identical dilemma. The game can: it puts different teams through the same kickoff, the same events, and the same disclosure, and lets the research watch what each one does with it.

Two things a neighbouring product could not truthfully copy:

- It was built from what a year inside a real inspection organisation surfaced — a simulation of observed pressures, not of theorised ones.
- It is a research instrument and a rehearsal space in one artefact: teams meet a challenge before it happens for real, and that encounter is the data.

Roles, turns, and a shared task also produce more natural disagreement than an interview does, and less of the performed correctness that creeps into conversations about ethics and compliance.

## Operating Context

A boxed physical game — box, two team boards (Domain and Tech), role cards, and card decks — played around a table in facilitated sessions.

A session runs: **Kickoff → Sprints (×8) → Disclosure → Debrief.**

Developed over roughly a year at the TU Delft Gamelab (TBM Gamelab) through internal playtests and sessions with the target audience, through several rounds of changes.

Played so far inside Dutch inspection authorities, and publicly at Toezichtfestival 2026 (Dutch Supervision Festival). Sessions are arranged personally by email; there is no booking system.

## Capabilities and Constraints

- **Plain static site.** HTML, CSS and one small JavaScript file. No build step, no dependencies, no server, no framework. This is a deliberate constraint, not a stage to grow out of.
- **Published via GitHub Pages** from `main`, on the custom domain `https://beyondthealgorithm.nl/` (a `CNAME` file at the repo root; DNS pointed at GitHub Pages by Ana on 29 September 2026). The `a-gagua.github.io/Beyond-the-Algorithm/` GitHub Pages URL still resolves but is no longer the canonical address — every page's `canonical`/`og:url`/`og:image` points at the custom domain.
- **The repository is public.** Everything committed is world-readable, permanently.
- **No form backend exists.** Contact is a plain `mailto:`; a form with no endpoint would silently lose real messages.
- **Filenames must be lowercase.** macOS is case-insensitive and GitHub Pages is not, so a mis-cased asset works locally and 404s only once published — the one class of fault local testing cannot catch.
- Four pages: home, research, team, contact. Header and footer are duplicated per file; a change to one must be made in all four.
- **Player count and duration: 4–8 players, 2 hours.** Confirmed by Ana on 25 September 2026. The printed box says 2–8 players and 90 minutes; the site's figures are the correct ones and supersede it. Do not "correct" the site to match the box, and do not reopen this.

## Brand Commitments

- **British spelling throughout.** Not a preference — a consistency rule.
- Name: **Beyond the Algorithm**. Wordmark set in the box's geometric sans (Montserrat), deliberately not the site's display serif: it is a logo and is allowed to be its own thing.
- The palette is the **physical game's palette**, carried as CSS custom properties — the site is meant to look like the object it describes.
- **The TU Delft logo is a trademark.** Use the official house-style file. Never redraw, recolour, or fade it.
- The Gamelab mark currently in the footer is a **screen capture**, kept legible by a CSS blend as an explicitly interim measure. It needs a real transparent PNG or SVG from the Gamelab.
- Contact: `agagua@tudelft.nl`. Gamelab: `gamelab-tbm@tudelft.nl`. LinkedIn: `linkedin.com/in/ana-gagua`.
- Team biographies are **supplied text, not drafts.** Do not paraphrase them or extend anyone's title beyond what their own bio states.

## Evidence on Hand

**Real and available:**

- Photographs of the physical game — `assets/img/photos/` (box, full table set-up, role cards, both team boards and cards).
- A playtest at the TU Delft Gamelab — `assets/img/research/game-development.jpg`.
- Four photographs from Toezichtfestival 2026 — `assets/img/research/festival*.jpg`.
- Team headshots — `assets/img/team/`.
- Link-preview image rendered from the site's own hero artwork — `assets/img/share.jpg`.
- Full-resolution camera originals kept outside the repository in `bta-original-photos/` (gitignored, EXIF intact).
- Published paper: *Responsible AI governance in the public sector* (research.tudelft.nl).
- Ana's TU Delft staff page; the Toezichtfestival 2026 programme entry (a public event, so nameable).

**Absent — must never be fabricated:**

- Testimonials, participant quotes, or named host organisations.
- Session counts, participant numbers, outcome statistics, or any efficacy claim.
- Pricing, licensing, availability or distribution terms — none exist.
- Titles, affiliations or credentials for team members beyond their supplied bios.

## Product Principles

1. **Secrecy before disclosure.** Participants can read this site before they play. Nothing that would prime or spoil a session belongs on it — not the scoring model, the event cards, or the mechanics. The repository is public and the game design document is deliberately kept outside it.

2. **Anonymity is a promise, not a preference.** The inspectorates that took part did so on the understanding they would not be named. Naming the country and the sector is fine; naming an organisation is not. A public event with a public programme is the one nameable exception.

3. **Two audiences, one text.** Every page must satisfy a practitioner deciding whether to host a session and an academic assessing rigour. Writing for one at the other's expense is the failure mode.

4. **Claim only what happened.** No invented testimonials, numbers, quotes, affiliations or titles. Where evidence is absent, say less rather than more.

5. **Consent governs what is shown.** Participant photographs are not published without asking first. This is a working constraint on the project, independent of what the site says about it.

## Accessibility & Inclusion

No formal standard has been confirmed as binding. Treated as unresolved rather than absent: the audience is Dutch public-sector staff whose own organisations are held to EN 301 549 / WCAG 2.1 AA, so that level is the working floor for this site.

Build to WCAG 2.1 AA — real contrast ratios, 44px minimum tap targets, keyboard reachability, meaningful `alt` text, and no information carried by colour alone. Do **not** state or imply a compliance claim anywhere in the site's copy until someone has actually certified it.
