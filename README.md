# gabrielleondev.github.io

Personal site of Gabriel Leon, live at **https://gabrielleondev.github.io**.

Plain HTML, CSS and JavaScript: no framework and no build step. GitHub Pages serves the files as they are.

## Features

- English and Spanish, with a toggle in the top bar. The first visit picks the browser's language.
- Light and dark themes. The first visit follows the system setting.
- Animated header: a simulated cell embedding (decoration, not real data). It stays still when the system asks for reduced motion.
- Works on phones, and is keyboard- and screen-reader-friendly.

## Files

```
index.html          the page (English text)
assets/main.js      Spanish translations, theme, language, menu and header animation
assets/styles.css   all styles, with colour tokens for light and dark mode
assets/favicon.svg  tab icon
assets/og.png       preview image for links shared on social media
404.html            page for addresses that don't exist
```

## Editing

- **Text:** change the English in `index.html` and the Spanish in the `ES` object at the top of `assets/main.js`. Both versions share the same `data-i18n` key.
- **Colours:** the tokens at the top of `assets/styles.css` (`--accent`, `--c1` … `--c5`).
- **Preview:** open `index.html` in a browser, or run `python -m http.server` in this folder and visit http://localhost:8000.

Changes pushed to `main` go live within a minute or two. When you change `styles.css` or `main.js`, also raise the number in `?v=4` where `index.html` links them (for example to `?v=5`). Otherwise browsers can keep the old file for up to 10 minutes.
