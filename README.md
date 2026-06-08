# Marketing Madness

Portfolio site for **Marketing Madness** — a LinkedIn magazine series for marketers, by Connaugh.

A single-page portfolio (dark editorial theme, MADNESS gradient wordmark) showcasing the
interactive episode magazine viewers.

## Structure

```
index.html               homepage (hero + episode grid)
episodes/EP*.html         self-contained StPageFlip magazine viewers
assets/covers/EP*.jpg     card thumbnails (each episode's cover page)
assets/css/style.css      theme + layout
assets/js/main.js         renders the episode grid
vercel.json               static hosting config
```

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy

Hosted on [Vercel](https://vercel.com) as a static site — no build step. Push to `main`
and connect the repo in Vercel, or run `vercel` from the project root.
