# Beyond the Algorithm — website

Static site for *Beyond the Algorithm*, a research game about trade-offs of
Responsible AI, developed at TU Delft.

Plain HTML, CSS and a few lines of JavaScript. No build step, no dependencies,
no framework. Open `index.html` in a browser and it works.

## Pages

| File            | Page                                                       |
| --------------- | ---------------------------------------------------------- |
| `index.html`    | Landing, then About the game as a second half at `#about` |
| `research.html` | Why the project exists and why it uses a game              |
| `team.html`     | The people involved, plus acknowledgements                 |
| `contact.html`  | The address, a message form, and social links              |

About the game used to be `about.html`. It is now the lower half of the
landing page, because the landing page alone was too short to be worth a
visit. The nav still carries an "About the game" item; it points at
`index.html#about`. `main.js` skips aria-current for any nav href containing
a `#`, so the home page does not mark two items as current.

The header and footer are duplicated in each file rather than templated. That is
the cost of having no build step; if you edit the nav, edit it in all four.

## One site, at the root

The repository used to hold three copies: the original at the root, a `v2/`
visual pass, and `v3/`, which was the one being worked on. That made sense while
a direction was being chosen and stopped making sense once it had been. `v3/`
has been promoted to the root and the other two are deleted. There is now one
set of files, and the thing you edit is the thing that publishes.

Both old versions remain in git history if anyone ever wants to look — including
two gallery photographs, `board.jpg` and `decks.jpg`, which `v3/` deliberately
replaced with the two team-board shots.

## Running locally

Double-click `index.html`, or serve it:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

If you change CSS and the page looks unchanged, hard-refresh (Cmd-Shift-R) —
the browser caches the stylesheet.

Worth knowing: the box's real typefaces are **Agenda**, **Aller Display** and
**Fredericka the Greatest**. The site uses Fraunces and Montserrat — neither is
a box face. Agenda and Aller Display are licensed desktop fonts with no web
licence to assume; Fredericka is on Google Fonts. Unresolved.

## Photographs: lowercase, and web-sized

Two rules for `assets/img/photos/`, both learned the hard way.

**Filenames are lowercase `.jpg`. Always.** macOS is case-insensitive and
GitHub Pages is not, so `box.JPG` on disk against `box.jpg` in the HTML works
perfectly on your machine and 404s once published — the one place you cannot
see it while developing. Worse, git on macOS reports such a file as *modified*
rather than renamed, so it will happily commit the new bytes under the old
name without telling you. Camera files arrive as `.JPG`; rename them on the
way in.

**They are resized before they land here.** The originals are 5–25 MB camera
files at up to 7728px wide, served into a gallery that crops them to 3:2 at
under 800px. They are resampled to 1600px on the long edge at quality 80,
which is about 250–370 KB each — the whole folder is 1.6 MB rather than 87 MB.

```bash
sips -Z 1600 -s format jpeg -s formatOptions 80 SOURCE.JPG --out name.jpg
```

Originals are kept outside the repo at `~/Desktop/bta-original-photos/`. If a
photograph ever needs recropping, go back to those rather than upscaling what
is in here.

**The same two rules cover `assets/img/team/`**, and it is worth saying why:
three of the five headshots arrived capitalised (`Ana-gagua.jpg`) and one
arrived as a PNG. Both were normalised before the first commit, because a
capitalised filename is invisible on macOS and only fails once published.
Team photographs are capped at 800px rather than 1600px — a card renders them
under 400px wide — and only images larger than that are resampled, since
enlarging a small headshot invents detail. The whole folder is 344 KB.

**The team photographs are greyscale by CSS, not in the files.** The images on
disk are ordinary colour headshots; `.person__photo` carries
`filter: grayscale(1) contrast(1.05)`. Hovering a card drops the filter and
shows the photograph in colour, gated behind
`prefers-reduced-motion: no-preference`. Delete one declaration and the page is
back to plain colour headshots.

Each portrait sits in a 2px line frame in a different game colour — blue, sand,
teal, green, terracotta, assigned by `:nth-child` in card order. The colours
mean nothing; reordering the cards reshuffles them harmlessly. Greyscale is what
makes the frames work, by giving the colour somewhere to live.

**The frame is on `.person__figure`, never on the photograph.** `filter` applies
to an element's own border and outline as well as to its content, so a coloured
border set on `.person__photo` gets greyscaled along with the face — tried it,
the five colours rendered as five near-identical greys. That wrapper exists for
exactly this reason; do not "simplify" it away.

The slot is a **168px square inset**, not a full-width photograph. Earlier
versions spanned the card at `4/3` and then `4/5`, and both made the photograph
the loudest thing on the page. Inset at 168px the card is ~543px rather than
778px and the names lead. All five headshots are portrait or square with the
face high in the frame, so `object-position: center 25%` keeps the crop below
the chin. Five-per-row was tried and rejected: the photos shrink but the bios
compress to about eight words a line and the cards get *taller*.

## What the site deliberately does not say

Participants can read this site before playing, so it holds back anything that
would spoil a session. Keep this in mind when adding copy:

> **This repository is public.** The game design document — which names the
> scoring model, every event card and every mechanic — is deliberately *not* in
> it. It lives in OneDrive, under `Paper IV/website/`, and is listed in
> `.gitignore`. It was tracked here from the first commit and has since been
> purged from the whole history. Do not commit it, and do not paste its
> contents into a commit message, a code comment or this file.

- **No assessment detail — with one settled exception.** What the game measures
  is never named as such, in copy or in HTML comments, which
  anyone can read via view-source. But **effectiveness and explainability do
  appear**, in the Sprints stop of "How it runs", and that is deliberate: they
  are also the goal the teams are openly briefed on at kickoff, so a
  participant learns them in the first ten minutes of a session. Naming them
  spoils nothing. What stays hidden is the measurement model behind them.

  The Sprints copy is phrased as a direction of travel, not a menu.
  
- **No disclosure detail.** The site says the model goes on the public record
  and that you cannot say everything. It does not describe the form itself.
- **No event card names.** The site says events interrupt the build, not which
  ones exist.
- **No mechanics.** The game's named mechanics — the ones printed on the cards
  and boards — are listed in the design document, which is kept outside this
  repo. None of them appear here.

The line drawn: mechanics and scoring stay hidden, what the experience is like
and why it is worth doing stays open, because that is what convinces an
organisation to book a session.

**The team cards may now describe what each team is for.** They used to be
scrubbed of anything resembling what the game measures, on the rule that naming
those things as a shared goal was fine but naming them as a team's objective was
not.
That rule has been relaxed by decision: the Tech card says its job is to make
sure the model *performs well* and the Domain card that its job is to make sure
the model *reflects real inspection practice*. Both are vaguer than the scored
terms, and a participant is briefed on the dimensions at kickoff regardless.
What still stays out is any statement that these are **scored**, and how.

The one thing that has never been allowed back is **named example events**. The
supplied storyline once listed three; they stay out. The storyline describes the
pressure — rising scrutiny, the Algorithm Register, oversight queries and public
information requests, and that you cannot know when they will land — without
naming a single card. Describing the weather is fine; printing the deck is not.

"How it runs" also used to say the teams agree "how ambitious to be" at
kickoff. That was changed to "what the goal is" — the original sat too close to
one of the named mechanics listed as hidden two bullets up.

One deliberate exception: "explainability tools" survives in the Research
standfirst, as one item in a list of checklist artefacts (registers,
documentation, explainability tools). That is standard vocabulary in the
field, not a statement that the game scores it.

## Before it goes public — things to fill in

Every item below is marked with an HTML comment at the place it belongs, so
you can also just search the source for `NEEDED` and `TO CONFIRM`.

- **Logos.** The footer is light (peach), because both institutional
  marks are black artwork and need a pale ground. `assets/img/logos/`
  now holds the real `tu-delft.svg` from the house-style portal — do not
  redraw it, it is a trademark.

  **`gamelab.png` still needs replacing.** It is a screen capture of a web
  page, not a supplied asset: opaque white background, page artefacts along
  the top and bottom edges, and mostly empty padding. It is currently held
  on a white card by `.site-footer__logos .logo--raster`, which hides the
  baked-in background by matching it and crops the artefact lines off. Ask
  the Gamelab for a transparent PNG or an SVG, drop it in, and delete that
  rule — it is marked INTERIM in the stylesheet.

  That rule used to give **every page a horizontal scrollbar**, 8px of overflow
  at every width. Cause, since it is not obvious: the rule pulled the logo in
  with `margin-inline: -1.75rem`, and a negative margin shrinks an element's
  *layout slot* but not the box it actually paints — so its right edge sat 28px
  past the wrap. It hid for a long time because the footer wordmark forced the
  logos onto their own wrapped line; removing the wordmark exposed it. The
  margin is now start-only (`-1.75rem 0`). Pull this logo leftward toward the
  TU Delft mark as much as you like; never pull it rightward past the
  container.

  The lab is **TU Delft Gamelab**. The two older
  copies of the site carried the old name and the dashed-box placeholders;
  both have been deleted, so the correct name is now the only one present.
- **No contact form.** `contact.html` was a form once; it had no endpoint set
  and none was coming soon, so it came out rather than sit there as one
  accidental submit away from losing a real message. The page is now the
  address plus a mailto CTA — both work today, with nothing to wire up.
- **Photographs.** Every placeholder `.shot` slot on the site is filled. The
  one thing still sitting outside the repo is a second photo for "Where it has
  been played" — a festival shot at
  `~/Desktop/bta-original-photos/research/fest.JPG`, processed the same way
  `game-development.jpg` was (resized, EXIF stripped) but not yet added, since
  only one photo was asked for.
- **Where it has been played.** `research.html` now names Toezichtfestival
  2026, linked, alongside "Dutch inspection authorities" — that line is
  supplied text, not a placeholder.

  The **host organisations are a settled question, not an open one**: they are
  not named anywhere on the site and will not be. The acknowledgement on
  `team.html` now says so outright — the research was carried out with Dutch
  inspectorates, who took part on the understanding that they would stay
  anonymous. Naming the country and the sector is fine; naming an organisation
  is not. Do not "fill this in" later.
- **The team page is done** — bios and headshots both. It is listed here only
  for the rules that govern editing it.

  The bios are supplied text, not drafts, so do not paraphrase them or extend
  anyone's title beyond what their own bio states.

  **The two lines on a card do different jobs.** `.person__role` is the
  person's role *on this project*; the bio underneath is who they are
  academically, in their own words. Do not collapse these into one: putting the
  academic title in both makes the card read as the same sentence twice, and
  leaves the page unable to say why any given person is on it.

  **A card may have no role line at all.** Only Ana ("PhD researcher") and
  Gracia ("Game designer") carry one. Haiko, Alexander and Nihit are all PhD
  supervisors, and a subtitle saying so three times down the page said less
  than a sentence does — so each of their bios ends with the same line, *"He
  supervises the PhD research behind Beyond the Algorithm."* The repetition is
  deliberate: parallel wording is what tells a reader the three hold the same
  role. `.person__body h3 + p:not(.person__role)` restores the spacing under
  the name on those cards, since the `h3` margin is tuned to sit tight against
  a role line that is not there.

  Gracia's bio keeps her own "TBM Gamelab" but now names the faculty in full,
  matching how Ana's bio writes it — TBM is simply the Dutch form of TPM, and
  spelling it out means a reader does not have to know that. The footer logo
  is still captioned **TU Delft Gamelab**, so the lab appears under two names
  across the site; harmless, but worth settling if anyone cares.
- **Publications.** `research.html` has an empty publications section.

## Design

Type follows **Source Sans 3** for everything and **Source Code Pro** for labels, buttons and
inputs, both loaded from Google Fonts. Headings sit at normal weight — hierarchy
comes from size and the sans/mono contrast, not from bold. Both faces are
open-source, so there is no licensing question.

Colour is still the physical game's palette. Every value is a CSS custom
property at the top of `assets/css/style.css` — team colours, card zones, paper
tones — so they change in one place.

The layout workhorse is `.spread`: a small mono label in its own left-hand
column, content on the right. A centred column of prose reads as a document;
the same text with a label beside it reads as a spec sheet, and it stops long
pages from running as one thin ribbon down the left. Inside a spread,
`.spread__body--split` breaks prose into two columns above 820px.

Long sections open with a full-width display line (`.storyline`) or standfirst
(`.lede`) and then run in those two columns — that is what stops them hugging
the left edge. `.spread__close` is the counterpart at the other end: a closing
paragraph that spans a grid above it rather than sitting at reading width under
its first column. `.lead-split` puts a display line and its supporting prose
side by side; only Contact still uses it.

Other pieces worth knowing: `.run` is the four-stop session track on
the landing page, `.facts` is the requirements strip, `.shot` is a photograph slot,
`.hero__spec` is the spec line under the landing-page buttons, and `--grain` is
an inlined noise texture over the flat paper fill.

`.run` is clickable. Each stop's heading is a `<button>`; clicking one emphasises
it and dims the other three, and clicking it again clears the selection. **It
reveals nothing** — all four paragraphs are always in the markup, so the section
reads whole with JavaScript off and for anyone who never clicks. That is why the
dimming class `.is-selecting` goes on the list only after the first click:
without it the page would load with three quarters of the section greyed out,
which reads as a fault rather than a choice. All four dots are identical now;
Sprints used to be the only filled one, which made it look like the single
marker on the track rather than one stop of four.

`.band--invite` is the closing blue section. It was `.cta`, a box inside "What it
needs", which filed the page's one ask as a fourth requirement. `.cta` still
exists because `contact.html` uses it. Note that `.btn--primary` resolves to
`var(--deep)`, the same blue as the band, so both patterns have to invert the
button to cream — leave that out and the only action on the page disappears.

The hero's two buttons are **always visible**. They used to fade in from
`opacity: 0` on a `--reveal-cta` variable driven by scroll position, which meant
the only two actions on the opening screen did not exist until you had scrolled
12% through a pinned hero — and it needed a `:focus-within` hack so keyboard
users did not land on an invisible button. The variable is gone. The badges and
the closing fields still animate; the actions do not wait their turn.

The landing-page cards drift with the pointer, and straighten and lift when
one is hovered. Each card composes its transform from `--dx`, `--dy`, `--rot`
and `--scale` so the script can move a card without knowing its rotation. The
effect is off on touch, below 700px, and under `prefers-reduced-motion`. If you
edit the card copy, re-check that the stack still overlaps only padding and
never text — the offsets in `.deck__card--a/b/c` are tuned to the current
wording.

Both brand lockups — header and footer — are now the mark alone, with no
wordmark text beside it. Each link therefore carries
`aria-label="Beyond the Algorithm — home"`, and that is **not optional**: the
`<img>` inside is `alt=""`, so without the label the link has no accessible
name and a screen reader announces an unlabelled link. If you ever add a
wordmark back, the label can go with it.

Copy uses British spelling.

## Publishing to GitHub Pages

The repository is **[a-gagua/Beyond-the-Algorithm](https://github.com/a-gagua/Beyond-the-Algorithm)**,
and `origin` is already configured. Publishing is now just:

```bash
git add .
git commit -m "…"
git push
```

Pages serves `main` from `/ (root)`, which is why the site lives at the root
rather than in a subfolder. Check **Settings → Pages → Deploy from a branch →
`main` / `(root)`** if it ever stops updating. The site appears at
`https://a-gagua.github.io/Beyond-the-Algorithm/` within a minute or two of a
push.

All internal links are relative, so it works from a project subpath.
`.nojekyll` is included so GitHub serves the files as-is.

**The history was rewritten once**, on 21 September 2026, to purge the game
design document from all 23 commits — see the note in "What the site
deliberately does not say". If you have a clone made before that date, delete it
and clone again rather than pulling; its history no longer matches.
