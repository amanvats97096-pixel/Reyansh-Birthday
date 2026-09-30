# Reyansh Sharma's 2nd Birthday Storybook 🎈✨

A premium, interactive, 20-page frontend birthday web application created for **Reyansh Sharma**'s 2nd Birthday (**4 October 2026**).

---

## 🌟 Features

- **20 Unique Storybook Pages**: Every single page has a distinct layout, theme, interaction, sound effects, and birthday milestone copy.
- **Automatic Photo Processing**: Automatic discovery script for all real user photos dropped into `public/` without requiring renaming.
- **Web Audio API Sound Engine**: Zero external audio dependency! Live synthesized balloon pops, gift chimes, 8-key mini piano, fanfare chord, and instrumental Happy Birthday score player.
- **Interactive Experiences**:
  - Live Countdown to 4 October 2026 (Asia/Kolkata timezone)
  - Balloon popping game
  - Candle blowing cake with confetti
  - Instrumental music visualizer
  - Unwrapping mystery gift boxes
  - Twinkling night sky superstar page
  - Interactive teddy bear party
  - Heartfelt sealed letter signed *"With love, Aman"*
  - 3D photo flip cards
  - Playable 8-note mini piano
  - Birthday card matching game
  - Full memory gallery with responsive Lightbox
  - Keepsake birthday wish maker (local storage)
  - Interactive dance party floor
  - Grand finale closing celebration
- **Responsive & Accessible**: Works across mobile phones, tablets, and desktop displays. Includes `prefers-reduced-motion` toggle, sound preference settings, keyboard arrow navigation (`←` / `→`), and touch swipe controls.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
> Running `npm run dev` automatically executes `node scripts/generate-media-manifest.js` before launching Vite to index all photos in `public/`.

### 3. Production Build
```bash
npm run build
```

---

## 📸 Automatic Photo Handling

You do **NOT** need to rename your photos!

Simply copy your photos into the `public/` directory (or any subfolder inside `public/`).

### Supported Image Formats:
- `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif` (case insensitive: `.JPG`, `.PNG`, etc.).
- Safe handling of spaces and special characters in filenames.
- Original photos are preserved untouched.
- Natural sorting order applied automatically.
- Images lazy-load with aspect-ratio preservation and custom `objectPosition` support.

### Unsupported Formats (e.g., HEIC / HEIF):
If HEIC photos are placed in `public/`, the script automatically detects them and logs a conversion warning instructing how to export them as JPG or WebP.

### What if I have fewer than 20 photos?
If `public/` contains fewer than 20 photos (or 0 photos initially), the script automatically generates high-quality SVG placeholder cards in `public/placeholders/` so all 20 pages look complete right out of the box!

---

## ⚙️ Customizing Captions, Ordering & Image Framing

You can customize photo sequence, captions, and face alignment by editing `media.config.json`:

```json
{
  "order": [
    "first_smile.jpg",
    "family_pic.png",
    "cake_smash.webp"
  ],
  "photos": {
    "first_smile.jpg": {
      "caption": "Reyansh's gorgeous smile",
      "objectPosition": "center 20%",
      "alt": "Reyansh laughing"
    }
  }
}
```

---

## 🌐 SPA Deployment & Hosting Guidance

Since this application uses React Router with 20 distinct client-side routes, ensure your static web host redirects all page requests to `index.html`.

### Vercel
Works out of the box! (A `vercel.json` rewrite is included).

### Netlify
Add a `_redirects` file in `public/`:
```text
/*  /index.html  200
```

### Cloudflare Pages / GitHub Pages / Nginx
For Nginx, configure try_files:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## ❤️ Credits & Wish Author
- **Nephew**: Reyansh Sharma
- **Target Date**: 4 October 2026 (Asia/Kolkata IST)
- **With love, Aman**
