# IBBRU Studio — landing page

Two things live in this repo, kept deliberately separate:

| Folder | What it is | Deployable? |
| --- | --- | --- |
| `design/` | The **Claude Design canvas** project — the source of truth for the design (`.dc.html` components, the Nocturne design system in `_ds/`, the runtime `support.js` / `image-slot.js`, `uploads/`, `screenshots/`). | No — needs the canvas runtime |
| `live/` | A **standalone static build** of the home page: plain HTML + CSS + vanilla JS, no runtime, no build step, no dependencies. | Yes — this is what gets published |

## Preview locally

```bash
cd live
python3 -m http.server 8000
# open http://localhost:8000
```

`live/` contains:

```
live/
├── index.html      the whole page (markup pre-rendered)
├── styles.css      Nocturne tokens + IBBRU page styles  (no external CSS deps)
├── app.js          theme toggle · mobile nav · scroll reveal · work reader
└── assets/
    ├── hero.gif
    └── favicon.svg
```

The only external request is the Google Fonts stylesheet for Inter. Everything else is local.

## Deploy to GitHub Pages

The site is published from the **`gh-pages` branch**, which contains the contents of `live/`
at its root:

```bash
git subtree push --prefix live origin gh-pages
```

One-time setup on GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a
branch → `gh-pages` / `/ (root)`** → the site appears at `https://<user>.github.io/<repo>/`.

Re-run the `git subtree push` command after changing anything in `live/`.

> Note: GitHub Pages on a **private** repo requires GitHub Pro. On the Free plan, either make
> the repo public or move `live/` into a public repo.

### Optional: auto-deploy with GitHub Actions

`.github/workflows/deploy-pages.yml` (kept at `tools/deploy-pages.yml`) publishes `live/` on
every push to `main` — no subtree push needed. To use it:

1. Add the `workflow` scope to your `gh` token (needed to push workflow files):
   ```bash
   gh auth refresh -h github.com -s workflow
   ```
2. `mkdir -p .github/workflows && cp tools/deploy-pages.yml .github/workflows/`
3. Commit + push, then set **Settings → Pages → Source: GitHub Actions**.

## Regenerating `live/` from the design

`live/` is a generated snapshot: the markup is the design's rendered DOM, and `styles.css` is the design system stylesheet plus the page's own `<style>` block. If the design changes, regenerate:

```bash
# 1. serve the project and capture the rendered DOM (React-rendered output)
cd design && python3 -m http.server 8734 &
CHROME --headless --virtual-time-budget=25000 --dump-dom \
  "http://localhost:8734/IBBRU%20Home.dc.html" > /tmp/live_dom.html

# 2. rebuild live/
python3 tools/build-live.py /tmp/live_dom.html
```

The script re-renders the static page from that dump, converts `<image-slot>` placeholders,
strips editor annotations and injects the mobile nav / reader mount point.

## Editing

- **Copy / content**: `live/index.html` directly (it is plain HTML).
- **Work-case text** (the three volumes and their Problem/Insight/Solution/Impact pages):
  the JSON block `<script type="application/json" id="ib-data">` inside `live/index.html`.
- **Styling**: `live/styles.css`. Design tokens live at the top of the file (`:root`) — change
  them there and both themes follow.
- **The design itself**: open `design/IBBRU Home.dc.html` in the Claude design canvas, then
  regenerate `live/` as above.