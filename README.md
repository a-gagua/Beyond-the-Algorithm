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

## `v2/` — the visual pass

`v2/` is a full, self-contained copy of the site carrying a makeover drawn from
the printed box: the cover blue on headings and buttons, section labels as
printed strips, the sparkle and gear marking the two teams, and real
photographs in place of the empty slots. Open `v2/index.html` next to
`index.html` to compare.

It has its own `assets/`, so editing one version never touches the other. If
you keep it, move its four HTML files and `assets/` up to the root and delete
`v2/`. If you do not, delete the folder — nothing outside it refers to it.

The makeover CSS is appended at the bottom of `v2/assets/css/style.css` under a
`V2 MAKEOVER` banner rather than woven through the file, so deleting that block
returns v2 to the v1 look while keeping the photographs.

Photographs live in `v2/assets/img/photos/` as web-sized JPEGs (70–200 KB). The
originals are the 24 MB camera files in `~/Desktop/game`; each `<img>` carries
an HTML comment naming its `DSCF` source so a swap is a one-line change.

## Running locally

Double-click `index.html`, or serve it:

```bash
python3 -m http.server 8000
# http://localhost:8000
```

If you change CSS and the page looks unchanged, hard-refresh (Cmd-Shift-R) —
the browser caches the stylesheet.

## Two things that disagree with the printed box

**Player count and duration.** The box lid states **2–8 players** and **90m**.
Both are wrong. The correct figures are **4–8 players** and **2 hours**, and
that is what `v3/` now says. The site is the authority; anyone comparing it to
a printed box will find the box lower on players and shorter on time.

The per-stop durations that used to sit in "How it runs" (15 + 85 + 20 + 30)
totalled 150 minutes — the old, also-wrong 2½ hours. They were removed rather
than re-guessed. The total is stated once, in "What it needs".

**The print pack is not in this repository, deliberately.** There was briefly a
`v3/assets/brandbook/` holding sixteen Illustrator PDFs with
`/Separation /ContourCut` die-cut channels — the files a printer is sent. It
was 280 MB and has been removed: git history is permanent, GitHub rejects
single files over 100 MB, and the site loaded none of it.

Worth recording what it did *not* contain, so nobody goes looking again: no
logo-usage page, no colour swatch page, no type specimen, and no SVG, PNG, EPS
or AI files at all. The clock and player-count icons on the lid are anonymous
vector paths inside `4xBoxDesign_ResponsibleAI.pdf` and are not extractable
without Illustrator. The icons in "What it needs" are therefore drawn by hand
to match, as the gear and sparkle in `assets/img/motif.svg` already were. Keep
the print pack somewhere outside this repo — it belongs with the printer.

Worth knowing: the box's real typefaces are **Agenda**, **Aller Display** and
**Fredericka the Greatest**. The site uses Fraunces and Montserrat — neither is
a box face. Agenda and Aller Display are licensed desktop fonts with no web
licence to assume; Fredericka is on Google Fonts. Unresolved.

## Photographs: lowercase, and web-sized

Two rules for `v3/assets/img/photos/`, both learned the hard way.

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

## What the site deliberately does not say

Participants can read this site before playing, so it holds back anything that
would spoil a session. Keep this in mind when adding copy:

- **No scoring axes — with one settled exception.** The scored dimensions are
  not named as the things being *measured*, in copy or in HTML comments, which
  anyone can read via view-source. But **effectiveness and explainability do
  appear**, in the Sprints stop of "How it runs", and that is deliberate: they
  are also the goal the teams are openly briefed on at kickoff, so a
  participant learns them in the first ten minutes of a session. Naming them
  spoils nothing. What stays hidden is that they are scored, and how.

  The Sprints copy is phrased as a direction of travel, not a menu — "rarely a
  clean split between the two" — because presenting it as a binary choice
  would imply a scoring model that the site should not be describing.
- **No disclosure detail.** The site says the model goes on the public record
  and that you cannot say everything. It does not mention six fields, or
  choosing three.
- **No event card names.** The site says events interrupt the build, not which
  ones exist.
- **No mechanics.** Gear ratings, the Ambition Card, Consult Party and the MVP
  threshold are all absent.

The line drawn: mechanics and scoring stay hidden, what the experience is like
and why it is worth doing stays open, because that is what convinces an
organisation to book a session.

Copy supplied for the About and Research sections crossed this line in three
places — the scored dimensions in both team cards and in the closing paragraph
of "Who's at the table", and three named example events in the storyline. All
were rewritten to say the same thing without the spoilers. If that copy is
pasted in again from the original source, re-check those spots. Note that the
Sprints exception above does **not** extend to them: naming the dimensions as
a shared goal is fine, naming them as a team's score is not.

"How it runs" also used to say the teams agree "how ambitious to be" at
kickoff. That was changed to "what the goal is" — the original sat too close
to the Ambition Card, which is listed as hidden two bullets up.

One deliberate exception: "explainability tools" survives in the Research
standfirst, as one item in a list of checklist artefacts (registers,
documentation, explainability tools). That is standard vocabulary in the
field, not a statement that the game scores it.

## Before it goes public — things to fill in

Every item below is marked with an HTML comment at the place it belongs, so
you can also just search the source for `NEEDED` and `TO CONFIRM`.

- **Logos.** In `v3/` the footer is light (peach), because both institutional
  marks are black artwork and need a pale ground. `v3/assets/img/logos/`
  now holds the real `tu-delft.svg` from the house-style portal — do not
  redraw it, it is a trademark.

  **`gamelab.png` still needs replacing.** It is a screen capture of a web
  page, not a supplied asset: opaque white background, page artefacts along
  the top and bottom edges, and mostly empty padding. It is currently held
  on a white card by `.site-footer__logos .logo--raster`, which hides the
  baked-in background by matching it and crops the artefact lines off. Ask
  the Gamelab for a transparent PNG or an SVG, drop it in, and delete that
  rule — it is marked INTERIM in the stylesheet.

  The lab is **TU Delft Gamelab**, not "Serious Game Lab". The root and
  `v2/` copies still carry the old name and the dashed-box placeholders;
  they follow whenever a version is promoted.
- **Contact form.** `contact.html` posts to `https://formspree.io/f/FORM_ID`.
  Create a free [Formspree](https://formspree.io) form and paste the real
  endpoint. GitHub Pages is static, so a form needs an external handler. Until
  that is done the form silently fails — the address above it still works.
- **Ana's social links.** `contact.html` has two `href="#"` links that go
  nowhere. Add the real URLs or delete the "Elsewhere" spread.
- **Photographs.** Six empty `.shot` slots: three of the materials on
  the landing page, one playtest and two session shots on `research.html`,
  plus the box photo in the hero (see the comment in `index.html` — it
  replaces the card illustration). They render as visible dashed gaps on purpose.
- **Where it has been played.** `research.html` describes the sessions vaguely
  because the conference name and dates are not confirmed, and because each
  host organisation should be asked before being named.
- **Team headshots.** The bios themselves are done — all five are supplied
  text, not drafts, so do not paraphrase them or extend anyone's title beyond
  what their own bio states. Only the photographs are missing: drop images in
  `assets/img/team/` and replace each `.person__photo` div with
  `<img class="person__photo" src="assets/img/team/name.jpg" alt="Name">`.

  **The two lines on a card do different jobs.** `.person__role` is the
  person's role *on this project* — lead researcher, game designer, PhD
  supervisor. The bio underneath is who they are academically, in their own
  words. Do not collapse these into one: putting the academic title in both
  makes the card read as the same sentence twice, and leaves the page unable
  to say why any given person is on it. Haiko, Alexander and Nihit are all
  PhD supervisors.

  One thing still open: Gracia's bio says **TBM Gamelab** while the footer
  logo is captioned **TU Delft Gamelab**. TBM is the Dutch name for the same
  faculty that Ana's bio calls TPM in English, so the site currently uses
  both names for one lab.
- **Publications.** `research.html` has an empty publications section.

## Design

Type follows [criticalinfralab.net](https://www.criticalinfralab.net):
**Source Sans 3** for everything and **Source Code Pro** for labels, buttons and
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

The landing-page cards drift with the pointer, and straighten and lift when
one is hovered. Each card composes its transform from `--dx`, `--dy`, `--rot`
and `--scale` so the script can move a card without knowing its rotation. The
effect is off on touch, below 700px, and under `prefers-reduced-motion`. If you
edit the card copy, re-check that the stack still overlaps only padding and
never text — the offsets in `.deck__card--a/b/c` are tuned to the current
wording.

Copy uses British spelling.

## Publishing to GitHub Pages

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin git@github.com:USER/REPO.git
git push -u origin main
```

Then: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
The site appears at `https://USER.github.io/REPO/` within a minute or two.

All internal links are relative, so it works from a project subpath.
`.nojekyll` is included so GitHub serves the files as-is.
